/**
 * 登录认证 API 控制器
 * 
 * 处理用户登录、Token 管理、登录状态查询
 */
const authService = require('../services/authService');
const store = require('../models/store');

module.exports = {
  /**
   * POST /api/auth/login
   * 使用邮箱密码登录，获取 Token
   * 
   * Request body: { email: string, password: string }
   * Response: { code: number, message: string, data?: { token, refreshToken } }
   */
  async login(req, res) {
    try {
      const { email, password } = req.body || {};

      // 参数校验
      if (!email || !password) {
        return res.json({
          code: 40000,
          message: '请输入账号和密码',
        });
      }

      if (!email.includes('@')) {
        return res.json({
          code: 40000,
          message: '请输入有效的邮箱地址',
        });
      }

      // 调用登录服务
      const result = await authService.login(email, password);

      if (result.success) {
        // 登录成功
        res.json({
          code: 20000,
          message: '登录成功',
          data: result.data,
        });
      } else {
        // 登录失败
        res.json({
          code: 40100,
          message: result.message || '登录失败，请检查账号密码',
        });
      }
    } catch (e) {
      console.error('登录接口错误:', e.message);
      res.json({
        code: 50000,
        message: `服务器错误: ${e.message}`,
      });
    }
  },

  /**
   * GET /api/auth/status?email=xxx
   * 查询账号的登录状态和缓存状态
   * 
   * Response: { code, data: { loggedIn, tokenAge, hasCache, cacheAge } }
   */
  status(req, res) {
    try {
      const email = req.query.email;

      if (!email) {
        return res.json({
          code: 40000,
          message: '缺少邮箱参数',
        });
      }

      // 查询 Token 缓存
      const token = store.getToken(email);

      // 查询玩家数据缓存
      const playerCache = store.getPlayerCache(email);

      res.json({
        code: 20000,
        data: {
          loggedIn: !!token,
          tokenAge: token ? Math.floor((Date.now() - token.savedAt) / 1000) : 0,
          tokenExpired: token ? (Date.now() - token.savedAt) > 86400000 : true, // 24小时过期
          hasCache: !!playerCache,
          cacheAge: playerCache ? Math.floor((Date.now() - playerCache.savedAt) / 1000) : 0,
        },
      });
    } catch (e) {
      console.error('状态查询错误:', e.message);
      res.json({
        code: 50000,
        message: e.message,
      });
    }
  },

  /**
   * POST /api/auth/logout
   * 清除缓存的 Token
   * 
   * Request body: { email: string }
   */
  logout(req, res) {
    try {
      const { email } = req.body || {};

      if (!email) {
        return res.json({
          code: 40000,
          message: '缺少邮箱参数',
        });
      }

      // 清除 Token 缓存
      store.deleteToken(email);

      res.json({
        code: 20000,
        message: '已退出登录',
      });
    } catch (e) {
      console.error('退出登录错误:', e.message);
      res.json({
        code: 50000,
        message: e.message,
      });
    }
  },
};
