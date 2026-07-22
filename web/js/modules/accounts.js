/**
 * 账号管理模块
 * 
 * 功能：
 * - 添加/保存游戏账号
 * - 显示已保存的账号列表
 * - 支持填充和删除
 */

const AccountsModule = {
    rendered: false,

    /**
     * 渲染模块
     */
    render(container, app) {
        this.app = app;
        this.container = container;

        container.innerHTML = `
            <div style="max-width:520px;margin:0 auto;">
                <div class="card">
                    <div style="text-align:center;margin-bottom:24px;">
                        <div style="font-size:48px;margin-bottom:8px;">🔑</div>
                        <h2 style="font-size:22px;font-weight:700;">账号管理</h2>
                        <p style="color:var(--text-secondary);font-size:13px;margin-top:4px;">
                            保存游戏账号信息，方便快速登录和数据同步
                        </p>
                    </div>

                    <div class="form-group">
                        <label>👤 账号（邮箱）</label>
                        <input type="text" id="mod-accounts-username" placeholder="输入游戏账号邮箱..." />
                    </div>
                    <div class="form-group">
                        <label>🔒 密码</label>
                        <input type="password" id="mod-accounts-password" placeholder="输入密码..." />
                    </div>
                    <div class="form-group">
                        <label>📝 备注（可选）</label>
                        <textarea id="mod-accounts-note" placeholder="例如：主号、小号、服务器等..."></textarea>
                    </div>

                    <button class="btn" id="mod-accounts-save">💾 保存账号</button>
                </div>

                <div class="card">
                    <div style="margin-bottom:12px;font-weight:600;">📂 已保存的账号</div>
                    <div id="mod-accounts-list"></div>
                </div>
            </div>
        `;

        this.bindEvents();
        this.renderList();
        this.rendered = true;
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        document.getElementById('mod-accounts-save').addEventListener('click', () => this.save());
        
        document.getElementById('mod-accounts-password').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.save();
        });
    },

    /**
     * 保存账号
     */
    save() {
        const username = document.getElementById('mod-accounts-username').value.trim();
        const password = document.getElementById('mod-accounts-password').value.trim();
        const note = document.getElementById('mod-accounts-note').value.trim();

        if (!username) { this.app.showToast('请输入账号', 'error'); return; }
        if (!password) { this.app.showToast('请输入密码', 'error'); return; }

        const accounts = this.app.state.accounts || [];
        
        // 检查是否已存在
        const existIdx = accounts.findIndex(a => a.username === username);
        if (existIdx >= 0) {
            accounts[existIdx] = { username, password, note, updatedAt: Date.now() };
            this.app.showToast(`🔄 账号 "${username}" 已更新`);
        } else {
            accounts.push({ username, password, note, createdAt: Date.now(), updatedAt: Date.now() });
            this.app.showToast(`✅ 账号 "${username}" 已保存`);
        }

        this.app.updateState('accounts', accounts);

        // 清空表单
        document.getElementById('mod-accounts-username').value = '';
        document.getElementById('mod-accounts-password').value = '';
        document.getElementById('mod-accounts-note').value = '';

        this.renderList();
    },

    /**
     * 渲染账号列表
     */
    renderList() {
        const list = document.getElementById('mod-accounts-list');
        if (!list) return;

        const accounts = this.app.state.accounts || [];

        if (accounts.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px;">暂无保存的账号</div>';
            return;
        }

        list.innerHTML = accounts.map((acc, idx) => {
            const safeName = this.escHtml(acc.username);
            const safeNote = acc.note ? this.escHtml(acc.note) : '无备注';
            return `
                <div style="display:flex;align-items:center;justify-content:space-between;
                            padding:10px 12px;background:var(--bg-tertiary);border-radius:6px;margin-bottom:6px;">
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:500;font-size:13px;">${safeName}</div>
                        <div style="font-size:11px;color:var(--text-muted);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${safeNote}</div>
                    </div>
                    <div style="display:flex;gap:6px;flex-shrink:0;">
                        <button class="btn btn-sm btn-success" onclick="AccountsModule.fill(${idx})" title="填入表单">📋</button>
                        <button class="btn btn-sm btn-danger" onclick="AccountsModule.remove(${idx})" title="删除">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * 填充账号到表单
     */
    fill(idx) {
        const accounts = this.app.state.accounts || [];
        const acc = accounts[idx];
        if (!acc) return;
        
        document.getElementById('mod-accounts-username').value = acc.username;
        document.getElementById('mod-accounts-password').value = acc.password;
        document.getElementById('mod-accounts-note').value = acc.note || '';
        
        this.app.showToast(`📋 已填充 "${acc.username}"`, 'info');
    },

    /**
     * 删除账号
     */
    remove(idx) {
        const accounts = this.app.state.accounts || [];
        const acc = accounts[idx];
        if (!acc) return;
        
        if (!confirm(`确认删除账号 "${acc.username}" 吗？\n此操作不可恢复！`)) return;
        
        accounts.splice(idx, 1);
        this.app.updateState('accounts', accounts);
        this.renderList();
        
        this.app.showToast(`🗑️ 已删除 "${acc.username}"`);
    },

    /**
     * HTML 转义
     */
    escHtml(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    },

    destroy() {
        this.rendered = false;
    }
};
