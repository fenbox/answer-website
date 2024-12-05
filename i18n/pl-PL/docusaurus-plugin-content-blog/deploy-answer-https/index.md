---
date: 2024-01-26
title: Jak uzyskać dostęp do Answer przy użyciu HTTPS
authors:
  - LinkinStar
category: Tech
featured: true
image: 2024-01-26-cover@4x.png
description: Czy masz skonfigurowany i uruchomiony serwer Answer? Teraz przejdźmy to do następnego etapu konfiguracji HTTPS.
---

> Mam już uruchomiony Answer na moim serwerze, ale chcę uzyskać dostęp za pomocą protokołu HTTPS. Jak mam to zrobić?

## Kontekst

Gdy masz już uruchomiony serwer Answer, możesz szukać odpowiedzi na pytanie. Po wdrożeniu Answer, uświadomisz sobie, że możesz uzyskać dostęp tylko za pomocą HTTP. Może jednak chcesz uzyskać dostęp za pomocą protokołu HTTPS. Jak więc można to zrobić?

Niektóre pytania:

- https://meta.answer.dev/questions/D1G3/how-to-configure-ssl
- https://meta.answer.dev/questions/D1wh/how-to-enable-ssl
- https://meta.answer.dev/questions/D1XG2/how-to-deploy-answer-image-in-aws-in-docker-with-ssl-and-nginx
- https://meta.answer.dev/questions/D136/how-to-deploy-an-ssl-certificate-using-docker-and-how-to-access-it-without-using-a-port
- https://meta.answer.dev/questions/D1Oe/i-have-set-up-ssl-on-cloudflare-but-still-can-t-access-via-https
- ...

Odkryłem, że wiele osób ma taką samą zagwozdkę. Wdrożenie Answer jest łatwe, ale wdrożenie jej za pomocą HTTPS jest nieco trudniejsze. Postanowiłem więc napisać ten artykuł, aby pomóc Ci wdrożyć Answer za pomocą HTTPS.

## Łatwy sposób

Ten artykuł ma na celu przedstawienie najprostszego sposobu wdrożenia Answer z wykorzystaniem protokołu HTTPS. Możesz użyć [Caddy](https://caddyserver.com/) do wdrożenia Answer z HTTPS. Caddy jest potężnym, gotowym do zastosowań korporacyjnych serwerem www na licencji open source napisanym w Go, posiada zautomatyzowany HTTPS. Oczywiście możesz użyć innych narzędzi do wdrożenia Answer z HTTPS, takich jak Nginx, itp.

## Przygotowanie

1. Możesz skorzystać z [przewodnika instalacyjnego](https://answer.apache.org/docs/installation/) w celu zainstalowania Answer. Po zainstalowaniu Answer masz dostęp z wykorzystaniem protokołu HTTP. Domyślny port dla Answer to 9080. Dostęp pod adresem http://localhost:9080. Na kolejnych etapach będziemy używać 9080 jako domyślnego portu dla Answer.

2. Potrzebujesz domeny, która ma już skonfigurowany rekord **DNS wskazujący na serwer Answer**.

3. W tym artykule do instalacji Caddy użyjemy docker-compose. A zatem potrzebujemy dockera i docker-compose. Można czerpać wiedzę z [oficjalnego przewodnika](https://docs.docker.com/engine/install/), aby zainstalować docker i compose.

## Wdrożenie

### Krok 1

```shell
$ mkdir caddy-docker
$ cd caddy-docker
$ vim docker-compose.yml
```

Możesz ręcznie utworzyć plik `docker-compose.yml` w nowym katalogu i wkleić do niego poniższy tekst:

```yaml title="docker-compose.yml"
version: "3.7"

services:
  caddy:
    image: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - $PWD/Caddyfile:/etc/caddy/Caddyfile
      - $PWD/caddy_data:/data
      - $PWD/caddy_config:/config
    network_mode: host
```

### Krok 2

`Caddyfile` to plik konfiguracyjny dla Caddy. Używany jest do konfiguracji witryny przez Caddy. Ten plik jest montowany do kontenera pod adresem `/etc/caddy/Caddyfile`.

```shell
$ vim Caddyfile
```

Utwórz plik `Caddyfile` w tym samym katalogu, a następnie dodaj następujący kod:

```text title="Caddyfile"
your.answer.domain {
    reverse_proxy 127.0.0.1:9080
}
```

### Krok 3

Uruchom następujące polecenie, aby uruchomić Caddy. Poczekaj kilka sekund, a następnie możesz uzyskać dostęp do Answer za pomocą protokołu HTTPS.

```shell
$ docker-compose up -d
```

Jeśli nie masz do niego dostępu, możesz sprawdzić logi Caddy.

```shell
$ docker-compose logs
```

## Zaawansowane

Jeśli nie chcesz używać `network_mode: host` w `docker-compose.yml`, możesz umieścić Answer i Caddy w tym samym dockerze. Caddy i Answer mogą korzystać z tej samej sieci. Więc możesz skonfigurować Caddy w następujący sposób:

```text title="Caddyfile"
your.answer.domain {
    reverse_proxy answer-service:9080
}
```

Oczywiście równie dobrze możesz zainstalować Caddy za pomocą innych metod, takich jak przy użyciu pliku binarnego itp. Koniec końców, chciałbym, aby korzystając z tego artykułu, móc pomyślnie wdrożyć Answer z HTTPS. Jeśli masz jakieś pytania, proszę wrzuć pytanie na [Meta](https://meta.answer.dev/). Postaramy się jak najlepiej pomóc.
