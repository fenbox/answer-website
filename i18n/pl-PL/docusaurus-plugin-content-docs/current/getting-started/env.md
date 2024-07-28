---
slug: /env
---

# Zmienne środowiskowe

## Instalacja

- `INSTALL_PORT`: określa port do uruchomienia podczas instalacji, domyślnie `80`.
- `AUTO_INSTALL`: jeśli ustawione na `true`, instalacja odbędzie się automatycznie.

### Dla automatycznej instalacji

- `DB_TYPE`: typ bazy danych, wspierane [`sqlite3`  `mysql`  `postgres`]
- `DB_USERNAME`: nazwa użytkownika bazy danych
- `DB_PASSWORD`: hasło do bazy danych
- `DB_HOST`: host bazy danych, np.: `127.0.0.1:3306`
- `DB_NAME`: nazwa bazy danych
- `DB_FILE`: ścieżka do pliku bazy danych, tylko dla sqlite3
- `LANGUAGE`: język, np.: `pl`
- `SITE_NAME`: site name `Apache Answer`
- `SITE_URL`: adres URL witryny, `https://answer.apache.org`
- `CONTACT_EMAIL`: email kontaktowy
- `ADMIN_NAME`:  nazwa administratora
- `ADMIN_PASSWORD`: hasło administratora
- `ADMIN_EMAIL`: email do administartora

### For overriding the config file

- `SWAGGER_HOST` - address for the swagger to display, like `192.168.12.12` or `answer.apache.org`
- `SWAGGER_ADDRESS_PORT` - port for the swagger to display, like `:3000`
- `SITE_ADDR` - address that the site should run, like `0.0.0.0:3000`

## Logi

- `LOG_LEVEL`: poziomu wyświetlania szczegółowości informacji w logu [`DEBUG` `INFO` `WARN` `ERROR`]
- `LOG_PATH`: miejsce przechowywania plików log
