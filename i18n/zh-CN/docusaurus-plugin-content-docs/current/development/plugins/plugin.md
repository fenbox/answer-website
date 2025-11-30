---
# sidebar_label: Plugins
slug: /development/plugins
---

# 插件开发指南

Plugins are a way to extend the functionality of the Answer project. You can create your own plugins to meet your own needs.

:::tip

查看 [**官方插件代码**](https://github.com/apache/answer-plugins) 将帮助你快速理解和学习插件开发。

:::

:::info

**推荐**：使用官方脚手架工具 [`create-answer-plugin`](https://www.npmjs.com/package/create-answer-plugin) 来创建和管理插件。它可以自动化大部分设置过程，包括文件生成、Go 模块配置和插件安装。

:::

## Introduction

### Plugin template types
Currently we have three types of plugins:

- Backend plugin
- Standard UI plugin
- Builtin plugin
  
### Plugin type

We classify plugins into different types. Different types of plugins have different functions. Plugins of the same type have the same effect, but are implemented differently.

Plugin Name | Template Type | Description
--- | --- | ---
Connector | Backend Plugin | The Connector plugin helps us to implement third-party login functionality
Storage | Backend Plugin | The Storage plugin helps us to upload files to third-party storage.
Cache | Backend Plugin | Support for using different caching middleware.
Search | Backend Plugin | Support for using search engines to speed up the search for question answers.
User Center | Backend Plugin | Using the third-party user system to manage users.
Notification | Backend Plugin | The Notification plugin helps us to send messages to third-party notification systems.
Route | Standard UI Plugin | Provides support for custom routing.
Editor | Standard UI Plugin | Supports extending the markdown editor's toolbar.
Captcha | Standard UI Plugin | Provides support for captcha.
Reviewer |  Backend Plugin  |Allows customizing the reviewer functionality.
Filter |  Backend Plugin | Filter out illegal questions or answers. (coming soon)
Render | Standard UI Plugin | Parsers for different content formats. (coming soon)

## 创建插件

:::info

package.json 中的 **name** 字段是我们添加依赖的包名；请不要使用 `_` 连接此字段命名，请使用 `-`；例如：

"editor-chart" ✅  
"editor_chart" ❌

:::

### 使用脚手架工具（推荐）

创建插件最简单的方法是使用官方脚手架工具：

```shell
# 全局安装工具（可选）
npm install -g create-answer-plugin
# 或
pnpm add -g create-answer-plugin

# 或直接使用 npx（推荐）
npx create-answer-plugin create <pluginName>
# 或使用别名
npx answer-plugin create <pluginName>
# 或使用简化形式
npx answer-plugin <pluginName>
```

**注意**：包名是 `create-answer-plugin`，但你可以使用 `create-answer-plugin` 或 `answer-plugin` 作为命令（两者都可以使用！）。

该工具将：
1. 通过交互式向导引导你选择插件类型
2. 生成所有必需的文件，并具有正确的结构
3. 创建 Go 包装文件（后端插件必需）
4. 设置包含所有依赖项的 `go.mod`
5. 生成具有正确结构的 i18n 文件

**选项：**
- `pluginName`（可选）：预填充插件名称
- `--path, -p`：Answer 项目路径（根目录）。如果未指定，默认为当前目录。

**示例：**
```shell
# 导航到你的 Answer 项目根目录
cd /path/to/answer

# 创建插件
npx create-answer-plugin create my-plugin
# 或使用路径选项
npx create-answer-plugin create my-plugin --path /path/to/answer
# 选择：Standard UI Plugin → Route
# 输入路由路径：/hello
```

插件将创建在 `ui/src/plugins/my-plugin/`（注意：`plugins` 是复数形式）。

### 手动创建

如果你更喜欢手动创建插件：

1. 进入项目的 `ui > src > plugins` 目录（注意：`plugins` 是复数形式）。

2. 创建你的插件目录和文件，遵循现有插件的结构。



## 运行插件

### 安装插件（自动化 - 推荐）

安装插件最简单的方法是使用脚手架工具的 `install` 命令：

```shell
# 导航到你的 Answer 项目根目录
cd /path/to/answer

# 安装特定插件（自动处理注册）
npx create-answer-plugin install my-plugin
# 或
npx answer-plugin install my-plugin
# 或使用路径选项
npx answer-plugin install my-plugin --path /path/to/answer

# 安装所有未安装的插件
npx create-answer-plugin install
```

**选项：**
- `plugins`（可选）：要安装的插件名称（默认为所有未安装的插件）
- `--path, -p`：Answer 项目路径（默认为当前目录）

`install` 命令会自动：
- ✅ 在 `cmd/answer/main.go` 中添加插件导入
- ✅ 在 `go.mod` 中添加 `replace` 指令
- ✅ 运行 `go mod tidy`
- ✅ 使用 `go run ./cmd/answer/main.go i18n` 合并 i18n 资源

### 列出插件

列出 Answer 项目中的所有插件：

```shell
# 列出所有插件
npx create-answer-plugin list
# 或
npx answer-plugin list
# 或使用路径选项
npx answer-plugin list /path/to/answer
```

**选项：**
- `path`（可选）：Answer 项目路径（默认为当前目录）

### 卸载插件

从 Answer 项目中卸载插件：

```shell
# 卸载所有已安装的插件
npx create-answer-plugin uninstall
# 或
npx answer-plugin uninstall

# 卸载特定插件
npx create-answer-plugin uninstall my-plugin another-plugin
# 或使用路径选项
npx answer-plugin uninstall my-plugin --path /path/to/answer
```

**选项：**
- `plugins`（可选）：要卸载的插件名称（默认为所有已安装的插件）
- `--path, -p`：Answer 项目路径（默认为当前目录）

`uninstall` 命令会自动：
- ✅ 从 `cmd/answer/main.go` 中移除插件导入
- ✅ 从 `go.mod` 中移除 `replace` 指令
- ✅ 运行 `go mod tidy`
- ✅ 更新 i18n 资源

### 运行后端插件

#### 使用脚手架工具（推荐）

1. 使用脚手架工具安装插件（见上文）。

2. 构建前端：
   ```shell
   cd ui
   pnpm pre-install
   pnpm build
   cd ..
   ```

3. 合并 i18n 资源（如果未自动完成）：
   ```shell
   go run ./cmd/answer/main.go i18n
   ```

4. 启动项目：
   ```shell
   go run cmd/answer/main.go run -C ./answer-data
   ```

#### 手动安装

如果你更喜欢手动安装：

1. 首先，构建前端：
   ```shell
   cd ui
   pnpm pre-install
   pnpm build
   cd ..
   ```

2. 在 `cmd > answer > main.go` 文件中，导入你的插件：
   ```go
   import (
     answercmd "github.com/apache/answer/cmd"

     // Import the plugins
     _ "github.com/apache/answer/ui/src/plugins/my-plugin"
   )
   ```

3. 使用 `go mod edit` 将插件添加到 `go.mod` 文件：
   ```shell
   go mod edit -replace=github.com/apache/answer/ui/src/plugins/my-plugin=./ui/src/plugins/my-plugin
   ```

4. 更新依赖：
   ```shell
   go mod tidy
   ```

5. 合并 i18n 资源：
   ```shell
   go run ./cmd/answer/main.go i18n
   ```

6. 启动项目：
   ```shell
   go run cmd/answer/main.go run -C ./answer-data
   ```

### 运行标准 UI 插件

#### 使用脚手架工具（推荐）

1. 使用脚手架工具安装插件：
   ```shell
   cd /path/to/answer
   npx create-answer-plugin install my-plugin
   ```

2. 进入 `ui` 目录并安装依赖：
   ```shell
   cd ui
   pnpm pre-install
   ```

3. 构建前端：
   ```shell
   pnpm build
   ```

4. 开发时，启动开发服务器：
   ```shell
   pnpm start
   ```

5. 合并 i18n 资源（如果未自动完成）：
   ```shell
   cd ..
   go run ./cmd/answer/main.go i18n
   ```

#### 手动安装

1. 进入 `ui` 目录。
2. 安装依赖：
   ```shell
   pnpm pre-install
   ```

3. 构建前端：
   ```shell
   pnpm build
   ```

4. 开发时，启动开发服务器：
   ```shell
   pnpm start
   ```

5. 参考 [运行后端插件](/docs/development/plugins#运行后端插件) 部分，手动将插件添加到项目中（在 `main.go` 中导入，添加 `replace` 指令等）。

## Backend Plugin Development

### Implement the Base interface

The `Base` interface contains basic information about the plugin and is used to display.

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

The `SlugName` of the plugin must be unique. Two plugins with the same `SlugName` will panic when registering.

:::

### Implement the function interface

:::note

Different plugin types require different interfaces of implementation.

For example, following is the `Connector` plugin interface.

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

`Translator` is a struct for translation. Please refer to [the documentation](/docs/development/plugins/plugin-translation) for details.

:::

### Implement the configuration interface

For details on the description of each configuration item, please refer to [the documentation](/docs/development/plugins/plugin-config).

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

### Register initialization function

```go
import "github.com/apache/answer/plugin"

func init() {
    plugin.Register(&GitHubConnector{
        Config: &GitHubConnectorConfig{},
    })
}
```

## Standard UI plugin Development

The default configuration is as follows:

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

Among them, `type`、`slug_name` and `component` are required fields. `i18nConfig` and `hooks` are optional fields.

Currently the front end supports the following types of plugins:
* editor
* route
* captcha

### Editor plugin

Refer to [editor-chart](https://github.com/apache/answer-plugins/tree/main/editor-chart) for details.

### Route plugin

The plugin configuration of the routing type adds the `route` field to the configuration file.

```yaml
slug_name: <slug_name>
route: /<route>
type: route
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
    route: info.route,
  },
  i18nConfig,
  component: Component,
};
```

### Captcha plugin

Refer to [captcha-basic](https://github.com/apache/answer-plugins/tree/main/captcha-basic) for details.

## Builtin plugin Development

It is not so different from React component, this plugin is more suitable for the following scenarios:

1. There are complex business logics that cannot be separated from the code (such as Oauth).
2. Some back-end plugins require UI support for business purposes (such as Search).
3. This plugin has extremely low requirements for developers and requires no additional configuration work.

### How to develop builtin plugin

1. **Get familiar with the directory structure**. Go to the `ui/src/plugins/builtin` directory and create a directory, such as Demo. Then refer to the existing plugins to create the necessary files to start development.

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

2. Export the plugins you have just defined in the plugins list file `plugins/builtin/index.ts`

  ```ts
  import Demo from './Demo'

  export default {
    ...(exists plugins),
    Demo,
  };
  ```

3. Now you can use the PluginRender component to render the just-defined plugin where you want it!

  ```ts
    <PluginRender
      type="connector"
      slug_name="third_party_connector"
    />
  ```

4. **Publish plugin**: initiate the PR process normally and describe the plugin function and scope of influence in detail.
