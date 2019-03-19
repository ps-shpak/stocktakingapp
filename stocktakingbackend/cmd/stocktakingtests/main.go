package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"google.golang.org/grpc"

	api "stocktakingbackend/stocktakingapi"
)

//const address = "stocktakingbackend:8081"
const address = "localhost:8081"

func main() {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	client := api.NewBackendClient(conn)
	runner := testRunner{}
	runner.runTests(client, []testCase{
		testCase{"testOwners", testOwners},
		testCase{"testItems", testItems},
	})
}

type testCase struct {
	name string
	fn   func(ctx context.Context, client api.BackendClient)
}

type testRunner struct {
	passed int
	failed int
}

func (t *testRunner) runTests(client api.BackendClient, testCases []testCase) {
	for _, testCase := range testCases {
		t.runCase(client, testCase)
	}
	if t.failed == 0 {
		log.Printf("all %v tests passed\n", t.passed)
	} else {
		log.Fatalf("fatal error: %v/%v tests failed\n", t.failed, t.passed+t.failed)
	}
}

func (t *testRunner) runCase(client api.BackendClient, testCase testCase) {
	errors := make(chan error, 1)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	// Call test case function in other goroutine,
	//  send panic or nil to error channel
	go func() {
		defer func() {
			var err error
			if r := recover(); r != nil {
				err = fmt.Errorf("%v", r)
			}
			errors <- err
		}()
		testCase.fn(ctx, client)
	}()

	select {
	case err := <-errors:
		if err == nil {
			t.passed++
		} else {
			log.Printf("error: failure in %s: %s\n", testCase.name, err.Error())
			t.failed++
		}
	case <-time.After(1 * time.Second):
		t.failed++
	}
}

func testOwners(ctx context.Context, client api.BackendClient) {
	client.ListOwners(ctx, &api.ListOwnersRequest{})
}

func testItems(ctx context.Context, client api.BackendClient) {
}
