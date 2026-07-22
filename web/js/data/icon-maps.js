/**
 * icon-maps.js - 四图集图标中文名称映射表
 * 
 * 图集对应关系：
 *   texture-0.png ← texture-0.json → 怪物图标（54普通+10Boss）
 *   texture-1.png ← texture-1.json → 怪物图标（6夜间普通+10精英）
 *   texture-2.png ← texture-2.json → 装备/材料/食物图标
 *   texture-3.png ← texture-3.json → 技能/属性/UI/武器图标
 */

// ============================================================
// 一、怪物图标中文映射（texture-0 + texture-1）
// ============================================================

const MONSTER_ICON_CN_MAP = {
  // ----- texture-0 普通怪物 (54个) -----
  'icons/monster_icon/common/l01_woodland_slime.png':              '林地史莱姆',
  'icons/monster_icon/common/l02_acorn_weasel.png':                '橡果鼬',
  'icons/monster_icon/common/l03_pollen_sprite.png':               '花粉妖精',
  'icons/monster_icon/common/l04_moss_horn_fawn.png':              '苔角幼鹿',
  'icons/monster_icon/common/l05_spiny_boar.png':                  '刺背野猪',
  'icons/monster_icon/common/l06_forest_patrol_goblin.png':        '巡林地精',
  'icons/monster_icon/common/l07_spore_mushroom_spirit.png':       '孢子菇灵',
  'icons/monster_icon/common/l08_marsh_poison_frog.png':           '湿地毒蛙',
  'icons/monster_icon/common/l09_mudback_snapping_turtle.png':     '泥背鳄龟',
  'icons/monster_icon/common/l10_reed_imp.png':                    '芦苇精怪',
  'icons/monster_icon/common/l11_swamp_lizardman.png':             '沼地蜥人',
  'icons/monster_icon/common/l12_foglight_wisp.png':               '雾灯鬼火',
  'icons/monster_icon/common/l13_dune_fox.png':                    '沙丘狐',
  'icons/monster_icon/common/l14_singing_sand_lizard.png':         '鸣沙蜥',
  'icons/monster_icon/common/l15_yellow_sand_scarab.png':          '黄沙圣甲虫',
  'icons/monster_icon/common/l16_cactus_spirit.png':               '仙人掌妖灵',
  'icons/monster_icon/common/l17_scorpion_tail_hyena.png':         '蝎尾鬣犬',
  'icons/monster_icon/common/l18_sandstone_giant_scorpion.png':    '砂岩巨蝎',
  'icons/monster_icon/common/l19_reef_shell_hermit_crab.png':      '礁壳寄居蟹',
  'icons/monster_icon/common/l20_foam_sea_sprite.png':             '泡沫海精灵',
  'icons/monster_icon/common/l21_saltfin_jumping_fish.png':        '盐鳍跳鱼',
  'icons/monster_icon/common/l22_coral_seahorse_beast.png':        '珊瑚海马兽',
  'icons/monster_icon/common/l23_vortex_sea_turtle.png':           '涡流海龟',
  'icons/monster_icon/common/l24_deep_tide_water_spirit.png':      '深潮水妖',
  'icons/monster_icon/common/l25_snowfield_rabbit_spirit.png':     '雪原兔灵',
  'icons/monster_icon/common/l26_frostfur_snow_fox.png':           '霜毛雪狐',
  'icons/monster_icon/common/l27_cold_wind_snow_owl.png':          '寒风雪鸮',
  'icons/monster_icon/common/l28_ice_armor_reindeer.png':          '冰甲驯鹿',
  'icons/monster_icon/common/l29_white_mane_snow_bear.png':        '白鬃雪熊',
  'icons/monster_icon/common/l30_aurora_yeti.png':                 '极光雪怪',
  'icons/monster_icon/common/l31_crystal_cluster_bat.png':         '晶簇蝙蝠',
  'icons/monster_icon/common/l32_fluorite_imp.png':                '萤石小妖',
  'icons/monster_icon/common/l33_rock_armor_pangolin.png':         '岩甲穿山兽',
  'icons/monster_icon/common/l34_crystal_cave_spider.png':         '水晶穴蛛',
  'icons/monster_icon/common/l35_resonance_stone_golem.png':       '共鸣石偶',
  'icons/monster_icon/common/l36_prism_magic_eye.png':             '棱镜魔眼',
  'icons/monster_icon/common/l37_crypt_giant_rat.png':             '墓穴硕鼠',
  'icons/monster_icon/common/l38_armor_breaking_skeleton_soldier.png': '破甲骷髅兵',
  'icons/monster_icon/common/l39_ghostfire_book_spirit.png':       '幽火书灵',
  'icons/monster_icon/common/l40_rust_armor_guard.png':            '锈铠守卫',
  'icons/monster_icon/common/l41_dungeon_hound.png':               '地宫猎犬',
  'icons/monster_icon/common/l42_mystic_pattern_gargoyle.png':     '秘纹石像鬼',
  'icons/monster_icon/common/l43_ash_bat.png':                     '灰烬蝠',
  'icons/monster_icon/common/l44_flame_shell_beetle.png':          '炎壳甲虫',
  'icons/monster_icon/common/l45_lava_lizard.png':                 '熔岩蜥蜴',
  'icons/monster_icon/common/l46_sulfur_smoke_fire_spirit.png':    '硫烟火灵',
  'icons/monster_icon/common/l47_red_horn_lava_hound.png':         '赤角熔犬',
  'icons/monster_icon/common/l48_leyline_drake.png':               '地脉幼龙',
  'icons/monster_icon/common/l49_cloud_feather_sparrow_spirit.png':'云羽雀灵',
  'icons/monster_icon/common/l50_windcutter_hawk.png':             '风切鹰',
  'icons/monster_icon/common/l51_floating_jellyfish.png':          '浮空水母',
  'icons/monster_icon/common/l52_stardust_butterfly_sprite.png':   '星尘蝶妖',
  'icons/monster_icon/common/l53_sky_patrol_griffin.png':          '巡空狮鹫',
  'icons/monster_icon/common/l54_thunder_mane_cloud_foal.png':     '雷鬃云驹',

  // ----- texture-0 Boss (10个) -----
  'icons/monster_icon/boss/ancient_tree_warden.png':               '古树守望者',
  'icons/monster_icon/boss/spore_queen.png':                       '孢子女王',
  'icons/monster_icon/boss/golden_mane_oasis_guardian.png':        '金鬃绿洲守护兽',
  'icons/monster_icon/boss/deep_tide_siren.png':                   '深潮歌妖',
  'icons/monster_icon/boss/aurora_frosthorn_beast.png':            '极光霜角兽',
  'icons/monster_icon/boss/resonance_crystal_core_colossus.png':   '共鸣晶核巨像',
  'icons/monster_icon/boss/sealed_tomb_king.png':                  '封印墓王',
  'icons/monster_icon/boss/crimson_flame_dragon_turtle.png':       '赤焰龙龟',
  'icons/monster_icon/boss/storm_pegasus.png':                     '风暴天马',
  'icons/monster_icon/boss/dark_moon_bone_dragon.png':             '暗月骨龙',

  // ----- texture-1 夜间普通怪物 (6个) -----
  'icons/monster_icon/common/l55_night_raven_attendant.png':       '夜鸦侍从',
  'icons/monster_icon/common/l56_blood_rose_sprite.png':           '血蔷薇妖',
  'icons/monster_icon/common/l57_mirror_ghost.png':                '镜中幽灵',
  'icons/monster_icon/common/l58_shadow_hound.png':                '幽影猎犬',
  'icons/monster_icon/common/l59_moon_bat_marquis.png':            '月蝠侯爵',
  'icons/monster_icon/common/l60_coffin_stitched_shadow_demon.png':'棺木缝影魔',

  // ----- texture-1 精英怪物 (10个) -----
  'icons/monster_icon/elite/thorn_tusk_boar.png':                  '荆棘獠牙野猪',
  'icons/monster_icon/elite/rotten_mud_giant_mouth_frog.png':      '腐泥巨口蛙',
  'icons/monster_icon/elite/quicksand_stalker_scorpion.png':       '流沙潜猎蝎',
  'icons/monster_icon/elite/tide_rending_giant_claw_crab.png':     '裂潮巨钳蟹',
  'icons/monster_icon/elite/icefang_blizzard_bear.png':            '冰牙雪暴熊',
  'icons/monster_icon/elite/prism_cave_spider_matriarch.png':      '棱晶穴蛛母',
  'icons/monster_icon/elite/black_iron_executioner.png':           '黑铁刽子手',
  'icons/monster_icon/elite/molten_throat_leyline_lizard.png':     '熔喉地脉蜥',
  'icons/monster_icon/elite/thunder_feather_griffin_lord.png':     '雷羽狮鹫领主',
  'icons/monster_icon/elite/crimson_night_raven_count.png':        '猩红夜鸦伯爵',
};

