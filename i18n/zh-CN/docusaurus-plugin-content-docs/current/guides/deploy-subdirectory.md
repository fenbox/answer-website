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
4. Packaging into docker or releasing the above binary directly, see [here](/docs/plugins#build)

### 配置文件介绍

In order to unify the management of configuration-related variables, starting from v1.3.5, the environment variables in the ui directory are unified into `/configs/config.yaml` in the root directory, and the configurations here will be generated into `/ui/.env.production` by scripts, so as to realize the injection of environment variables.

Note: This only affects variables in the production environment, for development mode please continue to refer [here](/docs/development). For more information on configuration files, please refer to [here](/docs/configfile).

```
...
ui:
  public_url: '/'
  api_url: '/'
  base_url: ''

```

### base_url

子目录的路径. The default value is `''`, which means it is deployed in the root directory. If the value is modified, for example ` base_url: '/foo''`, all access paths of the page will be added with this prefix.

Normally, if this value is modified, `public_url` should also remain consistent.

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
