#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
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

    // 安装依赖
    console.log('正在安装依赖...');
    execSync('npm install', { stdio: 'inherit' });

    console.log(`
项目创建成功！

请按照以下步骤开始开发：

1. 进入项目目录：
   cd ${projectName}

2. 启动开发服务器：
   npm run dev

3. 构建项目：
   npm run build

4. 部署到 Cloudflare：
   npm run deploy

祝您开发愉快！
    `);
  } catch (error) {
    console.error('创建项目时出错:', error.message);
    process.exit(1);
  }
}

createProject(); 