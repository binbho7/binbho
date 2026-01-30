import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';

type Env = {
  BLOG_TITLE: string;
  BLOG_URL: string;
  CACHE?: KVNamespace;
};

const app = new Hono<{ Bindings: Env }>();

// 健康检查
app.get('/health', (c) => {
  return c.json({ status: 'ok', title: c.env.BLOG_TITLE });
});

// 静态文件服务
app.use('/*', serveStatic({ root: './' }));

// RSS Feed 生成
app.get('/rss.xml', (c) => {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${c.env.BLOG_TITLE}</title>
    <link>${c.env.BLOG_URL}</link>
    <description>BINBHo 的个人博客</description>
    <language>zh-cn</language>
  </channel>
</rss>`;

  return c.text(rss, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
  });
});

// API 端点：获取文章列表
app.get('/api/posts', async (c) => {
  // 这里可以从 KV 或读取文件系统获取文章列表
  return c.json({
    posts: [
      {
        title: '欢迎来到我的博客',
        date: '2024-01-30',
        url: '/posts/first-post/',
      },
      {
        title: '如何使用 Hugo 写博客',
        date: '2024-01-30',
        url: '/posts/hugo-tutorial/',
      },
    ],
  });
});

// 404 处理
app.notFound((c) => {
  return c.html(`
<!DOCTYPE html>
<html>
<head>
  <title>404 - 页面未找到</title>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      text-align: center;
      color: white;
    }
    h1 {
      font-size: 72px;
      margin: 0;
    }
    p {
      font-size: 24px;
      margin: 20px 0;
    }
    a {
      color: white;
      text-decoration: none;
      border: 2px solid white;
      padding: 10px 20px;
      border-radius: 5px;
      transition: all 0.3s;
    }
    a:hover {
      background: white;
      color: #667eea;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>页面未找到</p>
    <a href="/">返回首页</a>
  </div>
</body>
</html>
  `);
});

// 错误处理
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text('服务器错误', 500);
});

export default app;
