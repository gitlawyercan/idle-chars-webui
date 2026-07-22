/**
 * icons.js - 图标浏览模块
 * 
 * 集成四图集(texture-0 ~ texture-3)的加载与中文名称显示
 * 全局变量方式，兼容普通 <script> 加载
 */

// ============================================================
// 图集配置
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
      { key: 'equipment',       name: '装备',     pathPrefix: 'icons/equipment_icon/' },
      { key: 'essence',         name: '精华',     pathPrefix: 'icons/essence_icon/' },
      { key: 'processed',       name: '加工材料', pathPrefix: 'icons/processed_intermediate_icon/' },
      { key: 'production_equip',name: '生产工具', pathPrefix: 'icons/production_equipment_icon/' },
      { key: 'consumable',      name: '消耗品',   pathPrefix: 'icons/production_efficiency_consumable_icon/' },
    ]
  },
  {
    id: 3,
    image: '/textures/texture-3.png',
    json:  '/textures/texture-3.json',
    name: '技能UI图集',
    subCategories: [
      { key: 'combat_skill', name: '战斗技能',   pathPrefix: 'icons/ui_icon/combat_attribute_skills/' },
      { key: 'combat_attr',  name: '战斗属性',   pathPrefix: 'icons/ui_icon/combat_attributes/' },
      { key: 'prod_attr',    name: '生产属性',   pathPrefix: 'icons/ui_icon/production_attributes/' },
      { key: 'prod_skill',   name: '生产技能',   pathPrefix: 'icons/ui_icon/production_skills/' },
      { key: 'general_attr', name: '通用属性',   pathPrefix: 'icons/ui_icon/general_attributes/' },
      { key: 'general_item', name: '通用物品',   pathPrefix: 'icons/ui_icon/general_item_icon/' },
      { key: 'common_ui',    name: '界面图标',   pathPrefix: 'icons/ui_icon/common_ui/' },
      { key: 'empty_slot',   name: '装备槽空位', pathPrefix: 'icons/ui_icon/equipment_slot_empty_state_icon/' },
    ]
  }
];

