---
slug: /installation
---

# Instalacja

## Start Apache Answer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Istnieje wiele sposobów, aby uruchomić Apache Answer, możesz wybrać ten, który najbardziej Ci odpowiada.

<Tabs queryString="method">
  <TabItem value="docker-compose" label="Docker compose" default>

Zalecamy użycie Docker Compose do uruchomienia Apache Answer. Jest to najprostszy sposób aby zacząć z Apache Answer.

::tip  

Jeśli używasz [Docker Desktop](https://www.docker.com/products/docker-desktop) na Windows lub Mac, to docker-compose jest już uwzględniony. Jeśli używasz Linuksa, musisz oddzielnie zainstalować docker-compose.

:::  

```bash
curl -fsSL https://raw.githubusercontent.com/apache/answer/main/docker-compose.yaml | docker compose -p answer -f - up
```

The default port for Apache Answer is `9080`. Można uzyskać dostęp do Answer wpisując a http://localhost:9080.

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

Tak jak projekt golang, Apache Answer może zostać skompilowany do pliku binarnego. You can download the binary file that matches your operating system from the [release page](https://github.com/apache/answer/releases).

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
  <TabItem value="aapanel" label="aaPanel">

To install Apache Answer on aaPanel, you need to install the aaPanel first. Go to the [aaPanel](https://www.aapanel.com/new/download.html?r=dk_answer) official website, download and install the script.

After the installation is complete, log in to the aaPanel, click the left menu bar `Docker`, enter `One-Click Install`, search for `Apache Answer`, click Install to configure:

![Search Apache Answer](/img/docs/aapanel-install.png)

:::tip

For the first time, you will be prompted to install the `Docker` and `Docker Compose` services. Click Install immediately. If you have already installed it, please ignore it.

![Install Docker service](/img/docs/aapanel-init-docker.png)

:::  

You need to fill in the following information to complete the basic configuration initialization:

- Name: Application name, default `answer_random characters`
- Version selection: default `latest`
- Allow external access: If you need to access directly through `IP+Port`, please check it. If you have already set up a domain name, please do not check here
- Port: default `9080`, you can modify it yourself
- Site name: Site name, such as `Apache Answer`
- Site url: The browser address you will use to access Apache Answer after installation
- Contact email: The email address of the main contact person responsible for this website
- Admin name: Admin username
- Admin password: Admin password
- Admin email: Admin email. You need this email to log in, so be sure to remember the admin's email and password

![Install configuration information](/img/docs/aapanel-install-config.png)

After filling in the information, click Confirm to submit. The panel will automatically initialize the application after you click OK to submit. You do not need to operate the installation steps below. Wait for the initialization to complete, and you can access it through the **site URL** you just set.

Congratulations, start your Apache Answer journey!

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
