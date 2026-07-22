/**
 * playerService.js - 玩家数据服务
 * 
 * 通过代理获取游戏数据，并缓存到本地
 * 修复：兼容 Token 字段名
 */

const { proxyRequest } = require('./apiProxy');
const store = require('../models/store');

module.exports = {
  /**
   * 获取玩家 Profile
   */
  async getProfile(email) {
    try {
      console.log(`[玩家] 获取Profile: ${email}`);

      // 获取 Token
      const tokenData = store.getToken(email);

      // 兼容处理：token 可能在 token 或 accessToken 字段
      const token = tokenData?.token || tokenData?.accessToken || '';

      console.log(`[玩家] Token:`, token ? `有(${token.substring(0, 10)}...)` : '无');

      if (!token) {
        console.log(`[玩家] Token数据:`, JSON.stringify(tokenData));
        return { success: false, message: '未登录，请先获取 Token' };
      }

      console.log(`[玩家] 📡 请求API: ${email}`);
      const result = await proxyRequest('/api/v1/player/profile', 'POST', {}, token);
      console.log(`[玩家] API响应:`, result ? `code=${result.code}` : '无响应');

      if (result && result.code === 20000 && result.data) {
        const playerData = result.data.player || result.data;
        store.savePlayerCache(email, { data: playerData, savedAt: Date.now() });
        console.log(`[玩家] ✅ 成功: ${email}`);
        return { success: true, data: playerData };
      }

      if (result && (result.code === 40100 || result.code === 401)) {
        store.deleteToken(email);
        return { success: false, message: 'Token 已过期，请重新登录' };
      }

      return { success: false, message: result?.message || '获取数据失败' };
    } catch (e) {
      console.error(`[玩家] ❌ ${email}:`, e.message);
      return { success: false, message: `网络错误: ${e.message}` };
    }
  },

  /**
   * 获取缓存的 Profile
   */
  getCachedProfile(email) {
    const cache = store.getPlayerCache(email);
    if (cache && cache.data) {
      return { success: true, data: cache.data };
    }
    return { success: false, message: '无缓存数据' };
  },
};
