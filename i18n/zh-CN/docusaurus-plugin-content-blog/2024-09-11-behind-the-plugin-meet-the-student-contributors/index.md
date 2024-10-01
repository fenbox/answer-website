---
title: "Behind the Plugin: Meet the Student Contributors"
authors:
  - Anne
category: Community
featured: false
image: 2024-09-11-cover-zh@4x.png
description: Find out the process of building the plugin and reflection from the students.
---

The open-source world is a place for everyone. It thrives on diversity and that's why we believe that there's always a place for you. Whether you're a seasoned developer or just getting started, your contributions-code, documentations, or shining ideas-are valuable.

To make it easier for beginners, we've listed our projects on platforms like [ovio](https://ovio.org/project/apache/incubator-answer), [LibHunt](https://www.libhunt.com/r/incubator-answer), and [SourceForge](https://sourceforge.net/projects/incubator-answer/) for easier discovery. We're glad to have received a plugin contribution from [Melody](https://github.com/IamMelody233) and her classmate from Xiamen University Malaysia Campus. It's their first open-source contribution, and let's hear about the process and their reflection.

## Tell us more about the plugin.

We've built a [code highlighting plugin](https://github.com/apache/incubator-answer-plugins/tree/main/render-markdown-codehighlight) using React and highlight.js. The plugin offers real-time syntax highlighting for a wide range of programming languages and supports dynamic theme switching. Users can choose from popular themes like GitHub Light and GitHub Dark, or create their own custom themes.

## 请问你们是如何拆解这个完成这个插件的？

There are several phases as below. First, we started with a simple implementation of code highlighting in the project itself. Once this was working, we moved forward to transforming it into a single plugin.

Since plugins mostly deal with the front-end stuff, we focused on that first. 我们使用了 `highlight.js` 作为核心库，通过 React 技术栈实现了插件的前端交互，并支持主题的动态加载。同时，这款插件可以让用户根据自己的喜好切换代码主题，提升用户使用的舒适度。 To make that happen, we set up an interface between the front-end and back-end.

To sum up:

1. 导入highlight.js，并在本地前端实现了简单的代码高亮。
2. Migrate the code highlighting feature into a plugin. 将代码高亮功能移植到插件中。不过由于Vite的封装机制，我们无法直接导入多种CSS文件，因此使用了CSS in JS的解决方案。
3. 然后，我们发现前端明亮主题的切换和Question下方的预览框渲染不够顺畅，所以合理配置了依赖项并编写了更严谨的监听机制来解决问题。 So, we tweaked some dependencies and added more responsive listeners to fix it
4. Once the front-end was stable, we turned our attention to the backend. 在前端基本完善后，我们开发了后端部分，让用户可以通过表单选择自己喜欢的主题。
5. 通过前后端接口改写代码，实现了后端选择的主题在前端的应用。
6. When testing, we identified performance issues related to CSS loading. 在测试中，我们发现CSS的挂载量较大，于是修改了逻辑，使用动态导入和映射的方法来优化性能。
7. 最后，为了后续维护和更好的可读性，我们编写了代码来读取核心库内容，并实现了自动检测主题类型、分类和切换等功能。

## 有遇到哪些问题，是怎么解决的呢？

当然，我们开发中遇到了一些挑战。例如： For instance:

- **CSS Loading:** Importing multiple CSS stylesheets was a problem because of Vite's packaging limitations. We overcame this by adopting a CSS-in-JS solution.
- **Theme Switching:** The preview box below the Question wasn't in real-time rendering when switching between light and dark modes. To resolve this, we optimized dependencies and implemented more robust event listeners.
- **Backend Integration:** Integrating the backend form with the frontend was another hurdle. We solved this by leveraging the Answer API to facilitate data exchange between the front-end and back-end.
- 最后，为了简化后期维护，我们使用文件遍历来读取核心库，而不是手动引入。

这些问题的解决不仅提高了插件的性能，也增强了我们对技术的理解。

## 现在对于开源社区，有什么新的理解？

Working on open-source projects has taught us the importance of community and collaboration. Every little thing you do, like writing code or sharing ideas, helps make Answer better. It's not just about knowing how to code; you also need to be good at talking to other people. When you work together, you can make sure everything works right, especially when fixing problems.

We've learned that having great coding skills isn't enough. You need to really understand how the project works inside and out. That means learning from others and using their ideas. 开源不仅是技术的分享，它更是思想、经验和创意的交流与融合。社区的开放氛围鼓励合作、反馈和改进，为开发者提供了广阔的成长空间，激励我们不断进步。 It helps everyone get better and makes us want to do our best

## 对于在校的学生，你们会怎么鼓励他们参与到开源中来呢？

Working on these projects has helped us truly understand how open source works and the importance of teamwork. We think students should definitely get involved in open source projects. It's a great way to learn and practice coding.

By contributing, students can get real-world experience, solve real problems, and meet other people in tech. Start small and work your way up. Whether you write code, document things, or test stuff, there's a place for everyone. Open source can help you learn new things and add testimonials for your skills on your resume.

These two students didn't just write code; they went the extra mile! 代码贡献只是两位同学开源首秀的一部分，两位同学还在非代码贡献上做出了自己的贡献。在搭建环境的时候，他们将步骤以图文的形式记录下来，并将[前端配置](https://answer.apache.org/zh-CN/blog/2024/08/16/apache-answer-frontend-configuration-guide)、[后端配置](https://answer.apache.org/zh-CN/blog/2024/08/20/apache-answer-backend-configuration-guide)、和[添加插件指南](https://answer.apache.org/zh-CN/blog/2024/08/22/guide-to-add-answer-plugins)以博客的形式贡献给社区。此外，他们还完成了[文档](https://answer.apache.org/zh-CN/docs)部分的更新和本地化。 Plus, they updated and translated the docs to make them easier to understand for Chinese speakers.

We're so grateful for their hard work! We hope more students will join us in making open source a welcoming place. There are lots of ways to get involved, even if you're not a coder. Click [here](https://answer.apache.org/community/contributing) to check it out and give it a try.