// ============================================================
// 二、图集索引配置 — 供 icons.js 使用
// ============================================================

const TEXTURE_CONFIG = [
  {
    id: 0,
    image: '/textures/texture-0.png',
    json:  '/textures/texture-0.json',
    name: '怪物图集①',
    subCategories: [
      { key: 'monster_common', name: '普通怪物', pathPrefix: 'icons/monster_icon/common/' },
      { key: 'monster_boss',   name: 'Boss',     pathPrefix: 'icons/monster_icon/boss/' },
    ]
  },
  {
    id: 1,
    image: '/textures/texture-1.png',
    json:  '/textures/texture-1.json',
    name: '怪物图集②',
    subCategories: [
      { key: 'monster_night',  name: '夜间怪物', pathPrefix: 'icons/monster_icon/common/' },
      { key: 'monster_elite',  name: '精英怪物', pathPrefix: 'icons/monster_icon/elite/' },
    ]
  },
  {
    id: 2,
    image: '/textures/texture-2.png',
    json:  '/textures/texture-2.json',
    name: '装备材料图集',
    subCategories: [
      { key: 'equipment',      name: '装备',        pathPrefix: 'icons/equipment_icon/' },
      { key: 'weapon',         name: '武器',        pathPrefix: 'icons/weapon_icon/' },
      { key: 'essence',        name: '精华',        pathPrefix: 'icons/essence_icon/' },
      { key: 'processed',      name: '加工材料',    pathPrefix: 'icons/processed_intermediate_icon/' },
      { key: 'production_equip',name: '生产工具',   pathPrefix: 'icons/production_equipment_icon/' },
      { key: 'consumable',     name: '消耗品',      pathPrefix: 'icons/production_efficiency_consumable_icon/' },
    ]
  },
  {
    id: 3,
    image: '/textures/texture-3.png',
    json:  '/textures/texture-3.json',
    name: '技能UI图集',
    subCategories: [
      { key: 'combat_skill',   name: '战斗技能',      pathPrefix: 'icons/ui_icon/combat_attribute_skills/' },
      { key: 'combat_attr',    name: '战斗属性',      pathPrefix: 'icons/ui_icon/combat_attributes/' },
      { key: 'prod_attr',      name: '生产属性',      pathPrefix: 'icons/ui_icon/production_attributes/' },
      { key: 'prod_skill',     name: '生产技能',      pathPrefix: 'icons/ui_icon/production_skills/' },
      { key: 'general_attr',   name: '通用属性',      pathPrefix: 'icons/ui_icon/general_attributes/' },
      { key: 'general_item',   name: '通用物品',      pathPrefix: 'icons/ui_icon/general_item_icon/' },
      { key: 'common_ui',      name: '界面图标',      pathPrefix: 'icons/ui_icon/common_ui/' },
      { key: 'empty_slot',     name: '装备槽空位',    pathPrefix: 'icons/ui_icon/equipment_slot_empty_state_icon/' },
    ]
  }
];

