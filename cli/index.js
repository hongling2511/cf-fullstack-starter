#!/usr/bin/env node

import { program } from 'commander';
import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { prompts } from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATE_REPO = 'https://github.com/hongling2511/cf-fullstack-starter.git';

async function createProject(projectName) {
  const spinner = ora('Creating project...').start();
  
  try {
    // Clone the template
    await execa('git', ['clone', TEMPLATE_REPO, projectName]);
    
    // Remove .git directory
    await execa('rm', ['-rf', join(projectName, '.git')]);
    
    // Initialize new git repository
    await execa('git', ['init'], { cwd: projectName });
    
    // Install dependencies
    spinner.text = 'Installing dependencies...';
    await execa('pnpm', ['install'], { cwd: projectName });
    
    // Create .env file
    const envContent = `# Frontend
VITE_API_URL=http://localhost:8787

# Backend
DATABASE_URL=file:./dev.db
NODE_ENV=development`;
    
    fs.writeFileSync(join(projectName, '.env'), envContent);
    
    spinner.succeed(chalk.green('Project created successfully!'));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  pnpm dev'));
    
    console.log('\nAdditional setup:');
    console.log(chalk.cyan('  1. Update the project name in package.json files'));
    console.log(chalk.cyan('  2. Update the database name in wrangler.toml'));
    console.log(chalk.cyan('  3. Initialize your database:'));
    console.log(chalk.cyan('     wrangler d1 create my-d1-db'));
    console.log(chalk.cyan('     wrangler d1 execute my-d1-db --file=./schema.sql'));
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    process.exit(1);
  }
}

program
  .name('create-cf-fullstack')
  .description('Create a new Cloudflare Fullstack project')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    if (!projectName) {
      const response = await prompts({
        type: 'text',
        name: 'projectName',
        message: 'What is your project name?',
        validate: (value) => value.length > 0 || 'Project name is required',
      });
      projectName = response.projectName;
    }

    // Validate project name
    if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
      console.error(chalk.red('Project name can only contain letters, numbers, hyphens, and underscores'));
      process.exit(1);
    }

    // Check if directory exists
    if (fs.existsSync(projectName)) {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${projectName} already exists. Overwrite it?`,
      });

      if (!overwrite) {
        process.exit(0);
      }

      // Remove existing directory
      fs.rmSync(projectName, { recursive: true, force: true });
    }

    await createProject(projectName);
  });

program.parse(); 