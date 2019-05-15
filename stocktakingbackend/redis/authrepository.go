package redis

import (
	"fmt"

	"github.com/pkg/errors"

	goredis "github.com/go-redis/redis"

	authorizing "stocktakingbackend/authorizing"
)

type authRepository struct {
	client *goredis.Client
}

func NewAuthRepository(redisAddress string) (authorizing.Repository, error) {
	client := goredis.NewClient(&goredis.Options{
		Addr: redisAddress,
	})
	_, err := client.Ping().Result()
	if err != nil {
		return nil, err
	}
	r := &authRepository{
		client: client,
	}
	return r, nil
}

func (r *authRepository) Authentificate(email, token string) error {
	err := r.client.Set(r.tokenKey(token), email, 0).Err()
	return errors.Wrap(err, "failed to save token data")
}

func (r *authRepository) IsAuthentificated(token string) (bool, error) {
	_, err := r.client.Get(r.tokenKey(token)).Result()
	if err == goredis.Nil {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *authRepository) tokenKey(token string) string {
	return fmt.Sprintf("stocktakingbackend:auth:%s", token)
}
