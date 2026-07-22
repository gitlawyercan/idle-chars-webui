/**
 * 游戏技能定义配置
 * 
 * 包含所有27个技能的完整数据：
 * - 基础信息（ID、名称、英文名、分类、图标）
 * - 每级属性增益规则
 * 
 * 用于后端计算属性加成和前端展示
 */

const skills = [
  // ====================================
  // 【采集类技能】4个
  // ====================================
  {
    id: 1,
    name: '伐木',
    en: 'woodcutting',
    cat: '采集类',
    icon: '🪓',
    bonuses: [
      { name: '伐木产量', key: 'logging_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '伐木效率', key: 'logging_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 2,
    name: '采矿',
    en: 'mining',
    cat: '采集类',
    icon: '⛏️',
    bonuses: [
      { name: '采矿产量', key: 'mining_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '采矿效率', key: 'mining_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 4,
    name: '狩猎',
    en: 'hunting',
    cat: '采集类',
    icon: '🏹',
    bonuses: [
      { name: '狩猎产量', key: 'hunting_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '狩猎效率', key: 'hunting_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 5,
    name: '种植',
    en: 'farming',
    cat: '采集类',
    icon: '🌱',
    bonuses: [
      { name: '种植效率', key: 'farming_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '种植产量', key: 'farming_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },

  // ====================================
  // 【制作类技能】6个
  // ====================================
  {
    id: 6,
    name: '烹饪',
    en: 'cooking',
    cat: '制作类',
    icon: '🍳',
    bonuses: [
      { name: '烹饪效率', key: 'cooking_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '烹饪产量', key: 'cooking_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 7,
    name: '锻造',
    en: 'blacksmithing',
    cat: '制作类',
    icon: '🔨',
    bonuses: [
      { name: '锻造效率', key: 'forging_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '锻造产量', key: 'forging_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 8,
    name: '炼金',
    en: 'alchemy',
    cat: '制作类',
    icon: '🧪',
    bonuses: [
      { name: '炼金效率', key: 'alchemy_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '炼金产量', key: 'alchemy_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 9,
    name: '强化',
    en: 'enhancement',
    cat: '制作类',
    icon: '✨',
    bonuses: [
      { name: '强化效率', key: 'enhancement_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '幸运', key: 'luck', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 10,
    name: '裁缝',
    en: 'tailoring',
    cat: '制作类',
    icon: '🧵',
    bonuses: [
      { name: '裁缝效率', key: 'tailoring_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '裁缝产量', key: 'tailoring_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },
  {
    id: 12,
    name: '铭文',
    en: 'inscription',
    cat: '制作类',
    icon: '✒️',
    bonuses: [
      { name: '铭文效率', key: 'inscription_efficiency', type: 'percent', perLv: 1, desc: '每级+1%' },
      { name: '铭文产量', key: 'inscription_yield', type: 'percent', perLv: 1, desc: '每级+1%' },
    ],
  },

  // ====================================
  // 【基础属性类技能】4个
  // ====================================
  {
    id: 13,
    name: '强壮',
    en: 'strength',
    cat: '基础属性',
    icon: '💪',
    bonuses: [
      { name: 'HP', key: 'hp', type: 'flat', perLv: 10, desc: '每级+10' },
    ],
  },
  {
    id: 14,
    name: '近战',
    en: 'melee',
    cat: '基础属性',
    icon: '⚔️',
    bonuses: [
      { name: '物理命中率', key: 'physical_hit', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },
  {
    id: 15,
    name: '远程',
    en: 'ranged',
    cat: '基础属性',
    icon: '🎯',
    bonuses: [
      { name: '物理命中率', key: 'physical_hit', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },
  {
    id: 16,
    name: '法术',
    en: 'spellcasting',
    cat: '基础属性',
    icon: '🔮',
    bonuses: [
      { name: 'MP', key: 'mp', type: 'flat', perLv: 10, desc: '每级+10' },
      { name: '法术命中率', key: 'magic_hit', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },

  // ====================================
  // 【武器专精类技能】4个
  // ====================================
  {
    id: 17,
    name: '长剑',
    en: 'longsword',
    cat: '武器专精',
    icon: '🗡️',
    bonuses: [
      { name: '物理攻击', key: 'physical_attack', type: 'flat', perLv: 1, desc: '每级+1' },
      { name: '魔法攻击', key: 'magic_attack', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 18,
    name: '剑盾',
    en: 'swordshield',
    cat: '武器专精',
    icon: '🛡️',
    bonuses: [
      { name: '物理防御', key: 'physical_defense', type: 'flat', perLv: 1, desc: '每级+1' },
      { name: '魔法防御', key: 'magic_defense', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 19,
    name: '长矛',
    en: 'spear',
    cat: '武器专精',
    icon: '🔱',
    bonuses: [
      { name: '物理攻击', key: 'physical_attack', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },
  {
    id: 20,
    name: '弓箭',
    en: 'archery',
    cat: '武器专精',
    icon: '🏹',
    bonuses: [
      { name: '物理攻击', key: 'physical_attack', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },

  // ====================================
  // 【元素/魔法类技能】4个
  // ====================================
  {
    id: 21,
    name: '火焰',
    en: 'fire',
    cat: '元素魔法',
    icon: '🔥',
    bonuses: [
      { name: '火焰伤害', key: 'fire_damage', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 22,
    name: '冰霜',
    en: 'frost',
    cat: '元素魔法',
    icon: '❄️',
    bonuses: [
      { name: '冰霜伤害', key: 'frost_damage', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 23,
    name: '闪电',
    en: 'lightning',
    cat: '元素魔法',
    icon: '⚡',
    bonuses: [
      { name: '闪电伤害', key: 'lightning_damage', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 24,
    name: '神圣',
    en: 'holy',
    cat: '元素魔法',
    icon: '☀️',
    bonuses: [
      { name: '神圣伤害', key: 'holy_damage', type: 'flat', perLv: 1, desc: '每级+1' },
      { name: '治疗强度', key: 'healing_power', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },

  // ====================================
  // 【护甲类技能】3个
  // ====================================
  {
    id: 25,
    name: '布甲',
    en: 'cloth_armor',
    cat: '护甲类',
    icon: '👘',
    bonuses: [
      { name: '魔法防御', key: 'magic_defense', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },
  {
    id: 26,
    name: '皮甲',
    en: 'light_armor',
    cat: '护甲类',
    icon: '🧥',
    bonuses: [
      { name: '物理防御', key: 'physical_defense', type: 'flat', perLv: 1, desc: '每级+1' },
      { name: '魔法防御', key: 'magic_defense', type: 'flat', perLv: 1, desc: '每级+1' },
    ],
  },
  {
    id: 27,
    name: '重甲',
    en: 'heavy_armor',
    cat: '护甲类',
    icon: '🦺',
    bonuses: [
      { name: '物理防御', key: 'physical_defense', type: 'flat', perLv: 2, desc: '每级+2' },
    ],
  },
];

/**
 * 技能名称映射表（ID → 中文名）
 */
const skillNames = {};
skills.forEach(s => {
  skillNames[s.id] = s.name;
});

/**
 * 根据技能 ID 获取技能数据
 */
function getSkillById(id) {
  return skills.find(s => s.id === id) || null;
}

/**
 * 根据分类获取技能列表
 */
function getSkillsByCategory(category) {
  return skills.filter(s => s.cat === category);
}

/**
 * 获取所有分类
 */
function getCategories() {
  const cats = {};
  skills.forEach(s => {
    if (!cats[s.cat]) {
      cats[s.cat] = { name: s.cat, count: 0 };
    }
    cats[s.cat].count++;
  });
  return Object.entries(cats).map(([key, val]) => ({ name: key, count: val.count }));
}

/**
 * 计算指定技能等级的总增益
 */
function calculateBonuses(skillId, level) {
  const skill = getSkillById(skillId);
  if (!skill || level <= 0) return [];

  return skill.bonuses.map(b => ({
    name: b.name,
    key: b.key,
    type: b.type,
    perLv: b.perLv,
    total: b.perLv * level,
    level: level,
  }));
}

/**
 * 计算所有技能的总增益汇总
 */
function calculateAllBonuses(skillLevels) {
  const totals = {};

  skills.forEach(skill => {
    const level = skillLevels[skill.id] || 0;
    if (level <= 0) return;

    skill.bonuses.forEach(bonus => {
      if (!totals[bonus.key]) {
        totals[bonus.key] = {
          name: bonus.name,
          type: bonus.type,
          total: 0,
        };
      }
      totals[bonus.key].total += bonus.perLv * level;
    });
  });

  return totals;
}

module.exports = {
  skills,
  skillNames,
  getSkillById,
  getSkillsByCategory,
  getCategories,
  calculateBonuses,
  calculateAllBonuses,
};
