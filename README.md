# Typescript node.js project template

Personal project template for a Typescript node.js project, using tsx and rolldown. Rolldown is configured to drop any statements labelled with the special label `DEBUG`, and two assertion functions are provided to aid in development.

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
├─ src/               < Typescript code
├─ tests/             < Vitest tests
├─ dist/              < Rolldown output
├─ .gitignore
├─ tsconfig.json      < Typescript config
├─ rolldown.config.js < Rolldown config
├─ .oxlintrc.json     < Oxlint config
├─ dprint.json        < dprint config
├─ package.json       < Project info
├─ pnpm-lock.yaml     < Lockfile
└─ README.md
```

## Dependencies

From `package.json`:

- Oxlint: 1.82.0
- dprint: 0.57.4
- Typescript: 7.0.2
- Rolldown: 1.2.8
- tsx: 4.23.13

## package.json scripts

- `dev`: Run `index.ts` with tsx's [watch mode](https://tsx.is/watch-mode)
- `test`: Run unit tests with Vitest.
- `build`: Build the app using Rolldown.
- `lint`: Run Oxlint and dprint, but don't apply any fixes
- `lint:fix`: Run Oxlint and dprint, and apply any fixes
- `lint:ci`: For CI jobs, run Oxlint and dprint with no tolerance for warnings
