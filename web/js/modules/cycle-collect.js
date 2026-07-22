/**
 * cycle-collect.js - 循环采集模块（可直接使用）
 * 
 * 通过后端代理转发 API 请求，解决 WAF 拦截问题
 */

const CycleCollectModule = {
    name: '循环采集',
    key: 'cycle-collect',
    icon: '⛏️',
    rendered: false,
    running: false,
    abortFlag: false,

    _resourceMap: [],

    render(container, app) {
        this.app = app;
        this.buildResourceMap();
        this.running = false;
        this.abortFlag = false;

        container.innerHTML = `
            <div style="max-width:900px;margin:0 auto;">
                <div class="card">
                    <div class="card-title">⛏️ 循环采集</div>

                    <div id="cc-status-bar" style="background:var(--bg-tertiary);border-radius:8px;padding:12px;margin-bottom:16px;font-size:13px;display:flex;align-items:center;gap:12px;">
                        <span id="cc-status-dot" style="width:10px;height:10px;border-radius:50%;background:#ff6b6b;flex-shrink:0;"></span>
                        <span id="cc-status-text" style="color:var(--text-secondary);">就绪</span>
                        <span id="cc-status-account" style="color:var(--text-muted);font-size:12px;margin-left:auto;"></span>
                    </div>

                    <div style="margin-bottom:12px;">
                        <div style="font-weight:600;font-size:13px;margin-bottom:6px;">👥 选择账号分组</div>
                        <div id="cc-groups-container">
                            ${this.renderGroups()}
                        </div>
                    </div>

                    <div style="margin-bottom:12px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <span style="font-weight:600;font-size:13px;">📋 采集任务链</span>
                            <div style="display:flex;gap:6px;">
                                <button class="btn btn-sm btn-success" onclick="CycleCollectModule.addTask()">➕ 添加任务</button>
                                <button class="btn btn-sm btn-danger" onclick="CycleCollectModule.clearTasks()" style="font-size:10px;">🗑️ 清空</button>
                            </div>
                        </div>
                        <div id="cc-tasks-container">
                            ${this.renderTasks()}
                        </div>
                        <div style="margin-top:6px;font-size:11px;color:var(--text-muted);">
                            💡 第一个任务用 tasks/execute，后续任务用 tasks。count=0 为无限循环
                        </div>
                    </div>

                    <div style="display:flex;gap:8px;margin-top:16px;">
                        <button id="cc-start-btn" class="btn btn-success" onclick="CycleCollectModule.start()" style="flex:1;padding:10px;font-size:14px;">
                            ▶️ 开始循环采集
                        </button>
                        <button id="cc-stop-btn" class="btn btn-danger" onclick="CycleCollectModule.stop()" style="flex:1;padding:10px;font-size:14px;display:none;">
                            ⏹️ 停止
                        </button>
                    </div>

                    <div style="margin-top:12px;">
                        <div style="font-weight:600;font-size:12px;margin-bottom:4px;color:var(--text-muted);">📝 运行日志</div>
                        <div id="cc-log" style="background:rgba(0,0,0,0.3);border-radius:6px;padding:8px;height:200px;overflow-y:auto;font-size:11px;font-family:monospace;color:#aaa;white-space:pre-wrap;word-break:break-all;"></div>
                    </div>
                </div>
            </div>
        `;

        this.rendered = true;
        this._logEl = document.getElementById('cc-log');
        this._statusDot = document.getElementById('cc-status-dot');
        this._statusText = document.getElementById('cc-status-text');
        this._statusAccount = document.getElementById('cc-status-account');

        // 加载历史日志
        const logs = this.getLogs();
        logs.forEach(l => this.appendLog(l.msg, l.type));
    },

    buildResourceMap() {
        this._resourceMap = [];
        const skillActionMap = {
            1: [
                { actionId: 1, itemName: '松木', tier: 'T1' },
                { actionId: 2, itemName: '橡木', tier: 'T2' },
                { actionId: 3, itemName: '月桂木', tier: 'T3' },
                { actionId: 4, itemName: '符纹木', tier: 'T4' },
                { actionId: 211, itemName: '松林莓', tier: '副' },
                { actionId: 212, itemName: '橡蜜果', tier: '副' },
                { actionId: 213, itemName: '月桂银果', tier: '副' },
                { actionId: 214, itemName: '符纹星果', tier: '副' },
            ],
            2: [
                { actionId: 5, itemName: '铜矿', tier: 'T1' },
                { actionId: 6, itemName: '铁矿', tier: 'T2' },
                { actionId: 7, itemName: '银矿', tier: 'T3' },
                { actionId: 8, itemName: '秘银矿', tier: 'T4' },
            ],
            4: [
                { actionId: 9, itemName: '轻皮', tier: 'T1' },
                { actionId: 10, itemName: '厚皮', tier: 'T2' },
                { actionId: 11, itemName: '月纹皮', tier: 'T3' },
                { actionId: 12, itemName: '雪纹皮', tier: 'T4' },
            ],
            5: [
                { actionId: 13, itemName: '亚麻', tier: 'T1-纤维' },
                { actionId: 15, itemName: '棉花', tier: 'T2-纤维' },
                { actionId: 17, itemName: '月麻', tier: 'T3-纤维' },
                { actionId: 16, itemName: '符藤', tier: 'T4-纤维' },
                { actionId: 14, itemName: '麦穗', tier: 'T1-粮食' },
                { actionId: 18, itemName: '蜜糖麦', tier: 'T2-粮食' },
                { actionId: 19, itemName: '月露果', tier: 'T3-粮食' },
                { actionId: 20, itemName: '香米', tier: 'T4-粮食' },
            ],
        };
        const skillNames = { 1: '伐木', 2: '采矿', 4: '狩猎', 5: '种植' };
        for (const [sid, actions] of Object.entries(skillActionMap)) {
            actions.forEach(a => {
                this._resourceMap.push({
                    skillId: parseInt(sid),
                    skillName: skillNames[sid],
                    actionId: a.actionId,
                    itemName: a.itemName,
                    tier: a.tier
                });
            });
        }
    },

    // ============================================================
    // API 调用 — 通过本地后端代理转发
    // ============================================================

    async apiPost(endpoint, data) {
        const app = this.app || window.__app;
        if (!app || !app.state.apiToken) {
            throw new Error('未登录，请先在「数据接口」模块获取 Token');
        }

        // 通过后端代理转发请求（解决 WAF/CORS 问题）
        // 本地代理路径: /api/v1/tasks/stop → 后端转发到 https://idle.charsgame.com/api/v1/tasks/stop
        const resp = await fetch(`/api/v1${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${app.state.apiToken}`
            },
            body: JSON.stringify(data)
        });

        if (!resp.ok) {
            const text = await resp.text().catch(() => '');
            throw new Error(`HTTP ${resp.status}: ${resp.statusText} ${text}`);
        }

        return await resp.json();
    },

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ============================================================
    // 日志
    // ============================================================

    getLogs() {
        try { return JSON.parse(localStorage.getItem('cc_logs')) || []; } catch { return []; }
    },

    saveLogs(logs) {
        try { localStorage.setItem('cc_logs', JSON.stringify(logs)); } catch {}
    },

    addLog(msg, type = 'info') {
        const logs = this.getLogs();
        const time = new Date().toLocaleTimeString();
        logs.push({ time, msg: `[${time}] ${msg}`, type });
        if (logs.length > 200) logs.splice(0, logs.length - 200);
        this.saveLogs(logs);
        this.appendLog(`[${time}] ${msg}`, type);
    },

    appendLog(text, type = 'info') {
        if (!this._logEl) return;
        const line = document.createElement('div');
        line.style.cssText = type === 'error' ? 'color:#ff6b6b;' : type === 'success' ? 'color:#3fb950;' : type === 'warning' ? 'color:#f0a500;' : 'color:#aaa;';
        line.textContent = text;
        this._logEl.appendChild(line);
        this._logEl.scrollTop = this._logEl.scrollHeight;
    },

    setStatus(text, dotColor = '#ff6b6b', account = '') {
        if (this._statusText) this._statusText.textContent = text;
        if (this._statusDot) this._statusDot.style.background = dotColor;
        if (this._statusAccount) this._statusAccount.textContent = account;
    },

    // ============================================================
    // 渲染
    // ============================================================

    getSelectedGroup() {
        const radios = document.querySelectorAll('input[name="cc-group"]:checked');
        return radios.length > 0 ? radios[0].value : null;
    },

    getTasks() {
        try { return JSON.parse(localStorage.getItem('cc_tasks')) || []; } catch { return []; }
    },

    saveTasks(tasks) {
        try { localStorage.setItem('cc_tasks', JSON.stringify(tasks)); } catch {}
    },

    renderGroups() {
        const groups = this.getAllGroups();
        const keys = Object.keys(groups);
        if (keys.length === 0) {
            return '<div style="color:var(--text-muted);font-size:13px;padding:8px 0;">暂无账号分组，请先在「账号管理」中添加账号</div>';
        }
        return keys.map(gn => `
            <label style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--bg-tertiary);border-radius:6px;margin-bottom:4px;cursor:pointer;border:1px solid transparent;" 
                   onmouseover="this.style.borderColor='rgba(255,255,255,0.1)'" 
                   onmouseout="this.style.borderColor='transparent'">
                <input type="radio" name="cc-group" value="${gn}" style="accent-color:#f0a500;">
                <span style="font-weight:600;font-size:13px;">📂 ${gn}</span>
                <span style="color:var(--text-muted);font-size:11px;">(${groups[gn].length} 个账号)</span>
                <span style="margin-left:auto;font-size:10px;color:var(--text-muted);">
                    ${groups[gn].map(a => a.username || a.email).join(', ')}
                </span>
            </label>
        `).join('');
    },

    renderTasks() {
        const tasks = this.getTasks();
        if (tasks.length === 0) {
            return '<div style="color:var(--text-muted);font-size:12px;padding:8px 0;">暂无采集任务，点击"添加任务"创建</div>';
        }
        return tasks.map((t, i) => {
            const opts = this._resourceMap.map(r => {
                const sel = (r.skillId === t.actionSkillId && r.actionId === t.actionId) ? 'selected' : '';
                return `<option value="${r.skillId}:${r.actionId}" ${sel}>${r.skillName} → ${r.itemName} (${r.tier})</option>`;
            }).join('');
            return `
                <div style="display:flex;gap:6px;align-items:center;padding:6px 8px;background:rgba(0,0,0,0.15);border-radius:4px;margin-bottom:4px;">
                    <span style="color:var(--text-muted);font-weight:600;font-size:11px;min-width:20px;">#${i+1}</span>
                    <select class="cc-task-sel" data-idx="${i}" style="flex:1;padding:4px;background:rgba(0,0,0,0.3);color:#eee;border:1px solid rgba(255,255,255,0.1);border-radius:4px;font-size:11px;">
                        ${opts}
                    </select>
                    <input type="number" class="cc-task-cnt" data-idx="${i}" value="${t.count || ''}" placeholder="0=无限" min="0" max="999999"
                           style="width:70px;padding:4px;background:rgba(255,255,255,0.06);color:#eee;border:1px solid rgba(255,255,255,0.1);border-radius:4px;font-size:11px;text-align:center;">
                    <span class="cc-task-del" data-idx="${i}" style="cursor:pointer;color:#ff6b6b;font-size:14px;padding:0 4px;" title="删除">✕</span>
                </div>
            `;
        }).join('');
    },

    addTask() {
        if (this._resourceMap.length === 0) { this.app?.showToast('⚠️ 资源映射未加载', 'error'); return; }
        const tasks = this.getTasks();
        const first = this._resourceMap[0];
        tasks.push({ actionSkillId: first.skillId, actionId: first.actionId, count: 0 });
        this.saveTasks(tasks);
        this.refreshTasks();
    },

    clearTasks() {
        if (!confirm('确认清空所有采集任务？')) return;
        this.saveTasks([]);
        this.refreshTasks();
    },

    refreshTasks() {
        const container = document.getElementById('cc-tasks-container');
        if (container) { container.innerHTML = this.renderTasks(); this.bindTaskEvents(); }
    },

    bindTaskEvents() {
        document.querySelectorAll('.cc-task-sel').forEach(sel => { sel.onchange = () => this.saveFromUI(); });
        document.querySelectorAll('.cc-task-cnt').forEach(inp => { inp.onchange = () => this.saveFromUI(); });
        document.querySelectorAll('.cc-task-del').forEach(del => {
            del.onclick = () => {
                const idx = parseInt(del.dataset.idx);
                const tasks = this.getTasks();
                tasks.splice(idx, 1);
                this.saveTasks(tasks);
                this.refreshTasks();
            };
        });
    },

    saveFromUI() {
        const tasks = [];
        const sels = document.querySelectorAll('.cc-task-sel');
        const cnts = document.querySelectorAll('.cc-task-cnt');
        for (let i = 0; i < sels.length; i++) {
            const parts = sels[i].value.split(':');
            const c = cnts[i] ? (parseInt(cnts[i].value) || 0) : 0;
            tasks.push({ actionSkillId: parseInt(parts[0]), actionId: parseInt(parts[1]), count: c });
        }
        this.saveTasks(tasks);
    },

    getAllGroups() {
        const app = this.app || window.__app;
        if (!app || !app.state || !app.state.accounts) return {};
        const groups = {};
        (app.state.accounts || []).forEach(a => {
            const gn = a.group || '默认分组';
            if (!groups[gn]) groups[gn] = [];
            groups[gn].push(a);
        });
        return groups;
    },

    getAccountsByGroup(groupName) {
        return this.getAllGroups()[groupName] || [];
    },

    // ============================================================
    // 主循环
    // ============================================================

    async start() {
        if (this.running) { this.app?.showToast('⛏️ 已经在运行中', 'info'); return; }

        const groupName = this.getSelectedGroup();
        if (!groupName) { this.app?.showToast('⚠️ 请先选择一个账号分组', 'error'); return; }

        const accounts = this.getAccountsByGroup(groupName);
        if (accounts.length === 0) { this.app?.showToast('⚠️ 该分组没有账号', 'error'); return; }

        const tasks = this.getTasks();
        if (tasks.length === 0) { this.app?.showToast('⚠️ 请先添加采集任务', 'error'); return; }

        const app = this.app || window.__app;
        if (!app || !app.state.apiToken) { this.app?.showToast('⚠️ 请先在「数据接口」模块获取 Token', 'error'); return; }

        this.running = true;
        this.abortFlag = false;

        document.getElementById('cc-start-btn').style.display = 'none';
        document.getElementById('cc-stop-btn').style.display = 'block';

        this.addLog('🚀 开始循环采集，分组: ' + groupName + ', 账号: ' + accounts.length + '个', 'info');
        this.setStatus('运行中...', '#3fb950', accounts[0]?.username || accounts[0]?.email);

        for (let ai = 0; ai < accounts.length; ai++) {
            if (this.abortFlag) break;
            const acc = accounts[ai];
            const displayName = acc.username || acc.email;

            this.addLog(`🔑 处理账号 (${ai+1}/${accounts.length}): ${displayName}`, 'info');
            this.setStatus(`处理 ${displayName}...`, '#f0a500', displayName);

            try {
                // 停止当前任务（5次，间隔2s）
                this.addLog('⏹️ 停止当前任务...', 'info');
                for (let s = 0; s < 5; s++) {
                    if (this.abortFlag) break;
                    try {
                        const result = await this.apiPost('/tasks/stop', {});
                        if (result && result.code === 20000) {
                            this.addLog(`  ⏹️ 停止请求 ${s+1}/5 成功`, 'success');
                        } else {
                            this.addLog(`  ⏹️ 停止请求 ${s+1}/5: ${result?.message || '未知'}`, 'warning');
                        }
                    } catch (e) {
                        this.addLog(`  ⏹️ 停止请求 ${s+1}/5 异常: ${e.message}`, 'error');
                    }
                    if (s < 4) await this.sleep(2000);
                }

                // 执行任务链
                for (let ti = 0; ti < tasks.length; ti++) {
                    if (this.abortFlag) break;
                    const task = tasks[ti];
                    const r = this._resourceMap.find(x => x.skillId === task.actionSkillId && x.actionId === task.actionId);
                    const taskDesc = r ? `${r.skillName} → ${r.itemName}` : `skill=${task.actionSkillId} action=${task.actionId}`;
                    const endpoint = (ti === 0) ? '/tasks/execute' : '/tasks';

                    this.addLog(`  📋 任务 ${ti+1}/${tasks.length}: ${taskDesc} (${task.count > 0 ? task.count + '次' : '无限'})`, 'info');

                    try {
                        const result = await this.apiPost(endpoint, {
                            actionSkillId: task.actionSkillId,
                            actionId: task.actionId,
                            count: task.count
                        });
                        if (result && result.code === 20000) {
                            this.addLog(`  ✅ 任务 ${ti+1} 已发送成功`, 'success');
                        } else {
                            this.addLog(`  ❌ 任务 ${ti+1} 失败: ${result?.message || '未知错误'}`, 'error');
                        }
                    } catch (e) {
                        this.addLog(`  ❌ 任务 ${ti+1} 异常: ${e.message}`, 'error');
                    }
                    if (ti < tasks.length - 1) await this.sleep(3000);
                }
                this.addLog(`✅ 账号 ${displayName} 全部任务完成`, 'success');
            } catch (e) {
                this.addLog(`❌ 账号 ${displayName} 处理异常: ${e.message}`, 'error');
            }
            if (ai < accounts.length - 1) await this.sleep(2000);
        }

        if (this.abortFlag) {
            this.addLog('⏹️ 已手动停止', 'warning');
            this.setStatus('已停止', '#ff6b6b');
        } else {
            this.addLog('🎉 所有账号全部完成！', 'success');
            this.setStatus('全部完成', '#3fb950');
            this.app?.showToast('🎉 循环采集完成！');
        }

        this.running = false;
        document.getElementById('cc-start-btn').style.display = 'block';
        document.getElementById('cc-stop-btn').style.display = 'none';
    },

    stop() {
        if (!this.running) return;
        this.abortFlag = true;
        this.addLog('⏹️ 发送停止信号...', 'warning');
        this.app?.showToast('⏹️ 正在停止...', 'info');
    },

    destroy() {
        this.rendered = false;
        this.running = false;
        this.abortFlag = true;
    }
};

window.CycleCollectModule = CycleCollectModule;
