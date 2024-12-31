---
slug: /deploy-subdirectory
---

# 以子目录方式部署

此函数是基于 react-router 的 [basename](https://reactrouter.com/en/main/routter-components/memory-routter#basename)，所以它不适用于通过 `nginx` 配置实现的子目录。

Apache Answer 从1.3.5 版本开始支持以子目录的方式部署。 此配置允许您为您的应用程序设置路由前缀，例如： 如果你有路由 `/` 和 `/questions` ，你可以将 `base_url` 设置为 /foo ，你可以通过 `/foo` 和 `/fo/questions` 访问以前的路由。

:::warning

配置的设置需要在构建之前做配置，因为该值已经被包含在客户端软件包中，无法在不重建应用的前提下做更改。 这意味着用户必须修改配置文件，然后自行编译，才能完成项目的构建。

:::

### 步骤

1. 修改配置文件 `/configs/config.yaml` inchive.
2. 运行命令 `make ui` `make build` 来构建项目。
3. 运行命令 `INSTALL_PORT=80。 /answer init -C . /answer-data/` 来初始化项目, 注意你需要添加你的 base_url (http://localhost:80/{base_url}/install/) 来尝试访问你的路径以查看配置是否设置成功。
4. 将其打包进 docker 或者直接运行上述的二进制, 可以参照 [这里](/docs/plugins#build)

### 配置文件介绍

为了统一配置相关变量的管理，从 v1.3.5 开始，ui 目录中的环境变量被并入`/configs/config.yaml` 和这里的配置将由脚本生成到 `/ui/.env.production` ，以便实现环境变量注入。

注意：这只会影响生产环境中的变量，因为开发模式请继续参考 [here](/docs/development)。 关于配置文件的更多信息，请参阅 [here](/docs/configfile)。

```
...
ui:
  public_url: '/'
  api_url: '/'
  base_url: ''

```

### base_url

子目录的路径. 默认值是 `''`, 代表部署在根目录。 如果值被修改，例如将其修改为 `base_url: '/foo'`，页面的所有访问路径都将被添加到此前缀。

通常情况下，如果此值被修改，`public_url` 也应该保持一致。

### public_url

静态资源的路径。 默认值是 `'/'`。 如果网站使用 CDN 托管静态资源，此值可以设置为 CDN 的 URL。 如果修改了 `base_url` 和 CDN 未被使用，那么此值也需要与 `base_url` 相同的值。

### api_url

默认值是 `''`，通常不调整。 然而，如果你的项目使用 nginx 来代理子路径，你需要匹配 `base_url` 的值。

:::tip
The KEY written to the `.env` file will be converted to:

```
PUBLIC_URL=/
REACT_APP_API_URL=/
REACT_APP_BASE_URL=
```

:::
