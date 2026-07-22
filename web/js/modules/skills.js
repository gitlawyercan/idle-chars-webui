/**
 * 技能等级模块 v4.2 - 带图标版本
 * 
 * 功能：
 * 1. 可选择已保存的账号
 * 2. 每小时自动从服务器拉取数据
 * 3. 拉取后自动保存到本地
 * 4. 切换账号时显示该账号当前数据
 * 5. 使用 texture-3 图标替代 emoji
 */

const SkillsModule = {
    rendered: false,
    syncTimer: null,
    currentEmail: '',
    
    // 图标缓存
    _frameCache: null,
    _imagePath: '/textures/texture-3.png',
    _textureW: 2048,
    _textureH: 2048,

    skills: [
        { id:1,  name:'伐木', en:'woodcutting', cat:'采集类', icon:'🪓', iconPath:'icons/ui_icon/production_skills/logging.png',
          bonuses: [{ name:'伐木产量', key:'logging_yield', type:'percent', perLv:1, unit:'%' },
                    { name:'伐木效率', key:'logging_efficiency', type:'percent', perLv:1, unit:'%' }]},
        { id:2,  name:'采矿', en:'mining', cat:'采集类', icon:'⛏️', iconPath:'icons/ui_icon/production_skills/mining.png',
          bonuses: [{ name:'采矿产量', key:'mining_yield', type:'percent', perLv:1, unit:'%' },
                    { name:'采矿效率', key:'mining_efficiency', type:'percent', perLv:1, unit:'%' }]},
        { id:4,  name:'狩猎', en:'hunting', cat:'采集类', icon:'🏹', iconPath:'icons/ui_icon/production_skills/hunting.png',
          bonuses: [{ name:'狩猎产量', key:'hunting_yield', type:'percent', perLv:1, unit:'%' },
                    { name:'狩猎效率', key:'hunting_efficiency', type:'percent', perLv:1, unit:'%' }]},
        { id:5,  name:'种植', en:'farming', cat:'采集类', icon:'🌱', iconPath:'icons/ui_icon/production_skills/planting.png',
          bonuses: [{ name:'种植效率', key:'farming_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'种植产量', key:'farming_yield', type:'percent', perLv:1, unit:'%' }]},
        { id:6,  name:'烹饪', en:'cooking', cat:'制作类', icon:'🍳', iconPath:'icons/ui_icon/production_skills/cooking.png',
          bonuses: [{ name:'烹饪效率', key:'cooking_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'烹饪产量', key:'cooking_yield', type:'percent', perLv:1, unit:'%' }]},
        { id:7,  name:'锻造', en:'blacksmithing', cat:'制作类', icon:'🔨', iconPath:'icons/ui_icon/production_skills/forging.png',
          bonuses: [{ name:'锻造效率', key:'forging_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'锻造产量', key:'forging_yield', type:'percent', perLv:1, unit:'%' }]},
        { id:8,  name:'炼金', en:'alchemy', cat:'制作类', icon:'🧪', iconPath:'icons/ui_icon/production_skills/alchemy.png',
          bonuses: [{ name:'炼金效率', key:'alchemy_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'炼金产量', key:'alchemy_yield', type:'percent', perLv:1, unit:'%' }]},
        { id:9,  name:'强化', en:'enhancement', cat:'制作类', icon:'✨', iconPath:'icons/ui_icon/production_skills/enhancement.png',
          bonuses: [{ name:'强化效率', key:'enhancement_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'幸运', key:'luck', type:'flat', perLv:1, unit:'' }]},
        { id:10, name:'裁缝', en:'tailoring', cat:'制作类', icon:'🧵', iconPath:'icons/ui_icon/production_skills/tailoring.png',
          bonuses: [{ name:'裁缝效率', key:'tailoring_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'裁缝产量', key:'tailoring_yield', type:'percent', perLv:1, unit:'%' }]},
        { id:12, name:'铭文', en:'inscription', cat:'制作类', icon:'✒️', iconPath:'icons/ui_icon/production_skills/inscription.png',
          bonuses: [{ name:'铭文效率', key:'inscription_efficiency', type:'percent', perLv:1, unit:'%' },
                    { name:'铭文产量', key:'inscription_yield', type:'percent', perLv:1, unit:'%' }]},
        { id:13, name:'强壮', en:'strength', cat:'基础属性', icon:'💪', iconPath:'icons/ui_icon/combat_attribute_skills/strength.png',
          bonuses: [{ name:'HP', key:'hp', type:'flat', perLv:10, unit:'' }]},
        { id:14, name:'近战', en:'melee', cat:'基础属性', icon:'⚔️', iconPath:'',
          bonuses: [{ name:'物理命中率', key:'physical_hit', type:'flat', perLv:2, unit:'' }]},
        { id:15, name:'远程', en:'ranged', cat:'基础属性', icon:'🎯', iconPath:'',
          bonuses: [{ name:'物理命中率', key:'physical_hit', type:'flat', perLv:2, unit:'' }]},
        { id:16, name:'法术', en:'spellcasting', cat:'基础属性', icon:'🔮', iconPath:'',
          bonuses: [{ name:'MP', key:'mp', type:'flat', perLv:10, unit:'' },
                    { name:'法术命中率', key:'magic_hit', type:'flat', perLv:2, unit:'' }]},
        { id:17, name:'长剑', en:'longsword', cat:'武器专精', icon:'🗡️', iconPath:'',
          bonuses: [{ name:'物理攻击', key:'physical_attack', type:'flat', perLv:1, unit:'' },
                    { name:'魔法攻击', key:'magic_attack', type:'flat', perLv:1, unit:'' }]},
        { id:18, name:'剑盾', en:'swordshield', cat:'武器专精', icon:'🛡️', iconPath:'',
          bonuses: [{ name:'物理防御', key:'physical_defense', type:'flat', perLv:1, unit:'' },
                    { name:'魔法防御', key:'magic_defense', type:'flat', perLv:1, unit:'' }]},
        { id:19, name:'长矛', en:'spear', cat:'武器专精', icon:'🔱', iconPath:'icons/ui_icon/combat_attribute_skills/spear.png',
          bonuses: [{ name:'物理攻击', key:'physical_attack', type:'flat', perLv:2, unit:'' }]},
        { id:20, name:'弓箭', en:'archery', cat:'武器专精', icon:'🏹', iconPath:'',
          bonuses: [{ name:'物理攻击', key:'physical_attack', type:'flat', perLv:1, unit:'' }]},
        { id:21, name:'火焰', en:'fire', cat:'元素魔法', icon:'🔥', iconPath:'',
          bonuses: [{ name:'火焰伤害', key:'fire_damage', type:'flat', perLv:1, unit:'' }]},
        { id:22, name:'冰霜', en:'frost', cat:'元素魔法', icon:'❄️', iconPath:'',
          bonuses: [{ name:'冰霜伤害', key:'frost_damage', type:'flat', perLv:1, unit:'' }]},
        { id:23, name:'闪电', en:'lightning', cat:'元素魔法', icon:'⚡', iconPath:'',
          bonuses: [{ name:'闪电伤害', key:'lightning_damage', type:'flat', perLv:1, unit:'' }]},
        { id:24, name:'神圣', en:'holy', cat:'元素魔法', icon:'☀️', iconPath:'',
          bonuses: [{ name:'神圣伤害', key:'holy_damage', type:'flat', perLv:1, unit:'' },
                    { name:'治疗强度', key:'healing_power', type:'flat', perLv:2, unit:'' }]},
        { id:25, name:'布甲', en:'cloth_armor', cat:'护甲类', icon:'👘', iconPath:'',
          bonuses: [{ name:'魔法防御', key:'magic_defense', type:'flat', perLv:2, unit:'' }]},
        { id:26, name:'皮甲', en:'light_armor', cat:'护甲类', icon:'🧥', iconPath:'',
          bonuses: [{ name:'物理防御', key:'physical_defense', type:'flat', perLv:1, unit:'' },
                    { name:'魔法防御', key:'magic_defense', type:'flat', perLv:1, unit:'' }]},
        { id:27, name:'重甲', en:'heavy_armor', cat:'护甲类', icon:'🦺', iconPath:'',
          bonuses: [{ name:'物理防御', key:'physical_defense', type:'flat', perLv:2, unit:'' }]},
    ],

    async render(container, app) {
        this.app = app;
        const accounts = app.state.accounts || [];
        const skillData = app.state.skills || {};

        this.currentEmail = app.state.lastSkillAccount || (accounts.length > 0 ? accounts[0].username : '');

        if (this.currentEmail) {
            this.loadAccountSkills(this.currentEmail);
        }

        const totals = this.calculateTotals(skillData);

        let html = `
            <div class="card">
                <div class="card-title">🔗 绑定账号</div>
                <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
                    <div style="flex:1;min-width:200px;">
                        <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:4px;">选择账号</label>
                        <select id="skills-account-select" style="width:100%;padding:8px 10px;border-radius:6px;
                            background:var(--bg-tertiary);border:1px solid var(--border-color);
                            color:var(--text-primary);outline:none;">
                            ${accounts.length === 0 
                                ? '<option value="">-- 暂无账号 --</option>' 
                                : accounts.map((a, i) => `<option value="${a.username}" ${a.username === this.currentEmail ? 'selected' : ''}>${a.username} ${a.note ? ' - ' + a.note : ''}</option>`).join('')
                            }
                        </select>
                    </div>
                    <button class="btn btn-sm btn-success" onclick="SkillsModule.manualSync()">📥 立即同步</button>
                    <div style="font-size:12px;color:var(--text-muted);padding:6px 0;" id="skills-sync-status">
                        ⏳ 自动同步已开启（每1小时）
                    </div>
                </div>
                ${this.currentEmail ? `
                <div style="font-size:12px;color:var(--text-secondary);margin-top:8px;padding:6px 10px;background:var(--bg-tertiary);border-radius:4px;">
                    🎯 当前账号: ${this.currentEmail}
                    <span id="skills-last-sync"></span>
                </div>` : ''}
            </div>

            <div class="card">
                <div class="card-title">📈 属性增益汇总</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;" id="bonus-summary-grid">
                    ${this.renderBonusSummary(totals)}
                </div>
            </div>

            <div class="card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <div class="card-title" style="margin-bottom:0;">📊 技能等级</div>
                    <button class="btn btn-sm btn-danger" onclick="SkillsModule.resetAll()">🔄 重置所有</button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:10px;" id="mod-skills-grid">
        `;

        let lastCat = '';
        this.skills.forEach(skill => {
            const raw = skillData[skill.id];
            let level = 0, exp = 0, expToNext = 100;
            if (typeof raw === 'object' && raw !== null) {
                level = raw.level || 0;
                exp = raw.exp || 0;
                expToNext = raw.expToNext || 100;
            } else if (typeof raw === 'number') {
                level = raw;
            }

            const remainExp = Math.max(0, expToNext - exp);

            if (skill.cat !== lastCat) {
                html += `
                    <div style="grid-column:1/-1;font-size:14px;font-weight:600;color:var(--text-secondary);
                                padding:12px 0 6px;border-bottom:1px solid var(--border-color);margin-top:4px;">
                        ${this.getCatIcon(skill.cat)} ${skill.cat}
                    </div>
                `;
                lastCat = skill.cat;
            }

            const bonusLines = skill.bonuses.map(b => {
                const total = b.perLv * level;
                const display = b.type === 'percent' ? `${total}%` : `${total}`;
                return `<div style="font-size:13px;font-weight:600;color:var(--text-primary);">
                            当前${b.name}增益：${display}
                        </div>`;
            }).join('');

            const expPercent = expToNext > 0 ? Math.min(100, Math.round((exp / expToNext) * 100)) : 0;

            html += `
                <div style="background:var(--bg-secondary);border:1px solid var(--border-color);
                            border-radius:8px;padding:14px;">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                        <div class="skill-icon-lg" data-icon-path="${skill.iconPath}" data-fallback="${skill.icon}"
                             style="width:40px;height:40px;border-radius:6px;background:var(--bg-tertiary);
                                    display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">
                            ${skill.icon}
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;font-size:14px;">${skill.name}</div>
                            <div style="font-size:11px;color:var(--text-muted);">${skill.en}</div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                            <input type="number" min="0" max="9999" value="${level}"
                                   style="width:56px;padding:4px 6px;border-radius:4px;background:var(--bg-tertiary);
                                          border:1px solid var(--border-color);color:var(--text-primary);
                                          text-align:center;font-weight:600;outline:none;-moz-appearance:textfield;"
                                   data-skill-id="${skill.id}" data-field="level" class="skill-input" />
                            <span style="font-size:11px;color:var(--text-muted);">级</span>
                        </div>
                    </div>

                    <div style="margin-bottom:10px;padding:8px 10px;background:var(--bg-tertiary);
                                border-radius:6px;line-height:1.7;">
                        ${bonusLines || '<div style="font-size:12px;color:var(--text-muted);">无属性增益</div>'}
                    </div>

                    <div style="border-top:1px solid var(--border-color);padding-top:10px;">
                        <div style="display:flex;gap:8px;margin-bottom:6px;">
                            <div style="flex:1;">
                                <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">当前经验</div>
                                <input type="number" min="0" value="${exp}"
                                       style="width:100%;padding:4px 8px;border-radius:4px;background:var(--bg-tertiary);
                                              border:1px solid var(--border-color);color:var(--text-primary);
                                              font-weight:600;outline:none;-moz-appearance:textfield;font-size:13px;"
                                       data-skill-id="${skill.id}" data-field="exp" class="skill-exp-input" />
                            </div>
                            <div style="flex:1;">
                                <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">升级所需经验</div>
                                <input type="number" min="1" value="${expToNext}"
                                       style="width:100%;padding:4px 8px;border-radius:4px;background:var(--bg-tertiary);
                                              border:1px solid var(--border-color);color:var(--text-primary);
                                              font-weight:600;outline:none;-moz-appearance:textfield;font-size:13px;"
                                       data-skill-id="${skill.id}" data-field="expToNext" class="skill-exp-input" />
                            </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="flex:1;height:6px;background:var(--bg-tertiary);border-radius:3px;overflow:hidden;">
                                <div style="height:100%;width:${expPercent}%;background:var(--accent);border-radius:3px;"></div>
                            </div>
                            <div style="font-size:11px;color:var(--text-muted);flex-shrink:0;white-space:nowrap;">
                                剩余 <span style="font-weight:600;color:${remainExp <= 0 ? 'var(--accent-green)' : 'var(--text-primary)'}">${this.fmtNum(remainExp)}</span> 经验
                            </div>
                        </div>
                        ${remainExp <= 0 ? '<div style="font-size:11px;color:var(--accent-green);margin-top:4px;">✅ 可升级！</div>' : ''}
                    </div>
                </div>
            `;
        });

        html += '</div></div>';
        container.innerHTML = html;

        container.querySelectorAll('.skill-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = parseInt(this.dataset.skillId);
                const val = parseInt(this.value) || 0;
                SkillsModule.updateSkillField(id, 'level', val);
                SkillsModule.refreshSummary();
            });
            input.addEventListener('focus', function() { this.select(); });
        });

        container.querySelectorAll('.skill-exp-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = parseInt(this.dataset.skillId);
                const field = this.dataset.field;
                const val = parseInt(this.value) || 0;
                SkillsModule.updateSkillField(id, field, val);
            });
            input.addEventListener('focus', function() { this.select(); });
        });

        const select = document.getElementById('skills-account-select');
        if (select) {
            select.addEventListener('change', function() {
                SkillsModule.switchAccount(this.value);
            });
        }

        this.updateLastSyncTime();
        this.startAutoSync();
        
        // 异步加载技能图标
        await this.loadIconFrames();
        this.applySkillIcons();
        
        this.rendered = true;
    },

    switchAccount(email) {
        if (!email) return;
        this.currentEmail = email;
        if (this.app) {
            this.app.updateState('lastSkillAccount', email);
        }
        this.loadAccountSkills(email);
        this.render(document.getElementById('module-container'), this.app);
        this.app.showToast(`📋 已切换到 ${email}`, 'info');
    },

    loadAccountSkills(email) {
        const app = this.app;
        if (!app || !email) return;
        const playerCacheStr = localStorage.getItem('idle_player_cache');
        if (playerCacheStr) {
            try {
                const playerCache = JSON.parse(playerCacheStr);
                const cached = playerCache[email];
                if (cached && cached.data) {
                    const player = cached.data;
                    if (player.actionSkills && player.actionSkills.length > 0) {
                        const skills = {};
                        player.actionSkills.forEach(s => {
                            skills[s.actionSkillId] = { level: s.level, exp: s.xp, expToNext: s.xpNext };
                        });
                        const currentSkills = app.state.skills || {};
                        Object.keys(skills).forEach(id => { currentSkills[id] = skills[id]; });
                        app.updateState('skills', currentSkills);
                    }
                }
            } catch {}
        }
    },

    async manualSync() {
        const select = document.getElementById('skills-account-select');
        const email = select ? select.value : this.currentEmail;
        
        if (!email) { this.app.showToast('请先选择一个账号', 'error'); return; }
        if (!this.app.state.apiToken) { this.app.showToast('请先在「数据接口」模块登录获取 Token', 'error'); return; }

        this.app.showToast(`📡 正在同步 ${email}...`, 'info');

        try {
            const result = await ApiClient.getPlayerProfile(email);
            if (result.code === 20000 && result.data && result.data.player) {
                const player = result.data.player;
                if (player.actionSkills && player.actionSkills.length > 0) {
                    const skills = this.app.state.skills || {};
                    player.actionSkills.forEach(s => {
                        skills[s.actionSkillId] = { level: s.level, exp: s.xp, expToNext: s.xpNext };
                    });
                    this.app.updateState('skills', skills);
                    this.refreshSummary();
                    this.updateLastSyncTime();
                    this.app.showToast(`✅ 同步成功！${player.actionSkills.length} 个技能已更新`);
                }
            } else {
                this.app.showToast(`同步失败: ${result.message || '未知错误'}`, 'error');
            }
        } catch (e) {
            this.app.showToast(`同步失败: ${e.message}`, 'error');
        }
    },

    startAutoSync() {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
            this.syncTimer = null;
        }
        this.syncTimer = setInterval(() => {
            if (this.currentEmail && this.app && this.app.state.apiToken) {
                console.log(`⏰ 自动同步: ${this.currentEmail}`);
                this.manualSync();
            }
        }, 3600000);

        const statusEl = document.getElementById('skills-sync-status');
        if (statusEl) {
            statusEl.textContent = '⏳ 自动同步已开启（每1小时）';
            statusEl.style.color = 'var(--accent-green)';
        }
    },

    stopAutoSync() {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
            this.syncTimer = null;
        }
        const statusEl = document.getElementById('skills-sync-status');
        if (statusEl) {
            statusEl.textContent = '⏸️ 自动同步已停止';
            statusEl.style.color = 'var(--text-muted)';
        }
    },

    updateLastSyncTime() {
        const el = document.getElementById('skills-last-sync');
        if (!el) return;
        const playerCacheStr = localStorage.getItem('idle_player_cache');
        if (playerCacheStr) {
            try {
                const playerCache = JSON.parse(playerCacheStr);
                const cached = playerCache[this.currentEmail];
                if (cached && cached.savedAt) {
                    const date = new Date(cached.savedAt);
                    const now = new Date();
                    const diff = Math.floor((now - date) / 1000);
                    let timeStr;
                    if (diff < 60) timeStr = '刚刚';
                    else if (diff < 3600) timeStr = `${Math.floor(diff / 60)} 分钟前`;
                    else if (diff < 86400) timeStr = `${Math.floor(diff / 3600)} 小时前`;
                    else timeStr = `${Math.floor(diff / 86400)} 天前`;
                    el.textContent = `| 上次同步: ${timeStr}`;
                    el.style.color = diff > 3600 ? 'var(--accent-orange)' : 'var(--text-secondary)';
                    return;
                }
            } catch {}
        }
        el.textContent = '| 暂无同步记录';
    },

    updateSkillField(skillId, field, value) {
        const app = window.__app;
        if (!app) return;
        const skills = app.state.skills || {};
        let data = skills[skillId];
        if (typeof data !== 'object' || data === null) {
            data = { level: typeof data === 'number' ? data : 0, exp: 0, expToNext: 100 };
        }
        data[field] = Math.max(0, value);
        if (field === 'level') data.level = Math.min(9999, data.level);
        skills[skillId] = data;
        app.updateState('skills', skills);
    },

    refreshSummary() {
        const app = window.__app;
        if (!app) return;
        const totals = this.calculateTotals(app.state.skills || {});
        const grid = document.getElementById('bonus-summary-grid');
        if (grid) grid.innerHTML = this.renderBonusSummary(totals);
    },

    calculateTotals(skillData) {
        const totals = {};
        this.skills.forEach(skill => {
            const raw = skillData[skill.id];
            let level = 0;
            if (typeof raw === 'object' && raw !== null) level = raw.level || 0;
            else if (typeof raw === 'number') level = raw;
            if (level <= 0) return;
            skill.bonuses.forEach(bonus => {
                if (!totals[bonus.key]) {
                    totals[bonus.key] = { name: bonus.name, type: bonus.type, unit: bonus.unit, total: 0 };
                }
                totals[bonus.key].total += bonus.perLv * level;
            });
        });
        return totals;
    },

    renderBonusSummary(totals) {
        const entries = Object.values(totals);
        if (entries.length === 0) {
            return `<div style="grid-column:1/-1;text-align:center;padding:16px;color:var(--text-muted);font-size:13px;">
                        提升技能等级来获得属性增益</div>`;
        }
        const sorted = entries.sort((a, b) => {
            const order = ['percent', 'flat'];
            return order.indexOf(a.type) - order.indexOf(b.type);
        });
        return sorted.map(item => {
            const sign = item.total > 0 ? '+' : '';
            const display = item.type === 'percent' ? `${sign}${item.total}%` : `${sign}${item.total}`;
            const color = item.type === 'percent' ? 'var(--accent-green)' : 'var(--accent)';
            return `
                <div style="background:var(--bg-tertiary);border-radius:6px;padding:10px 12px;text-align:center;">
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">${item.name}</div>
                    <div style="font-size:18px;font-weight:700;color:${color};">${display}</div>
                </div>
            `;
        }).join('');
    },

    getCatIcon(cat) {
        const icons = { '采集类':'🪓', '制作类':'🔨', '基础属性':'💪', '武器专精':'🗡️', '元素魔法':'🔥', '护甲类':'🛡️' };
        return icons[cat] || '📁';
    },

    /**
     * 加载 texture-3 的帧数据
     */
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

    /**
     * 应用技能图标
     */
    applySkillIcons() {
        if (!this._frameCache) return;
        const icons = document.querySelectorAll('.skill-icon-lg');
        icons.forEach(el => {
            const iconPath = el.dataset.iconPath;
            if (!iconPath) return;

            const frameData = this._frameCache[iconPath];
            if (!frameData) return;

            const frame = frameData.frame;
            const displaySize = 40;
            const scale = displaySize / frame.w;

            el.innerHTML = '';
            el.style.cssText = `
                width: ${displaySize}px;
                height: ${displaySize}px;
                border-radius: 6px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url(${this._imagePath});
                background-position: -${Math.round(frame.x * scale)}px -${Math.round(frame.y * scale)}px;
                background-size: ${Math.round(this._textureW * scale)}px ${Math.round(this._textureH * scale)}px;
                background-repeat: no-repeat;
            `;
        });
    },

    fmtNum(n) { return n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'; },

    resetAll() {
        if (!confirm('确认将所有技能等级和经验重置为 0 吗？')) return;
        const app = window.__app;
        if (app) {
            app.updateState('skills', {});
            this.render(document.getElementById('module-container'), app);
            app.showToast('🔄 已重置');
        }
    },

    destroy() {
        this.stopAutoSync();
        this.rendered = false;
        this._frameCache = null;
    }
};
