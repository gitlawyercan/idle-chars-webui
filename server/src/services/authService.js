/**
 * authService.js - 登录认证服务
 * 
 * 通过代理转发登录请求到游戏 API
 * 修复：兼容不同 API 返回的 Token 字段名
 */

const { proxyRequest } = require('./apiProxy');
const store = require('../models/store');

module.exports = {
  /**
   * 登录
   */
  async login(email, password) {
    try {
      console.log(`[认证] 开始登录: ${email}`);

      const result = await proxyRequest('/api/v1/auth/login', 'POST', { email, password });
      console.log(`[认证] API响应:`, result ? `code=${result.code}` : '无响应');

      if (result && result.code === 20000 && result.data) {
        // 兼容不同字段名：accessToken / token
        const token = result.data.accessToken || result.data.token || '';
        console.log(`[认证] ✅ 登录成功, Token前10位: ${token?.substring(0, 10)}...`);

        if (!token) {
          console.log(`[认证] ⚠️ Token为空, 完整data:`, JSON.stringify(result.data).substring(0, 200));
          return { success: false, message: '登录返回数据中未找到 Token' };
        }

        // 保存 Token
        store.saveToken(email, {
          token: token,
          refreshToken: result.data.refreshToken || result.data.refresh_token || '',
          savedAt: Date.now(),
        });

        console.log(`[认证] Token已保存到: data/tokens.json [${email}]`);

        return {
          success: true,
          data: {
            token: token,
            refreshToken: result.data.refreshToken || '',
            player: result.data.player || null,
          },
        };
      }

      console.log(`[认证] ❌ 登录失败: ${email} - ${result?.message || '未知'}`);
      return {
        success: false,
        message: result?.message || '登录失败',
      };
    } catch (e) {
      console.error(`[认证] ⚠️ 登录异常: ${email} - ${e.message}`);
      return {
        success: false,
        message: `网络错误: ${e.message}`,
      };
    }
  },
};
