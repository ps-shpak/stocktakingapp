# Настройка Kubernetes кластера

## Подготовка к созданию

* Нужно установить на машине разработчика helm и kubectl

```bash
sudo snap install helm --classic
sudo snap install kubectl --classic
```

* Нужно создать VPS, на которой будет развёрнут Kubernetes

## Создание кластера

* Можно создать кластер с одной node, используя kubeadm, по данной инструкции: [Setting up a single node Kubernetes Cluster](https://ninetaillabs.com/setting-up-a-single-node-kubernetes-cluster/)
* В качестве плагина для работы с сетью вместо Flannel взят Calico по инструкции [Creating a single master cluster with kubeadm](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/)
* Перед инициализацией стоит загрузить образы через `kubeadm config images pull`
* Команда инициализации `kubeadm init --pod-network-cidr=192.168.0.0/16`
* После шага `kubeadm init` прочитайте внимательно вывод последней команды и используйте его для генерации kubeconfig на своём компьютере

## Настройка Ingress

Для установки ingress в кластере написан скрипт `deploy-ingress-nginx-controller`

https://kubernetes.github.io/ingress-nginx/deploy/

Чтобы Ingress-Nginx был повешен на порты 80 и 443 всех нод кластера, 

```bash
```

Также нужно настроить Cert-Manager, чтобы автоматически обновлять SSL-сертификаты - см. [Quick-Start using Cert-Manager with NGINX Ingress](https://github.com/jetstack/cert-manager/blob/master/docs/tutorials/acme/quick-start/index.rst)

## Заселение кластера

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