// ============================================================
// 怪物图标中文名称映射
// ============================================================
const MONSTER_ICON_CN_MAP = {
  // ----- texture-0 普通怪物 -----
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

  // ----- texture-0 Boss -----
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

  // ----- texture-1 夜间普通怪物 -----
  'icons/monster_icon/common/l55_night_raven_attendant.png':       '夜鸦侍从',
  'icons/monster_icon/common/l56_blood_rose_sprite.png':           '血蔷薇妖',
  'icons/monster_icon/common/l57_mirror_ghost.png':                '镜中幽灵',
  'icons/monster_icon/common/l58_shadow_hound.png':                '幽影猎犬',
  'icons/monster_icon/common/l59_moon_bat_marquis.png':            '月蝠侯爵',
  'icons/monster_icon/common/l60_coffin_stitched_shadow_demon.png':'棺木缝影魔',

  // ----- texture-1 精英怪物 -----
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
// 技能图标 → 中文名称映射（直接嵌入，不依赖 skill-map.js）
// ============================================================
const SKILL_ICON_CN = {
  'logging': '伐木', 'mining': '采矿', 'hunting': '狩猎', 'planting': '种植',
  'cooking': '烹饪', 'forging': '锻造', 'alchemy': '炼金', 'enhancement': '强化',
  'tailoring': '裁缝', 'inscription': '铭文',
  'strength': '强壮', 'melee': '近战', 'ranged': '远程', 'magic': '法术',
  'longsword': '长剑', 'dagger': '剑盾', 'spear': '长矛', 'bow': '弓箭',
  'fire': '火焰', 'frost': '冰霜', 'lightning': '闪电', 'holy': '神圣',
  'cloth_armor': '布甲', 'light_armor': '皮甲', 'heavy_armor': '重甲',
};

// ============================================================
// 属性图标 → 中文名称映射
// ============================================================
const STAT_ICON_CN = {
  'physical_attack': '物理攻击', 'magic_attack': '魔法攻击',
  'physical_defense': '物理防御', 'magic_defense': '魔法防御',
  'physical_hit': '物理命中', 'magic_hit': '魔法命中',
  'physical_dodge': '物理闪避', 'magic_dodge': '魔法闪避',
  'crit_rate': '暴击率', 'crit_damage': '暴击伤害',
  'block_rate': '格挡率',
  'fire_damage': '火焰伤害', 'frost_damage': '冰霜伤害',
  'lightning_damage': '闪电伤害', 'holy_damage': '神圣伤害',
  'healing_power': '治疗强度', 'luck': '幸运',
  'combat_exp_bonus': '战斗经验加成', 'production_exp_bonus': '生产经验加成',
};

// ============================================================
// 生产属性 → 中文名称映射
// ============================================================
const PROD_ATTR_ICON_CN = {
  'gathering_efficiency': '采集效率', 'gathering_yield': '采集产量',
  'crafting_efficiency': '制作效率', 'crafting_yield': '制作产量',
  'woodcutting_efficiency': '伐木效率', 'mining_efficiency': '采矿效率',
  'hunting_efficiency': '狩猎效率', 'farming_efficiency': '种植效率',
  'cooking_efficiency': '烹饪效率', 'forging_efficiency': '锻造效率',
  'alchemy_efficiency': '炼金效率', 'enhancement_efficiency': '强化效率',
  'tailoring_efficiency': '裁缝效率', 'inscription_efficiency': '铭文效率',
};

// ============================================================
// 通用物品 → 中文名称映射
// ============================================================
const GENERAL_ITEM_CN = {
  'combat_xp': '战斗经验', 'production_xp': '生产经验',
  'hp': '生命值', 'mp': '魔法值', 'stamina': '体力',
  'coin': '金币', 'level_up': '升级',
};

// ============================================================
// 装备/物品名称映射
// ============================================================
const EQUIPMENT_NAME_MAP = {
  'thunderfeather_skypatrol_chestpiece': '雷羽巡空皮衣',
  'thunderfeather_skypatrol_gloves': '雷羽巡空护手',
  'thunderfeather_skypatrol_hood': '雷羽巡空帽',
  'thunderfeather_skypatrol_legguards': '雷羽巡空护腿',
  'thunderfeather_skypatrol_boots': '雷羽巡空猎靴',
  'grass_dew_gathering_gloves': '草露采集手套',
  'grass_dew_gathering_hat': '草露采集帽',
  'grass_dew_gathering_jacket': '草露采集衣',
  'grass_dew_gathering_pants': '草露采集裤',
  'grass_dew_gathering_short_boots': '草露采集短靴',
  'coarse_cloth_craftsman_hat': '粗布工匠帽',
  'coarse_cloth_craftsman_work_robe': '粗布工匠工袍',
  'coarse_cloth_craftsman_gloves': '粗布工匠手套',
  'coarse_cloth_craftsman_pants': '粗布工匠裤',
  'coarse_cloth_craftsman_work_boots': '粗布工匠工靴',
  'coarse_cloth_alchemy_hat': '粗布炼金帽',
  'coarse_cloth_alchemy_work_robe': '粗布炼金工袍',
  'coarse_cloth_alchemy_gloves': '粗布炼金手套',
  'coarse_cloth_alchemy_pants': '粗布炼金裤',
  'coarse_cloth_alchemy_work_boots': '粗布炼金工靴',
  'coarse_cloth_enhancement_hat': '粗布强化帽',
  'coarse_cloth_enhancement_work_robe': '粗布强化工袍',
  'coarse_cloth_enhancement_gloves': '粗布强化手套',
  'coarse_cloth_enhancement_pants': '粗布强化裤',
  'coarse_cloth_enhancement_work_boots': '粗布强化工靴',
  'flame_pattern_walker_hat': '焰纹行者帽',
  'flame_pattern_walker_robe': '焰纹行者袍',
  'flame_pattern_walker_gloves': '焰纹行者手套',
  'flame_pattern_walker_pants': '焰纹行者裤',
  'flame_pattern_walker_boots': '焰纹行者短靴',
  'moon_pattern_spellwoven_hood': '月纹咒织兜帽',
  'moon_pattern_spellwoven_robe': '月纹咒织长袍',
  'moon_pattern_spellwoven_gauntlets': '月纹咒织护手',
  'moon_pattern_spellwoven_leggings': '月纹咒织护腿',
  'moon_pattern_spellwoven_boots': '月纹咒织长靴',
  'rune_light_arcane_crown': '符光秘法冠',
  'rune_light_arcane_robe': '符光秘法长袍',
  'rune_light_arcane_gauntlets': '符光秘法护手',
  'rune_light_arcane_leggings': '符光秘法护腿',
  'rune_light_arcane_boots': '符光秘法步靴',
  'workshop_craftsman_hat': '工坊工匠帽',
  'workshop_craftsman_work_robe': '工坊工匠工袍',
  'workshop_craftsman_gauntlets': '工坊工匠护手',
  'workshop_craftsman_leggings': '工坊工匠护腿',
  'workshop_craftsman_work_boots': '工坊工匠工靴',
  'workshop_alchemy_hat': '工坊炼金帽',
  'workshop_alchemy_work_robe': '工坊炼金工袍',
  'workshop_alchemy_gauntlets': '工坊炼金护手',
  'workshop_alchemy_leggings': '工坊炼金护腿',
  'workshop_alchemy_work_boots': '工坊炼金工靴',
  'workshop_enhancement_hat': '工坊强化帽',
  'workshop_enhancement_work_robe': '工坊强化工袍',
  'workshop_enhancement_gauntlets': '工坊强化护手',
  'workshop_enhancement_leggings': '工坊强化护腿',
  'workshop_enhancement_work_boots': '工坊强化工靴',
  'moon_pattern_craftsman_hat': '月纹工匠帽',
  'moon_pattern_craftsman_work_robe': '月纹工匠工袍',
  'moon_pattern_craftsman_gauntlets': '月纹工匠护手',
  'moon_pattern_craftsman_leggings': '月纹工匠护腿',
  'moon_pattern_craftsman_long_boots': '月纹工匠长靴',
  'moon_pattern_alchemy_hat': '月纹炼金帽',
  'moon_pattern_alchemy_work_robe': '月纹炼金工袍',
  'moon_pattern_alchemy_gauntlets': '月纹炼金护手',
  'moon_pattern_alchemy_leggings': '月纹炼金护腿',
  'moon_pattern_alchemy_long_boots': '月纹炼金长靴',
  'moon_pattern_enhancement_hat': '月纹强化帽',
  'moon_pattern_enhancement_work_robe': '月纹强化工袍',
  'moon_pattern_enhancement_gauntlets': '月纹强化护手',
  'moon_pattern_enhancement_leggings': '月纹强化护腿',
  'moon_pattern_enhancement_long_boots': '月纹强化长靴',
  'rune_pattern_craftsman_crown': '符纹工匠冠',
  'rune_pattern_craftsman_work_robe': '符纹工匠工袍',
  'rune_pattern_craftsman_gauntlets': '符纹工匠护手',
  'rune_pattern_craftsman_leggings': '符纹工匠护腿',
  'rune_pattern_craftsman_step_boots': '符纹工匠步靴',
  'rune_pattern_alchemy_crown': '符纹炼金冠',
  'rune_pattern_alchemy_work_robe': '符纹炼金工袍',
  'rune_pattern_alchemy_gauntlets': '符纹炼金护手',
  'rune_pattern_alchemy_leggings': '符纹炼金护腿',
  'rune_pattern_alchemy_step_boots': '符纹炼金步靴',
  'rune_pattern_enhancement_crown': '符纹强化冠',
  'rune_pattern_enhancement_work_robe': '符纹强化工袍',
  'rune_pattern_enhancement_gauntlets': '符纹强化护手',
  'rune_pattern_enhancement_leggings': '符纹强化护腿',
  'rune_pattern_enhancement_step_boots': '符纹强化步靴',
  'wild_path_gathering_hat': '野径采集帽',
  'wild_path_gathering_coat': '野径采集外衣',
  'wild_path_gathering_gloves': '野径采集手套',
  'wild_path_gathering_leggings': '野径采集护腿',
  'wild_path_gathering_travel_boots': '野径采集行靴',
  'moon_pattern_gathering_leather_cap': '月纹采集风帽',
  'moon_pattern_gathering_leather_armor_jacket': '月纹采集外衣',
  'moon_pattern_gathering_gauntlets': '月纹采集护手',
  'moon_pattern_gathering_leggings': '月纹采集护腿',
  'moon_pattern_gathering_long_boots': '月纹采集长靴',
  'rune_pattern_gathering_hood': '符纹采集兜帽',
  'rune_pattern_gathering_long_coat': '符纹采集长衣',
  'rune_pattern_gathering_gauntlets': '符纹采集护手',
  'rune_pattern_gathering_leggings': '符纹采集护腿',
  'rune_pattern_gathering_step_boots': '符纹采集步靴',
  'grass_dew_apprentice_hat': '草露学徒帽',
  'grass_dew_apprentice_robe': '草露学徒袍',
  'grass_dew_apprentice_gloves': '草露学徒手套',
  'grass_dew_apprentice_pants': '草露学徒裤',
  'grass_dew_apprentice_boots': '草露学徒短靴',
  'apprentice_logging_axe': '学徒伐木斧',
  'apprentice_mining_pickaxe': '学徒采矿镐',
  'apprentice_hunting_knife': '学徒猎刀',
  'apprentice_planting_hoe': '学徒种植锄',
  'apprentice_chef_hat': '学徒厨师帽',
  'apprentice_forging_hammer': '学徒锻造锤',
  'apprentice_alchemy_bottle': '学徒炼金瓶',
  'apprentice_enhancement_hammer': '学徒强化锤',
  'apprentice_tailoring_needle': '学徒裁缝针',
  'apprentice_quill': '学徒羽毛笔',
  'craftsman_logging_axe': '工匠伐木斧',
  'craftsman_mining_pickaxe': '工匠采矿镐',
  'craftsman_hunting_knife': '工匠猎刀',
  'craftsman_planting_hoe': '工匠种植锄',
  'craftsman_chef_hat': '工匠厨师帽',
  'craftsman_forging_hammer': '工匠锻造锤',
  'craftsman_alchemy_bottle': '工匠炼金瓶',
  'craftsman_enhancement_hammer': '工匠强化锤',
  'craftsman_tailoring_needle': '工匠裁缝针',
  'craftsman_quill': '工匠羽毛笔',
  'moon_pattern_logging_axe': '月纹伐木斧',
  'moon_pattern_mining_pickaxe': '月纹采矿镐',
  'moon_pattern_hunting_knife': '月纹猎刀',
  'moon_pattern_planting_hoe': '月纹种植锄',
  'moon_pattern_chef_hat': '月纹厨师帽',
  'moon_pattern_forging_hammer': '月纹锻造锤',
  'moon_pattern_alchemy_bottle': '月纹炼金瓶',
  'moon_pattern_enhancement_hammer': '月纹强化锤',
  'moon_pattern_tailoring_needle': '月纹裁缝针',
  'moon_pattern_quill': '月纹羽毛笔',
  'rune_pattern_logging_axe': '符纹伐木斧',
  'rune_pattern_mining_pickaxe': '符纹采矿镐',
  'rune_pattern_hunting_knife': '符纹猎刀',
  'rune_pattern_planting_hoe': '符纹种植锄',
  'rune_pattern_chef_hat': '符纹厨师帽',
  'rune_pattern_forging_hammer': '符纹锻造锤',
  'rune_pattern_alchemy_bottle': '符纹炼金瓶',
  'rune_pattern_enhancement_hammer': '符纹强化锤',
  'rune_pattern_tailoring_needle': '符纹裁缝针',
  'rune_pattern_quill': '符纹羽毛笔',
  'copper_leaf_short_sword': '铜叶短剑',
  'copper_leaf_sword_shield': '铜叶剑盾',
  'pine_edge_spear': '松锋长矛',
  'softwood_hunting_bow': '软木猎弓',
  'grass_dew_conduit_staff': '草露导能杖',
  'grass_dew_heartguard_pendant': '草露护心坠',
  'copper_star_ring': '铜星指环',
  'iron_wind_longsword': '铁风长剑',
  'iron_wall_sword_shield': '铁壁剑盾',
  'iron_feather_hunting_spear': '铁羽猎矛',
  'hardwood_wanderer_bow': '硬木游弓',
  'blazing_flame_threadlight_staff': '炎焰纤光杖',
  'iron_flame_traveler_pendant': '铁焰旅人坠',
  'iron_flame_ring': '铁焰指环',
  'silver_radiance_moon_pattern_sword': '银辉月纹剑',
  'silver_pattern_sword_shield': '银纹剑盾',
  'crimson_pattern_crescent_spear': '赤纹月牙枪',
  'crimson_pattern_deer_shadow_bow': '赤纹鹿影弓',
  'moon_dew_spell_pattern_staff': '月露咒纹杖',
  'moon_pattern_wish_chain': '月纹祈愿链',
  'moon_dew_silver_pattern_ring': '月露银纹戒',
  'mithril_rune_seal_sword': '秘银符印剑',
  'mystic_pattern_sword_shield': '秘纹剑盾',
  'rune_iron_wind_rending_spear': '符铁裂风矛',
  'rune_pattern_wind_chaser_bow': '符纹追风弓',
  'rune_mithril_staff': '符文秘银杖',
  'rune_light_mithril_pendant': '符光秘银坠',
  'mithril_rune_pattern_ring': '秘银符纹戒',
  'copper_rivet_guard_helm': '铜铆守卫盔',
  'copper_rivet_guard_chestplate': '铜铆守卫胸甲',
  'copper_rivet_guard_gauntlets': '铜铆守卫护手',
  'copper_rivet_guard_legplates': '铜铆守卫腿甲',
  'copper_rivet_guard_war_boots': '铜铆守卫战靴',
  'iron_wall_patrol_guard_helm': '铁壁巡卫盔',
  'iron_wall_patrol_guard_chestplate': '铁壁巡卫胸甲',
  'iron_wall_patrol_guard_armguards': '铁壁巡卫臂甲',
  'iron_wall_patrol_guard_legplates': '铁壁巡卫腿甲',
  'iron_wall_patrol_guard_heavy_boots': '铁壁巡卫重靴',
  'silver_lock_fortress_helm': '银锁堡垒盔',
  'silver_lock_fortress_chestplate': '银锁堡垒胸甲',
  'silver_lock_fortress_armguards': '银锁堡垒臂甲',
  'silver_lock_fortress_legplates': '银锁堡垒腿甲',
  'silver_lock_fortress_war_boots': '银锁堡垒战靴',
  'mithril_lion_guard_helm': '秘银狮卫盔',
  'mithril_lion_guard_chestplate': '秘银狮卫胸甲',
  'mithril_lion_guard_armguards': '秘银狮卫臂甲',
  'mithril_lion_guard_legplates': '秘银狮卫腿甲',
  'mithril_lion_guard_lionstride_boots': '秘银狮卫雄步靴',
  'wildfield_stalker_hat': '原野追猎帽',
  'wildfield_stalker_leather_jacket': '原野追猎皮衣',
  'wildfield_stalker_gloves': '原野追猎手套',
  'wildfield_stalker_leggings': '原野追猎护腿',
  'wildfield_stalker_boots': '原野追猎短靴',
  'wild_fang_walker_hood': '野牙行者兜帽',
  'wild_fang_walker_hunting_outfit': '野牙行者猎装',
  'wild_fang_walker_gauntlets': '野牙行者护手',
  'wild_fang_walker_leggings': '野牙行者护腿',
  'wild_fang_walker_hunting_boots': '野牙行者猎靴',
  'deer_shadow_ranger_hood': '鹿影游侠风帽',
  'deer_shadow_ranger_leather_armor': '鹿影游侠皮甲',
  'deer_shadow_ranger_bracers': '鹿影游侠护腕',
  'deer_shadow_ranger_leggings': '鹿影游侠护腿',
  'deer_shadow_ranger_boots': '鹿影游侠长靴',
  'wolf_pattern_swift_hunter_hood': '狼纹疾猎兜帽',
  'wolf_pattern_swift_hunter_battle_leather_armor': '狼纹疾猎战皮甲',
  'wolf_pattern_swift_hunter_bracers': '狼纹疾猎护腕',
  'wolf_pattern_swift_hunter_leggings': '狼纹疾猎护腿',
  'wolf_pattern_swift_hunter_swiftwind_boots': '狼纹疾猎疾风靴',
};

const ESSENCE_MAP = {
  'logging_essence_transparent': '伐木精华',
  'mining_essence_transparent': '采矿精华',
  'hunting_essence_transparent': '狩猎精华',
  'planting_essence_transparent': '种植精华',
  'cooking_essence_transparent': '烹饪精华',
  'forging_essence_transparent': '锻造精华',
  'tailoring_essence_transparent': '裁缝精华',
  'inscription_essence_transparent': '铭文精华',
  'alchemy_essence_transparent': '炼金精华',
  'enhancement_essence_transparent': '强化精华',
};

const MATERIAL_MAP = {
  'pine_wood': '松木', 'oak_wood': '橡木', 'laurel_wood': '月桂木', 'runewood': '符纹木',
  'copper_ore': '铜矿', 'iron_ore': '铁矿', 'silver_ore': '银矿', 'mithril_ore': '秘银矿',
  'light_hide': '轻皮', 'thick_hide': '厚皮', 'moon_pattern_hide': '月纹皮', 'snow_pattern_hide': '雪纹皮',
  'flax': '亚麻', 'cotton': '棉花', 'moon_flax': '月麻', 'rune_vine': '符藤',
  'wheat_ear': '麦穗', 'honey_wheat': '蜜糖麦', 'moon_dew_fruit': '月露果', 'fragrant_rice': '香米',
  'pinewood_berry': '松林莓', 'oak_honeyfruit': '橡蜜果', 'silver_laurel_fruit': '月桂银果', 'runic_starfruit': '符纹星果',
  'copper_ingot': '铜锭', 'iron_ingot': '铁锭', 'silver_ingot': '银锭', 'mithril_ingot': '秘银锭',
  'pine_plank': '松木板', 'oak_plank': '橡木板', 'laurel_plank': '月桂木板', 'runewood_plank': '符纹木板',
  'light_leather': '轻皮革', 'thick_leather': '厚皮革', 'moon_pattern_leather': '月纹皮革', 'snow_pattern_leather': '雪纹皮革',
  'flax_cloth': '亚麻布', 'cotton_cloth': '棉布', 'moon_flax_cloth': '月麻布', 'rune_vine_cloth': '符藤布',
};

const FOOD_MAP = {
  'wheat_fragrant_bread': '麦香面包', 'honey_roasted_bread': '蜜烤面包',
  'moon_dew_soft_bread': '月露软面包', 'fragrant_rice_thick_bread': '香米厚面包',
  'home_style_stew': '家常炖汤', 'spicy_broth': '辛香肉汤',
  'deer_antler_stew': '鹿茸炖汤', 'wolf_bone_thick_soup': '狼骨浓汤',
  'sweet_cake': '清甜蛋糕', 'honey_cake': '蜜糖蛋糕',
  'moon_dew_cake': '月露蛋糕', 'fragrant_rice_cake': '香米蛋糕',
  'clear_dew_drink': '清露饮', 'spicy_drink': '辛香饮',
  'moon_dew_drink': '月露饮', 'crystal_dew_flask': '符露饮',
  't1_gathering_pie': 'T1采集派', 't2_gathering_pie': 'T2采集派', 't3_gathering_pie': 'T3采集派',
  't1_crafting_salad': 'T1工艺沙拉', 't2_crafting_salad': 'T2工艺沙拉', 't3_crafting_salad': 'T3工艺沙拉',
};

const RUNE_MAP = {
  't1_rune_attack': 'T1攻击符文', 't2_rune_attack': 'T2攻击符文', 't3_rune_attack': 'T3攻击符文',
  't1_rune_defend': 'T1防御符文', 't2_rune_defend': 'T2防御符文', 't3_rune_defend': 'T3防御符文',
  't1_rune_attack_speed': 'T1攻速符文', 't2_rune_attack_speed': 'T2攻速符文', 't3_rune_attack_speed': 'T3攻速符文',
  't1_rune_hit': 'T1命中符文', 't2_rune_hit': 'T2命中符文', 't3_rune_hit': 'T3命中符文',
  't1_rune_skill_exp': 'T1技能经验符文', 't2_rune_skill_exp': 'T2技能经验符文', 't3_rune_skill_exp': 'T3技能经验符文',
  't1_rune_critical': 'T1暴击符文', 't2_rune_critical': 'T2暴击符文', 't3_rune_critical': 'T3暴击符文',
  't1_rune_mana': 'T1法力符文', 't2_rune_mana': 'T2法力符文', 't3_rune_mana': 'T3法力符文',
  't1_rune_life': 'T1生命符文', 't2_rune_life': 'T2生命符文', 't3_rune_life': 'T3生命符文',
};

const SCROLL_MAP = {
  'heavy_strike_scroll': '重击卷轴', 'sunder_stance_strike_scroll': '断势击卷轴',
  'sweeping_strike_scroll': '横扫击卷轴', 'charged_slam_scroll': '蓄力猛击卷轴',
  'fireball_scroll': '火球术卷轴', 'pyroblast_scroll': '炎爆术卷轴',
  'ice_arrow_scroll': '寒冰箭卷轴', 'blizzard_scroll': '暴风雪卷轴',
  'chain_lightning_scroll': '闪电链卷轴', 'lightning_storm_scroll': '闪电风暴卷轴',
  'rapid_shot': '快速射击卷轴', 'precision': '精准卷轴',
  'split_shot': '分裂攻击卷轴', 'envenomed_arrows': '箭矢荼毒卷轴',
  'poison_arrow': '毒箭卷轴', 'backstep': '后跳卷轴',
  'focused_shot': '凝心射击卷轴', 'barrage': '乱射卷轴',
  'rapid_volley': '连射卷轴', 'toxic_burst': '毒性爆发卷轴',
  'eagle_eye': '鹰眼卷轴', 'divine_light_strike': '圣光打击卷轴',
};

const UI_MAP = {
  'empty_helmet_slot': '头盔槽空位', 'empty_chest_slot': '胸甲槽空位',
  'empty_gloves_slot': '手套槽空位', 'empty_leggings_slot': '护腿槽空位',
  'empty_boots_slot': '靴子槽空位', 'empty_weapon_slot': '武器槽空位',
  'empty_shield_slot': '盾牌槽空位', 'empty_ring_slot': '戒指槽空位',
  'empty_necklace_slot': '项链槽空位', 'empty_tool_slot': '工具槽空位',
};

const FINE_EQUIP_MAP = {
  'fogmarsh_arcana_hat': '雾沼秘学帽', 'fogmarsh_arcana_robe': '雾沼秘学袍',
  'fogmarsh_arcana_gloves': '雾沼秘学手套', 'fogmarsh_arcana_pants': '雾沼秘学护腿',
  'fogmarsh_arcana_boots': '雾沼秘学长靴',
  'aurora_weavecraft_hat': '极光织法帽', 'aurora_weavecraft_robe': '极光织法袍',
  'aurora_weavecraft_gloves': '极光织法手套', 'aurora_weavecraft_pants': '极光织法护腿',
  'aurora_weavecraft_boots': '极光织法长靴',
  'stardust_windchant_hat': '星尘风语帽', 'stardust_windchant_robe': '星尘风语袍',
  'stardust_windchant_gloves': '星尘风语手套', 'stardust_windchant_pants': '星尘风语护腿',
  'stardust_windchant_boots': '星尘风语长靴',
  'gloommoon_spirit_gauze_hat': '幽月灵纱帽', 'gloommoon_spirit_gauze_robe': '幽月灵纱袍',
  'gloommoon_spirit_gauze_gloves': '幽月灵纱手套', 'gloommoon_spirit_gauze_pants': '幽月灵纱护腿',
  'gloommoon_spirit_gauze_boots': '幽月灵纱长靴',
  'marshscale_stalker_hood': '沼鳞伏行帽', 'marshscale_stalker_chestpiece': '沼鳞伏行皮衣',
  'marshscale_stalker_gloves': '沼鳞伏行护手', 'marshscale_stalker_legguards': '沼鳞伏行护腿',
  'marshscale_stalker_boots': '沼鳞伏行猎靴',
  'icefang_patrolhunter_hood': '冰牙巡猎帽', 'icefang_patrolhunter_chestpiece': '冰牙巡猎皮衣',
  'icefang_patrolhunter_gloves': '冰牙巡猎护手', 'icefang_patrolhunter_legguards': '冰牙巡猎护腿',
  'icefang_patrolhunter_boots': '冰牙巡猎猎靴',
  'mudback_shellguard_helm': '泥背坚壳盔', 'mudback_shellguard_chestplate': '泥背坚壳胸甲',
  'mudback_shellguard_armguards': '泥背坚壳护手', 'mudback_shellguard_legplates': '泥背坚壳腿甲',
  'mudback_shellguard_boots': '泥背坚壳战靴',
  'frosthorn_garrison_helm': '霜角卫戍盔', 'frosthorn_garrison_chestplate': '霜角卫戍胸甲',
  'frosthorn_garrison_armguards': '霜角卫戍护手', 'frosthorn_garrison_legplates': '霜角卫戍腿甲',
  'frosthorn_garrison_boots': '霜角卫戍战靴',
  'storm_cloudguard_helm': '风暴云卫盔', 'storm_cloudguard_chestplate': '风暴云卫胸甲',
  'storm_cloudguard_armguards': '风暴云卫护手', 'storm_cloudguard_legplates': '风暴云卫腿甲',
  'storm_cloudguard_boots': '风暴云卫战靴',
  'darkmoon_boneguard_helm': '暗月骸卫盔', 'darkmoon_boneguard_chestplate': '暗月骸卫胸甲',
  'darkmoon_boneguard_armguards': '暗月骸卫护手', 'darkmoon_boneguard_legplates': '暗月骸卫腿甲',
  'darkmoon_boneguard_boots': '暗月骸卫战靴',
  'marshbone_short_sword': '沼骨短剑', 'icefang_longsword': '冰牙长剑',
  'windcut_thunderblade': '风切雷刃', 'star_eclipse_boneblade': '星蚀骨刃',
  'mudback_sword_shield': '泥背剑盾', 'frosthorn_sword_shield': '霜角剑盾',
  'storm_sword_shield': '风暴剑盾', 'darkmoon_boneshield_sword': '暗月骨盾剑',
  'reedbone_spear': '芦骨长矛', 'icebranch_spear': '冰枝长矛',
  'windcut_spear': '风切长矛', 'ancient_rune_bone_spear': '古符骨矛',
  'fogmarsh_hunter_bow': '雾沼猎弓', 'coldwind_snow_bow': '寒风雪弓',
  'thunderfeather_skypatrol_bow': '雷羽巡空弓', 'bonewing_night_bow': '骨翼夜弓',
  'fogmarsh_conduit_staff': '雾沼导能杖', 'aurora_spellpattern_staff': '极光咒纹杖',
  'stardust_thundercaller_staff': '星尘唤雷杖', 'gloommoon_soulcalling_staff': '幽月引魂杖',
};

const FINE_MATERIAL_MAP = {
  'fogmarsh_copper_ingot': '雾沼铜锭', 'fogmarsh_wood_plank': '雾沼木板',
  'fogmarsh_leather': '雾沼皮革', 'fogmarsh_cloth': '雾沼布',
  'aurora_iron_ingot': '极光铁锭', 'aurora_wood_plank': '极光木板',
  'aurora_leather': '极光皮革', 'aurora_cloth': '极光布',
  'thunderfeather_silver_ingot': '雷羽银锭', 'thunderfeather_wood_plank': '雷羽木板',
  'thunderfeather_leather': '雷羽皮革', 'thunderfeather_cloth': '雷羽布',
  'darkmoon_mithril_ingot': '暗月秘银锭', 'darkmoon_wood_plank': '暗月木板',
  'darkmoon_leather': '暗月皮革', 'darkmoon_cloth': '暗月布',
};

// ============================================================
// 获取图标中文名称 - 全面覆盖
// ============================================================
function getIconChineseName(iconPath) {
  // 1. 先查怪物中文映射
  if (MONSTER_ICON_CN_MAP[iconPath]) return MONSTER_ICON_CN_MAP[iconPath];

  const fileName = iconPath.split('/').pop().replace('.png', '');

  // 2. 查技能图标
  if (SKILL_ICON_CN[fileName]) return SKILL_ICON_CN[fileName];

  // 3. 查战斗属性
  if (STAT_ICON_CN[fileName]) return STAT_ICON_CN[fileName];

  // 4. 查生产属性
  if (PROD_ATTR_ICON_CN[fileName]) return PROD_ATTR_ICON_CN[fileName];

  // 5. 查通用物品
  if (GENERAL_ITEM_CN[fileName]) return GENERAL_ITEM_CN[fileName];

  // 6. 查装备
  if (EQUIPMENT_NAME_MAP[fileName]) return EQUIPMENT_NAME_MAP[fileName];

  // 7. 查精华
  if (ESSENCE_MAP[fileName]) return ESSENCE_MAP[fileName];

  // 8. 查材料
  if (MATERIAL_MAP[fileName]) return MATERIAL_MAP[fileName];

  // 9. 查食物
  if (FOOD_MAP[fileName]) return FOOD_MAP[fileName];

  // 10. 查符文
  if (RUNE_MAP[fileName]) return RUNE_MAP[fileName];

  // 11. 查卷轴
  if (SCROLL_MAP[fileName]) return SCROLL_MAP[fileName];

  // 12. 查UI
  if (UI_MAP[fileName]) return UI_MAP[fileName];

  // 13. 查精良装备
  if (FINE_EQUIP_MAP[fileName]) return FINE_EQUIP_MAP[fileName];

  // 14. 查精良材料
  if (FINE_MATERIAL_MAP[fileName]) return FINE_MATERIAL_MAP[fileName];

  // 15. 查物品映射（通过 item-map.js）
  if (typeof ITEM_IMAGE_MAP !== 'undefined' && typeof ITEM_MAP !== 'undefined') {
    for (const [itemId, imgFile] of Object.entries(ITEM_IMAGE_MAP)) {
      if (imgFile === fileName + '.png' || imgFile === fileName) {
        return ITEM_MAP[parseInt(itemId)] || null;
      }
    }
  }

  // 16. 最后：返回格式化的文件名
  return fileName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ============================================================
// IconsModule 全局对象
// ============================================================
const IconsModule = {
  name: '图标浏览',
  key: 'icons',
  icon: '🖼️',

  _textures: {},
  _currentTextureId: 0,
  _currentSubCategory: null,
  _searchQuery: '',
  _container: null,

  async loadTextures() {
    for (const cfg of TEXTURE_CONFIG) {
      try {
        const resp = await fetch(cfg.json);
        const data = await resp.json();
        this._textures[cfg.id] = {
          config: cfg,
          frames: data.frames,
          meta: data.meta,
        };
      } catch (err) {
        console.error('加载图集 ' + cfg.json + ' 失败:', err);
        this._textures[cfg.id] = null;
      }
    }
  },

  render(container, app) {
    this._container = container || document.querySelector('#app-content') || document.body;

    this._container.innerHTML = `
      <div class="icons-module">
        <div class="icons-tabs">
          ${TEXTURE_CONFIG.map(cfg => `
            <button class="tab-btn ${this._currentTextureId === cfg.id ? 'active' : ''}"
                    data-texture-id="${cfg.id}">
              ${cfg.name}
              <span class="tab-badge">${this.getIconCount(cfg.id)}</span>
            </button>
          `).join('')}
        </div>

        <div class="icons-subtabs">
          ${this.renderSubTabs()}
        </div>

        <div class="icons-search">
          <input type="text" class="search-input" 
                 placeholder="搜索图标名称..." 
                 value="${this._searchQuery}">
        </div>

        <div class="icons-grid" id="icons-grid">
          ${this.renderIcons()}
        </div>
      </div>
    `;

    // 绑定标签页切换
    this._container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this._currentTextureId = parseInt(e.target.dataset.textureId);
        this._currentSubCategory = null;
        this._searchQuery = '';
        this.render(this._container, app);
      });
    });

    // 绑定子分类切换
    this._container.querySelectorAll('.subtabs-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.subKey;
        this._currentSubCategory = this._currentSubCategory === key ? null : key;
        this.render(this._container, app);
      });
    });

    // 绑定搜索
    const searchInput = this._container.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this._searchQuery = e.target.value;
        const grid = document.getElementById('icons-grid');
        if (grid) grid.innerHTML = this.renderIcons();
      });
    }
  },

  renderSubTabs() {
    const cfg = TEXTURE_CONFIG[this._currentTextureId];
    if (!cfg || !cfg.subCategories) return '';
    return cfg.subCategories.map(sub => `
      <button class="subtabs-btn ${this._currentSubCategory === sub.key ? 'active' : ''}"
              data-sub-key="${sub.key}">
        ${sub.name}
      </button>
    `).join('');
  },

  renderIcons() {
    const texture = this._textures[this._currentTextureId];
    if (!texture || !texture.frames) {
      return '<div class="icons-empty">图集加载中或加载失败...</div>';
    }

    const cfg = TEXTURE_CONFIG[this._currentTextureId];
    const imagePath = '/textures/' + texture.meta.image;
    const imageW = texture.meta.size.w;
    const imageH = texture.meta.size.h;

    let paths = Object.keys(texture.frames);

    if (this._currentSubCategory) {
      const sub = cfg.subCategories.find(s => s.key === this._currentSubCategory);
      if (sub) paths = paths.filter(p => p.startsWith(sub.pathPrefix));
    }

    if (this._searchQuery) {
      const q = this._searchQuery.toLowerCase();
      paths = paths.filter(p => {
        const cn = getIconChineseName(p).toLowerCase();
        const en = p.split('/').pop().replace('.png', '').toLowerCase();
        return cn.includes(q) || en.includes(q);
      });
    }

    if (paths.length === 0) {
      return '<div class="icons-empty">没有找到匹配的图标</div>';
    }

    return paths.map(path => {
      const frameData = texture.frames[path];
      const frame = frameData.frame;
      const cnName = getIconChineseName(path);
      const scale = frame.w >= 256 ? 0.5 : 1;

      return `
        <div class="icon-card" title="${path}">
          <div class="icon-preview" style="
            background-image: url(${imagePath});
            background-position: -${frame.x * scale}px -${frame.y * scale}px;
            background-size: ${imageW * scale}px ${imageH * scale}px;
            width: ${frame.w * scale}px;
            height: ${frame.h * scale}px;
          "></div>
          <div class="icon-label">${cnName}</div>
        </div>
      `;
    }).join('');
  },

  getIconCount(textureId) {
    const texture = this._textures[textureId];
    return texture && texture.frames ? Object.keys(texture.frames).length : 0;
  },

  destroy() {
    this._searchQuery = '';
    this._currentSubCategory = null;
    this._container = null;
  }
};

// ============================================================
// 暴露到全局，由 app.js 注册
// ============================================================
window.IconsModule = IconsModule;
