# Stocktaking app

Educational project for intuitive stocktaking and inventory service.

## Структура проекта

* bin - скрипты
* docker - используется для поддержки работы в Docker
* docs - документы и макеты
* stocktakingapi - описание API на языке protobuf
* stocktakingbackend - бекенд сервиса, реализует бизнес-логику инвентаризации и предоставляет API
* stocktakingmobile - мобильное приложение под Android и iOS для сканирование QR-кодов
* webpanel - фронтенд + бекенд веб-панели, реализует панель управления

## Настройка окружения

Для запуска сервисов будет достаточно:

* [task](https://taskfile.org/#/installation) - простой task runner
* [docker](https://docs.docker.com/install) - для работы с контейнерами
* [docker-compose](https://docs.docker.com/compose/install/) - для запуска всех контейнеров вместе

Для разработки каждого компонентов потребуются специфичные шаги, которые здесь не описаны.

### Бекенд

Нужно установить:

* [go](https://github.com/golang/go/wiki/Ubuntu)
* [grpc](https://grpc.io/docs/quickstart/go.html)
