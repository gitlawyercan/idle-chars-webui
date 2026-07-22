# ============================================================
# Stage 1: 使用 Node.js 18 作为基础镜像
# ============================================================
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 复制 package.json 和 package-lock.json（如果存在）
COPY server/package*.json ./server/

# 安装依赖
RUN cd server && npm install --production --registry=https://registry.npmmirror.com

# 复制源代码
COPY server/ ./server/
COPY web/ ./web/
COPY textures/ ./textures/

# 创建数据目录（持久化 Token 和缓存）
RUN mkdir -p /app/server/data

# 暴露端口
EXPOSE 3000

# 设置工作目录到 server
WORKDIR /app/server

# 启动命令
CMD ["node", "index.js"]
