# GitHub Mirror Proxy

一个基于 Cloudflare Workers 的 GitHub 加速镜像站，支持代理访问 GitHub 仓库页面、raw 文件、图片等所有资源，提供流畅的访问体验。

---

## ✨ 功能特性

- 🚀 支持代理所有 GitHub 相关域名（github.com、raw.githubusercontent.com、avatars 等）
- 📝 支持三种输入方式：`user`、`user/repo`、完整 GitHub URL
- 🎨 精美的深色/浅色主题，1.5秒平滑切换动画
- 💾 自动记忆用户主题偏好
- 🔒 移除 CSP 限制，确保页面完整显示
- ⚡ 无服务器架构，部署简单，响应迅速

---

## 🌐 在线演示

- 站点地址：`https://your-domain.com`
- 示例访问：
  - `https://your-domain.com/torvalds/linux`
  - `https://your-domain.com/Zsfan1224/IMG`

---

## 📸 截图

### 首页界面 - 浅色模式

![首页浅色模式](screenshots/light-mode.png)

### 首页界面 - 深色模式

![首页深色模式](screenshots/dark-mode.png)

### 仓库页面示例

![仓库页面](screenshots/repo-page.png)

### 图片正常加载

![图片加载](screenshots/images-loaded.png)

---

## 🚀 快速部署

### 方式一：Cloudflare Workers Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages**
3. 点击 **Create Application** → **Create Worker**
4. 复制项目代码到编辑器
5. 点击 **Save and Deploy**
6. 绑定自定义域名（可选）

### 方式二：Wrangler CLI

安装 Wrangler
npm install -g wrangler

登录
wrangler login

创建项目
wrangler init github-mirror

复制代码到 src/index.js
部署
wrangler deploy

text

---

## ⚙️ 配置说明

### 绑定自定义域名

1. 进入你的 Worker 设置页面
2. 点击 **Triggers** 标签
3. 在 **Custom Domains** 部分点击 **Add Custom Domain**
4. 输入你的域名（如 `mirror.example.com`）
5. 等待 DNS 配置生效

### 路由配置（可选）

如果使用 Routes 而非 Custom Domains：

1. 进入域名的 **Workers Routes** 设置
2. 添加路由：`mirror.example.com/*`
3. 选择对应的 Worker

---

## 📖 使用方法

### 方法一：通过首页输入

1. 访问你的镜像站首页
2. 在输入框输入以下任一格式：
   - 用户名：`torvalds`
   - 仓库：`torvalds/linux`
   - 完整链接：`https://github.com/torvalds/linux`
3. 点击「打开」按钮

### 方法二：直接访问

在浏览器地址栏直接输入：

https://your-domain.com/用户名/仓库名

text

### 方法三：URL 参数

https://your-domain.com/proxy?url=https://github.com/torvalds/linux

text

---

## 🎨 主题切换

- 点击右上角的太阳/月亮图标切换主题
- 主题选择自动保存到浏览器
- 支持 1.5 秒平滑过渡动画

---

## 🛠️ 技术栈

- **后端**：Cloudflare Workers
- **前端**：原生 HTML/CSS/JavaScript
- **样式**：CSS Variables + 渐变动画
- **部署**：Cloudflare 全球边缘网络

---

## 📋 支持的域名

项目自动代理以下 GitHub 相关域名：

- `github.com`
- `api.github.com`
- `raw.githubusercontent.com`
- `avatars.githubusercontent.com`
- `camo.githubusercontent.com`
- `github.githubassets.com`
- `githubusercontent.com`
- GitHub S3 存储桶等

---

## ⚠️ 注意事项

- ⚖️ 本项目仅供学习交流使用，请勿用于违法用途
- 🚫 请遵守 GitHub 服务条款，不要滥用
- 🔄 建议添加访问频率限制，避免对 GitHub 造成压力
- 💡 公开部署建议配置 Cloudflare 防火墙规则

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

- 🐛 发现 Bug？提交 Issue
- 💡 有新想法？提交 Feature Request
- 🔧 想改进代码？提交 Pull Request

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

- 感谢 Cloudflare 提供的免费 Workers 服务
- 感谢所有为本项目做出贡献的开发者

---

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star ⭐ 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/your-repo&type=Date)](https://star-history.com/#your-username/your-repo&Date)

---

**Made with ❤️ by [Your Name](https://github.com/your-username)**
