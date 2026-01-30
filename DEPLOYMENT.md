# Cloudflare Pages 部署指南

## 前置准备

1. **安装 Hugo**
   - 访问 https://gohugo.io/installation/
   - 下载对应系统的安装包
   - 安装后运行 `hugo version` 验证

2. **准备 Git 仓库**
   - 在 GitHub 创建新仓库
   - 初始化本地仓库：`git init`
   - 添加远程仓库：`git remote add origin <your-repo-url>`

## 部署步骤

### 方式一：自动部署（推荐）

#### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Initial commit: Hugo blog"
git push -u origin main
```

#### 2. 在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages**
3. 点击 **创建应用程序** → **Pages** → **连接到 Git**
4. 选择你的 GitHub 仓库

#### 3. 配置构建设置

在创建页面时设置以下内容：

```
项目名称: my-blog（可自定义）
生产分支: main
构建命令: hugo --gc --minify
构建输出目录: public
环境变量: (可选) HUGO_VERSION=0.120.0
```

#### 4. 部署

点击 **保存并部署**，Cloudflare 会自动：
1. 从 GitHub 拉取代码
2. 安装 Hugo
3. 构建网站
4. 部署到全球 CDN

完成后你会获得一个 `*.pages.dev` 域名。

### 方式二：手动部署

适用于不想连接 Git 仓库的情况。

#### 1. 本地构建

```bash
hugo --gc --minify
```

#### 2. 使用 Wrangler CLI 部署

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署 public 目录
wrangler pages deploy public --project-name=my-blog
```

### 方式三：Direct Upload

1. 本地构建：`hugo --gc --minify`
2. 登录 Cloudflare Dashboard
3. 进入 **Workers & Pages** → **创建应用程序** → **Pages** → **直接上传**
4. 拖拽 `public` 文件夹上传

## 自定义域名

### 绑定自己的域名

1. 在 Cloudflare Pages 项目中，点击 **自定义域**
2. 添加你的域名（如 `blog.example.com`）
3. 按照提示配置 DNS 记录

### 配置 HTTPS

Cloudflare 会自动为你的域名提供免费的 SSL 证书。

## 环境变量（可选）

在 Cloudflare Pages 设置中可以添加以下环境变量：

```
HUGO_VERSION=0.120.0    # 指定 Hugo 版本
HUGO_ENV=production     # 生产环境标识
```

## 预览部署

每次推送到非主分支时，Cloudflare 会自动创建预览部署，方便测试。

## 性能优化

已启用以下优化：
- ✅ 自动压缩 HTML、CSS、JS
- ✅ 图片优化
- ✅ CDN 缓存（配置在 `static/_headers`）
- ✅ Gzip/Brotli 压缩

## 常见问题

### Q: 构建失败怎么办？

A: 检查以下几点：
1. Hugo 版本是否兼容（主题要求）
2. `hugo.toml` 配置是否正确
3. 主题是否正确下载到 `themes/` 目录

### Q: 如何更新博客？

A: 最简单的方式：
1. 编辑或新增文章
2. 运行 `git add . && git commit -m "Update post" && git push`
3. Cloudflare 会自动重新部署

### Q: 如何配置评论系统？

A: 参考 `README.md` 中的 Giscus 配置说明。

## 下一步

- [ ] 修改 `hugo.toml` 中的 `baseURL` 和 `title`
- [ ] 配置 Giscus 评论系统
- [ ] 自定义主题样式
- [ ] 绑定自定义域名
- [ ] 定期发布新文章

## 有用的链接

- [Hugo 文档](https://gohugo.io/documentation/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Stack 主题文档](https://stack.jimmycai.com/)
