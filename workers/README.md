# Cloudflare Workers 部署指南

这个目录包含了将博客部署到 Cloudflare Workers 的所有配置和代码。

## 架构说明

```
Hugo 生成静态文件 → Workers 提供 HTTP 服务 → 全球 CDN
```

- **Hugo**：生成静态 HTML/CSS/JS 文件
- **Hono**：轻量级 Web 框架，处理路由和中间件
- **Cloudflare Workers**：边缘计算平台，全球部署

## 部署步骤

### 前置要求

1. **安装 Node.js**（v18+）
   - 下载：https://nodejs.org/

2. **安装 Hugo**
   - 下载：https://gohugo.io/installation/

3. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

### 方法一：快速部署（推荐）

#### 1. 安装依赖

```bash
cd workers
npm install
```

#### 2. 登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器让你授权。

#### 3. 构建并部署

```bash
npm run deploy
```

这个命令会：
1. 使用 Hugo 构建博客
2. 复制生成的文件到 Workers 目录
3. 部署到 Cloudflare Workers

#### 4. 访问博客

部署成功后，你会看到类似的输出：

```
Published binbho-blog (0.12 sec)
  https://binbho-blog.your-subdomain.workers.dev
```

### 方法二：手动部署

#### 1. 构建 Hugo 网站

```bash
# 在博客根目录
hugo --gc --minify
```

#### 2. 复制文件到 Workers 目录

```bash
# Windows
xcopy public workers\src\public /E /I /Y

# Linux/Mac
cp -r public workers/src/
```

#### 3. 部署

```bash
cd workers
wrangler deploy
```

### 方法三：本地开发

```bash
cd workers
npm run dev
```

访问 http://localhost:8787 查看效果。

## 配置说明

### wrangler.toml 配置

```toml
name = "binbho-blog"              # Worker 名称
main = "src/index.ts"             # 入口文件
compatibility_date = "2024-01-01" # 兼容性日期

[site]
bucket = "src/public"             # 静态文件目录
```

### 绑定自定义域名

1. 在 Cloudflare Dashboard 中添加域名
2. 在 `wrangler.toml` 中添加：

```toml
[env.production]
routes = [
  { pattern = "www.210918.xyz/*", zone_name = "210918.xyz" }
]
```

3. 重新部署：

```bash
npm run deploy
```

## 功能特性

- ✅ **全球 CDN**：自动部署到 300+ 城市
- ✅ **零冷启动**：边缘计算，毫秒级响应
- ✅ **自动 HTTPS**：免费 SSL 证书
- ✅ **无限流量**：Workers 免费计划每天 100,000 次请求
- ✅ **API 支持**：内置 API 端点
- ✅ **健康检查**：`/health` 端点

## 目录结构

```
workers/
├── src/
│   ├── index.ts        # TypeScript 版本（推荐）
│   ├── index.mjs       # JavaScript 版本
│   └── public/         # Hugo 生成的静态文件
├── package.json        # 依赖配置
├── wrangler.toml       # Workers 配置
└── README.md           # 本文件
```

## API 端点

部署后可用的 API：

- `GET /health` - 健康检查
- `GET /api/info` - 博客信息
- `GET /*` - 静态文件服务

## 环境变量

在 `wrangler.toml` 中配置：

```toml
[vars]
BLOG_TITLE = "BINBHo"
BLOG_URL = "https://www.210918.xyz"
```

在代码中使用：

```typescript
app.get('/', (c) => {
  const title = c.env.BLOG_TITLE;
  return c.text(`Welcome to ${title}`);
});
```

## 性能优化

### 启用缓存

```toml
[[rules]]
type = "Text"
globs = ["**/*.css", "**/*.js"]
fallback = "cache"

[[rules]]
type = "Image"
globs = ["**/*.jpg", "**/*.png"]
fallback = "cache"
```

### 使用 KV 缓存

```typescript
// 获取内容时先检查 KV
const cached = await c.env.CACHE.get(key);
if (cached) return c.json(JSON.parse(cached));

// 缓存新内容
await c.env.CACHE.put(key, JSON.stringify(data), {
  expirationTtl: 3600 // 1小时
});
```

## 常见问题

### Q: 部署失败怎么办？

A: 检查以下几点：
1. 是否已登录 `wrangler login`
2. Hugo 是否正确安装
3. `public` 目录是否存在
4. 网络连接是否正常

### Q: 如何更新博客？

A:
```bash
# 1. 编辑或新增文章
hugo new posts/new-article.md

# 2. 构建并部署
cd workers && npm run deploy
```

### Q: Workers 和 Pages 有什么区别？

A:
- **Pages**：专为静态站点设计，自动从 Git 部署，更简单
- **Workers**：边缘计算平台，可以运行动态代码，更灵活

### Q: 免费限额是多少？

A: Workers 免费计划：
- 每天 100,000 次请求
- 无限带宽
- 10ms CPU 时间/请求

## 成本估算

- **免费计划**：100,000 请求/天（约 300 万/月）
- **付费计划**：$5/月起，1000 万请求/月

对于个人博客，免费计划完全够用！

## 下一步

1. ✅ 部署 Workers 版本
2. ⬜ 绑定自定义域名
3. ⬜ 配置 KV 缓存
4. ⬜ 添加 analytics
5. ⬜ 优化性能

## 相关链接

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Hono 文档](https://hono.dev/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)

## 支持

遇到问题？查看：
- [Workers 社区](https://community.cloudflare.com/c/workers/18)
- [Hono Discord](https://discord.gg/H2G9Pq4)
- GitHub Issues
