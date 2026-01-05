# Typescript node.js project template

Personal project template for a Typescript node.js project, using tsx and esbuild. tsx is configured to drop any statements labelled with the special label `DEBUG`, and two assertion functions are provided to aid in development.

```ts
// example usage:
function divide(a: number, b: number): number {
    DEBUG: ASSERT(b !== 0);
    //     ^^^^^^ dropped in production builds
    return a / b;
}
```

## Project structure

```
├─ node_modules/     < Dependencies
├─ src/              < Typescript code
├─ dist/             < esbuild output
├─ .gitignore
├─ tsconfig.json     < Typescript config
├─ esbuild.js        < esbuild build script
├─ .oxlintrc.json    < Oxlint config
├─ dprint.json       < dprint config
├─ package.json      < Project info
├─ pnpm-lock.yaml    < Lockfile
└─ README.md
```

## Dependencies

From `package.json`:

- pnpm: 10.27.0
- Oxlint: 1.37.0
- dprint: 0.51.1
- Typescript: 5.9.3
- esbuild: 0.27.2
- tsx: 4.21.0

## package.json scripts

- `dev`: Run `index.ts` with tsx's [watch mode](https://tsx.is/watch-mode)
- `build`: Build the app using esbuild.
- `lint`: Run Oxlint and dprint, but don't apply any fixes
- `lint:fix`: Run Oxlint and dprint, and apply any fixes
- `lint:ci`: For CI jobs, run Oxlint and dprint with no tolerance for warnings
