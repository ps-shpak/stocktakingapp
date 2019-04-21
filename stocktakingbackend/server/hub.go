package server

import (
	"fmt"
	"os"
	"os/signal"
	"sync"
	"syscall"
)

// ServeFunc - runs server
type ServeFunc func() error

// StopFunc - stops server
type StopFunc func() error

// Hub of servers that can run and stop together,
//  runs all servers until receive SIGINT/SIGTERM,
//  stops all if cannot run any one.
type Hub struct {
	wg              sync.WaitGroup
	reportErrorOnce sync.Once
	errs            chan error
	signals         chan os.Signal
	stoppers        []StopFunc
}

// NewHub - creates new servers group and starts to listen OS signals SIGINT/SIGTERM
func NewHub() *Hub {
	h := &Hub{
		errs:    make(chan error),
		signals: make(chan os.Signal, 1),
	}
	signal.Notify(h.signals, syscall.SIGINT)
	signal.Notify(h.signals, syscall.SIGTERM)
	return h
}

// Serve - registers new server and it's stop function
func (h *Hub) Serve(serve ServeFunc, stop StopFunc) {
	h.wg.Add(1)
	h.stoppers = append(h.stoppers, stop)
	go func() {
		h.run(serve)
		h.wg.Done()
	}()
}

func (h *Hub) run(serve ServeFunc) {
	defer func() {
		h.recoverReportError()
	}()
	err := serve()
	h.reportError(err)
}

// Wait - waits until all servers completed
// If one of the servers generates error, stops all servers and returns first error
func (h *Hub) Wait() error {
	var err error

	// Wait for error or SIGINT/SIGTERM and stop all servers
	h.wg.Add(1)
	go func() {
		select {
		case err = <-h.errs:
			_ = h.stop()
		case <-h.signals:
			err = h.stop()
		}
		h.wg.Done()
	}()

	// Wait until all goroutines finished
	h.wg.Wait()
	return err
}

// Stop all servers, store first error
func (h *Hub) stop() error {
	var err error
	for _, stop := range h.stoppers {
		stopErr := stop()
		if err == nil {
			err = stopErr
		}
	}
	return err
}

// Recovers and reports error if there was a panic
func (h *Hub) recoverReportError() {
	if value := recover(); value != nil {
		switch x := value.(type) {
		case error:
			h.reportError(x)
		case string:
			h.reportError(fmt.Errorf("%s", x))
		default:
			h.reportError(fmt.Errorf("%v", value))
		}
	}
}

// Saves error if it's first
func (h *Hub) reportError(err error) {
	h.reportErrorOnce.Do(func() {
		h.errs <- err
	})
}
