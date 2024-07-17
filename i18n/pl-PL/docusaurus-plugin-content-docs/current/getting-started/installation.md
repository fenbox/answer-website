---
slug: /installation
---

# Instalacja

## Start Apache Answer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Istnieje wiele sposobów, aby uruchomić Apache Answer, możesz wybrać ten, który najbardziej Ci odpowiada.

<Tabs>
  <TabItem value="docker-compose" label="Docker compose" default>

Zalecamy użycie Docker Compose do uruchomienia Apache Answer. Jest to najprostszy sposób aby zacząć z Apache Answer.

::tip  

Jeśli używasz [Docker Desktop](https://www.docker.com/products/docker-desktop) na Windows lub Mac, to docker-compose jest już uwzględniony. Jeśli używasz Linuksa, musisz oddzielnie zainstalować docker-compose.

:::  

```bash
curl -fsSL https://raw.githubusercontent.com/apache/incubator-answer/main/docker-compose.yaml | docker compose -p answer -f - up
```

Domyślny port dla Apache Answer to `9080`. Można uzyskać dostęp do Answer wpisując a http://localhost:9080.

  </TabItem>
  <TabItem value="docker" label="Docker">

Wszystkie dostępne obrazy Dockera można znaleźć na [Docker Hub](https://hub.docker.com/r/apache/answer/tags). Tag `latest` odnosi się do najnowszej stabilnej wersji Answer.

```bash
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

Po uruchomieniu polecenia, użyj adresu do http://localhost:9080/install, aby kontynuować instalację.

::tip  

Jeśli nie masz dostępu do strony instalacji, możesz użyć polecenia `docker logs answer` aby wyświetlić logi. Może to pomóc w znalezieniu problemu.

:::  

  </TabItem>
  <TabItem value="binary" label="Binary">

Tak jak projekt golang, Apache Answer może zostać skompilowany do pliku binarnego. Możesz pobrać plik binarny pasujący do systemu operacyjnego z [release page](https://github.com/apache/incubator-answer/releases).

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
Apache Answer obsługuje bazy danych MySQL, PostgreSQL i SQLite. Dla małych i testowych środowisk używamy bazy danych SQLite, która nie wymaga dodatkowej konfiguracji. Jeśli chcesz użyć MySQL lub PostgreSQL, musisz najpierw skonfigurować bazę danych, a następnie skonfigurować połączenie z bazą danych w tym kroku. Tutaj zalecamy użycie SQLite3, aby zebrać doświadczenie podczas pierwszej instalacji.
:::

![install-database](/img/docs/install-database.png)

### Krok 3: Utwórz plik konfiguracyjny

Kliknij przycisk Dalej, aby utworzyć plik konfiguracyjny.

![install-create-config-file](/img/docs/install-create-config-file.png)

### Etap 4: Uzupełnij podstawowe informacje

:::caution
Adres URL witryny jest adresem przeglądarki, którego użyjesz do uzyskania dostępu do Apache Answer po jej zainstalowaniu. Jeśli instalujesz aplikację Apache Answer w podkatalog to adres URL strony musi zawierać ścieżkę podkatalogu, np. https://yourdoamin/{subdirectory}

**Nie zapomnij adresu email i hasła administratora.**
:::

![install-site-info](/img/docs/install-site-info.png)

### Krok 5: Zakończ

Gratulacje, możesz kliknąć przycisk Zakończ, aby rozpocząć korzystanie z Answer!

![install-complete](/img/docs/install-complete.png)
