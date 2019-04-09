# Настройка Kubernetes кластера

## Создание кластера

* Можно создать кластер с одной node, используя kubeadm, по данной инструкции: [Setting up a single node Kubernetes Cluster](https://ninetaillabs.com/setting-up-a-single-node-kubernetes-cluster/)
  * После шага `kubeadm init` прочитайте внимательно вывод последней команды и используйте его для генерации kubeconfig на своём компьютере
  * Шаг настройки Ingress из данной инструкции можно пропустить и заменить на Ingress-Nginx: см. [Quick-Start using Cert-Manager with NGINX Ingress](https://github.com/jetstack/cert-manager/blob/master/docs/tutorials/acme/quick-start/index.rst)

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
