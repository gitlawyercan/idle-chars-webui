/**
 * API 客户端
 * 调用本地后端接口（通过本地 Node.js 代理服务器）
 */

const ApiClient = {
    baseURL: '', // 同源请求，不需要前缀

    /**
     * 发送 HTTP 请求
     * @param {string} method - GET/POST/PUT/DELETE
     * @param {string} path - API 路径
     * @param {object|null} body - 请求体
     * @returns {Promise<object>} 响应数据
     */
    async request(method, path, body = null) {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const resp = await fetch(`${this.baseURL}${path}`, options);

            if (!resp.ok) {
                throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
            }

            return await resp.json();
        } catch (e) {
            if (e.message === 'Failed to fetch') {
                throw new Error('无法连接到服务器，请确保后端服务已启动 (node server/index.js)');
            }
            throw new Error(`请求失败: ${e.message}`);
        }
    },

    /**
     * GET 请求快捷方法
     */
    async get(path) {
        return this.request('GET', path);
    },

    /**
     * POST 请求快捷方法
     */
    async post(path, body) {
        return this.request('POST', path, body);
    },

    // ========== 认证相关 ==========

    /**
     * 登录获取 Token
     * @param {string} email - 账号
     * @param {string} password - 密码
     * @returns {Promise<object>}
     */
    async login(email, password) {
        return this.post('/api/auth/login', { email, password });
    },

    /**
     * 获取登录状态
     * @param {string} email - 账号
     * @returns {Promise<object>}
     */
    async getLoginStatus(email) {
        return this.get(`/api/auth/status?email=${encodeURIComponent(email)}`);
    },

    /**
     * 退出登录
     * @param {string} email - 账号
     * @returns {Promise<object>}
     */
    async logout(email) {
        return this.post('/api/auth/logout', { email });
    },

    // ========== 玩家数据 ==========

    /**
     * 获取玩家完整资料
     * @param {string} email - 账号
     * @returns {Promise<object>}
     */
    async getPlayerProfile(email) {
        return this.get(`/api/player/profile?email=${encodeURIComponent(email)}`);
    },

    /**
     * 获取技能数据
     * @param {string} email - 账号
     * @returns {Promise<object>}
     */
    async getPlayerSkills(email) {
        return this.get(`/api/player/skills?email=${encodeURIComponent(email)}`);
    },

    /**
     * 获取角色属性
     * @param {string} email - 账号
     * @returns {Promise<object>}
     */
    async getPlayerStats(email) {
        return this.get(`/api/player/stats?email=${encodeURIComponent(email)}`);
    },

    /**
     * 获取背包数据
     * @param {string} email - 账号
     * @returns {Promise<object>}
     */
    async getPlayerInventory(email) {
        return this.get(`/api/player/inventory?email=${encodeURIComponent(email)}`);
    },
};
