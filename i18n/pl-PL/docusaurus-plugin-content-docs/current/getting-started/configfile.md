---
slug: /configfile
---

# Plik konfiguracyjny

:::tip

Używamy pliku konfiguracyjnego w formacie `yaml`. Jest on tworzony automatycznie po komendzie `answer init`. Domyślną ścieżką jest plik `/data/conf/config.yaml`

The `ui` configuration first is used to configure React's environment variables, which generally don't need to be changed unless you want to configure a CDN or deploy the project in a subdirectory.

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
ui:
  public_url: '/' # static resource path
  api_url: '/' # api url for  ajax requests
  base_url: ''  # the default deployment is in the root directory, you need to change this value when deploying in a subdirectory
```
