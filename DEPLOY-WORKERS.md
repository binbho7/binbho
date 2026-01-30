# Cloudflare Workers 部署指南

本指南将帮助你将博客部署到 Cloudflare Workers。

## 🎯 两种部署方式对比

| 特性 | Cloudflare Pages | Cloudflare Workers |
|------|------------------|-------------------|
| **适用场景** | 纯静态站点 | 需要动态功能的站点 |
| **部署方式** | Git 自动部署 | Wrangler CLI 部署 |
| **配置难度** | 简单 | 中等 |
| **灵活性** | 低 | 高 |
| **免费额度** | 无限制 | 10万请求/天 |
| **响应速度** | 极快 | 极快 |
| **自定义域名** | 支持 | 支持 |
| **API 支持** | 否 | 是 |

**推荐**：如果你的博客只是静态内容，使用 **Pages** 更简单；如果需要 API、动态路由等功能，使用 **Workers**。

---

## 🚀 方式一：Cloudflare Pages（推荐，更简单）

### 部署步骤

1. **推送代码到 GitHub**（已完成）
   - 仓库：https://github.com/binbho7/binbho

2. **登录 Cloudflare**
   - 访问 https://dash.cloudflare.com/

3. **创建 Pages 项目**
   - 进入 **Workers & Pages**
   - 点击 **创建应用程序**
   - 选择 **Pages** → **连接到 Git**
   - 选择 `binbho` 仓库

4. **配置构建**
   ```
   构建命令：hugo --gc --minify
   构建输出目录：public
   分支：main
   ```

5. **部署**
   - 点击 **保存并部署**
   - 等待构建完成（约 2-3 分钟）
   - 获得 URL：`https://binbho.pages.dev`

6. **绑定自定义域名**（可选）
   - 在 Pages 项目中点击 **自定义域**
   - 添加 `www.210918.xyz`

**优势**：
- ✅ 最简单，配置最少
- ✅ 自动从 Git 部署
- ✅ 预览部署（每个 PR 都有预览）
- ✅ 无限免费请求

---

## ⚡ 方式二：Cloudflare Workers（更灵活）

### 前置要求

```bash
# 1. 安装 Node.js
# 下载：https://nodejs.org/

# 2. 安装 Hugo
# 下载：https://gohugo.io/installation/

# 3. 安装 Wrangler
npm install -g wrangler
```

### 部署步骤

#### 1. 安装依赖

```bash
cd workers
npm install
```

#### 2. 登录 Cloudflare

```bash
wrangler login
```

浏览器会打开并授权。

#### 3. 配置域名（可选）

编辑 `workers/wrangler.toml`：

```toml
[env.production]
routes = [
  { pattern = "www.210918.xyz/*", zone_name = "210918.xyz" }
]
```

#### 4. 构建并部署

```bash
# 方法一：使用 npm 脚本（推荐）
npm run deploy

# 方法二：手动部署
hugo --gc --minify                    # 构建 Hugo
xcopy public workers\src\public /E /I /Y  # Windows
cp -r public workers/src/             # Linux/Mac
cd workers && wrangler deploy         # 部署
```

#### 5. 验证部署

```bash
# 测试 Worker
curl https://binbho-blog.your-subdomain.workers.dev

# 测试健康检查
curl https://binbho-blog.your-subdomain.workers.dev/health
```

### 本地开发

```bash
cd workers
npm run dev
```

访问 http://localhost:8787

---

## 📊 性能对比

### Pages
- 首次加载：~50ms
- 全球 CDN：300+ 节点
- 缓存：自动

### Workers
- 首次加载：~30ms
- 全球边缘：300+ 节点
- 缓存：可自定义 KV

---

## 🔄 更新博客

### Pages（自动）

```bash
# 1. 创建新文章
hugo new posts/new-article.md

# 2. 推送到 GitHub
git add .
git commit -m "Add new article"
git push

# ✅ Cloudflare 自动部署！
```

### Workers（手动）

```bash
# 1. 创建新文章
hugo new posts/new-article.md

# 2. 部署
cd workers && npm run deploy

# ✅ 部署完成！
```

---

## 🎁 额外功能（Workers 独有）

### 1. API 端点

```typescript
// src/index.ts
app.get('/api/posts', async (c) => {
  const posts = await getPostsFromKV();
  return c.json(posts);
});
```

### 2. KV 缓存

```typescript
// 缓存热门内容
const cached = await c.env.CACHE.get('homepage');
if (cached) return c.html(cached);
```

### 3. 重定向规则

```typescript
app.get('/old-url', (c) => {
  return c.redirect('/new-url', 301);
});
```

### 4. 自定义 Headers

```typescript
app.get('/api/*', (c) => {
  c.header('X-Frame-Options', 'DENY');
  return c.text('Protected API');
});
```

---

## 💰 成本对比

### Pages
- **完全免费**
- 无限请求
- 无限带宽
- 自动 SSL

### Workers
- **免费计划**：
  - 100,000 请求/天
  - 10ms CPU 时间/请求
- **付费计划**：$5/月起
  - 1000 万请求/月
  - 50ms CPU 时间/请求

**个人博客推荐**：Pages（完全免费）

---

## 🛠️ 常见问题

### Q1: 部署后页面 404？

**Pages**：检查构建输出目录是否为 `public`
**Workers**：检查 `wrangler.toml` 的 `bucket` 路径

### Q2: 自定义域名不生效？

1. 确保域名 DNS 已托管到 Cloudflare
2. 检查 CNAME 记录配置
3. 等待 DNS 传播（最多 24 小时）

### Q3: Hugo 主题不显示？

确保主题文件已提交到 Git：
```bash
rm -rf themes/hugo-theme-stack/.git
git add themes/hugo-theme-stack
```

### Q4: Workers 部署超时？

检查 `wrangler.toml` 中的文件大小限制，减小 `public` 目录大小

---

## 📚 推荐方案

### 新手博主 → **Pages**
- 零配置
- 自动部署
- 完全免费

### 开发者 → **Workers**
- 更多控制
- API 支持
- 可扩展性

### 博客升级路径

```
阶段 1：本地 Markdown
         ↓
阶段 2：GitHub Pages（免费托管）
         ↓
阶段 3：Cloudflare Pages（全球 CDN）
         ↓
阶段 4：Cloudflare Workers（需要动态功能时）
```

---

## 🎉 我的推荐

对于你的博客，我推荐使用 **Cloudflare Pages**：

1. ✅ 你已经有 GitHub 仓库
2. ✅ 博客是纯静态内容
3. ✅ 配置最简单（3 分钟完成）
4. ✅ 自动部署（git push 即可）
5. ✅ 完全免费（无限流量）

**如果将来需要 API 或动态功能，再迁移到 Workers 也不迟！**

---

## 📞 需要帮助？

- [Cloudflare 文档](https://developers.cloudflare.com/)
- [Hugo 文档](https://gohugo.io/documentation/)
- [Workers 示例](https://workers.cloudflare.com/)
- [社区论坛](https://community.cloudflare.com/)

---

**选择 Pages 还是 Workers？告诉我你的决定，我可以帮你完成部署！** 🚀
