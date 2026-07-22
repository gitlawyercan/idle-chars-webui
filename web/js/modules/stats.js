/**
 * 人物属性模块 - 带图标版本 + 多账号选择（修复：账号字段名兼容）
 * 
 * 显示当前角色的详细属性数据
 * 使用 texture-3 图集中的战斗属性图标和生产属性图标
 * 支持在多个已导入数据的账号间切换查看
 */

const StatsModule = {
    rendered: false,
    
    // 图标缓存
    _frameCache: null,
    _imagePath: '/textures/texture-3.png',
    _textureW: 2048,
    _textureH: 2048,

    // 当前查看的账号
    _currentEmail: '',

    async render(container, app) {
        this.app = app;
        this._container = container;

        // 获取所有有缓存的账号列表
        const cachedAccounts = this.getCachedAccounts();
        const playerData = app.state.playerData;

        // 如果没有账号数据
        if (!playerData && cachedAccounts.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
                        <div style="font-size:48px;margin-bottom:12px;">📊</div>
                        <p>暂无角色数据</p>
                        <p style="font-size:12px;margin-top:8px;">请在「数据接口」模块导入角色数据</p>
                    </div>
                </div>
            `;
            this.rendered = true;
            return;
        }

        // 确定当前显示的账号数据
        let displayData = playerData;
        let displayEmail = '';

        // 如果有多个缓存账号，优先使用选择器
        if (cachedAccounts.length > 0) {
            // 从缓存中读取当前选中的账号
            const savedEmail = localStorage.getItem('stats_selected_email') || '';
            if (savedEmail) {
                const cached = this.getCachedPlayerData(savedEmail);
                if (cached) {
                    displayData = cached;
                    displayEmail = savedEmail;
                }
            }
            // 如果还没选中或者缓存的不可用，用第一个
            if (!displayEmail && cachedAccounts.length > 0) {
                displayEmail = cachedAccounts[0].email;
                const cached = this.getCachedPlayerData(displayEmail);
                if (cached) displayData = cached;
            }
        }

        this._currentEmail = displayEmail;

        const stats = displayData?.stats || {};

        container.innerHTML = `
            <div style="max-width:900px;margin:0 auto;">
                <!-- 账号选择 -->
                ${this.renderAccountSelector(cachedAccounts, displayEmail)}

                <!-- 基本信息 -->
                <div class="card">
                    <div class="card-title">👤 ${this.esc(displayData?.name || '未知')} — 属性总览</div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;">
                        ${[
                            ['战斗等级', `Lv.${displayData?.combatLevel || 0}`, 'var(--accent)'],
                            ['金币', this.fmtNum(displayData?.gold || 0), 'var(--accent-orange)'],
                            ['钻石', displayData?.diamonds || 0],
                            ['HP上限', displayData?.maxHp || 0, 'var(--accent-green)'],
                            ['MP上限', displayData?.maxMp || 0],
                        ].map(([name, val, color]) => `
                            <div style="background:var(--bg-tertiary);border-radius:6px;padding:10px 12px;text-align:center;">
                                <div style="font-size:11px;color:var(--text-muted);">${name}</div>
                                <div style="font-size:20px;font-weight:700;margin-top:2px;${color ? 'color:'+color : ''};">${val}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 战斗属性 -->
                <div class="card">
                    <div class="card-title">⚔️ 战斗属性</div>
                    <div id="stats-combat-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;">
                        ${this.renderStatGroup([
                            ['物理攻击', 'physicalAttack'],
                            ['魔法攻击', 'magicAttack'],
                            ['物理防御', 'physicalDefense'],
                            ['魔法防御', 'magicDefense'],
                            ['暴击率', 'critRate', '%'],
                            ['暴击伤害', 'critDamage', '%'],
                            ['物理命中', 'physicalHitRate'],
                            ['法术命中', 'magicHitRate'],
                            ['物理闪避', 'dodgeRate'],
                            ['格挡', 'block'],
                            ['攻击速度', 'attackSpeed', '%'],
                            ['幸运', 'luck'],
                        ], stats, 'combat')}
                    </div>
                </div>

                <!-- 元素伤害 -->
                <div class="card">
                    <div class="card-title">🔥 元素伤害</div>
                    <div id="stats-element-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;">
                        ${this.renderStatGroup([
                            ['火焰伤害', 'fireDamage'],
                            ['冰霜伤害', 'frostDamage'],
                            ['闪电伤害', 'lightningDamage'],
                            ['神圣伤害', 'holyDamage'],
                            ['治疗强度', 'healingPower'],
                        ], stats, 'combat')}
                    </div>
                </div>

                <!-- 生产效率 -->
                <div class="card">
                    <div class="card-title">🏭 生产属性</div>
                    <div id="stats-prod-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;">
                        ${this.renderStatGroup([
                            ['伐木效率', 'woodcuttingEfficiency', '%'],
                            ['伐木产量', 'woodcuttingProduction', '%'],
                            ['采矿效率', 'miningEfficiency', '%'],
                            ['采矿产量', 'miningProduction', '%'],
                            ['狩猎效率', 'huntingEfficiency', '%'],
                            ['狩猎产量', 'huntingProduction', '%'],
                            ['种植效率', 'farmingEfficiency', '%'],
                            ['种植产量', 'farmingProduction', '%'],
                            ['烹饪效率', 'cookingEfficiency', '%'],
                            ['烹饪产量', 'cookingProduction', '%'],
                            ['锻造效率', 'blacksmithingEfficiency', '%'],
                            ['锻造产量', 'blacksmithingProduction', '%'],
                            ['炼金效率', 'alchemyEfficiency', '%'],
                            ['炼金产量', 'alchemyProduction', '%'],
                            ['强化效率', 'enhancementEfficiency', '%'],
                            ['裁缝效率', 'tailoringEfficiency', '%'],
                            ['裁缝产量', 'tailoringProduction', '%'],
                            ['铭文效率', 'inscriptionEfficiency', '%'],
                            ['铭文产量', 'inscriptionProduction', '%'],
                        ], stats, 'prod')}
                    </div>
                </div>
            </div>
        `;

        // 绑定账号切换事件
        const selector = document.getElementById('stats-account-select');
        if (selector) {
            selector.addEventListener('change', (e) => {
                const email = e.target.value;
                localStorage.setItem('stats_selected_email', email);
                // 重新渲染
                this.render(container, app);
            });
        }

        // 异步加载图标
        await this.loadIconFrames();
        this.applyStatIcons();

        this.rendered = true;
    },

    /**
     * 渲染账号选择器
     */
    renderAccountSelector(cachedAccounts, currentEmail) {
        if (cachedAccounts.length <= 1) return '';

        const options = cachedAccounts.map(a => `
            <option value="${a.email}" ${a.email === currentEmail ? 'selected' : ''}>
                ${a.name || a.email}
            </option>
        `).join('');

        return `
            <div class="card" style="margin-bottom:12px;padding:10px 14px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:600;color:var(--text-secondary);">👤 选择账号</span>
                    <select id="stats-account-select" style="flex:1;padding:6px 10px;border-radius:6px;
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
            // 没有缓存时，直接从 accounts 返回
            return accounts.map(a => ({
                email: a.username || a.email || 'unknown',
                name: a.nickname || a.name || a.username || a.email || '未知'
            }));
        }
        
        try {
            const cache = JSON.parse(cacheStr);
            const result = [];
            
            // 从 accounts 中匹配
            accounts.forEach(a => {
                const email = a.username || a.email;
                if (email && cache[email] && cache[email].data) {
                    result.push({ 
                        email, 
                        name: a.nickname || a.name || a.username || email 
                    });
                }
            });
            
            // 如果从 accounts 没找到，从缓存里直接取
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

    /**
     * 从缓存获取指定账号的角色数据
     */
    getCachedPlayerData(email) {
        if (!email) return null;
        try {
            const cacheStr = localStorage.getItem('idle_player_cache');
            if (!cacheStr) return null;
            const cache = JSON.parse(cacheStr);
            if (cache[email] && cache[email].data) {
                return cache[email].data;
            }
        } catch {}
        return null;
    },

    renderStatGroup(items, stats, type) {
        return items.map(([label, key, unit]) => {
            let val = stats[key];
            if (val === undefined || val === null) {
                val = '-';
            } else if (typeof val === 'number') {
                if (unit === '%') val = (val * 100).toFixed(1) + '%';
                else if (val % 1 !== 0) val = val.toFixed(2);
            }
            const color = typeof val === 'string' && val.includes('%') && parseFloat(val) > 0 ? 'var(--accent-green)' : '';
            const iconPath = this.getStatIconPath(key, type);

            return `
                <div style="background:var(--bg-tertiary);border-radius:6px;padding:10px 12px;text-align:center;">
                    <div style="display:flex;align-items:center;justify-content:center;gap:4px;font-size:11px;color:var(--text-muted);margin-bottom:2px;">
                        <span class="stat-icon" data-icon-path="${iconPath || ''}" style="display:inline-block;width:16px;height:16px;flex-shrink:0;"></span>
                        ${label}
                    </div>
                    <div style="font-size:18px;font-weight:600;${color ? 'color:'+color : ''};">${val}</div>
                </div>
            `;
        }).join('');
    },

    getStatIconPath(key, type) {
        if (type === 'combat') {
            const map = {
                'physicalAttack': 'icons/ui_icon/combat_attributes/physical_attack.png',
                'magicAttack': 'icons/ui_icon/combat_attributes/magic_attack.png',
                'physicalDefense': 'icons/ui_icon/combat_attributes/physical_defense.png',
                'magicDefense': 'icons/ui_icon/combat_attributes/magic_defense.png',
                'critRate': 'icons/ui_icon/combat_attributes/crit_rate.png',
                'critDamage': 'icons/ui_icon/combat_attributes/crit_damage.png',
                'physicalHitRate': 'icons/ui_icon/combat_attributes/physical_hit.png',
                'magicHitRate': 'icons/ui_icon/combat_attributes/magic_hit.png',
                'dodgeRate': 'icons/ui_icon/combat_attributes/physical_dodge.png',
                'block': 'icons/ui_icon/combat_attributes/block_rate.png',
                'luck': 'icons/ui_icon/combat_attributes/luck.png',
                'fireDamage': 'icons/ui_icon/combat_attributes/fire_damage.png',
                'frostDamage': 'icons/ui_icon/combat_attributes/frost_damage.png',
                'lightningDamage': 'icons/ui_icon/combat_attributes/lightning_damage.png',
                'holyDamage': 'icons/ui_icon/combat_attributes/holy_damage.png',
                'healingPower': 'icons/ui_icon/combat_attributes/healing_power.png',
            };
            return map[key] || null;
        }
        if (type === 'prod') {
            const map = {
                'woodcuttingEfficiency': 'icons/ui_icon/production_attributes/logging_efficiency.png',
                'woodcuttingProduction': 'icons/ui_icon/production_attributes/logging_yield.png',
                'miningEfficiency': 'icons/ui_icon/production_attributes/mining_efficiency.png',
                'miningProduction': 'icons/ui_icon/production_attributes/mining_yield.png',
                'huntingEfficiency': 'icons/ui_icon/production_attributes/hunting_efficiency.png',
                'huntingProduction': 'icons/ui_icon/production_attributes/hunting_yield.png',
                'farmingEfficiency': 'icons/ui_icon/production_attributes/planting_efficiency.png',
                'farmingProduction': 'icons/ui_icon/production_attributes/planting_yield.png',
                'cookingEfficiency': 'icons/ui_icon/production_attributes/cooking_efficiency.png',
                'cookingProduction': 'icons/ui_icon/production_attributes/cooking_yield.png',
                'blacksmithingEfficiency': 'icons/ui_icon/production_attributes/forging_efficiency.png',
                'blacksmithingProduction': 'icons/ui_icon/production_attributes/forging_yield.png',
                'alchemyEfficiency': 'icons/ui_icon/production_attributes/alchemy_efficiency.png',
                'alchemyProduction': 'icons/ui_icon/production_attributes/alchemy_yield.png',
                'enhancementEfficiency': 'icons/ui_icon/production_attributes/enhancement_efficiency.png',
                'enhancementProduction': 'icons/ui_icon/production_attributes/enhancement_yield.png',
                'tailoringEfficiency': 'icons/ui_icon/production_attributes/tailoring_efficiency.png',
                'tailoringProduction': 'icons/ui_icon/production_attributes/tailoring_yield.png',
                'inscriptionEfficiency': 'icons/ui_icon/production_attributes/inscription_efficiency.png',
                'inscriptionProduction': 'icons/ui_icon/production_attributes/inscription_yield.png',
            };
            return map[key] || null;
        }
        return null;
    },

    async loadIconFrames() {
        if (this._frameCache) return;
        try {
            const resp = await fetch('/textures/texture-3.json');
            const data = await resp.json();
            this._frameCache = data.frames;
            this._imagePath = '/textures/' + (data.meta?.image || 'texture-3.png');
            this._textureW = data.meta?.size?.w || 2048;
            this._textureH = data.meta?.size?.h || 2048;
        } catch (err) {
            console.error('加载 texture-3.json 失败:', err);
        }
    },

    applyStatIcons() {
        if (!this._frameCache) return;
        const icons = document.querySelectorAll('.stat-icon');
        icons.forEach(el => {
            const iconPath = el.dataset.iconPath;
            if (!iconPath) return;
            const frameData = this._frameCache[iconPath];
            if (!frameData) return;
            const frame = frameData.frame;
            const displaySize = 16;
            const scale = displaySize / frame.w;
            el.style.cssText = `
                display: inline-block;
                width: ${displaySize}px;
                height: ${displaySize}px;
                flex-shrink: 0;
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
