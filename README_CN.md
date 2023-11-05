<a href="https://talkbase.connectai.site/">
  <img width="100%" alt="image" src="https://github.com/ConnectAI-E/TalkBase/assets/50035229/6edf828f-ff44-41b5-b3f4-4e520d3e6432">
</a>
<br/>
<br/>

<p align="center">
    <a href="https://github.com/connectai-e/awesome-basescript">
    <img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" alt="License" />
  </a>
  <a href="https://github.com/connectai-e/Chat-Calculator/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/connectai-e/Chat-Calculator?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
  <a href="https://github.com/connectai-e/talkbase"><img src="https://img.shields.io/github/stars/connectai-e/talkbase?style=social" alt="talkbase's GitHub repo"></a>
</p>

<p align="center">
  <a href="#introduction"><strong>简介</strong></a> ·
  <a href="#deploy-your-own"><strong>部署您自己的</strong></a> ·
  <a href="#quick-start"><strong>本地设置</strong></a> ·
  <a href="#tech-stack"><strong>技术栈</strong></a> ·
  <a href="#contributing"><strong>贡献</strong></a> ·
  <a href="#license"><strong>许可</strong></a>
</p>
<br/>

<p align="center">
  <a href="./README.md"><strong>English</strong></a> ·
  <a href="./README_CN.md"><strong>简体中文</strong></a>
</p>
<br/>

## Introduction

TalkBase 是一个开源的 AI 聊天机器人，使用 [TypeChat](https://github.com/microsoft/TypeChat) 和 [Vercel AI SDK](https://sdk.vercel.ai/docs) 与自然语言进行交互。

🐵 通过自然语言轻松输入数据，使用需求表字段元数据和描述。
![示例展示](https://github.com/ConnectAI-E/TalkBase/assets/50035229/d26bcf56-d006-4f24-b84b-7480b01eff84)

🐵 只支持英文吗？不是！支持任何语言，比如中文。
![talkbasegif](https://github.com/ConnectAI-E/Chat-Base/assets/110169811/3f69a25a-f66b-450a-a478-1986debd37b3)

🙈 自动描述表格的目的，并为输入数据提供文本建议
![快速展示](https://github.com/ConnectAI-E/TalkBase/assets/50035229/10ddf80a-c504-4c42-b516-d70cf9e50268)


🙈 完美兼容多维表的字段注释，添加更多字段信息
![supportDescribe](https://github.com/ConnectAI-E/TalkBase/assets/50035229/6a7e4cf6-e63a-46fd-8ec6-09e0a12b1215)

## Quick Start

1️⃣ 打开灰度资格扩展的基础链接

https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=c55n4142-fce8-4792-b851-f92c9c7d8300

2️⃣ 复制 TalkBase 在线链接到扩展脚本地址

```
https://talkbase.connectai.site/
```

3️⃣ 开始使用 TalkBase ～

## Dev Local

要在本地设置 TalkBase，您需要克隆存储库并设置以下环境变量：

- `OPENAI_API_KEY` –  您的 OpenAI API 密钥（您可以在[这里](https://platform.openai.com/account/api-keys)获取）

1️⃣ 克隆项目

```
git clone https://github.com/ConnectAI-E/BaseScript-LinkPreview
pnpm install
pnpm dev
```

2️⃣ 将 TalkBase 开发链接复制到扩展脚本地址：

```
http://localhost:5173/
```

## Deploy your own

您可以通过一键部署自己的 TalkBase 版本：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ConnectAI-E/TalkBase&env=OPENAI_API_KEY&project-name=chat-calc&repository-name=Chat-Base)

</details>

## Tech Stack

ChatH 是基于以下技术栈构建的：

- [Next.js](https://nextjs.org/) – 框架
- [TypeChat](https://github.com/microsoft/TypeChat) – 自然语言处理框架
- [BaseScript](https://github.com/ConnectAI-E/Awesome-BaseScript) - Lark 基础脚本插件
- [Vercel](https://vercel.com) - 部署
- [TailwindCSS](https://tailwindcss.com/) – CSS 样式

## Communication

<img src="https://github.com/ConnectAI-E/TalkBase/assets/50035229/d55de9d9-8f78-493e-a4bd-a83c0d8b4796" alt="License" width="200" />

## License

基于 [MIT 许可协议](https://github.com/connectai-e/chat-base/blob/main/LICENSE.md)。
