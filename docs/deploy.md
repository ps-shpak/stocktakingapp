# Развёртывание

Ниже описано развёртывание сервиса в Kubernetes. На деле, для развёртывание сервиса не обязательно использовать Kubernetes - достаточно docker-compose и одной машины. Работа в Kubernetes была лишь дополнительным требованием к проекту.

## Настройка машины разработчика

Нужно установить на машине разработчика kubectl, helm и python3:

```bash
sudo snap install kubectl --classic
sudo snap install helm --classic
sudo apt-get install -y python3
```

Для безопасного хранения секретов используется sops, который можно установить со страницы [github.com/mozilla/sops/releases](https://github.com/mozilla/sops/releases).

Для работы с существующими зашифрованными через sops данными потребуется получить PGP ключ расшифровки. В противном случае потребуется создать новое окружение в каталоге `k8s/overlays`.

## Подготовка Kubernetes кластера

Подготовка к созданию кластера:

* Нужно создать хотя бы одну виртуальную машину с публичным ("белым") IP, на которой будет развёрнут Kubernetes
* На машине рекомендуется установить Ubuntu Linux

### Создание кластера

* Можно создать кластер с одной node, используя kubeadm, по данной инструкции: [Setting up a single node Kubernetes Cluster](https://ninetaillabs.com/setting-up-a-single-node-kubernetes-cluster/)
* В качестве плагина для работы с сетью вместо Flannel взят Calico по инструкции [Creating a single master cluster with kubeadm](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/)
* Перед инициализацией стоит загрузить образы через `kubeadm config images pull`
* Команда инициализации `kubeadm init --pod-network-cidr=192.168.0.0/16`
* После шага `kubeadm init` прочитайте внимательно вывод последней команды и используйте его для генерации kubeconfig на своём компьютере

### Настройка Ingress

Для установки ingress в кластере написан скрипт `deploy-ingress-nginx-controller`, созданный по мотивам статьи [Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)

Также нужно настроить Cert-Manager, чтобы автоматически обновлять SSL-сертификаты - см. [Quick-Start using Cert-Manager with NGINX Ingress](https://github.com/jetstack/cert-manager/blob/master/docs/tutorials/acme/quick-start/index.rst)

## Развёртывание в Kubernetes кластер

### Шаг 1: создание kustomize overlay

* Для развёртывания мы используем kustomize 2.x, встроенный в kubectl 1.14: см. [kustomize.io](https://kustomize.io).
* Чтобы добавить ещё одно окружение, нужно настроить ещё один overlay для kustomize по образу и подобию существующих.
* Секреты предлагается хранить в зашифрованном виде, используя [sops](https://github.com/mozilla/sops) для шифрования файлов
  * См. как скрипт `bin/deploy` работает с sops

### Шаг 2: развёртывание stocktaking

Выполните в консоли:

```bash
# Тестовый запуск
bin/deploy -e <имя> --dry-run

# Развёртывание
bin/deploy -e <имя>
```

После этого можно запустить скрипт `bin/deploy -e <имя-окружения> --dry-run`, где `<имя-окружения>` - это имя каталога в `k8s/overlays`. Если всё прошло удачно, то можно убрать флаг `--dry-run` и выполнить настоящий деплой.
