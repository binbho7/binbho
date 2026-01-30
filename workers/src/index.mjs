// 纯 JavaScript 版本（不需要 TypeScript）
import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';

const app = new Hono();

// 健康检查
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    title: 'BINBHo Blog',
    timestamp: new Date().toISOString()
  });
});

// 静态文件服务 - 提供 Hugo 生成的文件
app.use('/*', serveStatic({ root: './' }));

// API 端点示例
app.get('/api/info', (c) => {
  return c.json({
    name: 'BINBHo Blog',
    version: '1.0.0',
    description: '基于 Cloudflare Workers 的静态博客',
    tech: ['Hugo', 'Hono', 'Cloudflare Workers']
  });
});

// 404 处理
app.notFound((c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - 页面未找到</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      text-align: center;
      color: white;
      padding: 20px;
    }
    h1 {
      font-size: 120px;
      font-weight: bold;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
    p {
      font-size: 24px;
      margin-bottom: 30px;
      opacity: 0.9;
    }
    a {
      display: inline-block;
      color: white;
      text-decoration: none;
      border: 2px solid white;
      padding: 12px 30px;
      border-radius: 8px;
      font-size: 18px;
      transition: all 0.3s ease;
    }
    a:hover {
      background: white;
      color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在</p>
    <a href="/">← 返回首页</a>
  </div>
</body>
</html>
  `);
});

export default app;
