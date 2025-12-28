# Fast Github

一个基于 Cloudflare Worker 的 GitHub 加速镜像站，支持代理访问 GitHub 仓库页面、Raw 文件、图片等所有资源。

---

## 🌐 在线演示

- 站点地址：`https://sanzhong.xyz`
- 示例访问：
  - `https://sanzhong.xyz/ZhangShengFan/FastGithub`
  - `https://sanzhong.xyz/torvalds/linux`

---

## 📸 截图

---

## 🚀 快速部署

### 方式一：Cloudflare Workers Dashboard

1. 登录 Cloudflare 控制台：https://dash.cloudflare.com/
2. 进入 **Workers & Pages**
3. 点击 **Create Application** → **Create Worker**
4. 复制 `worker.js` 到编辑器
5. 点击 **Save and Deploy**
6. 绑定自定义域名（**必须**：`workers.dev` 已被阻断，必须绑定自定义域名）

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
4. 输入你的域名（如 `sanzhong.xyz`）
5. 等待 DNS 配置生效

---

## 📖 使用方法

### 方法一：通过首页输入

1. 访问镜像站首页：`https://sanzhong.xyz`
2. 在输入框输入以下任一格式：
   - 用户名：`torvalds`
   - 仓库：`torvalds/linux`
   - 完整链接：`https://github.com/torvalds/linux`
3. 点击「打开」按钮

### 方法二：直接访问

在浏览器地址栏直接输入：

https://sanzhong.xyz/用户名/仓库名

text

例如：

https://sanzhong.xyz/ZhangShengFan/FastGithub

text

### 方法三：URL 参数

https://sanzhong.xyz/proxy?url=https://github.com/torvalds/linux

text

---

## ⚠️ 注意事项

- ⚖️ 本项目仅供学习交流使用，请勿用于违法用途
- 🚫 请遵守 GitHub 服务条款，不要滥用
- 🔄 建议添加访问频率限制，避免对 GitHub 造成压力
- 💡 公开部署建议配置 Cloudflare 防火墙规则
- 🌐 必须绑定自定义域名，`workers.dev` 域名在部分地区已被阻断

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star ⭐ 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=ZhangShengFan/FastGithub&type=Date)](https://star-history.com/#ZhangShengFan/FastGithub&Date)

---

**Made with ❤️ by [ZhangShengFan](https://github.com/ZhangShengFan)**
