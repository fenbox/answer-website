---
slug: /configfile
---

# Plik konfiguracyjny

:::tip

Używamy pliku konfiguracyjnego w formacie `yaml`. Jest on tworzony automatycznie po komendzie `answer init`. Domyślną ścieżką jest plik `/data/conf/config.yaml`

:::

## Opis config.yaml

```yaml title="/data/conf/config.yaml"
server:
  http:
    addr: 0.0.0.0:80 # Project access port number
data:
  database:
    driver: "mysql" # Default database driver is mysql
    connection: root:root@tcp(127.0.0.1:3306)/answer # MySQL database connection address
  cache:
    file_path: "/tmp/cache/cache.db" # Cache file storage path
i18n:
  bundle_dir: "/data/i18n" # Internationalized file storage directory
swaggerui:
  show: true # Whether to display the swaggerapi documentation, address /swagger/index.html
  protocol: http # swagger protocol header
  host: 127.0.0.1 # An accessible IP address or domain name
  address: ':80'  # accessible port number
service_config:
  upload_path: "/data/uploads" # upload directory
```
