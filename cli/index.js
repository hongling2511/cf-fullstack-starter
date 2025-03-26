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

    const spinner = ora('Creating project...').start();
    
    try {
      // Clone the template
      await execa('git', ['clone', 'https://github.com/yourusername/cf-fullstack-starter.git', projectName]);
      
      // Remove .git directory
      await execa('rm', ['-rf', join(projectName, '.git')]);
      
      // Initialize new git repository
      await execa('git', ['init'], { cwd: projectName });
      
      // Install dependencies
      await execa('pnpm', ['install'], { cwd: projectName });
      
      spinner.succeed(chalk.green('Project created successfully!'));
      
      console.log('\nNext steps:');
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan('  pnpm dev'));
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to create project'));
      console.error(error);
      process.exit(1);
    }
  });

program.parse(); 