# create-cf-fullstack

A CLI tool to create new Cloudflare Fullstack projects using the cf-fullstack-starter template.

## Usage

```bash
# Using npx
npx create-cf-fullstack my-project

# Using pnpm
pnpm dlx create-cf-fullstack my-project

# Using yarn
yarn create cf-fullstack my-project
```

## Features

- Creates a new project from the template
- Initializes Git repository
- Installs dependencies
- Sets up environment variables
- Provides next steps and additional setup instructions

## Development

```bash
# Install dependencies
pnpm install

# Run the CLI locally
node index.js my-project
```

## Publishing

1. Update the version in package.json
2. Run `npm publish`

## License

MIT 