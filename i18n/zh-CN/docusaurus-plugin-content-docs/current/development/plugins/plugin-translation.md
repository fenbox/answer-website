---
slug: /development/plugins/plugin-translation
---

# 翻译插件

由于 answer 支持多种语言，该插件也需要支持多种语言。
以下是如何使你的插件支持多语言的示例。

## 翻译结构

在某些插件界面中，您可以看到 `Translator` 结构，该结构用于支持多种语言。

例如，`ConfigField` 结构有一个 `Title` 字段类型为 `Translator` 。

```go
type ConfigField struct {
    Name        string               `json:"name"`
    Type        ConfigType           `json:"type"`
    Title       Translator           `json:"title"`
    Description Translator           `json:"description"`
    Required    bool                 `json:"required"`
    Value       string               `json:"value"`
    UIOptions   ConfigFieldUIOptions `json:"ui_options"`
    Options     []ConfigFieldOption  `json:"options,omitempty"`
}
```

构建 Translator 结构很容易，就像这样：

```go
import (
    "github.com/apache/answer/plugin"
)

plugin.MakeTranslator("plugin.github_connector.backend.name")
```

'plugin.github_connector.backend.name'  是翻译文件的 key，稍后将会介绍。

所以，第一步是为每个需要翻译的字段构建一个 `Translator` 结构。

## 翻译文件

在您的插件根目录下创建名为 `i18n` 的目录，然后在其中创建一个名为 `en_US.yaml` 的文件。

`en_US.yaml` 文件用于存储插件的英文翻译。

`en_US.yaml` 文件的内容如下：

```yaml
plugin:
  github_connector:
    backend:
      name:
        other: GitHub
      info:
        name:
          other: GitHub Connector
        description:
          other: Connect to GitHub for third-party login
      config:
        client_id:
          title:
            other: ClientID
          description:
            other: Client ID of your GitHub application
        client_secret:
          title:
            other: ClientSecret
          description:
            other: Client secret of your GitHub application
    ui:
      login:
        title: Login with GitHub
        description: Login with GitHub
```

- `plugin` 是翻译文件的根节点。
- `github_connector` 是插件的名称。
- `backend` 是后端的翻译。 像 `other` 这样的密钥的末尾只是为了 [go-i18n](https://github.com/nicksnyder/go-i18n) 来识别翻译文件。
- `ui` 是前端的翻译。

你可以使用类似于 `plugin.github_connector.backend.name` 或 `plugin.github_connector.ui.login.title` 的键进行翻译。

在插件的根目录中创建一个 `i18n.go` 文件，然后添加以下代码：

```go
package i18n

const (
    ConnectorName                 = "plugin.github_connector.backend.name"
    InfoName                      = "plugin.github_connector.backend.info.name"
    InfoDescription               = "plugin.github_connector.backend.info.description"
    ConfigClientIDTitle           = "plugin.github_connector.backend.config.client_id.title"
    ConfigClientIDDescription     = "plugin.github_connector.backend.config.client_id.description"
    ConfigClientSecretTitle       = "plugin.github_connector.backend.config.client_secret.title"
    ConfigClientSecretDescription = "plugin.github_connector.backend.config.client_secret.description"
)
```

`i18n.go` 文件用于存储翻译文件的键值。

Finally, the directory structure of the plugin is as follows:

```bash
.
├── README.md
├── github.go
├── go.mod
├── go.sum
└── i18n
    ├── en_US.yaml
    ├── translation.go
    └── zh_CN.yaml
```

最后，执行以下 bash shell 命令将插件 i18n 文件合并到 answer i18n 运行时数据中。

您可以用自己的数据替换环境变量或根据需要定义变量。

```bash
go run ./cmd/answer/main.go i18n -s $PLUGIN_PATH -t $ANSWER_DATA_PATH
```

示例：

```bash
go run ./cmd/answer/main.go i18n -s ../answer-plugins/ -t ./answer-data/i18n/
```

## 后端翻译

您只需要返回带有 key 的翻译文件的 `Translator` 结构即可。

```go
func (g *GitHubConnector) ConnectorName() plugin.Translator {
    return plugin.MakeTranslator(i18n.ConnectorName)
}
```

`Answer` 将自动将翻译文件中的键转换为相应的语言。
