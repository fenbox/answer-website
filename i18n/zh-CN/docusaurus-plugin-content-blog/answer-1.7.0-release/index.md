---
date: 2025-10-31
title: "Apache Answer 1.7.0: Quicklinks 插件与布局改进"
authors: [Robin]
category: Release
featured: true
image: 2025-11-05-cover@4x.png
description: "Answer 1.7.0 引入了 Quicklinks 插件、布局改进、schemaForm 增强、响应式优化以及重要的错误修复。"
---

我们很高兴宣布 **Apache Answer v1.7.0** 正式发布！本版本为插件生态系统、用户界面和整体用户体验带来了显著改进。感谢所有使本次发布成为可能的贡献者。

:::caution

**重要提示**：我们在本版本中进行了大量布局更改。如果您修改了页面布局，可能会产生冲突。请在升级前记得备份您的旧数据。

:::

## 新功能

### Quicklinks 插件

Quicklinks 插件现已可用并默认集成，为管理员提供了强大的导航管理能力。该插件允许您创建自定义快速链接，帮助用户更高效地浏览您的社区。

- **新功能**：Quicklinks 插件 ([apache/answer-plugins#269](https://github.com/apache/answer-plugins/issues/269)) 由 [@shuashuai](https://github.com/shuashuai) 贡献
- **新功能**：默认集成 Quicklinks 插件 ([#1405](https://github.com/apache/answer/issues/1405)) 由 [@LinkinStars](https://github.com/LinkinStars) 贡献

## 改进

### 表单与 Schema 增强

- **schemaForm 支持 tagSelector 组件** ([#1380](https://github.com/apache/answer/pull/1380)) 由 [@shuashuai](https://github.com/shuashuai) 贡献  
  插件开发者现在可以在 schemaForm 中使用 tagSelector 组件，使创建具有标签选择功能的表单变得更加容易。

### 布局与 UI 改进

- **问题详情页不再显示置顶状态** ([#1393](https://github.com/apache/answer/pull/1393)) 由 [@shuashuai](https://github.com/shuashuai) 贡献  
  更简洁的问题详情页，移除了冗余的置顶状态指示器。

- **统一问题 URL 路径** ([#1392](https://github.com/apache/answer/pull/1392)) 由 [@shuashuai](https://github.com/shuashuai) 贡献  
  统一的问题 URL 结构改善了 SEO 和用户体验。

- **相关推荐在无内容时显示空白区域** ([#1394](https://github.com/apache/answer/pull/1394)) 由 [@Dinesht04](https://github.com/Dinesht04) 贡献  
  当没有相关内容时，提供更好的视觉反馈。

- **优化响应式布局** ([#1406](https://github.com/apache/answer/pull/1406)) 由 [@shuashuai](https://github.com/shuashuai) 贡献  
  通过改进的响应式设计，增强了移动设备和平板电脑的体验。

### 用户体验增强

- **创建新问题时标签可选** ([#1177](https://github.com/apache/answer/pull/1177)) 由 [@Dinesht04](https://github.com/Dinesht04) 贡献  
  用户现在可以创建不带标签的问题，为问题创建提供更大的灵活性。

- **问题"正文"部分可选** ([#842](https://github.com/apache/answer/pull/842)) 由 [@Dinesht04](https://github.com/Dinesht04) 贡献  
  问题可以仅使用标题创建，允许更简单的问题格式。

### 命令行工具增强

- **命令行工具添加 resetPassword 选项** ([#1400](https://github.com/apache/answer/pull/1400), [#1308](https://github.com/apache/answer/pull/1308)) 由 [@sosyz](https://github.com/sosyz) 贡献  
  管理员现在可以直接从命令行重置用户密码，提高了账户管理能力。

## 错误修复

### 图片与媒体修复

- **修复：答案中的图片未正确调整大小** ([#1404](https://github.com/apache/answer/pull/1404)) 由 [@shuashuai](https://github.com/shuashuai) 贡献  
  答案中的图片现在可以根据容器尺寸正确调整大小。

### 通知系统修复

- **修复：新问题通知消息未获取 trigger_user** ([#1384](https://github.com/apache/answer/pull/1384), [#1385](https://github.com/apache/answer/pull/1385)) 由 [@light-white](https://github.com/light-white) 贡献  
  通知消息现在正确包含触发用户信息。

- **修复：新问题通知消息未获取新标签** ([#1382](https://github.com/apache/answer/pull/1382), [#1383](https://github.com/apache/answer/pull/1383)) 由 [@light-white](https://github.com/light-white) 贡献  
  当问题添加标签时，通知现在正确包含新标签信息。

### 用户与认证修复

- **修复：同步用户名字符** ([#1397](https://github.com/apache/answer/pull/1397)) 由 [@sy-records](https://github.com/sy-records) 贡献  
  已解决用户名字符同步问题。

### 主题与样式修复

- **修复：深色模式中代码块背景颜色错误** ([#1368](https://github.com/apache/answer/pull/1368)) 由 [@Dinesht04](https://github.com/Dinesht04) 贡献  
  代码块现在在深色模式下正确显示，具有正确的背景颜色。

### 插件系统修复

- **修复：插件安装时构建失败，无法复制 ui 文件** ([#1376](https://github.com/apache/answer/pull/1376)) 由 [@hgaol](https://github.com/hgaol) 贡献  
  插件安装现在在构建过程中正确复制 UI 文件。

## 新贡献者

我们很高兴欢迎新贡献者加入 Apache Answer 社区：

- [@light-white](https://github.com/light-white) 在 [#1382](https://github.com/apache/answer/pull/1382) 中做出了首次贡献

感谢您加入我们的社区并为 Apache Answer 做出贡献！

## 贡献者致谢

感谢所有为 v1.7.0 做出贡献的开发者和社区成员！你们的代码贡献、问题报告、文档改进和测试工作使本次发布成为可能。

特别感谢我们的贡献者（按字母顺序）：

- [@Dinesht04](https://github.com/Dinesht04)
- [@hgaol](https://github.com/hgaol)
- [@light-white](https://github.com/light-white)
- [@LinkinStars](https://github.com/LinkinStars)
- [@shuashuai](https://github.com/shuashuai)
- [@sosyz](https://github.com/sosyz)
- [@sy-records](https://github.com/sy-records)

以及所有参与讨论、测试和反馈的社区成员。

完整的变更日志，请访问 [GitHub 对比页面](https://github.com/apache/answer/compare/v1.6.0...v1.7.0)。

## 加入我们

Apache Answer 是一个开源项目，我们欢迎各种形式的贡献：

- **代码贡献**：在 [GitHub](https://github.com/apache/answer) 上提交 PR
- **问题报告**：报告错误或提出功能建议
- **文档改进**：帮助改进文档和翻译
- **社区支持**：在论坛和讨论中帮助其他用户

### 联系方式

- **邮件列表**：[dev@answer.apache.org](mailto:dev@answer.apache.org)
- **GitHub**：[apache/answer](https://github.com/apache/answer)
- **官方网站**：[answer.apache.org](https://answer.apache.org)
- **文档**：[answer.apache.org/docs](https://answer.apache.org/docs/)

让我们一起构建更好的 Q&A 平台！
