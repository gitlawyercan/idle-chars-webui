/**
 * 玩家数据 API 控制器 - 修复多账号问题
 */
const playerService = require('../services/playerService');

module.exports = {
  /**
   * GET/POST /api/player/profile?email=xxx
   * 获取完整的玩家资料
   */
  async profile(req, res) {
    try {
      // 支持 GET query 和 POST body 两种方式传入 email
      const email = req.query.email || req.body?.email;

      if (!email) {
        return res.json({ code: 40000, message: '缺少邮箱参数' });
      }

      console.log(`[玩家] 请求资料: ${email}`);

      // 先从缓存获取
      const cached = playerService.getCachedProfile(email);
      if (cached.success) {
        console.log(`[玩家] 📦 返回缓存: ${email}`);
        return res.json({
          code: 20000,
          message: '缓存数据',
          data: { player: cached.data },
          cached: true,
        });
      }

      // 无缓存，从游戏 API 拉取
      console.log(`[玩家] 📡 从API获取: ${email}`);
      const result = await playerService.getProfile(email);

      if (result.success) {
        res.json({
          code: 20000,
          message: 'success',
          data: { player: result.data },
          cached: false,
        });
      } else {
        res.json({
          code: 50000,
          message: result.message || '获取玩家数据失败',
        });
      }
    } catch (e) {
      console.error('[玩家] ❌ 获取资料错误:', e.message);
      res.json({ code: 50000, message: `服务器错误: ${e.message}` });
    }
  },

  /**
   * GET /api/player/skills?email=xxx
   * 只获取技能数据
   */
  async skills(req, res) {
    try {
      const email = req.query.email;

      if (!email) {
        return res.json({ code: 40000, message: '缺少邮箱参数' });
      }

      const cached = playerService.getCachedProfile(email);
      if (cached.success && cached.data.actionSkills) {
        const skills = cached.data.actionSkills.map(s => ({
          id: s.actionSkillId,
          level: s.level,
          exp: s.xp,
          expToNext: s.xpNext,
          totalExp: s.totalXp,
        }));
        return res.json({ code: 20000, data: { skills, playerName: cached.data.name } });
      }

      const result = await playerService.getProfile(email);
      if (result.success && result.data.actionSkills) {
        const skills = result.data.actionSkills.map(s => ({
          id: s.actionSkillId,
          level: s.level,
          exp: s.xp,
          expToNext: s.xpNext,
          totalExp: s.totalXp,
        }));
        res.json({ code: 20000, data: { skills, playerName: result.data.name } });
      } else {
        res.json({ code: 50000, message: result.message || '获取技能数据失败' });
      }
    } catch (e) {
      console.error('获取技能数据错误:', e.message);
      res.json({ code: 50000, message: e.message });
    }
  },
};
