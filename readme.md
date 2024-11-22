
# Backend Starter Code Documentation

This guide outlines the steps taken to set up the backend for a Node.js application.

## Step 1: Initialize npm

The first step in setting up the Node.js backend is to initialize npm, which helps manage project dependencies.

```bash
npm init 
```

This creates a `package.json` file.

## Step 2: Set up ESLint
To maintain code quality and consistency, this project follows the Airbnb JavaScript Style Guide using ESLint.

### Initialize ESLint

Run the following command to configure ESLint in the project:

```bash
npx eslint --init
```

Alternatively, you can run:

```bash
npm init @eslint/config@latest
```


### Choose the following options during setup:
-   Use TypeScript
-   Use ESM modules
-   Use npm package manager

## Step 3: Add Prettier for Code Formatting

Prettier is used in this project to ensure consistent code formatting across the codebase.

### Install Prettier

Install Prettier as a development dependency:

```bash
npm install --save-dev prettier
```

### Integrate Prettier with ESLint

To avoid conflicts between ESLint and Prettier, install `eslint-config-prettier` and `eslint-plugin-prettier`:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

## Step 4: Use Environment Variables with `.env` Support

Environment variables help keep sensitive data (like API keys and database credentials) secure and separate from the source code. This project uses a `.env` file to manage environment-specific settings.

### Create a `.env` File

In the project root, create a `.env` file to store environment variables. For example:
env
`PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydatabase` 


### Use the `.env` File
To load the environment variables when starting the application, use the following command:

```bash
node --env-file=.env index.js
```

For more information, refer to [this article](https://medium.com/@mohdharis010/node-20-6-0-introduces-integrated-env-file-support-55c2c3c1dc53).

## Implementing TypeScript in Code

Node.js recently launched its built-in support for TypeScript.

To strip types from the code, use:

```bash
node --experimental-strip-types index.ts
```

Note that this only strips types from the code, meaning it won't give errors during execution, but will highlight issues during the development phase.

To execute the TypeScript file with the stripped types, use:

```bash
node --trace-warnings --experimental-strip-types --experimental-transform-types ./index.ts
```

To cover the limitation of type stripping, you can use the TypeScript compiler (`tsc`) with the `--noEmit` option to validate your TypeScript code:

```bash
tsc --noEmit
```

### Useful TypeScript Tools

-   `tsc`: TypeScript compiler that converts `.ts` files to `.js` and validates the code.
-   `npx`: Executes packages present in `node_modules` (without needing to install them globally).
-   `tsx`: A third-party package by `@esbuild-kit` that allows TypeScript files to run directly in Node.js without a build step.
-   `ts-node`: A tool for running TypeScript directly in Node.js. It compiles TypeScript code on the fly and then executes it.

### Development Tools

To automatically restart the application when files are changed, install `nodemon`:

`npm i -D nodemon` 

## Step 5: Install Required Packages

Install the required packages for the backend:

```bash
npm i dotenv express express-async-errors youch cors
```

-   **CORS**: Middleware that enables CORS with various options.
-   **express-async-errors**: Enables handling of promise errors from any part of the application.
-   **youch**: A pretty stack trace reporter.

### Install TypeScript Type Definitions

Install the type definitions for TypeScript development:

```bash
npm install --save-dev @types/express @types/node`
```

### Using helmet package to set headers to help secure application

## Remove Existing Git History:
Use command
```bash
Remove-Item -Recurse -Force .git
```
