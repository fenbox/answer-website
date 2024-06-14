---
slug: /plugins
---

# Używanie wtyczek

:::tip

When we need to do some extensions to Apache Answer's functionality, for example, OAuth login, we design a way to use plugins to implement these functions.

:::

## Wprowadzenie

### Oficjalne wtyczki

You can find a list of officially supported plugins for Apache Answer [here](https://github.com/apache/incubator-answer-plugins).

### Rodzaje wtyczek

Klasyfikujemy wtyczki wg typów. Poszczególne typy wtyczek mają inne funkcje. Wtyczki tego samego typu dają taki sam efekt, różnią się implementacją.

- **Connector**: Wtyczka Connector pomaga nam zaimplementować funkcjonalność logowania dostarczoną przez firmy trzecie.
- **Storage**: Wtyczka Storage pomaga nam przechowywać pliki na zasobach dostarczonych przez dostawców zewnętrznych. (podgląd)
- **Cache**: Wsparcie dla korzystania z różnych pamięci podręcznych oprogramowania pośredniego np.: `Redis` (podgląd).
- **Filter**: Filtruj nieprawidłowe pytania lub odpowiedzi. (wkrótce)
- **Render**: Parsery dla różnych formatów typu danych. (wkrótce)
- **Finder**: Wsparcie dla korzystania z wyszukiwarek w celu przyspieszenia wyszukiwania odpowiedzi na pytania. (wkrótce)

## Budowanie

Apache Answer binary supports packaging different required plugins into the binary.

### Wymagania

- Original Apache Answer binary
- [Golang](https://go.dev/) `>=1.18`
- [Node.js](https://nodejs.org/) `>=16.17`
- [pnpm](https://pnpm.io/) `>=7`

### Polecenia

:::tip

We use the `build` command provided with the Apache Answer binary to rebuild a version of Apache Answer with the plugin.

:::

For example, let's see how to build an Apache Answer binary that includes the github third-party login plugin.

```shell
# answer build --with [plugin@plugin_version=[replacement]] --output [file]
$ ./answer build --with github.com/apache/incubator-answer-plugins/connector-github

# build a new answer with github login plugin then output to ./new_answer.
$ ./answer build --with github.com/apache/incubator-answer-plugins/connector-github@1.0.0 --output ./new_answer

# with multiple plugins
$ ./answer build \
--with github.com/apache/incubator-answer-plugins/connector-github \
--with github.com/apache/incubator-answer-plugins/connector-google

# with local plugins
$ ./answer build --with github.com/apache/incubator-answer-plugins/connector-github@1.0.0=/my-local-space

# cross compilation. Build a linux-amd64 binary in macos
$ CGO_ENABLED=0 GOOS=linux GOARCH=amd64 ./answer build --with github.com/apache/incubator-answer-plugins/connector-github

# specify the answer version using ANSWER_MODULE environment variable
$ ANSWER_MODULE=github.com/apache/incubator-answer@v1.2.0-RC1 ./answer build --with github.com/apache/incubator-answer-plugins/connector-github
```

:::tip

Możesz użyć komendy `plugin`, aby wyświetlić listę wtyczek.

:::

```shell
$ ./new_answer plugin

# output
# github connector[0.0.1] made by answerdev
# google connector[0.0.1] made by answerdev
```

### Zbuduj obraz dockera z wtyczką korzystając z podstawowego obrazu Answer

> Możesz wykonać powyższe kroki, aby najpierw zbudować plik binarny z wtyczką, a następnie zbudować obraz dockera zawierający plik binarny. Oczywiście możesz również budować bezpośrednio na oryginalnym obrazie.

```dockerfile title="Dockerfile"
FROM apache/answer as answer-builder

FROM golang:1.19-alpine AS golang-builder

COPY --from=answer-builder /usr/bin/answer /usr/bin/answer

RUN apk --no-cache add \
    build-base git bash nodejs npm go && \
    npm install -g pnpm@8.9.2

RUN answer build \
    --with github.com/apache/incubator-answer-plugins/connector-basic \
    --with github.com/apache/incubator-answer-plugins/storage-s3 \
    --with github.com/apache/incubator-answer-plugins/search-elasticsearch \
    --output /usr/bin/new_answer

FROM alpine
LABEL maintainer="linkinstar@apache.org"

ARG TIMEZONE
ENV TIMEZONE=${TIMEZONE:-"Asia/Shanghai"}

RUN apk update \
    && apk --no-cache add \
        bash \
        ca-certificates \
        curl \
        dumb-init \
        gettext \
        openssh \
        sqlite \
        gnupg \
        tzdata \
    && ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime \
    && echo "${TIMEZONE}" > /etc/timezone

COPY --from=golang-builder /usr/bin/new_answer /usr/bin/answer
COPY --from=answer-builder /data /data
COPY --from=answer-builder /entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

VOLUME /data
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
```

> Możesz oczywiście zaktualizować za pomocą parametru --with, aby dodać więcej wtyczek, których potrzebujesz.

```shell
# create a Dockerfile and copy the content above
$ vim Dockerfile
$ docker build -t answer-with-plugin .
$ docker run -d -p 9080:80 -v answer-data:/data --name answer answer-with-plugin
```

## Wtyczka firm trzecich

:::tip

Zalecamy użycie [oficjalnych pluginów](https://github.com/apache/inubator-answer-plugins), jeśli chcesz korzystać z zewnętrznych pluginów, zapoznaj się z informacjami poniżej.

:::

- Jeśli wtyczka firm trzecich jest dostępna publicznie, możesz budować z nią jak oficjalne wtyczki.
- Jeśli wtyczka firm trzecich jest prywatna, musisz ją na początku pobrać, a następnie zbudować.

## Użycie

The Apache Answer with the plugin version is used in the same way as before. Konfiguracja wtyczki można znaleźć na stronie administratora.

![plugin-config-admin-page](/img/docs/plugin-config-admin-page.png)

## Aktualizacja

:::caution

Zauważ, że jeśli aktualizujesz wtyczkę bez wersję do wskazanej wersji, musisz również wykonać polecenie uaktualnienia (także wykonanie aktualizacji).

:::

You need build a new Apache Answer binary with the new plugin version, then replace the old Apache Answer binary with the new one. Podobnie jak w przypadku standardowej aktualizacji, musisz wykonać różne [etapy aktualizacji](./upgrade) w zależności od metody wdrażania. Na przykład, jeżeli używasz aktualizacji binarki, musisz wykonać komendę `upgrade`.

## Rozwój i wkład

Proszę zapoznać się z [dokumentacją](/community/plugins), aby uzyskać szczegółowe informacje.

## Projektowanie i zasady

Jako że Golang jest językiem statycznym, nie ma przyjaznego mechanizmu wtyczki. Więc zamiast dynamicznego podejścia, stosujemy ponowne kompilowanie do wdrożenia. Proszę zapoznać się z [blog](/blog/2023/07/22/why-the-answer-plugin-system-was-designed-this-way) w celu uzyskania informacji.
