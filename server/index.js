const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./src/config/index');
const authController = require('./src/controllers/auth');
const playerController = require('./src/controllers/player');

function parseBody(req) {
  return new Promise((resolve) => {
    if (req.method === 'GET' || req.method === 'DELETE') return resolve({});
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve({}); } });
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

function serveStatic(req, res) {
  let url = req.url === '/' ? '/index.html' : req.url;

  if (url.startsWith('/textures/')) {
    const texturesDir = path.resolve(__dirname, '..', 'textures');
    const filePath = path.join(texturesDir, url.replace('/textures/', ''));
    if (!filePath.startsWith(texturesDir)) { sendJSON(res, 403, { error: 'Forbidden' }); return; }
    const extMap = { '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.json': 'application/json' };
    const ext = path.extname(filePath);
    const contentType = extMap[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        const placeholder = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(placeholder);
      } else {
        res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'max-age=86400' });
        res.end(data);
      }
    });
    return;
  }

  const webDir = path.resolve(__dirname, '..', 'web');
  const filePath = path.join(webDir, url);
  if (!filePath.startsWith(webDir)) { sendJSON(res, 403, { error: 'Forbidden' }); return; }
  const extMap = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.png': 'image/png', '.ico': 'image/x-icon',
  };
  const ext = path.extname(filePath);
  const contentType = extMap[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        sendJSON(res, 404, { error: 'Not Found', path: url });
      } else { sendJSON(res, 500, { error: err.message }); }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// ============================================================
// 路由表
// ============================================================
const routes = {
  'POST /api/auth/login': async (req, res) => { req.body = await parseBody(req); await authController.login(req, res); },
  'GET /api/auth/status': (req, res) => { const u = new URL(req.url, 'http://localhost'); req.query = Object.fromEntries(u.searchParams); authController.status(req, res); },
  'POST /api/auth/logout': async (req, res) => { req.body = await parseBody(req); authController.logout(req, res); },
  // 支持 GET 和 POST 两种方式获取 player profile
  'GET /api/player/profile': async (req, res) => { const u = new URL(req.url, 'http://localhost'); req.query = Object.fromEntries(u.searchParams); await playerController.profile(req, res); },
  'POST /api/player/profile': async (req, res) => { req.body = await parseBody(req); req.query = { email: req.body.email || '' }; await playerController.profile(req, res); },
  'GET /api/player/skills': async (req, res) => { const u = new URL(req.url, 'http://localhost'); req.query = Object.fromEntries(u.searchParams); await playerController.skills(req, res); },
};

// ============================================================
// Debug 日志 - 打印所有 API 请求
// ============================================================
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    console.log(`[请求] ${req.method} ${req.url}`);
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end();
    return;
  }

  const routeKey = `${req.method} ${req.url.split('?')[0]}`;
  let handler = routes[routeKey];

  // 如果 POST 没匹配，试试 GET（兼容性）
  if (!handler && req.method === 'POST') {
    const getKey = `GET ${req.url.split('?')[0]}`;
    handler = routes[getKey];
  }

  if (handler) {
    res.json = function(data, statusCode = 200) {
      sendJSON(res, statusCode, data);
    };
    handler(req, res).catch(err => {
      console.error('路由错误:', err);
      res.json({ code: 50000, message: err.message }, 500);
    });
  } else {
    serveStatic(req, res);
  }
});

server.listen(config.port, () => {
  console.log('');
  console.log('==================================');
  console.log('  Idle Chars 服务器已启动 🚀');
  console.log('==================================');
  console.log(`  🌐 访问: http://localhost:${config.port}`);
  console.log(`  🖼️  纹理: ${path.resolve(__dirname, '..', 'textures')}`);
  console.log('==================================');
  console.log('');
});
