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

## Logi

- `LOG_LEVEL`: poziomu wyświetlania szczegółowości informacji w logu [`DEBUG` `INFO` `WARN` `ERROR`]
- `LOG_PATH`: miejsce przechowywania plików log
