---
slug: /installation
---

# 安装流程

## 🚀 启动 Apache Answer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

有多种方法可以启动 Apache Answer，你可以选择最适合你的一种。

<Tabs>
  <TabItem value="docker-compose" label="Docker compose" default>

我们推荐使用 Docker Compose 运行 Apache Answer。 这是开始使用 Apache Answer 的最简单方法。

:::tip
如果你在 Windows 或 Mac 上使用 [Docker Desktop](https://www.docker.com/products/docker-desktop)，则已经包含了 docker-compose。 :::tip  
如果你在 Windows 或 Mac 上使用 [Docker Desktop](https://www.docker.com/products/docker-desktop)，则已经包含了 docker-compose。

We recommend using Docker Compose to run Apache Answer. This is the easiest way to get started with Apache Answer.

:::tip

If you are using [Docker Desktop](https://www.docker.com/products/docker-desktop) on Windows or Mac, docker-compose is already included. If you are using Linux, you will need to install docker-compose separately.

:::  

```bash
curl -fsSL https://raw.githubusercontent.com/apache/incubator-answer/main/docker-compose.yaml | docker compose -p answer -f - up
```

The default port for Apache Answer is `9080`. You can access it at http://localhost:9080.
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

运行该命令后，请前往 http://localhost:9080/install 继续安装流程。

:::tip
如果你无法访问安装页面，可以使用命令 `docker logs answer` 查看日志。 它可能有助于你找到具体的问题
:::

:::  

  </TabItem>
  <TabItem value="binary" label="Binary">

As a golang project, Apache Answer can be compiled into a binary file. You can download the binary file that matches your operating system from the [release page](https://github.com/apache/incubator-answer/releases).

```bash
INSTALL_PORT=80 ./answer init -C ./answer-data/
```

After running the command, heading to http://localhost:80/install to continue installation.

Follow the [Install Steps](#install-steps) to complete the installation. **After that** run the following command to start the answer again.

```bash
./answer run -C ./answer-data/
```

:::note

You can specify the port on which to start the installation by specifying the environment variable `INSTALL_PORT`, default is 80.

We use `-C` flag to indicate the directory where saved answer data.

::: 你可以从 [release page](https://github.com/apache/incubator-answer/releases) 下载与你的操作系统匹配的二进制文件。

```bash
INSTALL_PORT=80 ./answer init -C ./answer-data/
```

运行该命令后，请前往 http://localhost:80/install 继续安装流程。

按照 [安装步骤](#install-steps) 完成安装。 **之后**运行以下命令再次启动 Apache Answer。

```bash
./answer run -C ./answer-data/
```

:::note

你可以通过指定环境变量 `INSTALL_PORT`来指定启动安装的端口，默认为 80。

我们使用 `-C` 标志来指示保存 Apache Answer 数据的目录。

:::  

  </TabItem>
</Tabs>

## 安装步骤

> 在你启动 Apache Answer 后，你可以按照以下步骤完成有关基本配置的初始化。

### 第一步：选择语言

![install-choose-language](/img/docs/install-choose-language.png)

### 第二步：配置数据库

:::tip
Apache Answer supports MySQL, PostgreSQL, and SQLite as the database backend. The smallest environment is SQLite, which does not require any additional configuration. If you want to use MySQL or PostgreSQL, you need to setup the database first and then configure the database connection in this step. Here we recommend using sqlite3 to complete your first experience. ::: 最小的环境是 SQLite，不需要任何额外的配置。 如果你想使用 MySQL 或 PostgreSQL，则需要先设置数据库，然后在此步骤中配置数据库连接。 在这里，我们建议使用 SQLite3 完成你的第一次体验。
:::

![install-database](/img/docs/install-database.png)

### 第三步：创建配置文件

单击“下一步”按钮以创建配置文件。

![install-create-config-file](/img/docs/install-create-config-file.png)

### 第四步：填写基本信息

:::caution
Site URL is the browser address you will use to access answers after installation. If you are deploying a subdirectory, the site url needs to include the subdirectory's path, eg: https://yourdoamin/{subdirectory} If you are deploying a subdirectory, the site url needs to include the subdirectory's path, eg: https://yourdoamin/{subdirectory}

**Don't forget the admin Email and password.**
:::

![install-site-info](/img/docs/install-site-info.png)

### 第五步：完成

🎉 恭喜你，单击“完成”按钮即可开始 Apache Answer 之旅！

![install-complete](/img/docs/install-complete.png)
