/**
 * icon-utils.js - 图标显示工具
 * 
 * 在人物属性、背包、技能等模块中显示 texture 图集图标
 * 使用全局变量方式，兼容普通 <script> 加载
 */

const IconUtils = {
  // 缓存已加载的帧数据
  _cache: {},

  // 是否正在加载中
  _loading: {},

  /**
   * 获取指定 texture 的帧数据
   * @param {number} textureId - 0|1|2|3
   * @returns {Promise<object>} frames 对象
   */
  async getFrames(textureId) {
    if (this._cache[textureId]) return this._cache[textureId];
    if (this._loading[textureId]) return this._loading[textureId];

    const jsonPaths = {
      0: '/textures/texture-0.json',
      1: '/textures/texture-1.json',
      2: '/textures/texture-2.json',
      3: '/textures/texture-3.json',
    };

    const promise = (async () => {
      try {
        const resp = await fetch(jsonPaths[textureId]);
        const data = await resp.json();
        this._cache[textureId] = data.frames;
        return data.frames;
      } catch (err) {
        console.error(`加载 texture-${textureId} 失败:`, err);
        return null;
      }
    })();

    this._loading[textureId] = promise;
    const frames = await promise;
    this._loading[textureId] = null;
    return frames;
  },

  /**
   * 生成单个图标的 HTML
   * @param {number} textureId - 图集ID (0-3)
   * @param {string} iconPath - 图标路径，如 "icons/ui_icon/combat_attributes/physical_attack.png"
   * @param {number} size - 显示尺寸（默认 32px）
   * @param {object} options - 可选配置
   * @returns {string} HTML 字符串
   */
  async getIconHTML(textureId, iconPath, size = 32, options = {}) {
    const frames = await this.getFrames(textureId);
    if (!frames || !frames[iconPath]) {
      // 找不到图标，返回一个占位
      return `<div style="width:${size}px;height:${size}px;border-radius:4px;
              background:var(--bg-tertiary);display:inline-flex;align-items:center;
              justify-content:center;font-size:${size * 0.5}px;color:var(--text-muted);
              ${options.style || ''}" title="${options.title || ''}">?</div>`;
    }

    const frame = frames[iconPath].frame;
    const imagePath = `/textures/texture-${textureId}.png`;
    const scale = size / frame.w;
    const displayW = Math.round(frame.w * scale);
    const displayH = Math.round(frame.h * scale);

    return `<div style="
      background-image: url(${imagePath});
      background-position: -${Math.round(frame.x * scale)}px -${Math.round(frame.y * scale)}px;
      background-size: ${Math.round(2048 * scale)}px ${Math.round(2048 * scale)}px;
      width: ${displayW}px;
      height: ${displayH}px;
      flex-shrink: 0;
      ${options.style || ''}
    " title="${options.title || ''}"></div>`;
  },

  /**
   * 生成带图标的标签（图标 + 文字水平排列）
   * @param {number} textureId
   * @param {string} iconPath
   * @param {string} label - 文字标签
   * @param {number} iconSize - 图标尺寸
   * @returns {Promise<string>} HTML
   */
  async getIconLabel(textureId, iconPath, label, iconSize = 24) {
    const iconHTML = await this.getIconHTML(textureId, iconPath, iconSize);
    return `<div style="display:inline-flex;align-items:center;gap:6px;">
      ${iconHTML}
      <span>${label}</span>
    </div>`;
  },

  /**
   * 同步获取图标的 CSS background（需要帧数据已加载）
   * @param {number} textureId
   * @param {string} iconPath
   * @param {number} size
   * @returns {string} CSS background 样式
   */
  getIconCSS(textureId, iconPath, size = 32) {
    const frames = this._cache[textureId];
    if (!frames || !frames[iconPath]) return '';

    const frame = frames[iconPath].frame;
    const scale = size / frame.w;

    return `
      background-image: url(/textures/texture-${textureId}.png);
      background-position: -${Math.round(frame.x * scale)}px -${Math.round(frame.y * scale)}px;
      background-size: ${Math.round(2048 * scale)}px ${Math.round(2048 * scale)}px;
      width: ${Math.round(frame.w * scale)}px;
      height: ${Math.round(frame.h * scale)}px;
    `;
  },

  /**
   * 生成 inline SVG 占位图标（异步加载完成前的备用显示）
   * @param {string} emoji
   * @param {number} size
   * @returns {string}
   */
  getPlaceholder(emoji = '📦', size = 32) {
    return `<div style="width:${size}px;height:${size}px;border-radius:4px;
            background:var(--bg-tertiary);display:inline-flex;align-items:center;
            justify-content:center;font-size:${size * 0.5}px;flex-shrink:0;">${emoji}</div>`;
  },

  /**
   * 预加载所有 texture 数据
   */
  async preloadAll() {
    await Promise.all([0, 1, 2, 3].map(id => this.getFrames(id)));
    console.log('✅ 所有图集帧数据已预加载');
  }
};
