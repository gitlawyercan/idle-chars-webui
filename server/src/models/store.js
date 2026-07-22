/**
 * store.js - JSON 文件持久化存储
 * 
 * 管理 Token 和玩家数据缓存
 * 按邮箱分别存储
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../../data');

// 确保 data 目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(filename) {
  return path.join(DATA_DIR, filename);
}

// ============================================================
// Token 管理
// ============================================================

function getTokens() {
  const filePath = getFilePath('tokens.json');
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.error('读取 tokens.json 失败:', e.message);
  }
  return {};
}

function saveTokens(tokens) {
  try {
    fs.writeFileSync(getFilePath('tokens.json'), JSON.stringify(tokens, null, 2));
  } catch (e) {
    console.error('保存 tokens.json 失败:', e.message);
  }
}

module.exports = {
  /**
   * 保存指定邮箱的 Token
   */
  saveToken(email, data) {
    const tokens = getTokens();
    tokens[email] = {
      token: data.token,
      refreshToken: data.refreshToken || '',
      savedAt: data.savedAt || Date.now(),
    };
    saveTokens(tokens);
  },

  /**
   * 获取指定邮箱的 Token
   */
  getToken(email) {
    const tokens = getTokens();
    return tokens[email] || null;
  },

  /**
   * 删除指定邮箱的 Token
   */
  deleteToken(email) {
    const tokens = getTokens();
    delete tokens[email];
    saveTokens(tokens);
  },

  // ============================================================
  // 玩家数据缓存管理
  // ============================================================

  /**
   * 保存玩家数据缓存
   */
  savePlayerCache(email, data) {
    const filePath = getFilePath('playerCache.json');
    let cache = {};
    try {
      if (fs.existsSync(filePath)) {
        cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    } catch (e) {
      console.error('读取 playerCache.json 失败:', e.message);
    }

    cache[email] = {
      data: data.data,
      savedAt: data.savedAt || Date.now(),
    };

    try {
      fs.writeFileSync(filePath, JSON.stringify(cache, null, 2));
    } catch (e) {
      console.error('保存 playerCache.json 失败:', e.message);
    }
  },

  /**
   * 获取玩家数据缓存
   */
  getPlayerCache(email) {
    const filePath = getFilePath('playerCache.json');
    try {
      if (fs.existsSync(filePath)) {
        const cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return cache[email] || null;
      }
    } catch (e) {
      console.error('读取 playerCache.json 失败:', e.message);
    }
    return null;
  },

  /**
   * 删除玩家数据缓存
   */
  deletePlayerCache(email) {
    const filePath = getFilePath('playerCache.json');
    try {
      if (fs.existsSync(filePath)) {
        const cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        delete cache[email];
        fs.writeFileSync(filePath, JSON.stringify(cache, null, 2));
      }
    } catch (e) {
      console.error('删除 playerCache.json 失败:', e.message);
    }
  },

  /**
   * 获取所有有缓存的邮箱列表
   */
  getAllCachedEmails() {
    const filePath = getFilePath('playerCache.json');
    try {
      if (fs.existsSync(filePath)) {
        const cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return Object.keys(cache).filter(email => cache[email] && cache[email].data);
      }
    } catch (e) {}
    return [];
  },

  /**
   * 检查是否有指定邮箱的缓存
   */
  hasCache(email) {
    return !!this.getPlayerCache(email);
  },
};
