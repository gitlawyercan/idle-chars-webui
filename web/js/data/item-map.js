/**
 * 物品ID → 完整信息映射表
 * 
 * 包含：基础材料、加工材料、精华、消耗品、符文、卷轴、宝箱、
 *       T1-T4装备、工具、套装、精良材料、精良装备
 */

const ITEM_MAP = {
    // ===== 一、基础材料 =====
    // 伐木
    1: '松木', 2: '橡木', 3: '月桂木', 4: '符纹木',
    // 采矿
    5: '铜矿', 6: '铁矿', 7: '银矿', 8: '秘银矿',
    // 狩猎
    9: '轻皮', 10: '厚皮', 11: '月纹皮', 12: '雪纹皮',
    // 种植 - 纤维
    13: '亚麻', 15: '棉花', 17: '月麻', 19: '符藤',
    // 种植 - 粮食
    14: '麦穗', 16: '蜜糖麦', 18: '月露果', 20: '香米',
    // 伐木副产物
    101: '松林莓', 102: '橡蜜果', 103: '月桂银果', 104: '符纹星果',

    // ===== 二、加工材料 =====
    // 金属锭
    91: '铜锭', 21: '铁锭', 22: '银锭', 23: '秘银锭',
    // 木板
    92: '松木板', 24: '橡木板', 25: '月桂木板', 26: '符纹木板',
    // 皮革
    90: '轻皮革', 27: '厚皮革', 28: '月纹皮革', 29: '雪纹皮革',
    // 布料
    89: '亚麻布', 30: '棉布', 31: '月麻布', 32: '符藤布',

    // ===== 三、精华材料 =====
    64: '伐木精华', 65: '采矿精华', 66: '狩猎精华', 67: '种植精华',
    68: '烹饪精华', 69: '锻造精华', 70: '裁缝精华', 71: '铭文精华',
    72: '炼金精华', 73: '强化精华',

    // ===== 四、消耗品 — 食物/药水 =====
    // 瞬间回HP（面包）
    33: '麦香面包', 34: '蜜烤面包', 35: '月露软面包', 36: '香米厚面包',
    // 持续回HP（炖汤）
    37: '家常炖汤', 38: '辛香肉汤', 39: '鹿茸炖汤', 40: '狼骨浓汤',
    // 瞬间回MP（蛋糕）
    41: '清甜蛋糕', 42: '蜜糖蛋糕', 43: '月露蛋糕', 44: '香米蛋糕',
    // 持续回MP（饮料）
    45: '清露饮', 46: '辛香饮', 47: '月露饮', 48: '符露饮',
    // 增益食物
    77: 'T1采集派', 78: 'T2采集派', 79: 'T3采集派',
    74: 'T1工艺沙拉', 75: 'T2工艺沙拉', 76: 'T3工艺沙拉',

    // ===== 五、符文 =====
    49: 'T1攻击符文', 50: 'T2攻击符文', 51: 'T3攻击符文',
    52: 'T1防御符文', 53: 'T2防御符文', 54: 'T3防御符文',
    55: 'T1攻速符文', 56: 'T2攻速符文', 57: 'T3攻速符文',
    58: 'T1命中符文', 59: 'T2命中符文', 60: 'T3命中符文',
    61: 'T1技能经验符文', 62: 'T2技能经验符文', 63: 'T3技能经验符文',
    80: 'T1暴击符文', 81: 'T2暴击符文', 82: 'T3暴击符文',
    83: 'T1法力符文', 84: 'T2法力符文', 85: 'T3法力符文',
    86: 'T1生命符文', 87: 'T2生命符文', 88: 'T3生命符文',

    // ===== 六、技能卷轴 =====
    8001: '重击卷轴', 8002: '断势击卷轴', 8003: '横扫击卷轴', 8004: '蓄力猛击卷轴',
    8005: '火球术卷轴', 8006: '炎爆术卷轴', 8007: '寒冰箭卷轴', 8008: '暴风雪卷轴',
    8009: '闪电链卷轴', 8010: '闪电风暴卷轴', 8011: '快速射击卷轴', 8012: '精准卷轴',
    8013: '分裂攻击卷轴', 8014: '箭矢荼毒卷轴', 8015: '毒箭卷轴', 8016: '后跳卷轴',
    8017: '凝心射击卷轴', 8018: '乱射卷轴', 8019: '连射卷轴', 8020: '毒性爆发卷轴',
    8021: '鹰眼卷轴', 8022: '圣光打击卷轴',

    // ===== 七、宝箱 =====
    9000: '小宝箱-战斗', 9001: '小宝箱-采集', 9002: '小宝箱-制造',

    // ===== 八、T1装备 =====
    // 布甲
    30000: '草露学徒帽', 30400: '草露学徒袍', 30800: '草露学徒手套',
    31200: '草露学徒裤', 31600: '草露学徒短靴',
    // 皮甲
    32000: '原野追猎帽', 32400: '原野追猎皮衣', 32800: '原野追猎手套',
    33200: '原野追猎护腿', 33600: '原野追猎短靴',
    // 重甲
    34000: '铜铆守卫盔', 34400: '铜铆守卫胸甲', 34800: '铜铆守卫护手',
    35200: '铜铆守卫腿甲', 35600: '铜铆守卫战靴',
    // 武器
    36000: '铜叶短剑', 36400: '铜叶剑盾', 36800: '松锋长矛',
    37200: '软木猎弓', 37600: '草露导能杖',
    // 饰品
    38000: '草露护心坠', 38400: '铜星指环',
    // 工具
    40800: '学徒伐木斧', 41200: '学徒采矿镐', 40000: '学徒猎刀', 40400: '学徒种植锄',
    38800: '学徒厨师帽', 41600: '学徒锻造锤', 42000: '学徒炼金瓶',
    42400: '学徒强化锤', 39200: '学徒裁缝针', 39600: '学徒羽毛笔',
    // T1采集套装
    42800: '草露采集帽', 43200: '草露采集衣', 43600: '草露采集手套',
    44000: '草露采集裤', 44400: '草露采集短靴',
    // T1工匠套装
    44800: '粗布工匠帽', 45200: '粗布工匠工袍', 45600: '粗布工匠手套',
    46000: '粗布工匠裤', 46400: '粗布工匠工靴',
    // T1炼金套装
    46800: '粗布炼金帽', 47200: '粗布炼金工袍', 47600: '粗布炼金手套',
    48000: '粗布炼金裤', 48400: '粗布炼金工靴',
    // T1强化套装
    48800: '粗布强化帽', 49200: '粗布强化工袍', 49600: '粗布强化手套',
    50000: '粗布强化裤', 50400: '粗布强化工靴',

    // ===== 九、T2装备 =====
    // 布甲
    30100: '焰纹行者帽', 30500: '焰纹行者袍', 30900: '焰纹行者手套',
    31300: '焰纹行者裤', 31700: '焰纹行者短靴',
    // 皮甲
    32100: '野牙行者兜帽', 32500: '野牙行者猎装', 32900: '野牙行者护手',
    33300: '野牙行者护腿', 33700: '野牙行者猎靴',
    // 重甲
    34100: '铁壁巡卫盔', 34500: '铁壁巡卫胸甲', 34900: '铁壁巡卫臂甲',
    35300: '铁壁巡卫腿甲', 35700: '铁壁巡卫重靴',
    // 武器
    36100: '铁风长剑', 36500: '铁壁剑盾', 36900: '铁羽猎矛',
    37300: '硬木游弓', 37700: '炎焰纤光杖',
    // 饰品
    38100: '铁焰旅人坠', 38500: '铁焰指环',
    // 工具
    40900: '工匠伐木斧', 41300: '工匠采矿镐', 40100: '工匠猎刀', 40500: '工匠种植锄',
    38900: '工匠厨师帽', 41700: '工匠锻造锤', 42100: '工匠炼金瓶',
    42500: '工匠强化锤', 39300: '工匠裁缝针', 39700: '工匠羽毛笔',
    // T2采集套装
    42900: '野径采集帽', 43300: '野径采集外衣', 43700: '野径采集手套',
    44100: '野径采集护腿', 44500: '野径采集行靴',
    // T2工匠套装
    44900: '工坊工匠帽', 45300: '工坊工匠工袍', 45700: '工坊工匠护手',
    46100: '工坊工匠护腿', 46500: '工坊工匠工靴',
    // T2炼金套装
    46900: '工坊炼金帽', 47300: '工坊炼金工袍', 47700: '工坊炼金护手',
    48100: '工坊炼金护腿', 48500: '工坊炼金工靴',
    // T2强化套装
    48900: '工坊强化帽', 49300: '工坊强化工袍', 49700: '工坊强化护手',
    50100: '工坊强化护腿', 50500: '工坊强化工靴',

    // ===== 十、T3装备 =====
    // 布甲
    30200: '月纹咒织兜帽', 30600: '月纹咒织长袍', 31000: '月纹咒织护手',
    31400: '月纹咒织护腿', 31800: '月纹咒织长靴',
    // 皮甲
    32200: '鹿影游侠风帽', 32600: '鹿影游侠皮甲', 33000: '鹿影游侠护腕',
    33400: '鹿影游侠护腿', 33800: '鹿影游侠长靴',
    // 重甲
    34200: '银锁堡垒盔', 34600: '银锁堡垒胸甲', 35000: '银锁堡垒臂甲',
    35400: '银锁堡垒腿甲', 35800: '银锁堡垒战靴',
    // 武器
    36200: '银辉月纹剑', 36600: '银纹剑盾', 37000: '赤纹月牙枪',
    37400: '赤纹鹿影弓', 37800: '月露咒纹杖',
    // 饰品
    38200: '月纹祈愿链', 38600: '月露银纹戒',
    // 工具
    41000: '月纹伐木斧', 41400: '月纹采矿镐', 40200: '月纹猎刀', 40600: '月纹种植锄',
    39000: '月纹厨师帽', 41800: '月纹锻造锤', 42200: '月纹炼金瓶',
    42600: '月纹强化锤', 39400: '月纹裁缝针', 39800: '月纹羽毛笔',
    // T3采集套装
    43000: '月纹采集风帽', 43400: '月纹采集外衣', 43800: '月纹采集护手',
    44200: '月纹采集护腿', 44600: '月纹采集长靴',
    // T3工匠套装
    45000: '月纹工匠帽', 45400: '月纹工匠工袍', 45800: '月纹工匠护手',
    46200: '月纹工匠护腿', 46600: '月纹工匠长靴',
    // T3炼金套装
    47000: '月纹炼金帽', 47400: '月纹炼金工袍', 47800: '月纹炼金护手',
    48200: '月纹炼金护腿', 48600: '月纹炼金长靴',
    // T3强化套装
    49000: '月纹强化帽', 49400: '月纹强化工袍', 49800: '月纹强化护手',
    50200: '月纹强化护腿', 50600: '月纹强化长靴',

    // ===== 十一、T4装备 =====
    // 布甲
    30300: '符光秘法冠', 30700: '符光秘法长袍', 31100: '符光秘法护手',
    31500: '符光秘法护腿', 31900: '符光秘法步靴',
    // 皮甲
    32300: '狼纹疾猎兜帽', 32700: '狼纹疾猎战皮甲', 33100: '狼纹疾猎护腕',
    33500: '狼纹疾猎护腿', 33900: '狼纹疾猎疾风靴',
    // 重甲
    34300: '秘银狮卫盔', 34700: '秘银狮卫胸甲', 35100: '秘银狮卫臂甲',
    35500: '秘银狮卫腿甲', 35900: '秘银狮卫雄步靴',
    // 武器
    36300: '秘银符印剑', 36700: '秘纹剑盾', 37100: '符铁裂风矛',
    37500: '符纹追风弓', 37900: '符文秘银杖',
    // 饰品
    38300: '符光秘银坠', 38700: '秘银符纹戒',
    // 工具
    41100: '符纹伐木斧', 41500: '符纹采矿镐', 40300: '符纹猎刀', 40700: '符纹种植锄',
    39100: '符纹厨师帽', 41900: '符纹锻造锤', 42300: '符纹炼金瓶',
    42700: '符纹强化锤', 39500: '符纹裁缝针', 39900: '符纹羽毛笔',
    // T4采集套装
    43100: '符纹采集兜帽', 43500: '符纹采集长衣', 43900: '符纹采集护手',
    44300: '符纹采集护腿', 44700: '符纹采集步靴',
    // T4工匠套装
    45100: '符纹工匠冠', 45500: '符纹工匠工袍', 45900: '符纹工匠护手',
    46300: '符纹工匠护腿', 46700: '符纹工匠步靴',
    // T4炼金套装
    47100: '符纹炼金冠', 47500: '符纹炼金工袍', 47900: '符纹炼金护手',
    48300: '符纹炼金护腿', 48700: '符纹炼金步靴',
    // T4强化套装
    49100: '符纹强化冠', 49500: '符纹强化工袍', 49900: '符纹强化护手',
    50300: '符纹强化护腿', 50700: '符纹强化步靴',

    // ===== 十二、精良中间材料 =====
    // T1
    52010: '雾沼铜锭', 52011: '雾沼木板', 52012: '雾沼皮革', 52013: '雾沼布',
    // T2
    52014: '极光铁锭', 52015: '极光木板', 52016: '极光皮革', 52017: '极光布',
    // T3
    52018: '雷羽银锭', 52019: '雷羽木板', 52020: '雷羽皮革', 52021: '雷羽布',
    // T4
    52022: '暗月秘银锭', 52023: '暗月木板', 52024: '暗月皮革', 52025: '暗月布',

    // ===== 十三、精良装备 =====
    // 精良布甲
    60000: '雾沼秘学帽', 60400: '雾沼秘学袍', 60800: '雾沼秘学手套',
    61200: '雾沼秘学护腿', 61600: '雾沼秘学长靴',
    60100: '极光织法帽', 60500: '极光织法袍', 60900: '极光织法手套',
    61300: '极光织法护腿', 61700: '极光织法长靴',
    60200: '星尘风语帽', 60600: '星尘风语袍', 61000: '星尘风语手套',
    61400: '星尘风语护腿', 61800: '星尘风语长靴',
    60300: '幽月灵纱帽', 60700: '幽月灵纱袍', 61100: '幽月灵纱手套',
    61500: '幽月灵纱护腿', 61900: '幽月灵纱长靴',
    // 精良皮甲
    62000: '沼鳞伏行帽', 62400: '沼鳞伏行皮衣', 62800: '沼鳞伏行护手',
    63200: '沼鳞伏行护腿', 63600: '沼鳞伏行猎靴',
    62100: '冰牙巡猎帽', 62500: '冰牙巡猎皮衣', 62900: '冰牙巡猎护手',
    63300: '冰牙巡猎护腿', 63700: '冰牙巡猎猎靴',
    62200: '雷羽巡空帽', 62600: '雷羽巡空皮衣', 63000: '雷羽巡空护手',
    63400: '雷羽巡空护腿', 63800: '雷羽巡空猎靴',
    62300: '夜鸦追猎帽', 62700: '夜鸦追猎皮衣', 63100: '夜鸦追猎护手',
    63500: '夜鸦追猎护腿', 63900: '夜鸦追猎猎靴',
    // 精隆重甲
    64000: '泥背坚壳盔', 64400: '泥背坚壳胸甲', 64800: '泥背坚壳护手',
    65200: '泥背坚壳腿甲', 65600: '泥背坚壳战靴',
    64100: '霜角卫戍盔', 64500: '霜角卫戍胸甲', 64900: '霜角卫戍护手',
    65300: '霜角卫戍腿甲', 65700: '霜角卫戍战靴',
    64200: '风暴云卫盔', 64600: '风暴云卫胸甲', 65000: '风暴云卫护手',
    65400: '风暴云卫腿甲', 65800: '风暴云卫战靴',
    64300: '暗月骸卫盔', 64700: '暗月骸卫胸甲', 65100: '暗月骸卫护手',
    65500: '暗月骸卫腿甲', 65900: '暗月骸卫战靴',
    // 精良武器 - 长剑
    66000: '沼骨短剑', 66100: '冰牙长剑', 66200: '风切雷刃', 66300: '星蚀骨刃',
    // 精良武器 - 剑盾
    66400: '泥背剑盾', 66500: '霜角剑盾', 66600: '风暴剑盾', 66700: '暗月骨盾剑',
    // 精良武器 - 长矛
    66800: '芦骨长矛', 66900: '冰枝长矛', 67000: '风切长矛', 67100: '古符骨矛',
    // 精良武器 - 弓箭
    67200: '雾沼猎弓', 67300: '寒风雪弓', 67400: '雷羽巡空弓', 67500: '骨翼夜弓',
    // 精良武器 - 法杖
    67600: '雾沼导能杖', 67700: '极光咒纹杖', 67800: '星尘唤雷杖', 67900: '幽月引魂杖',
};

