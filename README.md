# Pokemon TCG Search Monorepo

React Native TurboModule + C++ search engine - a C++ learning exercise.

## Stack

- `pnpm workspaces`
- `turbo`
- `changesets`
- `CMake`

## Packages

- `@pokemon-search/demo`
  - React Native app for end-to-end validation on iOS/Android.
  - App auto-builds index on startup, supports search by name/number, and card details screen.

- `@pokemon-search/tcg-dataset`
  - Dataset loader package.
  - Dataset taken from https://github.com/PokemonTCG/pokemon-tcg-data
  - Merges `base1.json` + `basep.json` and exposes:
    - lightweight search dataset JSON (`id`, `name`, `number`)
    - card metadata map for UI details

- `@pokemon-search/tcg-native`
  - TurboModule (`buildIndex`, `searchByName`, `searchByNumber`).
  - Pure C++ cross-platform module:
    - Android uses C++ autolinking provider (`cxxModule...` in `react-native.config.js`).
    - iOS uses `RCTModuleProvider` (`TcgSearchProvider`) that instantiates the shared C++ module.

- `@pokemon-search/core-cpp`
  - C++ search engine package with tests.
  - Single source of truth for indexing/search logic used by `@pokemon-search/tcg-native`.

## Commands

```bash
nvm install 22
nvm use 22
pnpm install
pnpm build
pnpm test
```

### Demo app

```bash
pnpm demo:start
pnpm demo:ios
pnpm demo:android
```

### C++ package only

```bash
pnpm --filter @pokemon-search/core-cpp test
```
