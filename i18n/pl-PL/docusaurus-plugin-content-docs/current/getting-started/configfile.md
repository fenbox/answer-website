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
    addr: 0.0.0.0:80 # Numer portu
data:
  database:
    driver: "mysql" # Domyślnym sterownikiem bazy danych jest mysql
    connection: root:root@tcp(127.0.0.1:3306)/answer # Adres do bazy danych MySQL
  cache:
    file_path: "/tmp/cache/cache.db" # ścieżka do pliku z cache
i18n:
  bundle_dir: "/data/i18n" # Katalog tłumaczeń
swaggerui:
  show: true # Czy wyświetlić dokumentację do swaggerapi, adres /swagger/index.html
  protocol: http # protokół dla swagger
  host: 127.0.0.1 # Adres IP lub nazwa domenowa
  address: ':80'  # Numer portu
service_config:
  upload_path: "/data/uploads" # Katalog upload
```
