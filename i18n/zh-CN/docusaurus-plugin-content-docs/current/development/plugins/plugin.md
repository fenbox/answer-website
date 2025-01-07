---
slug: /development/plugins
---

# 插件开发指南

插件是扩展 Answer 项目功能的一种方式。 您可以创建插件来满足自己的需求。

:::tip

Viewing the [**official plugin code**](https://github.com/apache/answer-plugins) will make you to quickly understand and learn plugin development.

:::

## 介绍

### 插件模板类型

目前我们有三种类型的插件：

- 后端插件
- 标准 UI 插件
- 内置插件

### 插件类型

我们将插件分为不同的类型。 不同类型的插件具有不同的功能。 同一类型的插件具有相同的效果，但实现方式不同。

| 插件名称 | 模板类型     | 描述                    |
| ---- | -------- | --------------------- |
| 连接器  | 后端插件     | 连接器插件帮助我们实现第三方登录功能    |
| 存储   | 后端插件     | 存储插件帮助我们上传文件到第三方存储。   |
| 缓存   | 后端插件     | 支持使用不同的缓存中间件。         |
| 搜索   | 后端插件     | 支持使用搜索引擎来加快问题答案的搜索。   |
| 用户中心 | 后端插件     | 使用第三方用户系统来管理用户。       |
| 通知   | 后端插件     | 通知插件帮助我们向第三方通知系统发送消息。 |
| 路由   | 标准 UI 插件 | 提供对自定义路由的支持。          |
| 编辑器  | 标准 UI 插件 | 支持扩展 Markdown 编辑器工具栏。 |
| 验证码  | 标准 UI 插件 | 提供验证码支持。              |
| 审核者  | 后端插件     | 允许定制审核员功能。            |
| 过滤器  | 后端插件     | 过滤非法问题或答案。 （即将推出）     |
| 渲染   | 标准 UI 插件 | 不同内容格式的解析器。 （即将推出）    |

## 创建插件

:::info

Package.json 中的 **name** 字段是我们添加依赖关系到的包名称，不使用 "_" 连接此字段命名，请使用 "-"；例如:

"editor-chart" ✅\
"editor_chart" ❌

:::

1. 转到项目的 `ui > src > plugin` 目录。

2. 在该目录中执行以下命令：

```shell
npx create-answer-plugin <pluginName>
```

3. 选择您想要创建的插件类型。

## 运行插件

### 运行后端插件

1. 首先，执行 `make ui` 来编译前端代码。

2. 在 `cmd > answer > main.go` 文件中, 引入你的插件

   ```go
   import (
     answercmd "github.com/apache/answer/cmd"

     // Import the plugins
     _ "github.com/apache/answer/ui/src/plugins/my-plugin"
   )
   ```

3. 使用 `go mod edit` 将插件添加到 "go.mod" 文件。

   ```shell
   go mod edit -replace=github.com/apache/answer/ui/src/plugins/my-plugin=../ui/src/plugins/my-plugin
   ```

4. 更新依赖项

   ```shell
   go mod tidy
   ```

5. 启动项目。

   ```shell
   go run cmd/answer/main.go run -C ./answer-data
   ```

### 安装标准 UI 插件（Standard UI Plugin）

1. 切换到 `ui` 目录。

2. 更新依赖项

   ```shell
   pnpm pre-install
   ```

3. 启动项目。

   ```shell
   pnpm start
   ```

4. 请参阅 [运行后端插件](/docs/development/plugins#debugging-plugins)，并将插件添加到项目。

## 后端插件开发

### 实现 Base 接口

`Base` 接口包含关于插件的基本信息并用于显示。

```go
// Info presents the plugin information
type Info struct {
    Name        Translator
    SlugName    string
    Description Translator
    Author      string
    Version     string
    Link        string
}

// Base is the base plugin
type Base interface {
    // Info returns the plugin information
    Info() Info
}
```

:::caution

插件的 `SlugName` 必须唯一。 两个具有相同 `SlugName` 的插件在注册时会触发 panic。

:::

### 实现函数接口

:::note

不同的插件类型需要实现不同的接口。

比如，以下是`Connector`插件接口。

:::

```go
type Connector interface {
    Base
    
    // ConnectorLogoSVG presents the logo in svg format
    ConnectorLogoSVG() string
    
    // ConnectorName presents the name of the connector
    // e.g. Facebook, Twitter, Instagram
    ConnectorName() Translator
    
    // ConnectorSlugName presents the slug name of the connector
    // Please use lowercase and hyphen as the separator
    // e.g. facebook, twitter, instagram
    ConnectorSlugName() string
    
    // ConnectorSender presents the sender of the connector
    // It handles the start endpoint of the connector
    // receiverURL is the whole URL of the receiver
    ConnectorSender(ctx *GinContext, receiverURL string) (redirectURL string)
    
    // ConnectorReceiver presents the receiver of the connector
    // It handles the callback endpoint of the connector, and returns the
    ConnectorReceiver(ctx *GinContext, receiverURL string) (userInfo ExternalLoginUserInfo, err error)
}
```

:::tip

`Translator` 是一个用于翻译的结构体。 请参阅 [文档](/docs/development/plugins/plugin-translation) 以获取详细信息。

:::

### 实施配置接口

关于每个配置项的详细描述，请参阅 [文档](/docs/development/plugin-config)。

```go
type Config interface {
    Base

    // ConfigFields returns the list of config fields
    ConfigFields() []ConfigField

    // ConfigReceiver receives the config data, it calls when the config is saved or initialized.
    // We recommend to unmarshal the data to a struct, and then use the struct to do something.
    // The config is encoded in JSON format.
    // It depends on the definition of ConfigFields.
    ConfigReceiver(config []byte) error
}
```

### 注册初始化函数

```go
import "github.com/apache/answer/plugin"

func init() {
    plugin.Register(&GitHubConnector{
        Config: &GitHubConnectorConfig{},
    })
}
```

## 标准 UI 插件开发

默认配置如下：

```yaml
slug_name: <slug_name> 
type: <type>
version: 0.0.1
author: 

```

```tsx
import i18nConfig from './i18n';
import Component from './Component';
import info from './info.yaml';

export default {
  info: {
    slug_name: info.slug_name,
    type: info.type, 
  },
  i18nConfig,
  component: Component, 
};
```

`i18nConfig` 和 `hooks` 是选填字段。 `i18nConfig` 和 `hooks` 是选填字段。

当前前端支持以下类型的插件：

- 编辑器
- 路由
- 验证码

### 编辑器插件

Refer to [editor-chart](https://github.com/apache/answer-plugins/tree/main/editor-chart) for details.

### 路由插件

插件配置的路由类型向配置文件中添加了 `route` 字段。

```yaml
slug_name: <slug_name>
route: /<route>
type: route
version: 0.0.1
author: 

```

```tsx
slug_name: <0>
route: /<1>
type: route
version: 0.0.1
author: 

```

### 验证码插件（Captcha plugin）

Refer to [captcha-basic](https://github.com/apache/answer-plugins/tree/main/captcha-basic) for details.

## 内置插件开发

这与 React 组件并没有那么不同，这个插件更适合以下场景：

1. 代码中不能分离出复杂的业务逻辑（例如 Oauth）。
2. 一些后端插件需要 UI 支持以满足业务需求(例如搜索)。
3. 这个插件对开发人员的要求非常低，不需要额外的配置工作。

### 如何开发内置插件

1. **熟悉目录结构** 进入 `ui/src/plugins` 目录并创建一个 React 组件，例如 Demo。 然后参考现有的插件来创建启动开发的必要文件。

```txt
// ui/src/plugins/builtin
.
├── ...
├── Demo
      ├── i18n (language file)
            ├── en_US.yaml (default language required)
            ├── index.ts (required)
            ├── zh_CN.ts (any language you want to provide)
      ├── index.tsx (component required)
      ├── info.yaml (plugin information required)
      ├── services.ts (api)
```

2. 导出您刚刚在插件列表文件 `plugins/builtin/index.ts` 中定义的插件

```ts
import Demo from './Demo'

export default {
  ...(exists plugins),
  Demo,
};
```

3. 现在您可以使用 PluginRender 组件将刚刚定义的插件渲染到您想要的位置！

```ts
  <PluginRender
    type="connector"
    slug_name="third_party_connector"
  />
```

4. **发布插件**：正常启动PR流程，并详细描述插件功能和影响范围。
