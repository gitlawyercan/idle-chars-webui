/**
 * 技能ID映射表
 * 
 * 包含：
 * 1. 技能ID → 中文名/英文名/分类
 * 2. 采集技能 → 可采集的资源列表
 * 3. 技能类型分类
 */

// ===== 技能基础信息映射 =====
const SKILL_MAP = {
    1: { name: '伐木', en: 'woodcutting', cat: '采集类', catEn: 'gathering', icon: '🪓', 
         consumes: 'rune/skill_xp, efficiency/gathering',
         bonuses: '伐木效率+0.01, 伐木产量+0.01' },
    2: { name: '采矿', en: 'mining', cat: '采集类', catEn: 'gathering', icon: '⛏️',
         consumes: 'rune/skill_xp, efficiency/gathering',
         bonuses: '采矿效率+0.01, 采矿产量+0.01' },
    4: { name: '狩猎', en: 'hunting', cat: '采集类', catEn: 'gathering', icon: '🏹',
         consumes: 'rune/skill_xp, efficiency/gathering',
         bonuses: '狩猎效率+0.01, 狩猎产量+0.01' },
    5: { name: '种植', en: 'farming', cat: '采集类', catEn: 'gathering', icon: '🌱',
         consumes: 'rune/skill_xp, efficiency/gathering',
         bonuses: '种植效率+0.01, 种植产量+0.01' },

    6: { name: '烹饪', en: 'cooking', cat: '制作类', catEn: 'crafting', icon: '🍳',
         consumes: 'rune/skill_xp, efficiency/crafting',
         bonuses: '烹饪效率+0.01, 烹饪产量+0.01' },
    7: { name: '锻造', en: 'blacksmithing', cat: '制作类', catEn: 'crafting', icon: '🔨',
         consumes: 'rune/skill_xp, efficiency/crafting',
         bonuses: '锻造效率+0.01, 锻造产量+0.01' },
    8: { name: '炼金', en: 'alchemy', cat: '制作类', catEn: 'crafting', icon: '🧪',
         consumes: 'rune/skill_xp, efficiency/crafting',
         bonuses: '炼金效率+0.02 (无产量加成)' },
    9: { name: '强化', en: 'enhancement', cat: '制作类', catEn: 'crafting', icon: '✨',
         consumes: 'rune/skill_xp, efficiency/crafting',
         bonuses: '强化效率+0.01, 幸运+1' },
    10: { name: '裁缝', en: 'tailoring', cat: '制作类', catEn: 'crafting', icon: '🧵',
          consumes: 'rune/skill_xp, efficiency/crafting',
          bonuses: '裁缝效率+0.01, 裁缝产量+0.01' },
    12: { name: '铭文', en: 'inscription', cat: '制作类', catEn: 'crafting', icon: '✒️',
          consumes: 'rune/skill_xp, efficiency/crafting',
          bonuses: '铭文效率+0.01, 铭文产量+0.01' },

    13: { name: '强壮', en: 'strength', cat: '基础属性', catEn: 'basic', icon: '💪',
          consumes: '无', bonuses: 'HP+10' },
    14: { name: '近战', en: 'melee', cat: '基础属性', catEn: 'basic', icon: '⚔️',
          consumes: '无', bonuses: '物理命中率+2' },
    15: { name: '远程', en: 'ranged', cat: '基础属性', catEn: 'basic', icon: '🎯',
          consumes: '无', bonuses: '物理命中率+2' },
    16: { name: '法术', en: 'spellcasting', cat: '基础属性', catEn: 'basic', icon: '🔮',
          consumes: '无', bonuses: 'MP+10, 法术命中率+2' },

    17: { name: '长剑', en: 'longsword', cat: '武器专精', catEn: 'weapon', icon: '🗡️',
          consumes: '无', bonuses: '物理攻击+1, 魔法攻击+1' },
    18: { name: '剑盾', en: 'swordshield', cat: '武器专精', catEn: 'weapon', icon: '🛡️',
          consumes: '无', bonuses: '物理防御+1, 魔法防御+1' },
    19: { name: '长矛', en: 'spear', cat: '武器专精', catEn: 'weapon', icon: '🔱',
          consumes: '无', bonuses: '物理攻击+2' },
    20: { name: '弓箭', en: 'archery', cat: '武器专精', catEn: 'weapon', icon: '🏹',
          consumes: '无', bonuses: '物理攻击+1' },

    21: { name: '火焰', en: 'fire', cat: '元素魔法', catEn: 'elemental', icon: '🔥',
          consumes: '无', bonuses: '火焰伤害+1' },
    22: { name: '冰霜', en: 'frost', cat: '元素魔法', catEn: 'elemental', icon: '❄️',
          consumes: '无', bonuses: '冰霜伤害+1' },
    23: { name: '闪电', en: 'lightning', cat: '元素魔法', catEn: 'elemental', icon: '⚡',
          consumes: '无', bonuses: '闪电伤害+1' },
    24: { name: '神圣', en: 'holy', cat: '元素魔法', catEn: 'elemental', icon: '☀️',
          consumes: '无', bonuses: '神圣伤害+1, 治疗强度+2' },

    25: { name: '布甲', en: 'cloth_armor', cat: '护甲类', catEn: 'armor', icon: '👘',
          consumes: '无', bonuses: '魔法防御+2' },
    26: { name: '皮甲', en: 'light_armor', cat: '护甲类', catEn: 'armor', icon: '🧥',
          consumes: '无', bonuses: '物理防御+1, 魔法防御+1' },
    27: { name: '重甲', en: 'heavy_armor', cat: '护甲类', catEn: 'armor', icon: '🦺',
          consumes: '无', bonuses: '物理防御+2' },
};

