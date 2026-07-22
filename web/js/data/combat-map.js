// ============================================================
// combat-map.js - 战斗区域 & 怪物 映射表
// 注意：本文件使用 ES Module 导出，前端通过 import 引入
// ============================================================

const combatMap = {
  // ---------- 战斗区域映射 ----------
  areas: [
    { id: 1,  name: "苔痕入口",      nameEn: "Mossy Entrance",        description: "", monsters: [6000, 6001] },
    { id: 2,  name: "林间伏击",      nameEn: "Forest Ambush",         description: "", monsters: [6002, 6003] },
    { id: 3,  name: "荆棘围猎",      nameEn: "Thorn Hunt",            description: "", monsters: [6004, 6005] },
    { id: 4,  name: "古树守望",      nameEn: "Ancient Tree Watch",    description: "", monsters: [6006, 6007] },
    { id: 5,  name: "孢雾浅滩",      nameEn: "Spore Mist Shoal",      description: "", monsters: [6008, 6009] },
    { id: 6,  name: "深泥菌径",      nameEn: "Deep Mud Spore Path",   description: "", monsters: [6010, 6011] },
    { id: 7,  name: "腐泥猎场",      nameEn: "Rot Mud Hunting Ground",description: "", monsters: [6012, 6013] },
    { id: 8,  name: "女王菌冠",      nameEn: "Queen's Fungal Crown",  description: "", monsters: [6014, 6015] },
    { id: 9,  name: "沙狐前哨",      nameEn: "Sand Fox Outpost",      description: "", monsters: [6016, 6017] },
    { id: 10, name: "烈日兽道",      nameEn: "Blazing Beast Trail",   description: "", monsters: [6018, 6019] },
    { id: 11, name: "流沙伏坑",      nameEn: "Quicksand Pit",         description: "", monsters: [6020, 6021] },
    { id: 12, name: "绿洲圣庭",      nameEn: "Oasis Sacred Court",    description: "", monsters: [6022, 6023] },
    { id: 13, name: "礁壳浅滩",      nameEn: "Reef Shell Shoal",      description: "", monsters: [6024, 6025] },
    { id: 14, name: "深潮礁线",      nameEn: "Deep Tide Reef Line",   description: "", monsters: [6026, 6027] },
    { id: 15, name: "裂潮巨钳",      nameEn: "Tide Splitter Claw",    description: "", monsters: [6028, 6029] },
    { id: 16, name: "歌妖深湾",      nameEn: "Siren Deep Bay",        description: "", monsters: [6030, 6031] },
    { id: 17, name: "霜痕雪地",      nameEn: "Frost Scar Snowfield",  description: "", monsters: [6032, 6033] },
    { id: 18, name: "寒风兽径",      nameEn: "Cold Wind Beast Trail", description: "", monsters: [6034, 6035] },
    { id: 19, name: "雪暴猎场",      nameEn: "Snowstorm Hunting Ground", description: "", monsters: [6036, 6037] },
    { id: 20, name: "霜角王庭",      nameEn: "Frost Horn King's Court", description: "", monsters: [6038, 6039] },
    { id: 21, name: "晶簇入口",      nameEn: "Crystal Cluster Entrance", description: "", monsters: [6040, 6041] },
    { id: 22, name: "棱光穴道",      nameEn: "Prismatic Cave Path",   description: "", monsters: [6042, 6043] },
    { id: 23, name: "蛛母巢厅",      nameEn: "Spider Matron Nest Hall", description: "", monsters: [6044, 6045] },
    { id: 24, name: "晶核主殿",      nameEn: "Crystal Core Main Hall",  description: "", monsters: [6046, 6047] },
    { id: 25, name: "墓砖夹道",      nameEn: "Tomb Brick Alley",      description: "", monsters: [6048, 6049] },
    { id: 26, name: "锈甲回廊",      nameEn: "Rusted Armor Corridor", description: "", monsters: [6050, 6051] },
    { id: 27, name: "黑铁刑场",      nameEn: "Black Iron Execution Ground", description: "", monsters: [6052, 6053] },
    { id: 28, name: "墓王封殿",      nameEn: "Tomb King's Sealed Hall", description: "", monsters: [6054, 6055] },
    { id: 29, name: "灰烬坡道",      nameEn: "Ash Ramp",              description: "", monsters: [6056, 6057] },
    { id: 30, name: "熔流裂口",      nameEn: "Lava Flow Fissure",     description: "", monsters: [6058, 6059] },
    { id: 31, name: "熔喉猎场",      nameEn: "Lava Throat Hunting Ground", description: "", monsters: [6060, 6061] },
    { id: 32, name: "龙龟火口",      nameEn: "Dragon Turtle Crater",  description: "", monsters: [6062, 6063] },
    { id: 33, name: "云羽外环",      nameEn: "Cloud Feather Outer Ring", description: "", monsters: [6064, 6065] },
    { id: 34, name: "雷光巡域",      nameEn: "Thunder Light Patrol",  description: "", monsters: [6066, 6067] },
    { id: 35, name: "狮鹫风牢",      nameEn: "Griffin Wind Prison",   description: "", monsters: [6068, 6069] },
    { id: 36, name: "天马风暴庭",    nameEn: "Pegasus Storm Court",   description: "", monsters: [6070, 6071] },
    { id: 37, name: "鸦影长廊",      nameEn: "Crow Shadow Corridor",  description: "", monsters: [6072, 6073] },
    { id: 38, name: "血蔷回厅",      nameEn: "Blood Rose Hall",       description: "", monsters: [6074, 6075] },
    { id: 39, name: "伯爵狩宴",      nameEn: "Count's Hunting Feast", description: "", monsters: [6076, 6077] },
    { id: 40, name: "暗月龙庭",      nameEn: "Dark Moon Dragon Court",description: "", monsters: [6078, 6079] }
  ],

  // ---------- 怪物映射 ----------
  monsters: [
    { id: 6000, name: "林地史莱姆",      nameEn: "Forest Slime",         regionId: 1 },
    { id: 6001, name: "橡果鼬",          nameEn: "Acorn Weasel",         regionId: 1 },
    { id: 6002, name: "花粉妖精",        nameEn: "Pollen Fairy",         regionId: 2 },
    { id: 6003, name: "苔角幼鹿",        nameEn: "Moss Horn Fawn",       regionId: 2 },
    { id: 6004, name: "刺背野猪",        nameEn: "Spineback Boar",       regionId: 3 },
    { id: 6005, name: "巡林地精",        nameEn: "Forest Goblin",        regionId: 3 },
    { id: 6006, name: "荆棘獠牙野猪",    nameEn: "Thorn Tusk Boar",      regionId: 4 },
    { id: 6007, name: "古树守望者",      nameEn: "Ancient Tree Watcher", regionId: 4 },
    { id: 6008, name: "孢子菇灵",        nameEn: "Spore Mushroom Spirit",regionId: 5 },
    { id: 6009, name: "湿地毒蛙",        nameEn: "Wetland Poison Frog",  regionId: 5 },
    { id: 6010, name: "泥背鳄龟",        nameEn: "Mud Back Crocodile Turtle", regionId: 6 },
    { id: 6011, name: "芦苇精怪",        nameEn: "Reed Spirit",          regionId: 6 },
    { id: 6012, name: "沼地蜥人",        nameEn: "Swamp Lizardman",      regionId: 7 },
    { id: 6013, name: "雾灯鬼火",        nameEn: "Fog Light Will-o'-wisp", regionId: 7 },
    { id: 6014, name: "腐泥巨口蛙",      nameEn: "Rot Mud Giant Frog",   regionId: 8 },
    { id: 6015, name: "孢子女王",        nameEn: "Spore Queen",          regionId: 8 },
    { id: 6016, name: "沙丘狐",          nameEn: "Dune Fox",             regionId: 9 },
    { id: 6017, name: "鸣沙蜥",          nameEn: "Singing Sand Lizard",  regionId: 9 },
    { id: 6018, name: "黄沙圣甲虫",      nameEn: "Yellow Sand Scarab",   regionId: 10 },
    { id: 6019, name: "仙人掌妖灵",      nameEn: "Cactus Spirit",        regionId: 10 },
    { id: 6020, name: "蝎尾鬣犬",        nameEn: "Scorpion Tail Hyena",  regionId: 11 },
    { id: 6021, name: "砂岩巨蝎",        nameEn: "Sandstone Giant Scorpion", regionId: 11 },
    { id: 6022, name: "流沙潜猎蝎",      nameEn: "Quicksand Hunter Scorpion", regionId: 12 },
    { id: 6023, name: "金鬃绿洲守护兽",  nameEn: "Gold Mane Oasis Guardian", regionId: 12 },
    { id: 6024, name: "礁壳寄居蟹",      nameEn: "Reef Shell Hermit Crab", regionId: 13 },
    { id: 6025, name: "泡沫海精灵",      nameEn: "Foam Sea Spirit",      regionId: 13 },
    { id: 6026, name: "盐鳍跳鱼",        nameEn: "Salt Fin Jumping Fish", regionId: 14 },
    { id: 6027, name: "珊瑚海马兽",      nameEn: "Coral Seahorse Beast", regionId: 14 },
    { id: 6028, name: "涡流海龟",        nameEn: "Vortex Sea Turtle",    regionId: 15 },
    { id: 6029, name: "深潮水妖",        nameEn: "Deep Tide Water Spirit", regionId: 15 },
    { id: 6030, name: "裂潮巨钳蟹",      nameEn: "Tide Splitter Giant Crab", regionId: 16 },
    { id: 6031, name: "深潮歌妖",        nameEn: "Deep Tide Siren",      regionId: 16 },
    { id: 6032, name: "雪原兔灵",        nameEn: "Snow Field Rabbit Spirit", regionId: 17 },
    { id: 6033, name: "霜毛雪狐",        nameEn: "Frost Fur Snow Fox",   regionId: 17 },
    { id: 6034, name: "寒风雪鸮",        nameEn: "Cold Wind Snow Owl",   regionId: 18 },
    { id: 6035, name: "冰甲驯鹿",        nameEn: "Ice Armor Reindeer",   regionId: 18 },
    { id: 6036, name: "白鬃雪熊",        nameEn: "White Mane Snow Bear", regionId: 19 },
    { id: 6037, name: "极光雪怪",        nameEn: "Aurora Snow Monster",  regionId: 19 },
    { id: 6038, name: "冰牙雪暴熊",      nameEn: "Ice Fang Snowstorm Bear", regionId: 20 },
    { id: 6039, name: "极光霜角兽",      nameEn: "Aurora Frost Horn Beast", regionId: 20 },
    { id: 6040, name: "晶簇蝙蝠",        nameEn: "Crystal Cluster Bat",  regionId: 21 },
    { id: 6041, name: "萤石小妖",        nameEn: "Fluorite Imp",         regionId: 21 },
    { id: 6042, name: "岩甲穿山兽",      nameEn: "Rock Armor Pangolin",  regionId: 22 },
    { id: 6043, name: "水晶穴蛛",        nameEn: "Crystal Cave Spider",  regionId: 22 },
    { id: 6044, name: "共鸣石偶",        nameEn: "Resonance Stone Golem",regionId: 23 },
    { id: 6045, name: "棱镜魔眼",        nameEn: "Prism Magic Eye",      regionId: 23 },
    { id: 6046, name: "棱晶穴蛛母",      nameEn: "Prism Crystal Spider Mother", regionId: 24 },
    { id: 6047, name: "共鸣晶核巨像",    nameEn: "Resonance Crystal Core Colossus", regionId: 24 },
    { id: 6048, name: "墓穴硕鼠",        nameEn: "Tomb Giant Rat",       regionId: 25 },
    { id: 6049, name: "破甲骷髅兵",      nameEn: "Broken Armor Skeleton", regionId: 25 },
    { id: 6050, name: "幽火书灵",        nameEn: "Ghost Fire Book Spirit", regionId: 26 },
    { id: 6051, name: "锈铠守卫",        nameEn: "Rusted Armor Guard",   regionId: 26 },
    { id: 6052, name: "地宫猎犬",        nameEn: "Underground Palace Hound", regionId: 27 },
    { id: 6053, name: "秘纹石像鬼",      nameEn: "Mystic Rune Gargoyle", regionId: 27 },
    { id: 6054, name: "黑铁刽子手",      nameEn: "Black Iron Executioner", regionId: 28 },
    { id: 6055, name: "封印墓王",        nameEn: "Sealed Tomb King",     regionId: 28 },
    { id: 6056, name: "灰烬蝠",          nameEn: "Ash Bat",              regionId: 29 },
    { id: 6057, name: "炎壳甲虫",        nameEn: "Fire Shell Beetle",    regionId: 29 },
    { id: 6058, name: "熔岩蜥蜴",        nameEn: "Lava Lizard",          regionId: 30 },
    { id: 6059, name: "硫烟火灵",        nameEn: "Sulfur Fire Spirit",   regionId: 30 },
    { id: 6060, name: "赤角熔犬",        nameEn: "Red Horn Lava Hound",  regionId: 31 },
    { id: 6061, name: "地脉幼龙",        nameEn: "Earth Vein Wyrmling",  regionId: 31 },
    { id: 6062, name: "熔喉地脉蜥",      nameEn: "Lava Throat Vein Lizard", regionId: 32 },
    { id: 6063, name: "赤焰龙龟",        nameEn: "Flame Dragon Turtle",  regionId: 32 },
    { id: 6064, name: "云羽雀灵",        nameEn: "Cloud Feather Sparrow Spirit", regionId: 33 },
    { id: 6065, name: "风切鹰",          nameEn: "Wind Shear Eagle",     regionId: 33 },
    { id: 6066, name: "浮空水母",        nameEn: "Floating Jellyfish",   regionId: 34 },
    { id: 6067, name: "星尘蝶妖",        nameEn: "Stardust Butterfly Demon", regionId: 34 },
    { id: 6068, name: "巡空狮鹫",        nameEn: "Sky Patrol Griffin",   regionId: 35 },
    { id: 6069, name: "雷鬃云驹",        nameEn: "Thunder Mane Cloud Horse", regionId: 35 },
    { id: 6070, name: "雷羽狮鹫领主",    nameEn: "Thunder Feather Griffin Lord", regionId: 36 },
    { id: 6071, name: "风暴天马",        nameEn: "Storm Pegasus",        regionId: 36 },
    { id: 6072, name: "夜鸦侍从",        nameEn: "Night Crow Attendant", regionId: 37 },
    { id: 6073, name: "血蔷薇妖",        nameEn: "Blood Rose Demon",     regionId: 37 },
    { id: 6074, name: "镜中幽灵",        nameEn: "Mirror Ghost",         regionId: 38 },
    { id: 6075, name: "幽影猎犬",        nameEn: "Shadow Hound",         regionId: 38 },
    { id: 6076, name: "月蝠侯爵",        nameEn: "Moon Bat Marquis",     regionId: 39 },
    { id: 6077, name: "棺木缝影魔",      nameEn: "Coffin Crevice Shadow Demon", regionId: 39 },
    { id: 6078, name: "猩红夜鸦伯爵",    nameEn: "Scarlet Night Crow Count", regionId: 40 },
    { id: 6079, name: "暗月骨龙",        nameEn: "Dark Moon Bone Dragon",regionId: 40 }
  ],

  // ---------- 方便查询的辅助数据结构 ----------
  // 区域名称索引 (id -> name)
  areaNameMap: {},

  // 怪物名称索引 (id -> name)
  monsterNameMap: {},

  // 区域怪物列表 (areaId -> [monsterId, ...])
  areaMonstersMap: {},

  // 怪物所在区域 (monsterId -> areaId)
  monsterRegionMap: {},

  // ---------- 工具函数 ----------
  /**
   * 根据区域ID获取区域信息
   * @param {number} areaId
   * @returns {object|null}
   */
  getAreaById(areaId) {
    return this.areas.find(a => a.id === areaId) || null;
  },

  /**
   * 根据怪物ID获取怪物信息
   * @param {number} monsterId
   * @returns {object|null}
   */
  getMonsterById(monsterId) {
    return this.monsters.find(m => m.id === monsterId) || null;
  },

  /**
   * 获取指定区域的所有怪物
   * @param {number} areaId
   * @returns {array}
   */
  getMonstersByArea(areaId) {
    return this.monsters.filter(m => m.regionId === areaId);
  },

  /**
   * 获取怪物所在区域
   * @param {number} monsterId
   * @returns {number|null}
   */
  getRegionByMonster(monsterId) {
    const monster = this.getMonsterById(monsterId);
    return monster ? monster.regionId : null;
  },

  /**
   * 初始化映射表（在应用启动时调用一次）
   */
  init() {
    // 构建 areaNameMap
    this.areas.forEach(area => {
      this.areaNameMap[area.id] = area.name;
      this.areaMonstersMap[area.id] = area.monsters || [];
    });

    // 构建 monsterNameMap, monsterRegionMap
    this.monsters.forEach(monster => {
      this.monsterNameMap[monster.id] = monster.name;
      this.monsterRegionMap[monster.id] = monster.regionId;
    });
  }
};

