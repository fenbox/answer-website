---
slug: /how-to-release
---

# 如何发布

所有 Apache 项目都必须遵循 [Apache Release Policy](https://www.apache.org/legal/release-policy.html) 。本文可以帮助你了解政策以及如何在 Apache 上发布项目。

## 发布流程

1. 如果没有 GPG 密钥,请创建一个。
2. 在 git 仓库中创建 RC 标签并编写发布说明。
3. 将发布物料上传到 dev Apache SVN。
4. 验证发布物料。
5. 开始投票。
6. 将候选版本迁移到 release Apache SVN。
7. 创建发布。
8. 更新下载页面。
9. 宣布投票结果和发布。

## 创建 GPG 密钥

如果没有 GPG 密钥,请创建一个。您可以按照[这里](https://www.apache.org/dev/openpgp.html)的说明进行操作。

```shell
# 创建 GPG 密钥
$ gpg --full-generate-key

# 列出 GPG 密钥
$ gpg  --keyid-format SHORT --list-keys

# 将 GPG 密钥上传到密钥服务器,xxx 是 GPG 密钥 id
$ gpg --keyserver keyserver.ubuntu.com --send-key xxx

# 将 GPG 密钥附加到 svn 仓库中的 KEYS 文件
$ svn co https://dist.apache.org/repos/dist/release/answer/
$ (gpg --list-sigs xxx@apache.org && gpg --export --armor xxx@apache.org) >> KEYS
$ svn ci -m "add gpg key" 
```

## 将发布物料上传到 dev Apache SVN

### 创建 RC 标签

当你想要发布新版本时，首先需要在 git 仓库中创建一个新的 RC 标签。标签名称应为 `v{release-version}-RC{rc-version}`。这样可以避免删除标签。

* release-version: 你想要发布的版本，例如 1.2.0。
* rc-version: 发布候选版本，例如 RC1。

```shell
$ git tag -a v{release-version}-RC{rc-version} -m "Release Apache Answer {release-version}"
$ git push origin v{release-version}-RC{rc-version}
```

推送 RC 标签后，CI 将根据标签自动生成发布页面。在发布页面中编写发布说明。记住在点击"发布版本"之前选择"设置为预发布"。

![release page](/img/community/img-1.jpg)


发布说明应选择非分支的标签，例如 `v1.2.0-RC1`。

![release notes](/img/community/img-2.png)

### 签名发布物料

使用 GPG 密钥对发布物料进行签名。**请仔细检查二进制文件是否完整,避免出现大小为 0 的情况。**

```shell
# 签名发布物料,xxxx 是 xxx@apache.org
$ for i in *.tar.gz; do echo $i; gpg --local-user xxxx --armor --output $i.asc --detach-sig $i ; done
```

### 为发布物料创建校验和

```shell
# 创建校验和
$ for i in *.tar.gz; do echo $i; sha512sum  $i > $i.sha512 ; done
```

### 上传到 svn 仓库
> **注意** 创建 GPG 密钥的仓库地址和上传发布物料的仓库地址不同。GPG 密钥上传到 `https://dist.apache.org/repos/dist/release/answer/` 仓库,而发布物料上传到 `https://dist.apache.org/repos/dist/dev/answer/` 仓库。

1. 在 svn 仓库中为发布物料创建一个目录。
   ```shell
   $ svn co https://dist.apache.org/repos/dist/dev/answer/
   ```
2. 将发布物料上传到 svn 仓库。
   ```shell
   $ cp /path/to/release/artifacts/* ./{release-version}/
   $ svn add ./{release-version}/*
   ```
3. release-version 格式: 1.3.1
   ```shell
   $ svn commit -m "add Apache Answer release artifacts for {release-version}"
   ```
发布物料应上传到 `https://dist.apache.org/repos/dist/dev/answer/{release-version}` 目录。

**重要** 完成后,请访问链接 `https://dist.apache.org/repos/dist/dev/answer/{release-version}` 检查文件上传是否正确。

![correct result](/img/community/release.jpeg)

## 验证发布物料

以下是发布物料的基本检查项。

- [ ] 下载链接是有效的。
- [ ] 校验和与 PGP 签名是有效的。
- [ ] 源代码发行版具有与当前版本匹配的正确名称。
- [ ] 许可证和通知文件对每个 Apache Answer repo 都是正确的。
- [ ] 如有必要，所有文件都有许可证标头。
- [ ] 源档案中没有捆绑未经许可的编译档案。

### 如何验证签名
```shell
# 下载 KEYS
$ curl https://downloads.apache.org/answer/KEYS > KEYS

# 导入 KEYS 并信任密钥,请将电子邮件地址替换为您想要信任的地址。
$ gpg --import KEYS
$ gpg --edit-key linkinstar@apache.org
gpg> trust
gpg> 5
gpg> y
gpg> quit

# 进入发布物料所在的目录
$ cd /path/to/release/artifacts

# 验证签名
$ for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i ; done

# 如果在输出中看到"Good signature",则表示签名有效。
```

### 如何验证校验和
```shell
# 验证校验和
$ for i in *.tar.gz; do echo $i; sha512sum --check  $i.sha512; done
```

## 开始投票

> Apache Answer 已经孵化毕业，只需要进行社区投票

1. Apache Answer 社区投票，发送投票邮件至 `dev@answer.apache.org`。PMC 需要在投票前根据文档检查版本的正确性。
2. 经过至少 72 小时并统计到 3 个 +1 PMC member 票后，即可进入下一阶段。
3. 宣布投票结果，发送投票结果邮件至 `dev@answer.apache.org`。请参考下面的投票结果邮件模板。

### 开发邮件列表投票模板

```
[VOTE] Release Apache Answer {release-version}

Hello Apache Answer Community,

    This is a call for vote to release Apache Answer version {release-version}.

    The release candidates:
    https://dist.apache.org/repos/dist/dev/answer/{release-version}

    Release notes:
    https://github.com/apache/answer/releases/tag/v{release-version}

    Git tag for the release:
    https://github.com/apache/answer/releases/tag/v{release-version}

    Git commit id for the release:
    https://github.com/apache/answer/commit/{commit-hash}

    Keys to verify the Release Candidate:
    https://downloads.apache.org/answer/KEYS

    Keys to verify the Release Candidate:
    The artifacts signed with PGP key [{key-id}], corresponding to [{email}], that can be found in keys file:
    https://dist.apache.org/repos/dist/release/answer/KEYS

    The vote will be open for at least 72 hours or until the necessary number of votes are reached.

    Please vote accordingly:

    [ ] +1 approve
    [ ] +0 no opinion
    [ ] -1 disapprove with the reason

    Checklist for reference:

    [ ] Download links are valid.
    [ ] Checksums and PGP signatures are valid.
    [ ] Source code distributions have correct names matching the current release.
    [ ] LICENSE and NOTICE files are correct for each Answer repo.
    [ ] All files have license headers if necessary.
    [ ] No unlicensed compiled archives bundled in source archive.

    To compile from the source, please refer to:

    https://github.com/apache/answer#building-from-source

Thanks,
<YOUR NAME>
```

### 投票结果邮件模板

投票结束后（经过至少 72 小时并获得至少 3 个 +1 PMC member 票），发送以下邮件至 `dev@answer.apache.org` 以宣布投票结果：

```
[RESULT][VOTE] Release Apache Answer {release-version}-RC{rc-version}

Hello everyone,

The vote closes now with the following results:

{total-votes} (+1 binding) votes
- {voter-1-name}
- {voter-2-name}
- {voter-3-name}
{... additional voters if any ...}

The vote has passed successfully. We will proceed with migrating the release artifacts and creating the final release.

Thanks to everyone who participated in the vote.

Best regards,
<YOUR NAME>
```

> **重要提示**：将 `{release-version}` 替换为实际发布版本（例如 `1.7.0`），将 `{rc-version}` 替换为 RC 版本（例如 `RC1`）。列出所有投出 +1 binding 票的投票者。总票数应与收到的 +1 binding 票数一致。

## 投票超时情况

如果投票超过 72 小时仍未达到所需票数，你可以向 dev@answer.apache.org 发送以下提醒邮件：

```
Dear PMC Members,

Apache Answer version {release-version} has been pending for voting for more
than 72 hours. If any PMC member is available, please help us get the
ballot completed. Currently, we are still missing +1 binding vote to
finalize the process.

https://lists.apache.org/thread/{thread-id}

Best regards,
<YOUR NAME>
```

如果提醒邮件发送到 dev 邮件列表后仍然没有响应，你应该向项目导师发送私人邮件请求他们的投票。这有助于确保及时处理发布投票。

## 将候选版本迁移到 release Apache SVN

在宣布投票结果之前，你需要将发布物料从 dev Apache SVN 迁移到 release Apache SVN。发布物料应上传到 `https://dist.apache.org/repos/dist/release/answer/{release-version}` 目录。

```shell
$ svn mv https://dist.apache.org/repos/dist/dev/answer/{release-version} https://dist.apache.org/repos/dist/release/answer/{release-version} -m "transfer packages for answer {release-version}"
```

## 创建发布

投票通过后，创建一个不带 RC 的标签，CI 将根据标签自动生成发布页面。

```shell
$ git tag -a v{release-version} -m "Release Apache Answer {release-version}"
$ git push origin v{release-version}
```

## 更新下载页面

使用新发布版本更新下载页面。下载页面位于 `src/pages/download.tsx` 文件中。

## 宣布投票结果和发布

投票通过后，发送邮件至 announce@apache.org 并抄送 dev@answer.apache.org 以宣布投票结果和发布。

### 邮件模板

```text
[ANNOUNCE] Apache Answer {release-version} available

Hello everyone,

The Apache Answer {release-version} has been released!

Apache Answer is a Q&A platform software for teams at any scale.
Whether it's a community forum, help center, or knowledge management platform, you can always count on Apache Answer.

Download Links: https://answer.apache.org/download/

Release Notes: https://github.com/apache/answer/releases/tag/v{release-version}

Website: https://answer.apache.org/

Resources:
- Issue: https://github.com/apache/answer/issues
- Mailing list: dev@answer.apache.org

Thanks,
<YOUR NAME>
```
