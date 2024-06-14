---
slug: /command-line
---

# Wiersz poleceń

:::tip

Apache Answer binary support some command-line options

:::

## Użycie

`answer command [command or global options] [arguments...]`

```shell
To run answer, use:
        - 'answer init' to initialize the required environment.
        - 'answer run' to launch the application.
        - 'answer upgrade' to upgrade the application

Usage:
  answer [command]

Available Commands:
  build       used to build answer with plugins
  check       checking the required environment
  dump        back up data
  help        Help about any command
  init        init answer application
  plugin      prints all plugins packed in the binary
  run         Run the application
  upgrade     upgrade Apache Answer version

Flags:
  -C, --data-path string   data path, eg: -C ./data/ (default "/data/")
  -h, --help               help for answer
  -v, --version            version for answer

Use "answer [command] --help" for more information about a command.
```

## Opcje globalne

Wszystkie opcje globalne mogą być umieszczone na poziomie wiersza poleceń.

- `--help`, `-h`: Pokaż tekst pomocy i wyjdź. Opcjonalne.
- `--version`, `-v`: Pokaż wersję i wyjdź. Opcjonalne.
- `--data-path` ścieżka, `-C` ścieżka: wskazuje ścieżkę do danych. Opcjonalne. (domyślnie: /data/)

## Komendy

### init

> polecenie init zainicjuje wymagane środowisko aplikacji, zawiera: domyślny plik konfiguracyjny, katalog danych, inicjalizację bazę danych, itd.

- Przykłady
  - `answer init -C ./data/`
- Uwagi
  - jeśli Answer został już zainicjowany, to polecenie nie zostanie wykonane. Na przykład, jeśli plik konfiguracyjny już istnieje, to kolejny raz nie zostanie utworzony lub nadpisany.
  - jeśli zainicjowanie Answer nie powiodło się, nie można wykonać polecenia run.

### check

> polecenie sprawdza, czy aplikacje ma warunki czy może zostać uruchomiona czy nie. sprawdź plik konfiguracji, jeśli istnieje. sprawdź bazę danych, czy można nawiązać połączenie itd.

- Przykłady
  - `answer check -C ./data/`

### run

> uruchamianie polecenia uruchomi aplikację.

- Przykłady
  - `answer run -C ./data/`

### upgrade

> polecenie aktualizacji zaktualizuje aplikację.

- Opcje
  - `-f` version: Uaktualnienie z określonej wersji. Opcjonalne.
- Przykłady
  - `answer upgrade -C ./data/`
  - `answer upgrade -f v1.1.0 -C ./data/`

### dump

> komenda dump zrzuci dane bazy danych do pliku SQL.

- Opcje
  - `-path` ścieżka, `-p` ścieżka: wskazuje ścieżkę do danych. Opcjonalne. (domyślne: ./)
- Przykłady
  - `answer dump -p /tmp/`

### build

> build a new Apache Answer with plugins.

- Opcje
  - `--with` nazwę wtyczki. Wymagane.
- Przykłady
  - `answer build --with plugin1 --with plugin2`

### plugin

> przedstawia wszystkie wtyczki będące na wyposażeniu pliku binarnego.

- Przykłady
  - `answer plugin`

### config

> przywróć niektóre wartości konfiguracji do wartości domyślnych.

- Opcje
  - `--with` nazwa pola konfiguracyjnego. Wymagane.
- Przykłady
  - `answer config -C ./data/ --with allow_password_login`
