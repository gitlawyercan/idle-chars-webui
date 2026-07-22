/**
 * 服务器配置
 * 
 * 所有配置集中管理，方便修改
 */
module.exports = {
  // 服务器监听端口
  port: parseInt(process.env.PORT || '3000'),

  // 游戏 API 配置
  gameApi: {
    baseUrl: 'https://idle.charsgame.com/api/v1',
    timeout: 15000, // 15秒超时
  },

  // 数据文件存储目录
  dataDir: process.env.DATA_DIR || './data',

  // JWT 密钥（本地签名用，可选）
  jwtSecret: process.env.JWT_SECRET || 'idle-chars-local-secret-key',

  // 自动同步间隔（毫秒），默认5分钟
  syncInterval: parseInt(process.env.SYNC_INTERVAL || '300000'),

  // 版本号
  version: '1.0.0',
};
