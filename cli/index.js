#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATE_REPO = 'https://github.com/hongling2511/cf-fullstack-starter.git';

async function createProject() {
  try {
    // 获取项目名称
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: '请输入项目名称:',
      validate: value => value.length > 0 ? true : '项目名称不能为空'
    });

    if (!response.projectName) {
      console.log('项目创建已取消');
      return;
    }

    const projectName = response.projectName;
    const projectPath = join(process.cwd(), projectName);

    // 检查目录是否已存在
    if (existsSync(projectPath)) {
      console.error(`错误: 目录 ${projectName} 已存在`);
      return;
    }

    // 创建项目目录
    mkdirSync(projectPath);
    process.chdir(projectPath);

    // 克隆模板仓库
    console.log('正在克隆模板...');
    execSync(`git clone ${TEMPLATE_REPO} .`, { stdio: 'inherit' });

    // 删除 .git 目录
    execSync('rm -rf .git', { stdio: 'inherit' });

    // 初始化新的 git 仓库
    execSync('git init', { stdio: 'inherit' });

    // 创建环境变量文件
    console.log('正在创建环境变量文件...');
    
    // 根目录的 .env
    const rootEnv = `# Frontend
VITE_API_URL=http://localhost:8787

# Backend
DATABASE_URL=file:./dev.db
NODE_ENV=development

# Cloudflare
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id`;
    writeFileSync('.env', rootEnv);

    // 前端的 .env
    const frontendEnv = `VITE_API_URL=http://localhost:8787`;
    writeFileSync('frontend/.env', frontendEnv);

    // 后端的 .env
    const backendEnv = `DATABASE_URL=file:./dev.db
NODE_ENV=development`;
    writeFileSync('backend/.env', backendEnv);

    console.log('已创建环境变量文件');

    // 检查是否安装了 pnpm
    try {
      execSync('pnpm --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('正在安装 pnpm...');
      execSync('npm install -g pnpm', { stdio: 'inherit' });
    }

    // 设置 pnpm workspace
    console.log('正在设置 workspace...');
    execSync('pnpm setup', { stdio: 'inherit' });

    // 安装依赖
    console.log('正在安装依赖...');
    execSync('pnpm install', { stdio: 'inherit' });

    // 修复权限
    console.log('正在修复权限...');
    const username = execSync('whoami').toString().trim();
    execSync(`chown -R ${username} .`, { stdio: 'inherit' });

    console.log(`
项目创建成功！

请按照以下步骤开始开发：

1. 进入项目目录：
   cd ${projectName}

2. 启动开发服务器：
   pnpm dev

3. 构建项目：
   pnpm build

4. 部署到 Cloudflare：
   pnpm deploy

祝您开发愉快！
    `);
  } catch (error) {
    console.error('创建项目时出错:', error.message);
    process.exit(1);
  }
}

createProject(); 