// ============================================================
// 三、工具函数
// ============================================================

/**
 * 根据图集内的图标路径获取中文名称
 * @param {string} iconPath - 如 'icons/monster_icon/common/l01_woodland_slime.png'
 * @returns {string} 中文名称，找不到时返回路径末尾文件名
 */
function getIconChineseName(iconPath) {
  return MONSTER_ICON_CN_MAP[iconPath] || 
         iconPath.split('/').pop().replace('.png', '');
}

/**
 * 获取某个文件（帧名）属于哪个图集
 * @param {string} iconPath
 * @returns {number|null} 图集ID (0-3)
 */
function getTextureIdByPath(iconPath) {
  if (iconPath.startsWith('icons/monster_icon/')) {
    // 检查是 texture-0 还是 texture-1
    if (iconPath.includes('/common/') || iconPath.includes('/boss/')) {
      const file = iconPath.split('/').pop();
      const lNum = parseInt(file.match(/l(\d+)/)?.[1] || '0');
      if (lNum >= 55) return 1; // l55-l60 在 texture-1
      return 0; // l01-l54 + all boss 在 texture-0
    }
    if (iconPath.includes('/elite/')) return 1; // elite 在 texture-1
  }
  if (iconPath.startsWith('icons/equipment_icon/') ||
      iconPath.startsWith('icons/essence_icon/') ||
      iconPath.startsWith('icons/processed_intermediate_icon/') ||
      iconPath.startsWith('icons/production_equipment_icon/') ||
      iconPath.startsWith('icons/production_efficiency_consumable_icon/')) {
    return 2;
  }
  if (iconPath.startsWith('icons/ui_icon/') ||
      iconPath.startsWith('icons/weapon_icon/')) {
    return 3;
  }
  return null;
}

export {
  TEXTURE_CONFIG,
  MONSTER_ICON_CN_MAP,
  getIconChineseName,
  getTextureIdByPath
};