// ===== 采集资源映射 =====
const SKILL_RESOURCES = {
    1: { name: '砍伐', pageUrl: '/game/woodcutting', resources: [
        { actionId: 1, itemId: 1, name: '松木', tier: 'T1' },
        { actionId: 2, itemId: 2, name: '橡木', tier: 'T2' },
        { actionId: 3, itemId: 3, name: '月桂木', tier: 'T3' },
        { actionId: 4, itemId: 4, name: '符纹木', tier: 'T4' },
        { actionId: 211, itemId: 101, name: '松林莓', tier: '副' },
        { actionId: 212, itemId: 102, name: '橡蜜果', tier: '副' },
        { actionId: 213, itemId: 103, name: '月桂银果', tier: '副' },
        { actionId: 214, itemId: 104, name: '符纹星果', tier: '副' },
    ]},
    2: { name: '采矿', pageUrl: '/game/mining', resources: [
        { actionId: 5, itemId: 5, name: '铜矿', tier: 'T1' },
        { actionId: 6, itemId: 6, name: '铁矿', tier: 'T2' },
        { actionId: 7, itemId: 7, name: '银矿', tier: 'T3' },
        { actionId: 8, itemId: 8, name: '秘银矿', tier: 'T4' },
    ]},
    4: { name: '打猎', pageUrl: '/game/hunting', resources: [
        { actionId: 9, itemId: 9, name: '轻皮', tier: 'T1' },
        { actionId: 10, itemId: 10, name: '厚皮', tier: 'T2' },
        { actionId: 11, itemId: 11, name: '月纹皮', tier: 'T3' },
        { actionId: 12, itemId: 12, name: '雪纹皮', tier: 'T4' },
    ]},
    5: { name: '种植', pageUrl: '/game/farming', resources: [
        { actionId: 13, itemId: 13, name: '亚麻', tier: 'T1-纤维' },
        { actionId: 15, itemId: 15, name: '棉花', tier: 'T2-纤维' },
        { actionId: 17, itemId: 17, name: '月麻', tier: 'T3-纤维' },
        { actionId: 16, itemId: 19, name: '符藤', tier: 'T4-纤维' },
        { actionId: 14, itemId: 14, name: '麦穗', tier: 'T1-粮食' },
        { actionId: 18, itemId: 16, name: '蜜糖麦', tier: 'T2-粮食' },
        { actionId: 19, itemId: 18, name: '月露果', tier: 'T3-粮食' },
        { actionId: 20, itemId: 20, name: '香米', tier: 'T4-粮食' },
    ]},
};

// ===== 技能分类映射 =====
const SKILL_CATEGORIES = {
    'gathering': { name: '采集类', icon: '🪓', skillIds: [1, 2, 4, 5] },
    'crafting':  { name: '制作类', icon: '🔨', skillIds: [6, 7, 8, 9, 10, 12] },
    'basic':     { name: '基础属性', icon: '💪', skillIds: [13, 14, 15, 16] },
    'weapon':    { name: '武器专精', icon: '🗡️', skillIds: [17, 18, 19, 20] },
    'elemental': { name: '元素魔法', icon: '🔥', skillIds: [21, 22, 23, 24] },
    'armor':     { name: '护甲类', icon: '🛡️', skillIds: [25, 26, 27] },
};

// ===== 辅助函数 =====

/**
 * 获取技能信息
 * @param {number} skillId - 技能ID
 * @returns {Object|null}
 */
function getSkillInfo(skillId) {
    return SKILL_MAP[skillId] || null;
}

/**
 * 获取技能中文名
 * @param {number} skillId - 技能ID
 * @returns {string}
 */
function getSkillName(skillId) {
    const skill = SKILL_MAP[skillId];
    return skill ? skill.name : `未知技能 (ID: ${skillId})`;
}

/**
 * 获取技能英文名
 * @param {number} skillId - 技能ID
 * @returns {string|null}
 */
