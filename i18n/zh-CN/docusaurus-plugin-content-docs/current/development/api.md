---
slug: /api
---

# API Document

:::tip

Apache Answer using swagger to generate API document automatically. Swagger can display the API document in a friendly way, and can also provide a convenient way to test the API.

:::

## API 文档在哪里？

### 概览

如果您想快速查看 API 文档，您可以访问以下链接：
https://meta.answer.dev/swagger/index.html

### 查看您自己的 API 文档

如果您已经有一个 Apache Answer 实例，您可以通过访问以下链接查看您自己实例的 API 文档：
`https://example.com/swagger/index.html`

如果您不能访问上面的链接，请检查以下配置项是否正确配置。

```yaml title="/data/conf/config.yaml"
swaggerui:
  show: true
  protocol: http
  host: 127.0.0.1
  address: ':9080' # leave blank to use the 80 port number
```

## 生成 API 文档

Apache Answer using [swag](https://github.com/swaggo/swag) to generate API document json/yaml file automatically according to the comments in the code. You can use the following steps to generate API document.

```bash
# install swag cli
$ go install github.com/swaggo/swag/cmd/swag@latest

# enter the project root directory and execute the following command
$ cd script
$ ./gen-api.sh

# the generated documentation is in the docs/api directory
```
