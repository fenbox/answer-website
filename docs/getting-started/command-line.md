---
slug: /command-line
---

# Command Line

:::tip

Apache Answer binary supports some command-line options

:::

## Usage

`answer command [command or global options] [arguments...]`

```shell
Answer is a minimalist open source Q&A community.
To run answer, use:
        - 'answer init' to initialize the required environment.
        - 'answer run' to launch application.

Usage:
  answer [command]

Available Commands:
  build       Build Answer with plugins
  check       Check the required environment
  completion  Generate the autocompletion script for the specified shell
  config      Set some config to default value
  dump        Back up data
  help        Help about any command
  i18n        Overwrite i18n files
  init        Initialize Answer
  plugin      Print all plugins packed in the binary
  run         Run Answer
  upgrade     Upgrade Answer

Flags:
  -C, --data-path string   data path, eg: -C ./data/ (default "/data/")
  -h, --help               help for answer
  -v, --version            version for answer

Use "answer [command] --help" for more information about a command.
```

## Global options

All global options can be placed at the command level.

- `--help`, `-h`: Show help text and exit. Optional.
- `--version`, `-v`: Show version and exit. Optional.
- `--data-path` path, `-C` path: data saved path. Optional. (default: /data/)

## Commands

### init

> init command will initialize the application required environment, contains: default config-file, data directory, initialize database etc.

- Examples
  - `answer init -C ./data/`
- Notes
  - if answer already initialized, this command will not be executed. For example, if config file is already exist so it will not be created or overwritten.
  - if answer initialized failed, run command can not be executed.

### check

> check command will check the application whether it can run or not. check the config file if exist. check the database if connection can be established etc.

- Examples
  - `answer check -C ./data/`

### run

> run command will run the application.

- Examples
  - `answer run -C ./data/`

### upgrade

> upgrade command will upgrade the application.

- Options
  - `-f` version: Upgrade from the specified version. Optional.
- Examples
  - `answer upgrade -C ./data/`
  - `answer upgrade -f v1.1.0 -C ./data/`

### dump

> dump command will dump the database data to sql file.

- Options
  - `--path` path, `-p` path: dump data path. Optional. (default: ./)
- Examples
  - `answer dump -p /tmp/`

### build

> build a new Apache Answer with plugins.

- Options
  - `--with` the field name of plugin. Required.
- Examples
  - `answer build --with plugin1 --with plugin2`

### plugin

> prints all plugins packed in the binary.

- Examples
  - `answer plugin`

### config

> restore some config value to default.

- Options
  - `--with` the field name of config. Required.
- Examples
  - `answer config -C ./data/ --with allow_password_login`
