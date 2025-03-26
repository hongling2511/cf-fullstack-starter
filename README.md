# Cloudflare Fullstack Starter

一个基于 Cloudflare Pages 和 Workers 的全栈应用模板。

## 特性

- 🚀 基于 Vite 和 React 的前端
- ⚡️ 基于 Cloudflare Workers 的后端
- 📦 使用 pnpm workspace 管理 monorepo
- 🔄 完整的 CI/CD 工作流
- 🔑 内置环境变量管理
- 🧪 预配置的测试工具
- 📝 ESLint 和 Prettier 代码规范

## 快速开始

```bash
# 创建新项目
npx create-cf-fullstack my-project

# 进入项目目录
cd my-project

# 启动开发服务器
pnpm dev
```

## 项目结构

```
.
├── frontend/          # 前端项目
├── backend/           # 后端项目
├── cli/              # CLI 工具
├── .github/          # GitHub Actions 配置
├── package.json      # 项目配置
└── README.md         # 项目文档
```

## 环境变量

在开发之前，请确保正确设置以下环境变量：

### 前端环境变量 (frontend/.env)

```env
VITE_API_URL=http://localhost:8787
```

### 后端环境变量 (backend/.env)

```env
DATABASE_URL=file:./dev.db
NODE_ENV=development
```

### Cloudflare 环境变量

```env
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
```

## CI/CD

项目使用 GitHub Actions 进行自动化构建、测试和部署。

### CI 工作流

- 在每次推送和 PR 时运行
- 运行代码检查（ESLint）
- 运行测试
- 构建前端和后端代码

### CD 工作流

- 在 main 分支更新时自动部署
- 支持手动触发部署
- 自动部署前端到 Cloudflare Pages
- 自动部署后端到 Cloudflare Workers

### 配置部署

1. 在 GitHub 仓库设置中添加以下 Secrets：
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API 令牌
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 账户 ID
   - `VITE_API_URL`: 生产环境的 API URL

2. 首次部署：
   - 在 Cloudflare Pages 中创建前端项目
   - 在 Cloudflare Workers 中创建后端项目
   - 确保 wrangler.toml 中的配置正确

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 构建项目
pnpm build

# 部署项目
pnpm deploy
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT
