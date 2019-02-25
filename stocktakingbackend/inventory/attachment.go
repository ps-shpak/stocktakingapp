package inventory

import uuid "github.com/satori/go.uuid"

// Attachment - uploaded attachment which describes item, e.g. photo
type Attachment struct {
	ID          uuid.UUID
	Path        string
	ContentType string
}

func NewAttachment(path string, contentType string) *Attachment {
	return &Attachment{
		ID:          uuid.NewV1(),
		Path:        path,
		ContentType: contentType,
	}
}
