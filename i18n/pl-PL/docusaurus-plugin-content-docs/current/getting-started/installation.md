---
slug: /installation
---

# Instalacja

## Start Apache Answer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are multiple ways to start Apache Answer, you can choose the one that suits you best.

<Tabs>
  <TabItem value="docker-compose" label="Docker compose" default>

We recommend using Docker Compose to run Apache Answer. This is the easiest way to get started with Apache Answer.

::tip  

Jeśli używasz [Docker Desktop](https://www.docker.com/products/docker-desktop) na Windows lub Mac, to docker-compose jest już uwzględniony. Jeśli używasz Linuksa, musisz oddzielnie zainstalować docker-compose.

:::  

```bash
curl -fsSL https://raw.githubusercontent.com/apache/incubator-answer/main/docker-compose.yaml | docker compose -p answer -f - up
```

The default port for Apache Answer is `9080`. Można uzyskać dostęp do Answer wpisując a http://localhost:9080.

  </TabItem>
  <TabItem value="docker" label="Docker">

Wszystkie dostępne obrazy Dockera można znaleźć na [Docker Hub](https://hub.docker.com/r/apache/answer/tags). The `latest` tag refers to the latest stable version of Apache Answer.

```bash
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

Po uruchomieniu polecenia, użyj adresu do http://localhost:9080/install, aby kontynuować instalację.

::tip  

Jeśli nie masz dostępu do strony instalacji, możesz użyć polecenia `docker logs answer` aby wyświetlić logi. Może to pomóc w znalezieniu problemu.

:::  

  </TabItem>
  <TabItem value="binary" label="Binary">

As a golang project, Apache Answer can be compiled into a binary file. Możesz pobrać plik binarny pasujący do systemu operacyjnego z [release page](https://github.com/apache/incubator-answer/releases).

```bash
INSTALL_PORT=80 ./answer init -C ./answer-data/
```

Po uruchomieniu polecenia, przejdz do http://localhost:80/install aby kontynuować instalację.

Wykonaj [Kroki instalacji](#install-steps), aby dokończyć instalację. **Po tym** uruchom następującą komendę, aby ponownie uruchomić Answer - nie w trybie jak dotychczas instalacji tylko w trybie uruchomienia aplikacji do użytkowania.

```bash
./answer run -C ./answer-data/
```

:::note

Możesz określić port, na którym rozpocząć instalację określając zmienną środowiskową `INSTALL_PORT` Domyślnie jest 80.

Używamy flagi `-C` do wskazania katalogu, w którym zapisano dane.

:::  

  </TabItem>
</Tabs>

## Instalacja krok po kroku

> Po uruchomieniu Answer, możesz wykonać poniższe kroki, aby ukończyć inicjalizację podstawowej konfiguracji.

### Krok 1: Wybierz język

![install-choose-language](/img/docs/install-choose-language.png)

### Krok 2: Konfiguracja bazy danych

:::tip
Apache Answer supports MySQL, PostgreSQL, and SQLite as the database backend. Dla małych i testowych środowisk używamy bazy danych SQLite, która nie wymaga dodatkowej konfiguracji. Jeśli chcesz użyć MySQL lub PostgreSQL, musisz najpierw skonfigurować bazę danych, a następnie skonfigurować połączenie z bazą danych w tym kroku. Tutaj zalecamy użycie SQLite3, aby zebrać doświadczenie podczas pierwszej instalacji.
:::

![install-database](/img/docs/install-database.png)

### Krok 3: Utwórz plik konfiguracyjny

Kliknij przycisk Dalej, aby utworzyć plik konfiguracyjny.

![install-create-config-file](/img/docs/install-create-config-file.png)

### Etap 4: Uzupełnij podstawowe informacje

:::caution
Site URL is the browser address you will use to access answers after installation. If you are deploying a subdirectory, the site url needs to include the subdirectory's path, eg: https://yourdoamin/{subdirectory}

**Don't forget the admin Email and password.**
:::

![install-site-info](/img/docs/install-site-info.png)

### Krok 5: Zakończ

Gratulacje, możesz kliknąć przycisk Zakończ, aby rozpocząć korzystanie z Answer!

![install-complete](/img/docs/install-complete.png)
