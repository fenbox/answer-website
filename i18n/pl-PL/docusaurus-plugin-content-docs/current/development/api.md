---
slug: /api
---

# Dokumentacja API

:::tip

Answer używa swaggera do automatycznego generowania dokumentacji API. Swagger może w sposób przyjazny wyświetlić dokumentacje API jak i stanowi wygodny sposób przetestowania API.

:::

## Gdzie jest dokumentacja API?

### Szybkie start

Jeśli chcesz szybko zobaczyć dokumentacje API odwiedź następujący link:
https://meta.answer.dev/swagger/index.html

### Zobacz swóją własną dokumentacje API

Jeśli już posiadasz własną instancję Answer to możesz podejrzeć dokumentację API pod adrersem:
`https://example.com/swagger/index.html`

Jeśli nie możesz uzyskać dostępu do powyższego linku to sprawdź następujące elementy konfiguracji, czy są poprawnie skonfigurowane.

```yaml title="/data/conf/config.yaml"
swaggerui:
  show: true
  protocol: http
  host: 127.0.0.1
  address: ':9080' # pole pozostaw puste, jeśli chcesz skorzystać z domyślnego numeru portu 80
```

## Generowanie dokumentacji API

Answer używa [swag](https://github.com/swaggo/swag) do automatycznego wygenerowania plików json/yaml zgodnie z komentarzami w kodzie. Aby wygenerować dokumentacje API, możesz użyć następujących kroków.

```bash
# zainstaluj swg cli
$ go install github.com/swaggo/swag/cmd/swag@latest

# wejdź do głównego katalogu projektu i wykonaj następujące polecenie
$ cd script
$ . gen-api.sh

# wygenerowana dokumentacja znajduje się w katalogu docs/api
```
