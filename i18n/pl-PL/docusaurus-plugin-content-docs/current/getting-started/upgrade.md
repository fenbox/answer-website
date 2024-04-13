---
slug: /upgrade
---

# Aktualizacja

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Zalecamy wykonanie kopii zapasowej bazy danych i plików konfiguracyjnych przed aktualizacją. Ogólnie rzecz biorąc, gwarantujemy, że aktualizacja nie wpłynie na istniejące dane.

Tworzenie kopii zapasowej danych oznacza, że masz możliwość wycofania zmian, nawet jeśli aktualizacja się nie powiedzie, lub nie chcesz wersji zaawansowanej.

:::

<Tabs>
  <TabItem value="docker-compose" label="Docker Compose" default>

Jeśli używasz docker-compose do instalacji Answer to aktualizacja jest bardzo prosta.

```bash
docker-compose pull
docker-compose down
docker-compose up -d
```

  </TabItem>
  <TabItem value="docker" label="Docker">

Jeśli używasz dockera do instalacji Answer to kroki aktualizacji są następujące.

```bash
docker pull apache/answer:latest
docker stop answer
docker rm answer
docker run -d -p 9080:80 -v answer-data:/data --name answer apache/answer:latest
```

  </TabItem>
  <TabItem value="binary" label="Binary">

Jeśli używasz do instalacji Answer pliku binarnego, etapy aktualizacji są następujące.

1. Pobierz [najnowszą wersję binarną](https://github.com/apache/inubator-answer/releases) dla Twojego systemu.
2. Zatrzymaj starszą wersję
3. Wykonaj polecenie aktualizacji `./answer upgrade -C ./answer-data/`
4. Uruchom najnowszą wersję `./answer run -C ./answer-data/`


  </TabItem>
</Tabs>

:::tip

W przypadku nieoczekiwanych wyników takich jak problemy przy aktualizacji dostarczamy polecenia do ręcznego wymuszenia aktualizacji Answer. `answer upgrade -f v1.1.0` Wykonanie polecenia powoduje zaktualizowanie do wskazanej wersji nawet wtedy, gdy już posiadamy najnowszą. Jeśli napotkasz wyjątek dotyczący aktualizacji, możesz spróbować wykonać tą komendę lub ponownie pobrać najnowszy obraz dockera i wykonać to polecenie wewnątrz kontenera.

:::