function getSkillEn(skillId) {
    const skill = SKILL_MAP[skillId];
    return skill ? skill.en : null;
}

/**
 * 获取采集技能的资源列表
 * @param {number} skillId - 技能ID（1,2,4,5）
 * @returns {Array} 资源列表
 */
function getSkillResources(skillId) {
    const data = SKILL_RESOURCES[skillId];
    return data ? data.resources : [];
}

/**
 * 通过物品ID查找来源技能
 * @param {number} itemId - 物品ID
 * @returns {Object|null} { skillId, skillName, resource }
 */
function findSkillByItem(itemId) {
    for (const [skillId, data] of Object.entries(SKILL_RESOURCES)) {
        const resource = data.resources.find(r => r.itemId === itemId);
        if (resource) {
            return {
                skillId: parseInt(skillId),
                skillName: SKILL_MAP[parseInt(skillId)]?.name || data.name,
                resource: resource,
            };
        }
    }
    return null;
}

/**
 * 获取技能图标
 * @param {number} skillId - 技能ID
 * @returns {string} emoji 图标
 */
function getSkillIcon(skillId) {
    const skill = SKILL_MAP[skillId];
    return skill ? skill.icon : '📁';
}

/**
 * 获取技能分类列表
 * @returns {Array}
 */
function getSkillCategoryList() {
    return Object.entries(SKILL_CATEGORIES).map(([key, val]) => ({
        key: key,
        name: val.name,
        icon: val.icon,
        skillCount: val.skillIds.length,
        skills: val.skillIds.map(id => SKILL_MAP[id]).filter(Boolean),
    }));
}

/**
 * 按分类获取技能
 * @param {string} categoryEn - 分类英文名
 * @returns {Array}
 */
function getSkillsByCategory(categoryEn) {
    const cat = SKILL_CATEGORIES[categoryEn];
    if (!cat) return [];
    return cat.skillIds.map(id => SKILL_MAP[id]).filter(Boolean);
}

// ============================================================
// 技能ID → 图标图片文件名映射
// ============================================================

const SKILL_ICON_MAP = {
  1: 'logging.png',         // 伐木
  2: 'mining.png',          // 采矿
  4: 'hunting.png',         // 狩猎
  5: 'planting.png',        // 种植
  6: 'cooking.png',         // 烹饪
  7: 'forging.png',         // 锻造
  8: 'alchemy.png',         // 炼金
  9: 'enhancement.png',     // 强化
  10: 'tailoring.png',      // 裁缝
  12: 'inscription.png',    // 铭文
  13: 'strength.png',       // 强壮
  14: 'melee.png',          // 近战
  15: 'ranged.png',         // 远程
  16: 'magic.png',          // 法术
  17: 'longsword.png',      // 长剑
  18: 'dagger.png',         // 剑盾
  19: 'spear.png',          // 长矛
  20: 'bow.png',            // 弓箭
  21: 'fire.png',           // 火焰
  22: 'frost.png',          // 冰霜
  23: 'lightning.png',      // 闪电
  24: 'holy.png',           // 神圣
  25: 'cloth_armor.png',    // 布甲
  26: 'light_armor.png',    // 皮甲
  27: 'heavy_armor.png',    // 重甲
};

// ============================================================
// 属性图标图片映射（可用于 stats 模块显示属性图标）
// ============================================================

const STAT_ICON_MAP = {
  physical_attack:  'physical_attack.png',
  magic_attack:     'magic_attack.png',
  physical_defense: 'physical_defense.png',
  magic_defense:    'magic_defense.png',
  physical_hit:     'physical_hit.png',
  magic_hit:        'magic_hit.png',
  physical_dodge:   'physical_dodge.png',
  magic_dodge:      'magic_dodge.png',
  crit_rate:        'crit_rate.png',
  crit_damage:      'crit_damage.png',
  block_rate:       'block_rate.png',
  fire_damage:      'fire_damage.png',
  frost_damage:     'frost_damage.png',
  lightning_damage: 'lightning_damage.png',
  holy_damage:      'holy_damage.png',
  healing_power:    'healing_power.png',
  luck:             'luck.png',
  combat_exp_bonus: 'combat_experience_bonus.png',
  production_exp_bonus: 'production_experience_bonus.png',
};

/**
 * 获取技能图标图片文件名
 * @param {number} skillId - 技能ID
 * @returns {string} 图片文件名，若无则返回默认图标
 */
function getSkillIconImage(skillId) {
    return SKILL_ICON_MAP[skillId] || 'skill_scroll.png';
}

/**
 * 获取属性图标图片文件名
 * @param {string} statKey - 属性键名
 * @returns {string} 图片文件名
 */
function getStatIconImage(statKey) {
    return STAT_ICON_MAP[statKey];
}

