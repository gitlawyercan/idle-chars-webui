/**
 * Idle Chars 游戏助手 - 核心框架
 * 
 * 功能：
 * - 模块注册与生命周期管理
 * - 统一的页面切换
 * - 共享状态管理（localStorage）
 * - Toast 提示系统
 */

const App = {
    // 模块注册表
    modules: {},

    // 当前激活的模块名
    currentModule: null,

    // 共享状态（自动持久化到 localStorage）
    state: {},

    // DOM 引用
    els: {},

    /**
     * 初始化应用
     */
    async init() {
        // 获取 DOM 引用
        this.els.container = document.getElementById('module-container');
        this.els.nav = document.getElementById('module-nav');
        this.els.statusDot = document.getElementById('statusDot');
        this.els.statusText = document.getElementById('statusText');

        if (!this.els.container) {
            console.error('❌ 找不到 #module-container 元素');
            return;
        }

        // 加载持久化状态
        this.loadState();

        // ===== 注册所有模块 =====
        this.registerModule('accounts', {
            name: '账号管理',
            icon: '🔑',
            render: (c, a) => AccountsModule.render(c, a),
            destroy: () => AccountsModule.destroy(),
        });
        
        this.registerModule('stats', {
            name: '人物属性',
            icon: '📊',
            render: (c, a) => StatsModule.render(c, a),
            destroy: () => StatsModule.destroy(),
        });

        this.registerModule('inventory', {
            name: '背包物品',
            icon: '🎒',
            render: (c, a) => InventoryModule.render(c, a),
            destroy: () => InventoryModule.destroy(),
        });

        this.registerModule('skills', {
            name: '技能等级',
            icon: '📊',
            render: (c, a) => SkillsModule.render(c, a),
            destroy: () => SkillsModule.destroy(),
        });

        this.registerModule('api-data', {
            name: '数据接口',
            icon: '🔌',
            render: (c, a) => ApiDataModule.render(c, a),
            destroy: () => ApiDataModule.destroy(),
        });

        // icons 模块 — IconsModule 由 icons.js 定义为全局对象
        this.registerModule('icons', {
            name: '图标浏览',
            icon: '🖼️',
            render: async (container, app) => {
                await IconsModule.loadTextures();
                IconsModule.render(container, app);
            },
            destroy: () => IconsModule.destroy(),
        });

        // cycle-collect 模块 — CycleCollectModule 由 cycle-collect.js 定义
        this.registerModule('cycle-collect', {
            name: '循环采集',
            icon: '⛏️',
            render: (c, a) => CycleCollectModule.render(c, a),
            destroy: () => CycleCollectModule.destroy(),
        });

        // ===== 渲染导航栏（必须在所有模块注册之后）=====
        this.renderNav();

        // 暴露到全局，方便模块内部调用
        window.__app = this;

        // 默认切换到第一个模块
        const firstModule = Object.keys(this.modules)[0];
        if (firstModule) {
            try {
                await this.switchTo(firstModule);
            } catch (e) {
                console.error('模块加载失败:', e);
                this.els.container.innerHTML = `
                    <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
                        <div style="font-size:48px;margin-bottom:12px;">⚠️</div>
                        <p style="color:#f85149;">模块加载失败</p>
                        <p style="font-size:12px;margin-top:8px;color:#6e7681;">${e.message}</p>
                        <button onclick="location.reload()" style="margin-top:16px;padding:8px 20px;
                            background:#58a6ff;color:#fff;border-radius:6px;border:none;cursor:pointer;">重新加载</button>
                    </div>
                `;
            }
        }

        // 设置状态栏
        this.setStatus('就绪', 'online');

        console.log('✅ App 初始化完成，已注册模块:', Object.keys(this.modules));
    },

    /**
     * 注册一个模块
     */
    registerModule(id, mod) {
        this.modules[id] = mod;
    },

    /**
     * 渲染侧边栏导航
     */
    renderNav() {
        if (!this.els.nav) return;
        this.els.nav.innerHTML = '';
        
        Object.entries(this.modules).forEach(([id, mod]) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="module-nav-item" data-module="${id}">
                    <span class="nav-icon">${mod.icon}</span>
                    <span>${mod.name}</span>
                </div>
            `;
            li.querySelector('.module-nav-item').addEventListener('click', () => {
                this.switchTo(id);
            });
            this.els.nav.appendChild(li);
        });
    },

    /**
     * 切换到指定模块
     */
    async switchTo(moduleId) {
        const mod = this.modules[moduleId];
        if (!mod) {
            console.error('模块 "' + moduleId + '" 未注册');
            return;
        }

        if (this.currentModule) {
            const currentMod = this.modules[this.currentModule];
            if (currentMod && currentMod.destroy) {
                currentMod.destroy();
            }
        }

        this.currentModule = moduleId;

        document.querySelectorAll('.module-nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.module === moduleId);
        });

        if (this.els.container) {
            this.els.container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;color:#8b949e;">
                    <div style="width:40px;height:40px;border:3px solid #21262d;border-top-color:#58a6ff;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:12px;"></div>
                    <p>加载中...</p>
                </div>
            `;
        }

        await new Promise(resolve => setTimeout(resolve, 30));

        if (mod.render && this.els.container) {
            mod.render(this.els.container, this);
        }

        this.saveState();
    },

    /**
     * 从 localStorage 加载状态
     */
    loadState() {
        try {
            const saved = localStorage.getItem('idle_app_state');
            this.state = saved ? JSON.parse(saved) : {};
        } catch {
            this.state = {};
        }
        if (!this.state.accounts) this.state.accounts = [];
        if (!this.state.skills) this.state.skills = {};
        if (!this.state.apiToken) this.state.apiToken = '';
        if (!this.state.playerData) this.state.playerData = null;
    },

    /**
     * 保存状态到 localStorage
     */
    saveState() {
        try {
            localStorage.setItem('idle_app_state', JSON.stringify(this.state));
        } catch (e) {
            console.warn('状态保存失败:', e);
        }
    },

    updateState(key, value) {
        this.state[key] = value;
        this.saveState();
    },

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position:fixed;bottom:20px;right:20px;padding:12px 20px;border-radius:8px;
            font-size:13px;color:#fff;z-index:999;animation:fadeIn .3s ease;
            box-shadow:0 4px 12px rgba(0,0,0,.3);
            background: ${type === 'success' ? '#3fb950' : type === 'error' ? '#f85149' : '#58a6ff'};
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity .3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    },

    setStatus(text, dotClass = 'offline') {
        if (this.els.statusText) this.els.statusText.textContent = text;
        if (this.els.statusDot) {
            this.els.statusDot.className = 'dot ' + dotClass;
        }
    },
};

document.addEventListener('DOMContentLoaded', () => App.init());
