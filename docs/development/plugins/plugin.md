---
# sidebar_label: Plugins
slug: /development/plugins
---

# Plugins Development Guide

Plugins are a way to extend the functionality of the Answer project. You can create your own plugins to meet your own needs.

:::tip

Viewing the [**official plugin code**](https://github.com/apache/answer-plugins) will make you to quickly understand and learn plugin development.

:::

:::info

**Recommended**: Use the official scaffolding tool [`create-answer-plugin`](https://www.npmjs.com/package/create-answer-plugin) to create and manage plugins. It automates most of the setup process, including file generation, Go module configuration, and plugin installation.

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

## Create a Plugin

:::info

The **name** field in package.json is the name of the package we add dependencies to; do not use `_` to connect this field naming, please use `-`; for example:

"editor-chart" ✅  
"editor_chart" ❌

:::

### Using the Scaffolding Tool (Recommended)

The easiest way to create a plugin is using the official scaffolding tool:

```shell
# Install the tool globally (optional)
npm install -g create-answer-plugin
# or
pnpm add -g create-answer-plugin

# Or use npx directly (recommended)
npx create-answer-plugin create <pluginName>
# or use the alias
npx answer-plugin create <pluginName>
# or use the simplified form
npx answer-plugin <pluginName>
```

**Note**: The package name is `create-answer-plugin`, but you can use either `create-answer-plugin` or `answer-plugin` as the command (both work!).

The tool will:
1. Guide you through an interactive wizard to select the plugin type
2. Generate all required files with the correct structure
3. Create the Go wrapper file (required for Backend plugins)
4. Set up proper `go.mod` with all dependencies
5. Generate i18n files with the correct structure

**Options:**
- `pluginName` (optional): Pre-fill the plugin name
- `--path, -p`: Path to Answer project (root directory). If not specified, defaults to current directory.

**Example:**
```shell
# Navigate to your Answer project root
cd /path/to/answer

# Create a plugin
npx create-answer-plugin create my-plugin
# or with path option
npx create-answer-plugin create my-plugin --path /path/to/answer
# Select: Standard UI Plugin → Route
# Enter route path: /hello
```

The plugin will be created in `ui/src/plugins/my-plugin/` (note: `plugins` is plural).

### Manual Creation

If you prefer to create plugins manually:

1. Go to the `ui > src > plugins` directory of the project (note: `plugins` is plural).

2. Create your plugin directory and files following the structure of existing plugins.



## Run the Plugin

### Install Plugin (Automated - Recommended)

The easiest way to install a plugin is using the scaffolding tool's `install` command:

```shell
# Navigate to your Answer project root
cd /path/to/answer

# Install a specific plugin (automatically handles registration)
npx create-answer-plugin install my-plugin
# or
npx answer-plugin install my-plugin
# or with path option
npx answer-plugin install my-plugin --path /path/to/answer

# Install all not installed plugins
npx create-answer-plugin install
```

**Options:**
- `plugins` (optional): Plugin names to install (defaults to all not installed plugins)
- `--path, -p`: Path to Answer project (defaults to current directory)

The `install` command automatically:
- ✅ Adds plugin import to `cmd/answer/main.go`
- ✅ Adds `replace` directive to `go.mod`
- ✅ Runs `go mod tidy`
- ✅ Merges i18n resources using `go run ./cmd/answer/main.go i18n`

### List Plugins

List all plugins in the Answer project:

```shell
# List all plugins
npx create-answer-plugin list
# or
npx answer-plugin list
# or with path option
npx answer-plugin list /path/to/answer
```

**Options:**
- `path` (optional): Path to Answer project (defaults to current directory)

### Uninstall Plugins

Uninstall plugins from the Answer project:

```shell
# Uninstall all installed plugins
npx create-answer-plugin uninstall
# or
npx answer-plugin uninstall

# Uninstall specific plugins
npx create-answer-plugin uninstall my-plugin another-plugin
# or with path option
npx answer-plugin uninstall my-plugin --path /path/to/answer
```

**Options:**
- `plugins` (optional): Plugin names to uninstall (defaults to all installed plugins)
- `--path, -p`: Path to Answer project (defaults to current directory)

The `uninstall` command automatically:
- ✅ Removes plugin import from `cmd/answer/main.go`
- ✅ Removes `replace` directive from `go.mod`
- ✅ Runs `go mod tidy`
- ✅ Updates i18n resources

### Run the Backend Plugin

#### Using the Scaffolding Tool (Recommended)

1. Install the plugin using the scaffolding tool (see above).

2. Build the frontend:
   ```shell
   cd ui
   pnpm pre-install
   pnpm build
   cd ..
   ```

3. Merge i18n resources (if not done automatically):
   ```shell
   go run ./cmd/answer/main.go i18n
   ```

4. Start the project:
   ```shell
   go run cmd/answer/main.go run -C ./answer-data
   ```

#### Manual Installation

If you prefer to install manually:

1. First, build the frontend:
   ```shell
   cd ui
   pnpm pre-install
   pnpm build
   cd ..
   ```

2. In the `cmd > answer > main.go` file, import your plugin:
   ```go
   import (
     answercmd "github.com/apache/answer/cmd"

     // Import the plugins
     _ "github.com/apache/answer/ui/src/plugins/my-plugin"
   )
   ```

3. Use `go mod edit` to add the plugin to the `go.mod` file:
   ```shell
   go mod edit -replace=github.com/apache/answer/ui/src/plugins/my-plugin=./ui/src/plugins/my-plugin
   ```

4. Update the dependencies:
   ```shell
   go mod tidy
   ```

5. Merge i18n resources:
   ```shell
   go run ./cmd/answer/main.go i18n
   ```

6. Start the project:
   ```shell
   go run cmd/answer/main.go run -C ./answer-data
   ```

### Run the Standard UI Plugin

#### Using the Scaffolding Tool (Recommended)

1. Install the plugin using the scaffolding tool:
   ```shell
   cd /path/to/answer
   npx create-answer-plugin install my-plugin
   ```

2. Go to the `ui` directory and install dependencies:
   ```shell
   cd ui
   pnpm pre-install
   ```

3. Build the frontend:
   ```shell
   pnpm build
   ```

4. For development, start the dev server:
   ```shell
   pnpm start
   ```

5. Merge i18n resources (if not done automatically):
   ```shell
   cd ..
   go run ./cmd/answer/main.go i18n
   ```

#### Manual Installation

1. Go to the `ui` directory.
2. Install the dependencies:
   ```shell
   pnpm pre-install
   ```

3. Build the frontend:
   ```shell
   pnpm build
   ```

4. For development, start the dev server:
   ```shell
   pnpm start
   ```

5. Refer to the [Run the Backend Plugin](/docs/development/plugins#run-the-backend-plugin) section and manually add the plugin to the project (import in `main.go`, add `replace` directive, etc.).

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
