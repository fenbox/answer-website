---
slug: /upgrade
---

# Upgrade

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

We recommend that you back up database and configuration files before upgrading. Generally, we guarantee that the upgrade does not affect the existing data.

To back up data means that you have the option to roll back even if the upgrade fails, or you do not want the advanced version.

:::

<Tabs>
  <TabItem value="docker-compose" label="Docker Compose" default>

If you use docker-compose to install answer, it is very easy to upgrade.

```bash
docker-compose pull
docker-compose down
docker-compose up -d
```

  </TabItem>
  <TabItem value="docker" label="Docker">

If you are using docker to install answer, the upgrade steps are as follows.

```bash
docker pull apache/answer:latest
docker stop answer
docker rm answer
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

  </TabItem>
  <TabItem value="binary" label="Binary">

Wenn du eine binäre Installation von Answer verwendest, sind die Upgrade-Schritte wie folgt.

1. Lade die [neueste Binärversion](https://github.com/apache/incubator-answer/releases) für dein System herunter.
2. Stop old version
3. Execute the upgrade command `./answer upgrade -C ./answer-data/`
4. Führe die neueste Version `./answer run -C ./answer-data/` aus.


  </TabItem>
</Tabs>

:::tip

When there are other unexpected cases such as upgrade exceptions, we provide a command to manually force the upgrade of Answer. `answer upgrade -f v1.1.0` Wenn du diesen Befehl ausführst, wird ein Upgrade von der angegebenen Version erzwungen, auch wenn dein Answer bereits auf dem neuesten Stand ist. Wenn du auf eine Upgrade-Ausnahme stößt, kannst du versuchen, diesen Befehl auszuführen oder das neueste Docker-Image erneut zu ziehen und diesen Befehl innerhalb des Containers auszuführen.

:::
