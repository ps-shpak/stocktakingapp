# Stocktaking app

Заказной учебный проект сервиса для управленческого учёта имущества организации.

## Структура проекта

* apitests - тесты API бекенда
* bin - скрипты
* docker - файлы для поддержки работы в Docker
* docs - документы и макеты
* k8s - файлы конфигурации для развёртывания в Kubernetes
* stocktakingapi - описание API на языке protobuf
* stocktakingbackend - бекенд сервиса, реализует бизнес-логику инвентаризации и предоставляет API
* stocktakingmobile - мобильное приложение под Android и iOS для сканирование QR-кодов
* stocktakingweb - фронтенд + бекенд веб-панели, реализует панель управления

## Настройка окружения для разработки

### Среда разработки

Для разработки достаточно возможностей редактора VSCode, вы можете выбрать другой на свой вкус. Рекомендуется использовать Linux, но нет явных ограничений на использование Windows или Mac OSX.

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
# После этого сервис доступен по адресу http://localhost/
task up

# Проверка состояния сервисов
task ps

# Остановка запущенных сервисов
task down
```

В `Taskfile.yml` описаны задачи, общие для проекта: связанные со сборкой компонентов, сборкой Docker-контейнеров, операциями с docker-compose.

### Использование docker-compose для разработки

Разрабатывать будет удобнее, если монтировать каталоги с собранными файлами в контейнер. Для этого нужно:

* по примеру в файле `docker/docker-compose.override.example.yml` создать файл `docker/docker-compose.override.yml`
* прочитат комментарии и раскомментировать те параметры монтирования, которые вам подходят

После этого можно обновлять локально запущенный фронтенд и бекенд без пересборки Docker образов.

### Для разработки бекенда

Нужно установить утилиты по инструкциям:

* [go](https://github.com/golang/go/wiki/Ubuntu)
* [protoc в составе protobuf](https://github.com/protocolbuffers/protobuf/releases)
* [grpc](https://grpc.io/docs/quickstart/go.html)
* [golang-migrate](https://github.com/golang-migrate/migrate)
* [go-bindata](https://github.com/jteeuwen/go-bindata): `go get -u github.com/go-bindata/go-bindata/...`

Установите grpc-gateway, используя `go get`:

```bash
# Устанавливаем grpc-gateway: https://github.com/grpc-ecosystem/grpc-gateway
go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
```

Также надо убедиться, что у вас устанлен protoc-gen-go версии v1.2.0 - иначе проявится баг, описанный в [undefined: proto.ProtoPackageIsVersion3](https://stackoverflow.com/questions/53952723/undefined-proto-protopackageisversion3). Установить нужную версию можно так:

```bash
go get -d -u github.com/golang/protobuf/protoc-gen-go
git -C "$(go env GOPATH)"/src/github.com/golang/protobuf checkout v1.2.0
go install github.com/golang/protobuf/protoc-gen-go
```

Теперь вы можете приступать к разработке. Исходный код бекенда находится в каталоге `stocktakingbackend`, сборка бекенда описана в Makefile.

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

## Процессы

### Работа с API

См. [docs/API.md](docs/API.md)

### Развёртывание в Kubernetes кластер

См. [docs/deploy.md](docs/deploy.md)
