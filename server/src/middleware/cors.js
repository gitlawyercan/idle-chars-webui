/**
 * CORS 跨域中间件
 * 
 * 为所有 HTTP 响应添加跨域头
 * 支持 OPTIONS 预检请求
 */

/**
 * 默认 CORS 配置
 */
const defaultOptions = {
  // 允许的来源（* 表示允许所有来源）
  origin: '*',

  // 允许的 HTTP 方法
  methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',

  // 允许的请求头
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',

  // 是否允许携带凭证（Cookie）
  credentials: false,

  // 预检请求缓存时间（秒）
  maxAge: 86400,
};

/**
 * 创建 CORS 中间件
 * @param {Object} options - CORS 配置选项
 * @returns {Function} 中间件函数
 */
function createCorsMiddleware(options = {}) {
  const config = { ...defaultOptions, ...options };

  /**
   * 设置 CORS 响应头
   * @param {Object} res - HTTP 响应对象
   */
  function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', config.origin);

    if (config.origin !== '*') {
      res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Control-Allow-Methods', config.methods);
    res.setHeader('Access-Control-Allow-Headers', config.allowedHeaders);

    if (config.credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    res.setHeader('Access-Control-Max-Age', String(config.maxAge));
  }

  /**
   * 处理 OPTIONS 预检请求
   * @param {Object} req - HTTP 请求对象
   * @param {Object} res - HTTP 响应对象
   * @returns {boolean} 是否已处理
   */
  function handlePreflight(req, res) {
    if (req.method === 'OPTIONS') {
      setCorsHeaders(res);
      res.writeHead(204);
      res.end();
      return true;
    }
    return false;
  }

  /**
   * 中间件处理函数
   * @param {Object} req - HTTP 请求对象
   * @param {Object} res - HTTP 响应对象
   * @param {Function} next - 下一个中间件
   */
  function middleware(req, res, next) {
    // 设置 CORS 头
    setCorsHeaders(res);

    // 处理预检请求
    if (handlePreflight(req, res)) {
      return;
    }

    // 继续处理
    if (next) {
      next();
    }
  }

  return middleware;
}

/**
 * 简单 CORS 中间件（适用于单文件服务器）
 * 直接在响应中设置头信息
 */
function simpleCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }
  return false;
}

module.exports = {
  createCorsMiddleware,
  simpleCors,
  defaultOptions,
};
