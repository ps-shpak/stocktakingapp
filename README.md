# Stocktaking app

Educational project for intuitive stocktaking and inventory service.

## Структура проекта

* apitests - тесты API бекенда
* bin - скрипты
* docker - используется для поддержки работы в Docker
* docs - документы и макеты
* stocktakingapi - описание API на языке protobuf
* stocktakingbackend - бекенд сервиса, реализует бизнес-логику инвентаризации и предоставляет API
* stocktakingmobile - мобильное приложение под Android и iOS для сканирование QR-кодов
* stocktakingweb - фронтенд + бекенд веб-панели, реализует панель управления

## Настройка окружения

### Для запуска сервисов

Для запуска сервисов будет достаточно:

* [task](https://taskfile.org/#/installation) - простой task runner
* [docker](https://docs.docker.com/install) - для работы с контейнерами
* [docker-compose](https://docs.docker.com/compose/install/) - для запуска всех контейнеров вместе

После этого можно выполнить:

```bash
# Сборка docker-образов
task docker-build

# Запуск в docker-compose
task up

# Проверка состояния сервисов
task ps

# Остановка запущенных сервисов
task down
```

### Для разработки бекенда

Нужно установить:

* [go](https://github.com/golang/go/wiki/Ubuntu)
* [grpc](https://grpc.io/docs/quickstart/go.html), в том числе компилятор protoc
* [golang-migrate](https://github.com/golang-migrate/migrate)
* [go-bindata](https://github.com/jteeuwen/go-bindata): `go get -u github.com/go-bindata/go-bindata/...`

### Для разработки фронтенда

Потребуется установить:

* компилятор protoc: [github.com/protocolbuffers/protobuf/releases](https://github.com/protocolbuffers/protobuf/releases)
* плагин protoc для grpc-web: [github.com/grpc/grpc-web/releases](https://github.com/grpc/grpc-web/releases)

Для начала разработки достаточно сделать то, что обычно требуется в TypeScript проектах:

```bash
cd stocktakingweb
npm install
npm run build
```

Можно вместо этого выполнить таск:

```bash
task build-frontend
```

После этого собранный фронтенд находится в каталоге `stocktakingweb/build`.

Чтобы его запустить, используйте docker-compose (см. выше).

### Деплой в Kubernetes кластер

Нужно установить kubectl и python3:

```bash
sudo snap install kubectl --classic
sudo apt-get install -y python3
```

Также нужно установить sops со страницы [github.com/mozilla/sops/releases](https://github.com/mozilla/sops/releases), а также получить PGP ключ расшифровки конфигурации существующего окружения, либо создать новое окружение в каталоге `k8s/overlays`.

После этого можно запустить скрипт `bin/deploy -e <имя-окружения> --dry-run`, где `<имя-окружения>` - это имя каталога в `k8s/overlays`. Если всё прошло удачно, то можно убрать флаг `--dry-run` и выполнить настоящий деплой.