/**
 * 根据物品ID获取名称
 */
function getItemName(itemId) {
    return ITEM_MAP[itemId] || `未知物品 (ID: ${itemId})`;
}

/**
 * 根据名称关键字搜索物品
 */
function searchItems(keyword) {
    const q = keyword.toLowerCase();
    const results = [];
    for (const [id, name] of Object.entries(ITEM_MAP)) {
        if (name.toLowerCase().includes(q)) {
            results.push({ id: parseInt(id), name });
        }
    }
    return results;
}

// ============================================================
// 物品ID → 图片文件名映射
// ============================================================

const ITEM_IMAGE_MAP = {
  // ----- 基础材料 -----
  1: 'pine_wood.png',         // 松木
  2: 'oak_wood.png',          // 橡木
  3: 'laurel_wood.png',       // 月桂木
  4: 'runewood.png',          // 符纹木
  5: 'copper_ore.png',        // 铜矿
  6: 'iron_ore.png',          // 铁矿
  7: 'silver_ore.png',        // 银矿
  8: 'mithril_ore.png',       // 秘银矿
  9: 'light_hide.png',        // 轻皮
  10: 'thick_hide.png',       // 厚皮
  11: 'moon_pattern_hide.png',// 月纹皮
  12: 'snow_pattern_hide.png',// 雪纹皮
  13: 'flax.png',             // 亚麻
  14: 'wheat_ear.png',        // 麦穗
  15: 'cotton.png',           // 棉花
  16: 'honey_wheat.png',      // 蜜糖麦
  17: 'moon_flax.png',        // 月麻
  18: 'moon_dew_fruit.png',   // 月露果
  19: 'rune_vine.png',        // 符藤
  20: 'fragrant_rice.png',    // 香米

  // 伐木副产物
  101: 'pinewood_berry.png',  // 松林莓
  102: 'oak_honeyfruit.png',  // 橡蜜果
  103: 'silver_laurel_fruit.png', // 月桂银果
  104: 'runic_starfruit.png', // 符纹星果

  // ----- 加工材料 -----
  // 金属锭
  91: 'copper_ingot.png',     // 铜锭
  21: 'iron_ingot.png',       // 铁锭
  22: 'silver_ingot.png',     // 银锭
  23: 'mithril_ingot.png',    // 秘银锭
  // 木板
  92: 'pine_plank.png',       // 松木板
  24: 'oak_plank.png',        // 橡木板
  25: 'laurel_plank.png',     // 月桂木板
  26: 'runewood_plank.png',   // 符纹木板
  // 皮革
  90: 'light_leather.png',    // 轻皮革
  27: 'thick_leather.png',    // 厚皮革
  28: 'moon_pattern_leather.png', // 月纹皮革
  29: 'snow_pattern_leather.png', // 雪纹皮革
  // 布料
  89: 'flax_cloth.png',       // 亚麻布
  30: 'cotton_cloth.png',     // 棉布
  31: 'moon_flax_cloth.png',  // 月麻布
  32: 'rune_vine_cloth.png',  // 符藤布

  // ----- 精华材料 -----
  64: 'logging_essence_transparent.png',  // 伐木精华
  65: 'mining_essence_transparent.png',   // 采矿精华
  66: 'hunting_essence_transparent.png',  // 狩猎精华
  67: 'planting_essence_transparent.png', // 种植精华
  68: 'cooking_essence_transparent.png',  // 烹饪精华
  69: 'forging_essence_transparent.png',  // 锻造精华
  70: 'tailoring_essence_transparent.png',// 裁缝精华
  71: 'inscription_essence_transparent.png',// 铭文精华
  72: 'alchemy_essence_transparent.png',  // 炼金精华
  73: 'enhancement_essence_transparent.png', // 强化精华

  // ----- 消耗品 - 食物/药水 -----
  33: 'wheat_fragrant_bread.png',         // 麦香面包
  34: 'honey_roasted_bread.png',          // 蜜烤面包
  35: 'moon_dew_soft_bread.png',          // 月露软面包
  36: 'fragrant_rice_thick_bread.png',    // 香米厚面包
  37: 'home_style_stew.png',              // 家常炖汤
  38: 'spicy_broth.png',                  // 辛香肉汤
  39: 'deer_antler_stew.png',             // 鹿茸炖汤
  40: 'wolf_bone_thick_soup.png',         // 狼骨浓汤
  41: 'sweet_cake.png',                   // 清甜蛋糕
  42: 'honey_cake.png',                   // 蜜糖蛋糕
  43: 'moon_dew_cake.png',                // 月露蛋糕
  44: 'fragrant_rice_cake.png',           // 香米蛋糕
  45: 'clear_dew_drink.png',              // 清露饮
  46: 'spicy_drink.png',                  // 辛香饮
  47: 'moon_dew_drink.png',               // 月露饮
  48: 'crystal_dew_flask.png',           // 符露饮
  77: 't1_gathering_pie.png',            // T1采集派
  78: 't2_gathering_pie.png',            // T2采集派
  79: 't3_gathering_pie.png',            // T3采集派
  74: 't1_crafting_salad.png',           // T1工艺沙拉
  75: 't2_crafting_salad.png',           // T2工艺沙拉
  76: 't3_crafting_salad.png',           // T3工艺沙拉

  // ----- 符文 -----
  49: 't1_rune_attack.png',      // T1攻击符文
  50: 't2_rune_attack.png',      // T2攻击符文
  51: 't3_rune_attack.png',      // T3攻击符文
  52: 't1_rune_defend.png',      // T1防御符文
  53: 't2_rune_defend.png',      // T2防御符文
  54: 't3_rune_defend.png',      // T3防御符文
  55: 't1_rune_attack_speed.png',// T1攻速符文
  56: 't2_rune_attack_speed.png',// T2攻速符文
  57: 't3_rune_attack_speed.png',// T3攻速符文
  58: 't1_rune_hit.png',         // T1命中符文
  59: 't2_rune_hit.png',         // T2命中符文
  60: 't3_rune_hit.png',         // T3命中符文
  61: 't1_rune_skill_exp.png',   // T1技能经验符文
  62: 't2_rune_skill_exp.png',   // T2技能经验符文
  63: 't3_rune_skill_exp.png',   // T3技能经验符文
  80: 't1_rune_critical.png',    // T1暴击符文
  81: 't2_rune_critical.png',    // T2暴击符文
  82: 't3_rune_critical.png',    // T3暴击符文
  83: 't1_rune_mana.png',        // T1法力符文
  84: 't2_rune_mana.png',        // T2法力符文
  85: 't3_rune_mana.png',        // T3法力符文
  86: 't1_rune_life.png',        // T1生命符文
  87: 't2_rune_life.png',        // T2生命符文
  88: 't3_rune_life.png',        // T3生命符文

  // ----- 技能卷轴 -----
  8001: 'heavy_strike_scroll.png',          // 重击卷轴
  8002: 'sunder_stance_strike_scroll.png',  // 断势击卷轴
  8003: 'sweeping_strike_scroll.png',       // 横扫击卷轴
  8004: 'charged_slam_scroll.png',          // 蓄力猛击卷轴
  8005: 'fireball_scroll.png',              // 火球术卷轴
  8006: 'pyroblast_scroll.png',             // 炎爆术卷轴
  8007: 'ice_arrow_scroll.png',             // 寒冰箭卷轴
  8008: 'blizzard_scroll.png',              // 暴风雪卷轴
  8009: 'chain_lightning_scroll.png',       // 闪电链卷轴
  8010: 'lightning_storm_scroll.png',       // 闪电风暴卷轴
  8011: 'rapid_shot.png',                   // 快速射击卷轴
  8012: 'precision.png',                    // 精准卷轴
  8013: 'split_shot.png',                   // 分裂攻击卷轴
  8014: 'envenomed_arrows.png',             // 箭矢荼毒卷轴
  8015: 'poison_arrow.png',                 // 毒箭卷轴
  8016: 'backstep.png',                     // 后跳卷轴
  8017: 'focused_shot.png',                 // 凝心射击卷轴
  8018: 'barrage.png',                      // 乱射卷轴
  8019: 'rapid_volley.png',                 // 连射卷轴
  8020: 'toxic_burst.png',                  // 毒性爆发卷轴
  8021: 'eagle_eye.png',                    // 鹰眼卷轴
  8022: 'divine_light_strike.png',          // 圣光打击卷轴

  // ----- 宝箱 -----
  9000: 'small_treasure_chest.png',         // 小宝箱-战斗
  9001: 'small_treasure_chest.png',         // 小宝箱-采集
  9002: 'small_treasure_chest.png',         // 小宝箱-制造

  // ----- T1 布甲 -----
  30000: 'grass_dew_apprentice_hat.png',    // 草露学徒帽
  30400: 'grass_dew_apprentice_robe.png',   // 草露学徒袍
  30800: 'grass_dew_apprentice_gloves.png', // 草露学徒手套
  31200: 'grass_dew_apprentice_pants.png',  // 草露学徒裤
  31600: 'grass_dew_apprentice_boots.png',  // 草露学徒短靴

  // ----- T1 皮甲 -----
  32000: 'wildfield_stalker_hat.png',           // 原野追猎帽
  32400: 'wildfield_stalker_leather_jacket.png',// 原野追猎皮衣
  32800: 'wildfield_stalker_gloves.png',        // 原野追猎手套
  33200: 'wildfield_stalker_leggings.png',      // 原野追猎护腿
  33600: 'wildfield_stalker_boots.png',         // 原野追猎短靴

  // ----- T1 重甲 -----
  34000: 'copper_rivet_guard_helm.png',         // 铜铆守卫盔
  34400: 'copper_rivet_guard_chestplate.png',   // 铜铆守卫胸甲
  34800: 'copper_rivet_guard_gauntlets.png',    // 铜铆守卫护手
  35200: 'copper_rivet_guard_legplates.png',    // 铜铆守卫腿甲
  35600: 'copper_rivet_guard_war_boots.png',    // 铜铆守卫战靴

  // ----- T1 武器 -----
  36000: 'copper_leaf_short_sword.png',     // 铜叶短剑
  36400: 'copper_leaf_sword_shield.png',    // 铜叶剑盾
  36800: 'pine_edge_spear.png',             // 松锋长矛
  37200: 'softwood_hunting_bow.png',        // 软木猎弓
  37600: 'grass_dew_conduit_staff.png',     // 草露导能杖

  // ----- T1 饰品 -----
  38000: 'grass_dew_heartguard_pendant.png',// 草露护心坠
  38400: 'copper_star_ring.png',           // 铜星指环

  // ----- T1 工具 -----
  40800: 'apprentice_logging_axe.png',      // 学徒伐木斧
  41200: 'apprentice_mining_pickaxe.png',   // 学徒采矿镐
  40000: 'apprentice_hunting_knife.png',    // 学徒猎刀
  40400: 'apprentice_planting_hoe.png',     // 学徒种植锄
  38800: 'apprentice_chef_hat.png',         // 学徒厨师帽
  41600: 'apprentice_forging_hammer.png',   // 学徒锻造锤
  42000: 'apprentice_alchemy_bottle.png',   // 学徒炼金瓶
  42400: 'apprentice_enhancement_hammer.png',// 学徒强化锤
  39200: 'apprentice_tailoring_needle.png', // 学徒裁缝针
  39600: 'apprentice_quill.png',            // 学徒羽毛笔

  // ----- T1 采集套装 -----
  42800: 'grass_dew_gathering_hat.png',         // 草露采集帽
  43200: 'grass_dew_gathering_jacket.png',      // 草露采集衣
  43600: 'grass_dew_gathering_gloves.png',      // 草露采集手套
  44000: 'grass_dew_gathering_pants.png',       // 草露采集裤
  44400: 'grass_dew_gathering_short_boots.png', // 草露采集短靴

  // ----- T1 工匠套装 -----
  44800: 'coarse_cloth_craftsman_hat.png',       // 粗布工匠帽
  45200: 'coarse_cloth_craftsman_work_robe.png', // 粗布工匠工袍
  45600: 'coarse_cloth_craftsman_gloves.png',    // 粗布工匠手套
  46000: 'coarse_cloth_craftsman_pants.png',     // 粗布工匠裤
  46400: 'coarse_cloth_craftsman_work_boots.png',// 粗布工匠工靴

  // ----- T1 炼金套装 -----
  46800: 'coarse_cloth_alchemy_hat.png',         // 粗布炼金帽
  47200: 'coarse_cloth_alchemy_work_robe.png',   // 粗布炼金工袍
  47600: 'coarse_cloth_alchemy_gloves.png',      // 粗布炼金手套
  48000: 'coarse_cloth_alchemy_pants.png',       // 粗布炼金裤
  48400: 'coarse_cloth_alchemy_work_boots.png',  // 粗布炼金工靴

  // ----- T1 强化套装 -----
  48800: 'coarse_cloth_enhancement_hat.png',         // 粗布强化帽
  49200: 'coarse_cloth_enhancement_work_robe.png',   // 粗布强化工袍
  49600: 'coarse_cloth_enhancement_gloves.png',      // 粗布强化手套
  50000: 'coarse_cloth_enhancement_pants.png',       // 粗布强化裤
  50400: 'coarse_cloth_enhancement_work_boots.png',  // 粗布强化工靴

  // ----- T2 布甲 -----
  30100: 'flame_pattern_walker_hat.png',    // 焰纹行者帽
  30500: 'flame_pattern_walker_robe.png',   // 焰纹行者袍
  30900: 'flame_pattern_walker_gloves.png', // 焰纹行者手套
  31300: 'flame_pattern_walker_pants.png',  // 焰纹行者裤
  31700: 'flame_pattern_walker_boots.png',  // 焰纹行者短靴

  // ----- T2 皮甲 -----
  32100: 'wild_fang_walker_hood.png',            // 野牙行者兜帽
  32500: 'wild_fang_walker_hunting_outfit.png',  // 野牙行者猎装
  32900: 'wild_fang_walker_gauntlets.png',       // 野牙行者护手
  33300: 'wild_fang_walker_leggings.png',        // 野牙行者护腿
  33700: 'wild_fang_walker_hunting_boots.png',   // 野牙行者猎靴

  // ----- T2 重甲 -----
  34100: 'iron_wall_patrol_guard_helm.png',          // 铁壁巡卫盔
  34500: 'iron_wall_patrol_guard_chestplate.png',    // 铁壁巡卫胸甲
  34900: 'iron_wall_patrol_guard_armguards.png',     // 铁壁巡卫臂甲
  35300: 'iron_wall_patrol_guard_legplates.png',     // 铁壁巡卫腿甲
  35700: 'iron_wall_patrol_guard_heavy_boots.png',   // 铁壁巡卫重靴

  // ----- T2 武器 -----
  36100: 'iron_wind_longsword.png',       // 铁风长剑
  36500: 'iron_wall_sword_shield.png',    // 铁壁剑盾
  36900: 'iron_feather_hunting_spear.png',// 铁羽猎矛
  37300: 'hardwood_wanderer_bow.png',     // 硬木游弓
  37700: 'blazing_flame_threadlight_staff.png', // 炎焰纤光杖

  // ----- T2 饰品 -----
  38100: 'iron_flame_traveler_pendant.png', // 铁焰旅人坠
  38500: 'iron_flame_ring.png',            // 铁焰指环

  // ----- T2 工具 -----
  40900: 'craftsman_logging_axe.png',      // 工匠伐木斧
  41300: 'craftsman_mining_pickaxe.png',   // 工匠采矿镐
  40100: 'craftsman_hunting_knife.png',    // 工匠猎刀
  40500: 'craftsman_planting_hoe.png',     // 工匠种植锄
  38900: 'craftsman_chef_hat.png',         // 工匠厨师帽
  41700: 'craftsman_forging_hammer.png',   // 工匠锻造锤
  42100: 'craftsman_alchemy_bottle.png',   // 工匠炼金瓶
  42500: 'craftsman_enhancement_hammer.png',// 工匠强化锤
  39300: 'craftsman_tailoring_needle.png', // 工匠裁缝针
  39700: 'craftsman_quill.png',            // 工匠羽毛笔

  // ----- T2 采集套装 -----
  42900: 'wild_path_gathering_hat.png',         // 野径采集帽
  43300: 'wild_path_gathering_coat.png',        // 野径采集外衣
  43700: 'wild_path_gathering_gloves.png',      // 野径采集手套
  44100: 'wild_path_gathering_leggings.png',    // 野径采集护腿
  44500: 'wild_path_gathering_travel_boots.png',// 野径采集行靴

  // ----- T2 工匠套装 -----
  44900: 'workshop_craftsman_hat.png',         // 工坊工匠帽
  45300: 'workshop_craftsman_work_robe.png',   // 工坊工匠工袍
  45700: 'workshop_craftsman_gauntlets.png',   // 工坊工匠护手
  46100: 'workshop_craftsman_leggings.png',    // 工坊工匠护腿
  46500: 'workshop_craftsman_work_boots.png',  // 工坊工匠工靴

  // ----- T2 炼金套装 -----
  46900: 'workshop_alchemy_hat.png',           // 工坊炼金帽
  47300: 'workshop_alchemy_work_robe.png',     // 工坊炼金工袍
  47700: 'workshop_alchemy_gauntlets.png',     // 工坊炼金护手
  48100: 'workshop_alchemy_leggings.png',      // 工坊炼金护腿
  48500: 'workshop_alchemy_work_boots.png',    // 工坊炼金工靴

  // ----- T2 强化套装 -----
  48900: 'workshop_enhancement_hat.png',         // 工坊强化帽
  49300: 'workshop_enhancement_work_robe.png',   // 工坊强化工袍
  49700: 'workshop_enhancement_gauntlets.png',   // 工坊强化护手
  50100: 'workshop_enhancement_leggings.png',    // 工坊强化护腿
  50500: 'workshop_enhancement_work_boots.png',  // 工坊强化工靴

  // ----- T3 布甲 -----
  30200: 'moon_pattern_spellwoven_hood.png',     // 月纹咒织兜帽
  30600: 'moon_pattern_spellwoven_robe.png',     // 月纹咒织长袍
  31000: 'moon_pattern_spellwoven_gauntlets.png',// 月纹咒织护手
  31400: 'moon_pattern_spellwoven_leggings.png', // 月纹咒织护腿
  31800: 'moon_pattern_spellwoven_boots.png',    // 月纹咒织长靴

  // ----- T3 皮甲 -----
  32200: 'deer_shadow_ranger_hood.png',            // 鹿影游侠风帽
  32600: 'deer_shadow_ranger_leather_armor.png',   // 鹿影游侠皮甲
  33000: 'deer_shadow_ranger_bracers.png',         // 鹿影游侠护腕
  33400: 'deer_shadow_ranger_leggings.png',        // 鹿影游侠护腿
  33800: 'deer_shadow_ranger_boots.png',           // 鹿影游侠长靴

  // ----- T3 重甲 -----
  34200: 'silver_lock_fortress_helm.png',          // 银锁堡垒盔
  34600: 'silver_lock_fortress_chestplate.png',    // 银锁堡垒胸甲
  35000: 'silver_lock_fortress_armguards.png',     // 银锁堡垒臂甲
  35400: 'silver_lock_fortress_legplates.png',     // 银锁堡垒腿甲
  35800: 'silver_lock_fortress_war_boots.png',     // 银锁堡垒战靴

  // ----- T3 武器 -----
  36200: 'silver_radiance_moon_pattern_sword.png', // 银辉月纹剑
  36600: 'silver_pattern_sword_shield.png',        // 银纹剑盾
  37000: 'crimson_pattern_crescent_spear.png',     // 赤纹月牙枪
  37400: 'crimson_pattern_deer_shadow_bow.png',    // 赤纹鹿影弓
  37800: 'moon_dew_spell_pattern_staff.png',       // 月露咒纹杖

  // ----- T3 饰品 -----
  38200: 'moon_pattern_wish_chain.png',          // 月纹祈愿链
  38600: 'moon_dew_silver_pattern_ring.png',     // 月露银纹戒

  // ----- T3 工具 -----
  41000: 'moon_pattern_logging_axe.png',      // 月纹伐木斧
  41400: 'moon_pattern_mining_pickaxe.png',   // 月纹采矿镐
  40200: 'moon_pattern_hunting_knife.png',    // 月纹猎刀
  40600: 'moon_pattern_planting_hoe.png',     // 月纹种植锄
  39000: 'moon_pattern_chef_hat.png',         // 月纹厨师帽
  41800: 'moon_pattern_forging_hammer.png',   // 月纹锻造锤
  42200: 'moon_pattern_alchemy_bottle.png',   // 月纹炼金瓶
  42600: 'moon_pattern_enhancement_hammer.png',// 月纹强化锤
  39400: 'moon_pattern_tailoring_needle.png', // 月纹裁缝针
  39800: 'moon_pattern_quill.png',            // 月纹羽毛笔

  // ----- T3 采集套装 -----
  43000: 'moon_pattern_gathering_leather_cap.png', // 月纹采集风帽
  43400: 'moon_pattern_gathering_leather_armor_jacket.png', // 月纹采集外衣
  43800: 'moon_pattern_gathering_gauntlets.png',   // 月纹采集护手
  44200: 'moon_pattern_gathering_leggings.png',    // 月纹采集护腿
  44600: 'moon_pattern_gathering_long_boots.png',  // 月纹采集长靴

  // ----- T3 工匠套装 -----
  45000: 'moon_pattern_craftsman_hat.png',         // 月纹工匠帽
  45400: 'moon_pattern_craftsman_work_robe.png',   // 月纹工匠工袍
  45800: 'moon_pattern_craftsman_gauntlets.png',   // 月纹工匠护手
  46200: 'moon_pattern_craftsman_leggings.png',    // 月纹工匠护腿
  46600: 'moon_pattern_craftsman_long_boots.png',  // 月纹工匠长靴

  // ----- T3 炼金套装 -----
  47000: 'moon_pattern_alchemy_hat.png',           // 月纹炼金帽
  47400: 'moon_pattern_alchemy_work_robe.png',     // 月纹炼金工袍
  47800: 'moon_pattern_alchemy_gauntlets.png',     // 月纹炼金护手
  48200: 'moon_pattern_alchemy_leggings.png',      // 月纹炼金护腿
  48600: 'moon_pattern_alchemy_long_boots.png',    // 月纹炼金长靴

  // ----- T3 强化套装 -----
  49000: 'moon_pattern_enhancement_hat.png',         // 月纹强化帽
  49400: 'moon_pattern_enhancement_work_robe.png',   // 月纹强化工袍
  49800: 'moon_pattern_enhancement_gauntlets.png',   // 月纹强化护手
  50200: 'moon_pattern_enhancement_leggings.png',    // 月纹强化护腿
  50600: 'moon_pattern_enhancement_long_boots.png',  // 月纹强化长靴

  // ----- T4 布甲 -----
  30300: 'rune_light_arcane_crown.png',       // 符光秘法冠
  30700: 'rune_light_arcane_robe.png',        // 符光秘法长袍
  31100: 'rune_light_arcane_gauntlets.png',   // 符光秘法护手
  31500: 'rune_light_arcane_leggings.png',    // 符光秘法护腿
  31900: 'rune_light_arcane_boots.png',       // 符光秘法步靴

  // ----- T4 皮甲 -----
  32300: 'wolf_pattern_swift_hunter_hood.png',               // 狼纹疾猎兜帽
  32700: 'wolf_pattern_swift_hunter_battle_leather_armor.png',// 狼纹疾猎战皮甲
  33100: 'wolf_pattern_swift_hunter_bracers.png',            // 狼纹疾猎护腕
  33500: 'wolf_pattern_swift_hunter_leggings.png',           // 狼纹疾猎护腿
  33900: 'wolf_pattern_swift_hunter_swiftwind_boots.png',    // 狼纹疾猎疾风靴

  // ----- T4 重甲 -----
  34300: 'mithril_lion_guard_helm.png',            // 秘银狮卫盔
  34700: 'mithril_lion_guard_chestplate.png',      // 秘银狮卫胸甲
  35100: 'mithril_lion_guard_armguards.png',       // 秘银狮卫臂甲
  35500: 'mithril_lion_guard_legplates.png',       // 秘银狮卫腿甲
  35900: 'mithril_lion_guard_lionstride_boots.png',// 秘银狮卫雄步靴

  // ----- T4 武器 -----
  36300: 'mithril_rune_seal_sword.png',        // 秘银符印剑
  36700: 'mystic_pattern_sword_shield.png',    // 秘纹剑盾
  37100: 'rune_iron_wind_rending_spear.png',   // 符铁裂风矛
  37500: 'rune_pattern_wind_chaser_bow.png',   // 符纹追风弓
  37900: 'rune_mithril_staff.png',             // 符文秘银杖

  // ----- T4 饰品 -----
  38300: 'rune_light_mithril_pendant.png',  // 符光秘银坠
  38700: 'mithril_rune_pattern_ring.png',   // 秘银符纹戒

  // ----- T4 工具 -----
  41100: 'rune_pattern_logging_axe.png',      // 符纹伐木斧
  41500: 'rune_pattern_mining_pickaxe.png',   // 符纹采矿镐
  40300: 'rune_pattern_hunting_knife.png',    // 符纹猎刀
  40700: 'rune_pattern_planting_hoe.png',     // 符纹种植锄
  39100: 'rune_pattern_chef_hat.png',         // 符纹厨师帽
  41900: 'rune_pattern_forging_hammer.png',   // 符纹锻造锤
  42300: 'rune_pattern_alchemy_bottle.png',   // 符纹炼金瓶
  42700: 'rune_pattern_enhancement_hammer.png',// 符纹强化锤
  39500: 'rune_pattern_tailoring_needle.png', // 符纹裁缝针
  39900: 'rune_pattern_quill.png',            // 符纹羽毛笔

  // ----- T4 采集套装 -----
  43100: 'rune_pattern_gathering_hood.png',           // 符纹采集兜帽
  43500: 'rune_pattern_gathering_long_coat.png',      // 符纹采集长衣
  43900: 'rune_pattern_gathering_gauntlets.png',      // 符纹采集护手
  44300: 'rune_pattern_gathering_leggings.png',       // 符纹采集护腿
  44700: 'rune_pattern_gathering_step_boots.png',     // 符纹采集步靴

  // ----- T4 工匠套装 -----
  45100: 'rune_pattern_craftsman_crown.png',         // 符纹工匠冠
  45500: 'rune_pattern_craftsman_work_robe.png',     // 符纹工匠工袍
  45900: 'rune_pattern_craftsman_gauntlets.png',     // 符纹工匠护手
  46300: 'rune_pattern_craftsman_leggings.png',      // 符纹工匠护腿
  46700: 'rune_pattern_craftsman_step_boots.png',    // 符纹工匠步靴

  // ----- T4 炼金套装 -----
  47100: 'rune_pattern_alchemy_crown.png',           // 符纹炼金冠
  47500: 'rune_pattern_alchemy_work_robe.png',       // 符纹炼金工袍
  47900: 'rune_pattern_alchemy_gauntlets.png',       // 符纹炼金护手
  48300: 'rune_pattern_alchemy_leggings.png',        // 符纹炼金护腿
  48700: 'rune_pattern_alchemy_step_boots.png',      // 符纹炼金步靴

  // ----- T4 强化套装 -----
  49100: 'rune_pattern_enhancement_crown.png',         // 符纹强化冠
  49500: 'rune_pattern_enhancement_work_robe.png',     // 符纹强化工袍
  49900: 'rune_pattern_enhancement_gauntlets.png',     // 符纹强化护手
  50300: 'rune_pattern_enhancement_leggings.png',      // 符纹强化护腿
  50700: 'rune_pattern_enhancement_step_boots.png',    // 符纹强化步靴

  // ----- 精良中间材料 -----
  52010: 'fogmarsh_copper_ingot.png',      // 雾沼铜锭
  52011: 'fogmarsh_wood_plank.png',        // 雾沼木板
  52012: 'fogmarsh_leather.png',           // 雾沼皮革
  52013: 'fogmarsh_cloth.png',             // 雾沼布
  52014: 'aurora_iron_ingot.png',          // 极光铁锭
  52015: 'aurora_wood_plank.png',          // 极光木板
  52016: 'aurora_leather.png',             // 极光皮革
  52017: 'aurora_cloth.png',               // 极光布
  52018: 'thunderfeather_silver_ingot.png',// 雷羽银锭
  52019: 'thunderfeather_wood_plank.png',  // 雷羽木板
  52020: 'thunderfeather_leather.png',     // 雷羽皮革
  52021: 'thunderfeather_cloth.png',       // 雷羽布
  52022: 'darkmoon_mithril_ingot.png',     // 暗月秘银锭
  52023: 'darkmoon_wood_plank.png',        // 暗月木板
  52024: 'darkmoon_leather.png',           // 暗月皮革
  52025: 'darkmoon_cloth.png',             // 暗月布

  // ----- 精良布甲（雾沼）-----
  60000: 'fogmarsh_arcana_hat.png',     // 雾沼秘学帽
  60400: 'fogmarsh_arcana_robe.png',    // 雾沼秘学袍
  60800: 'fogmarsh_arcana_gloves.png',  // 雾沼秘学手套
  61200: 'fogmarsh_arcana_pants.png',   // 雾沼秘学护腿
  61600: 'fogmarsh_arcana_boots.png',   // 雾沼秘学长靴

  // ----- 精良布甲（极光）-----
  60100: 'aurora_weavecraft_hat.png',   // 极光织法帽
  60500: 'aurora_weavecraft_robe.png',  // 极光织法袍
  60900: 'aurora_weavecraft_gloves.png',// 极光织法手套
  61300: 'aurora_weavecraft_pants.png', // 极光织法护腿
  61700: 'aurora_weavecraft_boots.png', // 极光织法长靴

  // ----- 精良布甲（星尘）-----
  60200: 'stardust_windchant_hat.png',  // 星尘风语帽
  60600: 'stardust_windchant_robe.png', // 星尘风语袍
  61000: 'stardust_windchant_gloves.png',// 星尘风语手套
  61400: 'stardust_windchant_pants.png',// 星尘风语护腿
  61800: 'stardust_windchant_boots.png',// 星尘风语长靴

  // ----- 精良布甲（幽月）-----
  60300: 'gloommoon_spirit_gauze_hat.png',   // 幽月灵纱帽
  60700: 'gloommoon_spirit_gauze_robe.png',  // 幽月灵纱袍
  61100: 'gloommoon_spirit_gauze_gloves.png',// 幽月灵纱手套
  61500: 'gloommoon_spirit_gauze_pants.png', // 幽月灵纱护腿
  61900: 'gloommoon_spirit_gauze_boots.png', // 幽月灵纱长靴

  // ----- 精良皮甲（沼鳞）-----
  62000: 'marshscale_stalker_hood.png',           // 沼鳞伏行帽
  62400: 'marshscale_stalker_chestpiece.png',     // 沼鳞伏行皮衣
  62800: 'marshscale_stalker_gloves.png',         // 沼鳞伏行护手
  63200: 'marshscale_stalker_legguards.png',      // 沼鳞伏行护腿
  63600: 'marshscale_stalker_boots.png',          // 沼鳞伏行猎靴

  // ----- 精良皮甲（冰牙）-----
  62100: 'icefang_patrolhunter_hood.png',           // 冰牙巡猎帽
  62500: 'icefang_patrolhunter_chestpiece.png',     // 冰牙巡猎皮衣
  62900: 'icefang_patrolhunter_gloves.png',         // 冰牙巡猎护手
  63300: 'icefang_patrolhunter_legguards.png',      // 冰牙巡猎护腿
  63700: 'icefang_patrolhunter_boots.png',          // 冰牙巡猎猎靴

  // ----- 精良皮甲（雷羽）-----
  62200: 'thunderfeather_skypatrol_hood.png',       // 雷羽巡空帽
  62600: 'thunderfeather_skypatrol_chestpiece.png', // 雷羽巡空皮衣
  63000: 'thunderfeather_skypatrol_gloves.png',     // 雷羽巡空护手
  63400: 'thunderfeather_skypatrol_legguards.png',  // 雷羽巡空护腿
  63800: 'thunderfeather_skypatrol_boots.png',      // 雷羽巡空猎靴

  // ----- 精良皮甲（夜鸦）-----
  62300: 'nightcrow_pursuer_hood.png',           // 夜鸦追猎帽
  62700: 'nightcrow_pursuer_chestpiece.png',     // 夜鸦追猎皮衣
  63100: 'nightcrow_pursuer_gloves.png',         // 夜鸦追猎护手
  63500: 'nightcrow_pursuer_legguards.png',      // 夜鸦追猎护腿
  63900: 'nightcrow_pursuer_boots.png',          // 夜鸦追猎猎靴

  // ----- 精隆重甲（泥背）-----
  64000: 'mudback_shellguard_helm.png',          // 泥背坚壳盔
  64400: 'mudback_shellguard_chestplate.png',    // 泥背坚壳胸甲
  64800: 'mudback_shellguard_armguards.png',     // 泥背坚壳护手
  65200: 'mudback_shellguard_legplates.png',     // 泥背坚壳腿甲
  65600: 'mudback_shellguard_boots.png',         // 泥背坚壳战靴

  // ----- 精隆重甲（霜角）-----
  64100: 'frosthorn_garrison_helm.png',          // 霜角卫戍盔
  64500: 'frosthorn_garrison_chestplate.png',    // 霜角卫戍胸甲
  64900: 'frosthorn_garrison_armguards.png',     // 霜角卫戍护手
  65300: 'frosthorn_garrison_legplates.png',     // 霜角卫戍腿甲
  65700: 'frosthorn_garrison_boots.png',         // 霜角卫戍战靴

  // ----- 精隆重甲（风暴）-----
  64200: 'storm_cloudguard_helm.png',            // 风暴云卫盔
  64600: 'storm_cloudguard_chestplate.png',      // 风暴云卫胸甲
  65000: 'storm_cloudguard_armguards.png',       // 风暴云卫护手
  65400: 'storm_cloudguard_legplates.png',       // 风暴云卫腿甲
  65800: 'storm_cloudguard_boots.png',           // 风暴云卫战靴

  // ----- 精隆重甲（暗月）-----
  64300: 'darkmoon_boneguard_helm.png',          // 暗月骸卫盔
  64700: 'darkmoon_boneguard_chestplate.png',    // 暗月骸卫胸甲
  65100: 'darkmoon_boneguard_armguards.png',     // 暗月骸卫护手
  65500: 'darkmoon_boneguard_legplates.png',     // 暗月骸卫腿甲
  65900: 'darkmoon_boneguard_boots.png',         // 暗月骸卫战靴

  // ----- 精良武器 - 长剑 -----
  66000: 'marshbone_short_sword.png',     // 沼骨短剑
  66100: 'icefang_longsword.png',         // 冰牙长剑
  66200: 'windcut_thunderblade.png',      // 风切雷刃
  66300: 'star_eclipse_boneblade.png',    // 星蚀骨刃

  // ----- 精良武器 - 剑盾 -----
  66400: 'mudback_sword_shield.png',      // 泥背剑盾
  66500: 'frosthorn_sword_shield.png',    // 霜角剑盾
  66600: 'storm_sword_shield.png',        // 风暴剑盾
  66700: 'darkmoon_boneshield_sword.png', // 暗月骨盾剑

  // ----- 精良武器 - 长矛 -----
  66800: 'reedbone_spear.png',            // 芦骨长矛
  66900: 'icebranch_spear.png',           // 冰枝长矛
  67000: 'windcut_spear.png',             // 风切长矛
  67100: 'ancient_rune_bone_spear.png',   // 古符骨矛

  // ----- 精良武器 - 弓箭 -----
  67200: 'fogmarsh_hunter_bow.png',       // 雾沼猎弓
  67300: 'coldwind_snow_bow.png',         // 寒风雪弓
  67400: 'thunderfeather_skypatrol_bow.png', // 雷羽巡空弓
  67500: 'bonewing_night_bow.png',        // 骨翼夜弓

  // ----- 精良武器 - 法杖 -----
  67600: 'fogmarsh_conduit_staff.png',       // 雾沼导能杖
  67700: 'aurora_spellpattern_staff.png',    // 极光咒纹杖
  67800: 'stardust_thundercaller_staff.png', // 星尘唤雷杖
  67900: 'gloommoon_soulcalling_staff.png',  // 幽月引魂杖
};

/**
 * 根据物品ID获取图片文件名
 * @param {number} itemId - 物品ID
 * @returns {string} 图片文件名，若无则返回 undefined
 */
function getItemImage(itemId) {
    return ITEM_IMAGE_MAP[itemId];
}


