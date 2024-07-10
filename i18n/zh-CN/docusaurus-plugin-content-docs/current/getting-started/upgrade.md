---
slug: /upgrade
---

# 升级

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

We recommend that you back up database and configuration files before upgrading. Generally, we guarantee that the upgrade does not affect the existing data. 通常情况下，我们保证升级不会影响现有数据。

备份数据意味着即使升级失败或者你不想使用高级版本，你也有回滚的选择。

:::

<Tabs>
  <TabItem value="docker-compose" label="Docker Compose" default>

If you use docker-compose to install answer, it is very easy to upgrade.

```bash
docker-compose pull
docker-compose down
docker-compose up -d
```

```bash
docker-compose pull
docker-compose down
docker-compose up -d
```

  </TabItem>
  <TabItem value="docker" label="Docker">

如果你使用 Docker 安装 Apache Answer，升级步骤如下。

If you are using docker to install answer, the upgrade steps are as follows.

```bash
docker pull apache/answer:latest
docker stop answer
docker rm answer
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

  </TabItem>
  <TabItem value="binary" label="Binary">

如果你使用二进制安装的 Answer，升级步骤如下。

1. 1. 下载适用于你的系统的最新二进制版本。 [https://github.com/apache/incubator-answer/releases](https://github.com/apache/incubator-answer/releases)
  2. 停止旧版本
  3. 执行升级命令 `./answer upgrade -C ./answer-data/`
  4. 运行最新版本  `./answer run -C ./answer-data/`
2. Stop old version
3. Execute the upgrade command `./answer upgrade -C ./answer-data/`
4. Run the latest version `./answer run -C ./answer-data/`


  </TabItem>
</Tabs>

:::tip

When there are other unexpected cases such as upgrade exceptions, we provide a command to manually force the upgrade of Apache Answer. `answer upgrade -f v1.1.0` Executing this command will force upgrade from the specified version, even if your Apache Answer is already up to date. If you encounter an upgrade exception, you can try to execute this command or pull the latest docker image again and execute this command inside the container. `answer upgrade -f v1.1.0` 执行该命令会强制从指定版本开始升级，即使你当前的 Apache Answer 已经是最新版本。 如果遇到升级异常可尝试执行该命令或重新拉取最新 docker 镜像后并进入容器内执行该命令。

:::
