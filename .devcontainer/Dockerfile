FROM node:18-bullseye

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8 --activate

# Install wrangler
RUN pnpm install -g wrangler

# Install additional OS packages
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace 