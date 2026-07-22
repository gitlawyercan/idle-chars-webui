/**
 * 背包物品模块 - 带图标版本 + 多账号选择（修复：账号字段名兼容）
 * 
 * 显示背包中的所有物品及其数量
 * 使用 ITEM_MAP 映射物品ID到名称
 * 使用 texture-2 图集显示物品图标
 * 支持在多个已导入数据的账号间切换查看
 */

const InventoryModule = {
    rendered: false,
    
    // 图标缓存
    _frameCache: null,
    _imagePath: '/textures/texture-2.png',
    _textureW: 2048,
    _textureH: 2048,

    async render(container, app) {
        this.app = app;
        this._container = container;

        // 获取所有有缓存的账号列表
        const cachedAccounts = this.getCachedAccounts();
        const playerData = app.state.playerData;

        // 确定当前显示的账号数据
        let displayData = playerData;

        if (cachedAccounts.length > 0) {
            const savedEmail = localStorage.getItem('inventory_selected_email') || '';
            if (savedEmail) {
                const cached = this.getCachedPlayerData(savedEmail);
                if (cached) displayData = cached;
            }
            if (!localStorage.getItem('inventory_selected_email') && cachedAccounts.length > 0) {
                const cached = this.getCachedPlayerData(cachedAccounts[0].email);
                if (cached) displayData = cached;
            }
        }

        const inventory = displayData?.inventory || [];
        const totalItems = inventory.reduce((sum, item) => sum + item.qty, 0);
        const sorted = [...inventory].sort((a, b) => b.qty - a.qty);

        if (inventory.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
                        <div style="font-size:48px;margin-bottom:12px;">🎒</div>
                        <p>暂无背包数据</p>
                        <p style="font-size:12px;margin-top:8px;">请在「数据接口」模块导入角色数据</p>
                    </div>
                </div>
            `;
            this.rendered = true;
            return;
        }

        const categories = {
            '基础材料': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,101,102,103,104],
            '加工材料': [21,22,23,24,25,26,27,28,29,30,31,32,89,90,91,92],
            '精华': [64,65,66,67,68,69,70,71,72,73],
            '消耗品': [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,74,75,76,77,78,79],
            '符文': [49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,80,81,82,83,84,85,86,87,88],
            '卷轴': [8001,8002,8003,8004,8005,8006,8007,8008,8009,8010,8011,8012,8013,8014,8015,8016,8017,8018,8019,8020,8021,8022],
            '宝箱': [9000,9001,9002],
            '装备': [30000,30100,30200,30300,30400,30500,30600,30700,30800,30900,31000,31100,31200,31300,31400,31500,31600,31700,31800,31900,32000,32100,32200,32300,32400,32500,32600,32700,32800,32900,33000,33100,33200,33300,33400,33500,33600,33700,33800,33900,34000,34100,34200,34300,34400,34500,34600,34700,34800,34900,35000,35100,35200,35300,35400,35500,35600,35700,35800,35900,36000,36100,36200,36300,36400,36500,36600,36700,36800,36900,37000,37100,37200,37300,37400,37500,37600,37700,37800,37900,38000,38100,38200,38300,38400,38500,38600,38700,38800,38900,39000,39100,39200,39300,39400,39500,39600,39700,39800,39900,40000,40100,40200,40300,40400,40500,40600,40700,40800,40900,41000,41100,41200,41300,41400,41500,41600,41700,41800,41900,42000,42100,42200,42300,42400,42500,42600,42700,42800,42900,43000,43100,43200,43300,43400,43500,43600,43700,43800,43900,44000,44100,44200,44300,44400,44500,44600,44700,44800,44900,45000,45100,45200,45300,45400,45500,45600,45700,45800,45900,46000,46100,46200,46300,46400,46500,46600,46700,46800,46900,47000,47100,47200,47300,47400,47500,47600,47700,47800,47900,48000,48100,48200,48300,48400,48500,48600,48700,48800,48900,49000,49100,49200,49300,49400,49500,49600,49700,49800,49900,50000,50100,50200,50300,50400,50500,50600,50700],
            '精良材料': [52010,52011,52012,52013,52014,52015,52016,52017,52018,52019,52020,52021,52022,52023,52024,52025],
            '精良装备': [60000,60001,60002,60003,60400,60401,60402,60403,60800,60801,60802,60803,61200,61201,61202,61203,61600,61601,61602,61603,62000,62100,62200,62300,62400,62500,62600,62700,62800,62900,63000,63100,63200,63300,63400,63500,63600,63700,63800,63900,64000,64100,64200,64300,64400,64500,64600,64700,64800,64900,65000,65100,65200,65300,65400,65500,65600,65700,65800,65900,66000,66100,66200,66300,66400,66500,66600,66700,66800,66900,67000,67100,67200,67300,67400,67500,67600,67700,67800,67900],
        };

        const catCounts = {};
        Object.keys(categories).forEach(cat => { catCounts[cat] = 0; });
        catCounts['其他'] = 0;
        sorted.forEach(item => {
            let found = false;
            for (const [cat, ids] of Object.entries(categories)) {
                if (ids.includes(item.itemId)) { catCounts[cat] += item.qty; found = true; break; }
            }
            if (!found) catCounts['其他'] += item.qty;
        });

        container.innerHTML = `
            <div style="max-width:1000px;margin:0 auto;">
                <!-- 账号选择 -->
                ${this.renderAccountSelector(cachedAccounts)}

                <div class="card">
                    <div class="card-title">🎒 背包 <span style="font-size:13px;font-weight:400;color:var(--text-muted);">${inventory.length} 种物品，共 ${this.fmtNum(totalItems)} 个</span></div>
                    
                    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
                        ${Object.entries(catCounts).filter(([,c]) => c > 0).map(([cat, count]) => `
                            <span style="padding:4px 12px;border-radius:12px;font-size:12px;background:var(--bg-tertiary);color:var(--text-secondary);">
                                ${this.getCatIcon(cat)} ${cat}: ${this.fmtNum(count)}
                            </span>
                        `).join('')}
                    </div>

                    <input type="text" id="inv-search" placeholder="搜索物品..." 
                        style="width:100%;padding:8px 12px;border-radius:6px;background:var(--bg-tertiary);
                               border:1px solid var(--border-color);color:var(--text-primary);
                               outline:none;margin-bottom:12px;font-size:13px;" />

                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px;" id="inv-grid">
                        ${sorted.map(item => this.renderItemCard(item)).join('')}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('inv-search').addEventListener('input', function() {
            const q = this.value.toLowerCase();
            document.querySelectorAll('.inv-item-card').forEach(card => {
                const name = card.dataset.name.toLowerCase();
                const id = card.dataset.id;
                card.style.display = (!q || name.includes(q) || id.includes(q)) ? 'flex' : 'none';
            });
        });

        // 绑定账号切换
        const selector = document.getElementById('inv-account-select');
        if (selector) {
            selector.addEventListener('change', (e) => {
                const email = e.target.value;
                localStorage.setItem('inventory_selected_email', email);
                this.render(container, app);
            });
        }

        await this.loadIconFrames();
        this.applyItemIcons();
        this.rendered = true;
    },

    renderAccountSelector(cachedAccounts) {
        if (cachedAccounts.length <= 1) return '';

        const currentEmail = localStorage.getItem('inventory_selected_email') || cachedAccounts[0]?.email || '';
        const options = cachedAccounts.map(a => `
            <option value="${a.email}" ${a.email === currentEmail ? 'selected' : ''}>
                ${a.name || a.email}
            </option>
        `).join('');

        return `
            <div class="card" style="margin-bottom:12px;padding:10px 14px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:600;color:var(--text-secondary);">👤 选择账号</span>
                    <select id="inv-account-select" style="flex:1;padding:6px 10px;border-radius:6px;
                        background:var(--bg-tertiary);border:1px solid var(--border-color);
                        color:var(--text-primary);outline:none;font-size:13px;">
                        ${options}
                    </select>
                </div>
            </div>
        `;
    },

    /**
     * 获取有缓存数据的账号列表（修复：字段名兼容）
     */
    getCachedAccounts() {
        const app = this.app || window.__app;
        const accounts = app?.state?.accounts || [];
        const cacheStr = localStorage.getItem('idle_player_cache');
        
        if (!cacheStr) {
            return accounts.map(a => ({
                email: a.username || a.email || 'unknown',
                name: a.nickname || a.name || a.username || a.email || '未知'
            }));
        }
        
        try {
            const cache = JSON.parse(cacheStr);
            const result = [];
            
            accounts.forEach(a => {
                const email = a.username || a.email;
                if (email && cache[email] && cache[email].data) {
                    result.push({ 
                        email, 
                        name: a.nickname || a.name || a.username || email 
                    });
                }
            });
            
            if (result.length === 0) {
                Object.keys(cache).forEach(email => {
                    if (cache[email] && cache[email].data) {
                        result.push({ email, name: email });
                    }
                });
            }
            
            return result;
        } catch { 
            return []; 
        }
    },

    getCachedPlayerData(email) {
        if (!email) return null;
        try {
            const cacheStr = localStorage.getItem('idle_player_cache');
            if (!cacheStr) return null;
            const cache = JSON.parse(cacheStr);
            return cache[email]?.data || null;
        } catch { return null; }
    },

    renderItemCard(item) {
        const name = getItemName(item.itemId);
        const color = item.qty >= 1000 ? 'var(--accent-orange)' : item.qty >= 100 ? 'var(--accent)' : '';
        const iconPath = this.getItemIconPath(item.itemId);

        return `
            <div class="inv-item-card" data-name="${name}" data-id="${item.itemId}" 
                 style="display:flex;align-items:center;gap:10px;padding:8px 12px;
                        background:var(--bg-secondary);border:1px solid var(--border-color);
                        border-radius:6px;transition:border-color .2s;">
                <span class="item-icon" data-icon-path="${iconPath || ''}" 
                      style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;font-size:16px;">
                    ${iconPath ? '' : this.getItemEmoji(item.itemId)}
                </span>
                <div style="flex:1;min-width:0;font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                     title="${name} (ID: ${item.itemId})">${name}</div>
                <div style="font-size:15px;font-weight:700;flex-shrink:0;${color ? 'color:'+color : ''};">${this.fmtNum(item.qty)}</div>
            </div>
        `;
    },

    getItemEmoji(itemId) {
        const emojiMap = {
            1:'🪵', 2:'🪵', 3:'🪵', 4:'🪵',
            5:'🪨', 6:'🪨', 7:'🪨', 8:'🪨',
            9:'🦌', 10:'🦌', 11:'🦌', 12:'🦌',
            13:'🌾', 14:'🌾', 15:'🌾', 16:'🌾', 17:'🌾', 18:'🌾', 19:'🌾', 20:'🌾',
            101:'🫐', 102:'🍎', 103:'🍇', 104:'⭐',
            91:'🔩', 21:'🔩', 22:'🔩', 23:'🔩',
            92:'🪵', 24:'🪵', 25:'🪵', 26:'🪵',
            90:'🧶', 27:'🧶', 28:'🧶', 29:'🧶',
            89:'🧵', 30:'🧵', 31:'🧵', 32:'🧵',
            33:'🍞', 34:'🍞', 35:'🍞', 36:'🍞',
            37:'🍲', 38:'🍲', 39:'🍲', 40:'🍲',
            41:'🍰', 42:'🍰', 43:'🍰', 44:'🍰',
            45:'🥤', 46:'🥤', 47:'🥤', 48:'🥤',
            74:'🥗', 75:'🥗', 76:'🥗', 77:'🥧', 78:'🥧', 79:'🥧',
            49:'🔴', 50:'🔴', 51:'🔴', 52:'🔵', 53:'🔵', 54:'🔵',
            55:'🟢', 56:'🟢', 57:'🟢', 58:'🟡', 59:'🟡', 60:'🟡',
            61:'🟣', 62:'🟣', 63:'🟣', 80:'❤️', 81:'❤️', 82:'❤️',
            83:'💙', 84:'💙', 85:'💙', 86:'💚', 87:'💚', 88:'💚',
            8001:'📜', 8002:'📜', 8003:'📜', 8004:'📜', 8005:'📜', 8006:'📜',
            8007:'📜', 8008:'📜', 8009:'📜', 8010:'📜', 8011:'📜', 8012:'📜',
            8013:'📜', 8014:'📜', 8015:'📜', 8016:'📜', 8017:'📜', 8018:'📜',
            8019:'📜', 8020:'📜', 8021:'📜', 8022:'📜',
            9000:'📦', 9001:'📦', 9002:'📦',
            30000:'🎩', 30400:'👘', 30800:'🧤', 31200:'👖', 31600:'👢',
            34000:'⛑️', 34400:'🦺', 34800:'🛡️', 35200:'🦵', 35600:'👢',
            36000:'🗡️', 36400:'🛡️', 36800:'🔱', 37200:'🏹', 37600:'🔮',
            38000:'📿', 38400:'💍',
            40800:'🪓', 41200:'⛏️', 40000:'🔪', 40400:'🔧',
        };
        return emojiMap[itemId] || '📦';
    },

    getItemIconPath(itemId) {
        const map = {
            89: 'icons/processed_intermediate_icon/cloth/flax_cloth.png',
            30: 'icons/processed_intermediate_icon/cloth/cotton_cloth.png',
            31: 'icons/processed_intermediate_icon/cloth/moon_flax_cloth.png',
            32: 'icons/processed_intermediate_icon/cloth/rune_vine_cloth.png',
            90: 'icons/processed_intermediate_icon/leather/light_leather.png',
            27: 'icons/processed_intermediate_icon/leather/thick_leather.png',
            28: 'icons/processed_intermediate_icon/leather/moon_pattern_leather.png',
            29: 'icons/processed_intermediate_icon/leather/snow_pattern_leather.png',
            91: 'icons/processed_intermediate_icon/metal_ingot/copper_ingot.png',
            21: 'icons/processed_intermediate_icon/metal_ingot/iron_ingot.png',
            22: 'icons/processed_intermediate_icon/metal_ingot/silver_ingot.png',
            23: 'icons/processed_intermediate_icon/metal_ingot/mithril_ingot.png',
            92: 'icons/processed_intermediate_icon/wood_plank/pine_plank.png',
            24: 'icons/processed_intermediate_icon/wood_plank/oak_plank.png',
            25: 'icons/processed_intermediate_icon/wood_plank/laurel_plank.png',
            26: 'icons/processed_intermediate_icon/wood_plank/runewood_plank.png',
            64: 'icons/essence_icon/logging_essence_transparent.png',
            65: 'icons/essence_icon/mining_essence_transparent.png',
            66: 'icons/essence_icon/hunting_essence_transparent.png',
            67: 'icons/essence_icon/planting_essence_transparent.png',
            68: 'icons/essence_icon/cooking_essence_transparent.png',
            69: 'icons/essence_icon/forging_essence_transparent.png',
            70: 'icons/essence_icon/tailoring_essence_transparent.png',
            71: 'icons/essence_icon/inscription_essence_transparent.png',
            72: 'icons/essence_icon/alchemy_essence_transparent.png',
            73: 'icons/essence_icon/enhancement_essence_transparent.png',
            52010: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_metal_ingot/fogmarsh_copper_ingot.png',
            52011: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_wood_plank/fogmarsh_wood_plank.png',
            52012: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_leather/fogmarsh_leather.png',
            52013: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_cloth/fogmarsh_cloth.png',
            52014: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_metal_ingot/aurora_iron_ingot.png',
            52015: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_wood_plank/aurora_wood_plank.png',
            52016: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_leather/aurora_leather.png',
            52017: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_cloth/aurora_cloth.png',
            52018: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_metal_ingot/thunderfeather_silver_ingot.png',
            52019: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_wood_plank/thunderfeather_wood_plank.png',
            52020: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_leather/thunderfeather_leather.png',
            52021: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_cloth/thunderfeather_cloth.png',
            52022: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_metal_ingot/darkmoon_mithril_ingot.png',
            52023: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_wood_plank/darkmoon_wood_plank.png',
            52024: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_leather/darkmoon_leather.png',
            52025: 'icons/processed_intermediate_icon/fine_intermediate_materials/fine_cloth/darkmoon_cloth.png',
        };
        return map[itemId] || null;
    },

    getCatIcon(cat) {
        const icons = {
            '基础材料': '🧱', '加工材料': '⚙️', '精华': '💎', '消耗品': '🍞',
            '符文': '🔮', '卷轴': '📜', '宝箱': '📦', '装备': '🛡️',
            '精良材料': '✨', '精良装备': '🌟', '其他': '📁'
        };
        return icons[cat] || '📁';
    },

    async loadIconFrames() {
        if (this._frameCache) return;
        try {
            const resp = await fetch('/textures/texture-2.json');
            const data = await resp.json();
            this._frameCache = data.frames;
            this._imagePath = '/textures/' + (data.meta?.image || 'texture-2.png');
            this._textureW = data.meta?.size?.w || 2048;
            this._textureH = data.meta?.size?.h || 2048;
        } catch (err) {
            console.error('加载 texture-2.json 失败:', err);
        }
    },

    applyItemIcons() {
        if (!this._frameCache) return;
        const icons = document.querySelectorAll('.item-icon');
        icons.forEach(el => {
            const iconPath = el.dataset.iconPath;
            if (!iconPath) return;
            const frameData = this._frameCache[iconPath];
            if (!frameData) return;
            const frame = frameData.frame;
            const displaySize = 24;
            const scale = displaySize / frame.w;
            el.innerHTML = '';
            el.style.cssText = `
                display: inline-block;
                width: ${displaySize}px;
                height: ${displaySize}px;
                flex-shrink: 0;
                border-radius: 3px;
                vertical-align: middle;
                background-image: url(${this._imagePath});
                background-position: -${Math.round(frame.x * scale)}px -${Math.round(frame.y * scale)}px;
                background-size: ${Math.round(this._textureW * scale)}px ${Math.round(this._textureH * scale)}px;
                background-repeat: no-repeat;
            `;
        });
    },

    esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },
    fmtNum(n) { return n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'; },

    destroy() {
        this.rendered = false;
        this._frameCache = null;
    }
};
