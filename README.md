# Stocktaking app

Educational project for intuitive stocktaking and inventory service.

## Структура проекта

* android - android приложение
* backend - бекенд сервиса, который реализует бизнес-логику инвентаризации и предоставляет API для Web-панели и Android-приложения
* bin - скрипты
* docker - используется для поддержки работы в Docker
* docs - документы и макеты
* webpanel - фронтенд + бекенд веб-панели

## Настройка окружения

Для запуска сервисов будет достаточно:

* [task](https://taskfile.org/#/installation) - простой task runner
* [docker](https://docs.docker.com/install) - для работы с контейнерами
* [docker-compose](https://docs.docker.com/compose/install/) - для запуска всех контейнеров вместе

Для разработки каждого компонентов потребуются специфичные шаги, которые здесь не описаны.

## Работа с сервисами

### Настройка LDAP сервера

Завести пользователей можно в интерфейсе LDAP сервера:

* Запустите контейнеры: `task up`
* Откройте в браузере [https://localhost:6443](https://localhost:6443)
* Войдите, используя логин `"cn-admin,dc=test,dc=com"` и пароль `"Jedi"`
* Найдите в интерфейсе кнопку "Create new entry here", и создайте сущность "Generic: User Account"
