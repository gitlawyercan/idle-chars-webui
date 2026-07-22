/**
 * apiProxy.js - 统一游戏 API 代理服务
 * 
 * 所有对 idle.charsgame.com 的请求通过此模块转发
 * 添加了 WAF 绕过所需的请求头
 */

const https = require('https');

/**
 * 发送代理请求到游戏 API
 * @param {string} endpoint - API 路径，如 /api/v1/auth/login
 * @param {string} method - HTTP 方法
 * @param {object|null} body - 请求体
 * @param {string} token - Bearer token（可选）
 * @returns {Promise<object>}
 */
function proxyRequest(endpoint, method = 'POST', body = null, token = '') {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;

    const options = {
      hostname: 'idle.charsgame.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://idle.charsgame.com',
        'Referer': 'https://idle.charsgame.com/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
      },
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          console.error(`[代理] 响应非JSON [${endpoint}]`);
          resolve({ code: 50000, message: 'API返回了非JSON响应' });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[代理] 请求失败 [${endpoint}]:`, err.message);
      reject(err);
    });

    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error('请求超时'));
    });

    if (postData) req.write(postData);
    req.end();
  });
}

module.exports = { proxyRequest };
