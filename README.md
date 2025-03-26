# Cloudflare Fullstack Starter

A modern fullstack starter template using Cloudflare Workers, D1, and React.

## 🚀 快速开始

### 前置要求
- Node.js 18+
- pnpm 8+
- Wrangler CLI (`pnpm install -g wrangler`)

### 安装依赖
```bash
pnpm install
```

### 开发环境设置

1. 启动前端开发服务器:
```bash
pnpm --filter frontend dev
```

2. 启动后端开发服务器:
```bash
pnpm --filter backend wrangler dev
```

3. 初始化数据库:
```bash
wrangler d1 create my-d1-db
wrangler d1 execute my-d1-db --file=./schema.sql
```

## 📦 技术栈

### 前端
- Vite + React
- Tailwind CSS
- TypeScript
- ESLint + Prettier

### 后端
- Cloudflare Workers
- D1 (SQLite)
- itty-router
- TypeScript

### 开发工具
- pnpm (Monorepo)
- Wrangler
- ESLint + Prettier
- Husky + lint-staged

## 🏗️ 项目结构

```
.
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── services/      # API 服务
│   │   ├── utils/         # 工具函数
│   │   └── types/         # TypeScript 类型定义
│   └── public/            # 静态资源
│
├── backend/                # 后端项目
│   ├── src/
│   │   ├── routes/        # API 路由
│   │   ├── services/      # 业务逻辑
│   │   ├── utils/         # 工具函数
│   │   └── types/         # TypeScript 类型定义
│   └── migrations/        # 数据库迁移
│
└── package.json           # 项目配置
```

## 🔧 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 提交前自动运行 lint 和测试

### 测试
- 前端单元测试: `pnpm --filter frontend test`
- 前端 E2E 测试: `pnpm --filter frontend test:e2e`
- 后端测试: `pnpm --filter backend test`

### 部署
1. 前端部署到 Cloudflare Pages
2. 后端部署到 Cloudflare Workers
3. 数据库使用 Cloudflare D1

## 📝 许可证

MIT
