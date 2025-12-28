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
<img width="1920" height="1080" alt="5p9oKJgLDp" src="https://github.com/user-attachments/assets/6946054e-1c43-4f71-a5c0-202bda2ad882" />

<img width="1920" height="1080" alt="chrome_8aRYsVnH2Q" src="https://github.com/user-attachments/assets/cf672037-f367-4111-a00a-fc46b50c0963" />

<img width="1920" height="1080" alt="chrome_b0LIlWRyU3" src="https://github.com/user-attachments/assets/e26ce3bc-12ee-4871-88c5-d1ca8a64e2a5" />


---

## 🚀 快速部署

1. 登录 Cloudflare 控制台：https://dash.cloudflare.com/
2. 进入 **Workers & Pages**
3. 点击 **Create Application** → **Create Worker**
4. 复制 `worker.js` 到编辑器
5. 点击 **Save and Deploy**
6. 绑定自定义域名（**必须**：`workers.dev` 已被阻断，必须绑定自定义域名）

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
   - 用户名：`ZhangShengFan`
   - 仓库：`FastGithub`
   - 完整链接：`https://github.com/ZhangShengFan/FastGithub`
3. 点击「打开」按钮

### 方法二：直接访问

在浏览器地址栏直接输入：

https://sanzhong.xyz/用户名/仓库名


例如：

https://sanzhong.xyz/ZhangShengFan/FastGithub


### 方法三：URL 参数

https://sanzhong.xyz/proxy?url=https://github.com/torvalds/linux


---

## 注意事项

- ⚖️ 本项目仅供学习交流使用，请勿用于违法用途
- 🌐 必须绑定自定义域名，`workers.dev` 域名在部分地区已被阻断

---


**Made with ❤️ by [ZhangShengFan](https://github.com/ZhangShengFan)**
