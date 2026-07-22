/**
 * 数据接口模块 v2.3 - 修复多账号缓存问题
 * 
 * 修复：自动获取和手动导入的数据都会保存到 localStorage 缓存
 * 确保 stats.js 和 inventory.js 的多账号切换能正常读取
 */

const ApiDataModule = {
    rendered: false,

    render(container, app) {
        this.app = app;
        const player = app.state.playerData || null;

        container.innerHTML = `
            <div style="max-width:800px;margin:0 auto;">
                <!-- 自动获取区域 -->
                <div class="card">
                    <div class="card-title">🔌 自动获取</div>
                    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;">
                        通过后端代理自动从游戏服务器拉取数据
                    </p>

                    <div style="display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap;align-items:flex-end;">
                        <div style="flex:1;min-width:200px;">
                            <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:4px;">选择账号</label>
                            <select id="api-account-select" style="width:100%;padding:8px 10px;border-radius:6px;
                                background:var(--bg-tertiary);border:1px solid var(--border-color);
                                color:var(--text-primary);outline:none;">
                                ${(app.state.accounts || []).length === 0 
                                    ? '<option value="">-- 暂无账号 --</option>' 
                                    : '<option value="">-- 选择账号 --</option>' + 
                                      app.state.accounts.map((a, i) => `<option value="${i}">${a.username}</option>`).join('')
                                }
                            </select>
                        </div>
                        <button class="btn btn-sm btn-success" onclick="ApiDataModule.autoFetch()">📥 自动获取</button>
                    </div>
                    <div id="api-status" style="font-size:12px;padding:8px 12px;border-radius:6px;
                        background:var(--bg-tertiary);color:var(--text-muted);">
                        ⏳ 准备好，选择账号后点击自动获取
                    </div>
                </div>

                <!-- 手动导入区域 -->
                <div class="card">
                    <div class="card-title">📋 手动导入</div>
                    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:8px;line-height:1.6;">
                        <strong>如果自动获取失败</strong>，请按以下步骤操作：
                    </p>
                    <ol style="color:var(--text-secondary);font-size:12px;margin:0 0 12px 20px;line-height:1.8;">
                        <li>在游戏网站 <code style="background:var(--bg-tertiary);padding:2px 6px;border-radius:3px;">https://idle.charsgame.com</code> 按 <strong>F12</strong> → Network</li>
                        <li>刷新页面或进入角色面板</li>
                        <li>找到 <code style="background:var(--bg-tertiary);padding:2px 6px;border-radius:3px;">profile</code> 请求 → 点 Response 标签</li>
                        <li>复制完整 JSON 内容，粘贴到下方文本框</li>
                    </ol>
                    <textarea id="manual-json-input" rows="6" style="width:100%;padding:10px;border-radius:6px;
                        background:var(--bg-tertiary);border:1px solid var(--border-color);
                        color:var(--text-primary);font-family:monospace;font-size:12px;resize:vertical;
                        outline:none;" placeholder='粘贴从浏览器复制的 JSON 数据...'></textarea>
                    <div style="display:flex;gap:8px;margin-top:8px;">
                        <button class="btn btn-sm btn-success" onclick="ApiDataModule.importManualJSON()">📥 导入并解析</button>
                        <button class="btn btn-sm" style="background:var(--accent);color:#fff;" onclick="ApiDataModule.clearData()">🗑️ 清除数据</button>
                    </div>
                </div>

                <!-- 数据显示区域 -->
                <div id="api-player-panel">
                    ${player ? this.renderPlayerPanel(player) : this.renderEmptyPanel()}
                </div>
            </div>
        `;

        this.rendered = true;
    },

    renderPlayerPanel(player) {
        const p = player;
        const stats = p.stats || {};
        
        const skillNames = { 1:'伐木',2:'采矿',4:'狩猎',5:'种植',6:'烹饪',7:'锻造',8:'炼金',9:'强化',10:'裁缝',12:'铭文',13:'强壮',14:'近战',15:'远程',16:'法术',17:'长剑',18:'剑盾',19:'长矛',20:'弓箭',21:'火焰',22:'冰霜',23:'闪电',24:'神圣',25:'布甲',26:'皮甲',27:'重甲' };

        const totalSkillLvl = p.actionSkills ? p.actionSkills.reduce((sum, s) => sum + s.level, 0) : 0;

        return `
            <div class="card">
                <div class="card-title">👤 角色信息</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;">
                    ${[
                        ['角色名', this.esc(p.name)],
                        ['战斗等级', 'Lv.' + p.combatLevel, 'var(--accent)'],
                        ['总技能等级', 'Lv.' + totalSkillLvl, 'var(--accent-green)'],
                        ['金币', this.fmtNum(p.gold), 'var(--accent-orange)'],
                        ['钻石', p.diamonds],
                        ['HP / MP', p.maxHp + ' / ' + p.maxMp],
                    ].map(([name, val, color]) => `
                        <div style="background:var(--bg-tertiary);border-radius:6px;padding:10px 12px;">
                            <div style="font-size:11px;color:var(--text-muted);">${name}</div>
                            <div style="font-size:16px;font-weight:600;margin-top:2px;${color ? 'color:'+color : ''};">${val}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-title">⚔️ 战斗属性</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;">
                    ${[
                        ['物理攻击', stats.physicalAttack],
                        ['魔法攻击', stats.magicAttack],
                        ['物理防御', stats.physicalDefense],
                        ['魔法防御', stats.magicDefense],
                        ['暴击率', stats.critRate],
                        ['暴击伤害', stats.critDamage],
                        ['物理命中', stats.physicalHitRate],
                        ['幸运', stats.luck],
                    ].map(([name, val]) => `
                        <div style="background:var(--bg-tertiary);border-radius:6px;padding:8px 10px;text-align:center;">
                            <div style="font-size:11px;color:var(--text-muted);">${name}</div>
                            <div style="font-size:15px;font-weight:600;margin-top:2px;">
                                ${val !== undefined && val !== null ? val : '-'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-title">📊 技能数据</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px;">
                    ${(p.actionSkills || []).map(s => {
                        const name = skillNames[s.actionSkillId] || '技能' + s.actionSkillId;
                        const pct = s.xpNext > 0 ? Math.min(100, (s.xp / s.xpNext * 100)).toFixed(1) : 0;
                        const remain = Math.max(0, s.xpNext - s.xp);
                        return `
                            <div style="background:var(--bg-tertiary);border-radius:6px;padding:10px 12px;">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                                    <span style="font-weight:600;font-size:13px;">${name}</span>
                                    <span style="font-size:13px;font-weight:600;color:var(--accent);">Lv.${s.level}</span>
                                </div>
                                <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">
                                    经验 ${this.fmtNum(s.xp)} / ${this.fmtNum(s.xpNext)}
                                </div>
                                <div style="height:4px;background:var(--bg-secondary);border-radius:2px;overflow:hidden;margin-bottom:2px;">
                                    <div style="height:100%;width:${pct}%;background:var(--accent);border-radius:2px;"></div>
                                </div>
                                <div style="display:flex;justify-content:space-between;align-items:center;">
                                    <span style="font-size:10px;color:${remain <= 0 ? 'var(--accent-green)' : 'var(--text-muted)'};;">
                                        ${remain <= 0 ? '✅ 可升级' : '剩余 ' + this.fmtNum(remain)}
                                    </span>
                                    <button class="btn btn-sm" style="background:var(--accent);color:#fff;font-size:10px;padding:3px 8px;"
                                            onclick="ApiDataModule.syncSkill(${s.actionSkillId}, ${s.level}, ${s.xp}, ${s.xpNext})">
                                        📥 同步
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div style="font-size:12px;color:var(--text-muted);padding:8px;text-align:center;">
                💡 点击「同步」按钮可将技能数据复制到「技能等级」模块
            </div>
        `;
    },

    renderEmptyPanel() {
        return `<div class="card"><div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
                    <div style="font-size:48px;margin-bottom:12px;">📥</div>
                    <p>导入数据后这里会显示角色信息</p>
                </div></div>`;
    },

    async autoFetch() {
        const select = document.getElementById('api-account-select');
        const idx = parseInt(select.value);
        const accounts = this.app.state.accounts || [];
        
        if (isNaN(idx) || !accounts[idx]) {
            this.app.showToast('请选择一个有效的账号', 'error');
            return;
        }

        const email = accounts[idx].username;
        const password = accounts[idx].password;
        
        if (!password) {
            this.app.showToast('⚠️ 该账号未保存密码，无法自动登录', 'error');
            return;
        }

        const statusEl = document.getElementById('api-status');
        statusEl.textContent = `⏳ 正在为 ${email} 获取数据...`;
        statusEl.style.background = 'var(--bg-tertiary)';
        statusEl.style.color = 'var(--text-muted)';

        try {
            // 第1步：登录
            console.log(`[API数据] 登录: ${email}`);
            const loginResult = await ApiClient.login(email, password);
            console.log(`[API数据] 登录响应:`, loginResult);

            if (!loginResult || loginResult.code !== 20000) {
                const errMsg = loginResult?.message || '未知错误';
                statusEl.textContent = `❌ 登录失败: ${errMsg}。请检查账号密码或使用手动导入。`;
                statusEl.style.background = 'rgba(248,81,73,0.1)';
                statusEl.style.color = 'var(--accent-red)';
                this.app.showToast('❌ 登录失败: ' + errMsg, 'error');
                return;
            }

            if (loginResult.data && loginResult.data.token) {
                this.app.updateState('apiToken', loginResult.data.token);
            }

            // 第2步：获取角色数据
            statusEl.textContent = `⏳ 正在获取 ${email} 的角色数据...`;
            
            const result = await ApiClient.getPlayerProfile(email);
            console.log(`[API数据] Profile响应:`, result);
            
            if (result.code === 20000 && result.data && result.data.player) {
                const player = result.data.player;
                
                // ===== 保存到 app state（当前显示）=====
                this.app.updateState('playerData', player);
                
                // ===== 同时保存到 localStorage 的 idle_player_cache（多账号切换用）=====
                this.savePlayerCache(email, player);
                
                // ===== 记录最后使用的账号，方便 stats/inventory 模块切换 =====
                localStorage.setItem('stats_selected_email', email);
                localStorage.setItem('inventory_selected_email', email);
                
                const panel = document.getElementById('api-player-panel');
                if (panel) panel.innerHTML = this.renderPlayerPanel(player);
                
                statusEl.textContent = `✅ 自动获取成功！角色: ${player.name}`;
                statusEl.style.background = 'rgba(63,185,80,0.1)';
                statusEl.style.color = 'var(--accent-green)';
                this.app.showToast(`✅ ${player.name} 数据获取成功！`);
            } else {
                const errMsg = result.message || '未知错误';
                statusEl.textContent = `❌ 获取失败: ${errMsg}。请使用手动导入。`;
                statusEl.style.background = 'rgba(248,81,73,0.1)';
                statusEl.style.color = 'var(--accent-red)';
                this.app.showToast('⚠️ 获取失败: ' + errMsg, 'error');
            }
        } catch (e) {
            console.error(`[API数据] 异常:`, e);
            statusEl.textContent = '❌ 网络错误: ' + e.message + '。请使用手动导入。';
            statusEl.style.background = 'rgba(248,81,73,0.1)';
            statusEl.style.color = 'var(--accent-red)';
            this.app.showToast('⚠️ 网络错误，请手动导入', 'error');
        }
    },

    /**
     * 保存玩家数据到 localStorage 缓存（供多账号切换使用）
     */
    savePlayerCache(email, playerData) {
        try {
            const cacheStr = localStorage.getItem('idle_player_cache');
            const cache = cacheStr ? JSON.parse(cacheStr) : {};
            cache[email] = {
                data: playerData,
                savedAt: Date.now(),
            };
            localStorage.setItem('idle_player_cache', JSON.stringify(cache));
            console.log(`[缓存] ✅ 已保存 ${email} 的数据到本地缓存`);
        } catch (e) {
            console.error('[缓存] 保存失败:', e);
        }
    },

    importManualJSON() {
        const textarea = document.getElementById('manual-json-input');
        let raw = textarea.value.trim();
        
        if (!raw) {
            this.app.showToast('请先粘贴 JSON 数据', 'error');
            return;
        }

        try {
            const data = JSON.parse(raw);
            let player = null;
            
            if (data.data && data.data.player) {
                player = data.data.player;
            } else if (data.data && !data.data.player) {
                player = data.data;
            } else if (data.player) {
                player = data.player;
            } else if (data.id && data.name) {
                player = data;
            } else {
                this.app.showToast('无法识别的 JSON 格式', 'error');
                return;
            }

            if (!player || !player.name) {
                this.app.showToast('数据格式不完整，缺少角色名', 'error');
                return;
            }

            // 保存到 app state
            this.app.updateState('playerData', player);
            
            // 同时保存到 localStorage 缓存（多账号切换用）
            const email = player.email || this.app.state.accounts?.[0]?.username || 'manual_' + Date.now();
            this.savePlayerCache(email, player);
            localStorage.setItem('stats_selected_email', email);
            localStorage.setItem('inventory_selected_email', email);
            
            const panel = document.getElementById('api-player-panel');
            if (panel) panel.innerHTML = this.renderPlayerPanel(player);
            
            this.app.showToast(`✅ 成功导入 "${player.name}" 的数据！`);
            
        } catch (e) {
            this.app.showToast('JSON 格式错误: ' + e.message, 'error');
        }
    },

    clearData() {
        if (!confirm('确认清除已导入的角色数据吗？')) return;
        this.app.updateState('playerData', null);
        const panel = document.getElementById('api-player-panel');
        if (panel) panel.innerHTML = this.renderEmptyPanel();
        this.app.showToast('🗑️ 数据已清除');
    },

    syncSkill(skillId, level, xp, xpNext) {
        const app = window.__app;
        if (!app) return;
        const skills = app.state.skills || {};
        skills[skillId] = { level, exp: xp, expToNext: xpNext };
        app.updateState('skills', skills);
        const name = {1:'伐木',2:'采矿',4:'狩猎',5:'种植',6:'烹饪',7:'锻造',8:'炼金',9:'强化',10:'裁缝',12:'铭文',13:'强壮',14:'近战',15:'远程',16:'法术',17:'长剑',18:'剑盾',19:'长矛',20:'弓箭',21:'火焰',22:'冰霜',23:'闪电',24:'神圣',25:'布甲',26:'皮甲',27:'重甲'}[skillId] || '技能' + skillId;
        app.showToast(`✅ ${name} Lv.${level} 已同步到本地`);
    },

    esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },
    fmtNum(n) { return n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'; },

    destroy() {
        this.rendered = false;
    }
};
