---
slug: /installation
---

# 安装

## 启动 Apache Answer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

有多种方式启动 Apache Answer，你可以选择最适合你的方式。

<Tabs queryString="method">
  <TabItem value="docker-compose" label="Docker compose" default>

我们推荐使用 Docker Compose 来运行 Apache Answer。 这是开始使用 Apache Answer 的最简单方法。

:::tip

如果你在 Windows 或 Mac 上使用 [Docker Desktop](https://www.docker.com/products/docker-desktop)，docker-compose 已经包含在其中。 :::tip  
如果你在 Windows 或 Mac 上使用 [Docker Desktop](https://www.docker.com/products/docker-desktop)，则已经包含了 docker-compose。

:::  

```bash
curl -fsSL https://raw.githubusercontent.com/apache/incubator-answer/main/docker-compose.yaml | docker compose -p answer -f - up
```

Apache Answer 的默认端口是 `9080`，你可以通过 http://localhost:9080 访问它。
:::  

```bash
curl -fsSL https://raw.githubusercontent.com/apache/incubator-answer/main/docker-compose.yaml | docker compose -p answer -f - up
```

Answer 的默认端口为 `9080`。

  </TabItem>
  <TabItem value="docker" label="Docker">

You can find all the available Docker images on [Docker Hub](https://hub.docker.com/r/apache/answer/tags). The `latest` tag refers to the latest stable version of Apache Answer.

```bash
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

After running the command, heading to http://localhost:9080/install to continue installation.

:::tip

If you can't access the installation page, you can use the command `docker logs answer` to view the logs. It may help you find the specific problem.

::: `latest` 标签指的是 Apache Answer 的最新稳定版本。

```bash
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

运行该命令后，前往 http://localhost:9080/install 继续安装。

:::tip

如果无法访问安装页面，可以使用命令 `docker logs answer` 查看日志。 这可能有助于你找到具体问题。

:::  

  </TabItem>
  <TabItem value="binary" label="Binary">

作为一个 Go 项目，Apache Answer 可以编译为二进制文件。 你可以从[发布页面](https://github.com/apache/incubator-answer/releases)下载与你的操作系统匹配的二进制文件。

```bash
INSTALL_PORT=80 ./answer init -C ./answer-data/
```

运行该命令后，前往 http://localhost:80/install 继续安装。

按照[安装步骤](#install-steps)完成安装。 **之后**再次运行以下命令启动 Answer。

```bash
./answer run -C ./answer-data/
```

:::note

你可以通过指定环境变量 `INSTALL_PORT` 来指定启动安装的端口，默认端口是 80。

我们使用 `-C` 标志来指示保存 Apache Answer 数据的目录。

:::  

  </TabItem>
  <TabItem value="aapanel" label="aaPanel">

若要在 aaPanel上安装 Apache Answer，您需要先安装 aPanel。 访问 [aaPanel](https://www.aapanel.com/new/download.html?r=dk_answer) 官方网站，下载并安装脚本。

安装完成后，请点击左边的菜单栏 `Docker` 登录。 输入 `On-Click Install`，搜索 `Apache Answer`，点击安装配置：

![Search Apache Answer](/img/docs/aapanel-install.png)

:::tip

 当你首次登录时，你将被提示安装 `Docker` 和 `Docker Compose` 服务。 点击立即安装。 如果您已经安装了它，请忽略它。

![安装 Docker 服务](/img/docs/aapanel-init-docker.png)

:::
:::

你需要填写以下信息才能完成基本的配置初始化:

- 名称: 应用程序名称 默认为 `answer_random characters`
- 版本选择：默认 'latest'
- 允许外部访问：如果您需要直接通过 `IP+Port` 访问权限，请检查它。 如果您已经设置了域名，不需要在此处检查
- 端口: 默认是 `9080` 你可以将其修改成为你想设置的
- 站点名称: 站点名称 例如 `Apache Answer`
- 网站地址：安装后您将使用浏览器地址访问 Apache Answer
- 联系电子邮件：负责此网站的主要联系人的电子邮件地址
- 管理员名称：管理员用户名
- 管理员密码：管理员密码
- 管理员电子邮件: 管理员电子邮件。 你需要邮件登录，所以请确保你可以记住管理员的邮箱和密码

![Install configuration information](/img/docs/aapanel-install-config.png)

在填写完成信息之后， 点击确定来提交 当你点击确定提交后，面板将自动初始化应用程序。 您无需操作下面的安装步骤。 等待初始化完成，您可以通过您刚刚设置的 **站点URL** 访问它。

恭喜，开始您的 Apache Answer 的旅程！

  </TabItem>
</Tabs>

## 安装步骤

> 启动 Answer 后，你可以按照以下步骤完成基本配置的初始化。

### 步骤 1: 选择语言

![install-choose-language](/img/docs/install-choose-language.png)

### 步骤 2: 配置数据库

:::tip
Apache Answer supports MySQL, PostgreSQL, and SQLite as the database backend. The smallest environment is SQLite, which does not require any additional configuration. If you want to use MySQL or PostgreSQL, you need to setup the database first and then configure the database connection in this step. Here we recommend using sqlite3 to complete your first experience. ::: 最小的环境是 SQLite，它不需要任何额外配置。 如果您想使用 MySQL 或 PostgreSQL，则需要首先设置数据库，然后在此步骤中配置数据库连接。 我们建议首次体验使用 sqlite3。
:::

![install-database](/img/docs/install-database.png)

### 步骤 3: 创建配置文件

点击下一步按钮创建配置文件。

![install-create-config-file](/img/docs/install-create-config-file.png)

### 步骤 4: 填写基本信息

:::caution
站点 URL 是你安装后将用来访问 Apache Answer 的浏览器地址。 如果你部署在子目录中，站点 URL 需要包括子目录的路径，例如: https://yourdomain/{subdirectory}

**请务必记住管理员的 Email 和密码。 **
:::

![install-site-info](/img/docs/install-site-info.png)

### 步骤 5: 完成

恭喜你！ 点击完成按钮，开始你的 Apache Answer 之旅吧！

![install-complete](/img/docs/install-complete.png)
