# BINBHo 博客

这是 binbho7 的个人博客，使用 Hugo 构建的静态博客，部署在 Cloudflare Pages。

## 功能特性

- ✅ **Markdown 支持** - 使用 Markdown 格式编写文章
- ✅ **评论系统** - 集成 Giscus 评论功能
- ✅ **暗色模式** - 自动/手动切换亮色/暗色主题
- ✅ **搜索功能** - 基于 Fuse.js 的全文搜索
- ✅ **响应式设计** - 完美适配移动端和桌面端
- ✅ **快速加载** - 静态站点，CDN 加速

## 本地开发

### 安装 Hugo

访问 [Hugo 官网](https://gohugo.io/installation/) 下载并安装 Hugo。

### 运行本地服务器

```bash
# 克隆项目后进入目录
cd blog

# 启动开发服务器
hugo server -D

# 访问 http://localhost:1313
```

### 创建新文章

```bash
hugo new posts/my-new-post.md
```

## 部署方式

本项目支持两种部署方式：

### 🚀 方式一：Cloudflare Pages（推荐，最简单）

**适合**：纯静态博客，需要零配置自动部署

查看 [Cloudflare Pages 部署指南](#部署到-cloudflare-pages)

### ⚡ 方式二：Cloudflare Workers（更灵活）

**适合**：需要 API、动态功能或更多控制

查看 [Workers 部署指南](./workers/README.md) 或 [DEPLOY-WORKERS.md](./DEPLOY-WORKERS.md)

---

## 部署到 Cloudflare Pages

### 方法 1：通过 Git 集成自动部署

1. 将代码推送到 GitHub/GitLab

2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)

3. 进入 **Workers & Pages** → **创建应用程序** → **Pages** → **连接到 Git**

4. 选择你的仓库并配置构建设置：
   - **构建命令**：`hugo --gc --minify`
   - **构建输出目录**：`public`
   - **Node.js 版本**：不适用（Hugo 不需要）

5. 点击 **保存并部署**

### 方法 2：Direct Upload（直接上传）

```bash
# 构建网站
hugo --gc --minify

# 使用 Wrangler CLI 部署
npm install -g wrangler
wrangler pages deploy public
```

## 配置说明

### 修改博客信息

编辑 `hugo.toml` 文件：

```toml
baseURL = 'https://your-blog.pages.dev/'
title = '我的博客'
```

### 配置评论系统（Giscus）

1. 访问 [Giscus 官网](https://giscus.app/)

2. 使用 GitHub 账号登录，配置你的仓库

3. 获取配置参数并更新到 `hugo.toml`：

```toml
[params.comments.giscus]
  enabled = true
  repo = "your-username/your-repo"
  repoId = "your-repo-id"
  category = "Announcements"
  categoryId = "your-category-id"
```

### 自定义主题

Stack 主题支持高度自定义，详见：
- [Stack 主题文档](https://stack.jimmycai.com/)
- [主题 GitHub 仓库](https://github.com/CaiJimmy/hugo-theme-stack)

## 项目结构

```
blog/
├── content/           # 网站内容
│   ├── posts/        # 博客文章
│   └── about.md      # 关于页面
├── static/           # 静态资源（图片、CSS、JS）
├── layouts/          # 自定义布局
├── data/             # 数据文件
├── themes/           # 主题
│   └── hugo-theme-stack/
├── hugo.toml         # Hugo 配置文件
└── README.md         # 本文件
```

## 许可证

MIT License

## 链接

- [Hugo 文档](https://gohugo.io/documentation/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Stack 主题](https://github.com/CaiJimmy/hugo-theme-stack)
