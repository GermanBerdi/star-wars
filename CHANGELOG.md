# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.7.0](https://github.com/GermanBerdi/star-wars/compare/v1.6.0...v1.7.0) (2025-06-16)


### Features

* [main] add getCharacterById tool ([a0ccd16](https://github.com/GermanBerdi/star-wars/commit/a0ccd169efcff59d991bc7773217c93489551f68))
* [main] add getCharacterByIdTool and createFightTool ([2732ea8](https://github.com/GermanBerdi/star-wars/commit/2732ea8d260c91af09b183b6390446d64cd7be8f))
* [main] Add state section, implement updateIfFinished, ([ecd3cfc](https://github.com/GermanBerdi/star-wars/commit/ecd3cfcb4d370973eff1e477a3685de7984d36c8))
* [main] add winnerLabel info and check if a fight is finished or not before perform actions ([d584c44](https://github.com/GermanBerdi/star-wars/commit/d584c4446a69f0f89140a78f0ad2c8ae4655d53f))


### Bug Fixes

* [main] aligned response format with other character tools ([a94dd4d](https://github.com/GermanBerdi/star-wars/commit/a94dd4d68cb1c868c70ede892c56fcb81c28f949))
* [main] correct turn and winnerId initialization; rename isFinished for clarity ([99ec0b5](https://github.com/GermanBerdi/star-wars/commit/99ec0b5f98ef52838f977f2aa61f94456e33c5d2))
* [main] expose StateMessages to MCP for better interpretation ([b708802](https://github.com/GermanBerdi/star-wars/commit/b70880243e4b08cb5c3f252ec170e2027b8a5eee))
* [main] using characterService instead of characterRepo ([884893a](https://github.com/GermanBerdi/star-wars/commit/884893a0134a0ad7d315df28f1204523ba003058))

## [1.6.0](https://github.com/GermanBerdi/star-wars/compare/v1.5.0...v1.6.0) (2025-06-15)


### Features

* [main] add actions route ([ef50020](https://github.com/GermanBerdi/star-wars/commit/ef50020d3898c8f8196db51c0e6652f0187ebc8f))
* [main] add getCharacterById endpoint ([ca6b965](https://github.com/GermanBerdi/star-wars/commit/ca6b96521f2219d3d60368439b4cfa1091ac7c07))
* [main] add update ([45388ae](https://github.com/GermanBerdi/star-wars/commit/45388ae2314ec2ff07736ac6a85c56bb9170f72a))
* [main] implement actions services ([76a24f6](https://github.com/GermanBerdi/star-wars/commit/76a24f69ab5214f1576b58b942032fcde2aa6793))
* [main] implement character service ([aa596dd](https://github.com/GermanBerdi/star-wars/commit/aa596dd97832fe000ff954d178748fa3a5a05f67))
* [main] implement fight service ([f95d1be](https://github.com/GermanBerdi/star-wars/commit/f95d1be88a1b599ef60d546805a179601d97fbcb))
* [main] implement fights repo and endpoint ([2a0cb38](https://github.com/GermanBerdi/star-wars/commit/2a0cb381044af3a7eafcbb6337e2602457c8ffee))
* [main] implement getById, getByIdPopulated, updateCombatantHp ([9f8f4f0](https://github.com/GermanBerdi/star-wars/commit/9f8f4f08339941421e7c16f2ebb2c1e5b938d354))


### Bug Fixes

* [main] add actions router ([3ca54fe](https://github.com/GermanBerdi/star-wars/commit/3ca54feb9bcdcd3d54fb9b2e7850c05e2a56f349))
* [main] fixed message text and corrected name ([f036ac1](https://github.com/GermanBerdi/star-wars/commit/f036ac168dc3f11fc9bdfe79e8075d046180a78b))
* [main] improve error messages for clarity ([d0863ea](https://github.com/GermanBerdi/star-wars/commit/d0863ea2a1882a2627c0384488e8566f9ccfef00))
* [main] properly terminate each SQL statement ([de8153c](https://github.com/GermanBerdi/star-wars/commit/de8153c1ecc2a4c1665f8b9392dfeffe9f35780e))
* [main] router now use service instead of repo ([328b6e9](https://github.com/GermanBerdi/star-wars/commit/328b6e90d5f856fdb47113a886985d354af71529))
* [main] service uses new repo export format, fixes some function names ([79f400a](https://github.com/GermanBerdi/star-wars/commit/79f400a6877b39aaa8b688ae0aed54ea72f52c77))
* [main] use export default instead of exporting each function ([ea3d70f](https://github.com/GermanBerdi/star-wars/commit/ea3d70f4e6528ccd9bc56605c11137d11a7ce3c1))
* [main] use export default instead of exporting each function ([da515ad](https://github.com/GermanBerdi/star-wars/commit/da515ad546758f1b6bb690292a1a03c643e9f849))

## [1.5.0](https://github.com/GermanBerdi/star-wars/compare/v1.4.0...v1.5.0) (2025-06-13)


### Features

* [main] add createCharacterTool, updateCharacterTool, move "hello" example tool outside mcp-server ([0ceb8c5](https://github.com/GermanBerdi/star-wars/commit/0ceb8c5b757195d4b628d96ac86b67f1ad87fae0))
* [main] add update charactaer endpoint ([9a49a0d](https://github.com/GermanBerdi/star-wars/commit/9a49a0d7159f83dca77157bd66fcffbf60b2a339))
* [main] implement updateCharacter Repo ([450f178](https://github.com/GermanBerdi/star-wars/commit/450f17853edc143bd1566bc0a6b667b3c674b4a9))


### Bug Fixes

* [main] normalize api response ([d001b63](https://github.com/GermanBerdi/star-wars/commit/d001b63bc21af9616e11f74de14e36cf821a064f))
* [main] normalize api response ([13f2710](https://github.com/GermanBerdi/star-wars/commit/13f271031a8315611601508b66913cd39c95020d))
* [main] renaming starships tool ([e782813](https://github.com/GermanBerdi/star-wars/commit/e782813fc581727fd6b39d4fba3ceb19d06a04dc))
* [main] update interface and repo imports ([ed17e21](https://github.com/GermanBerdi/star-wars/commit/ed17e2160e23d6bd0241286e711b9c108dd20e33))

## [1.4.0](https://github.com/GermanBerdi/star-wars/compare/v1.3.0...v1.4.0) (2025-06-13)


### Features

* [main] add character repo and api endpoint ([05ec6f1](https://github.com/GermanBerdi/star-wars/commit/05ec6f1fb9851ce79ecf1d60f057e6affbe36c00))


### Bug Fixes

* [main] adapting repo to arrow function ([30058e7](https://github.com/GermanBerdi/star-wars/commit/30058e7246d16774f033954b63b6766b537b8758))
* [main] add return type and improving error message ([c1192b6](https://github.com/GermanBerdi/star-wars/commit/c1192b68106c29e7c67cc617f87ecc287c25976d))
* [main] renamin health.ts to health-router ([eee7650](https://github.com/GermanBerdi/star-wars/commit/eee76501915f2a9536e0e98a5c2a77516faf7ce5))
* [main] renaming index.ts to router ([d9206be](https://github.com/GermanBerdi/star-wars/commit/d9206bee799caa9aa501949a4fb4ff0f472dd056))
* [main] split interfaces from starship repo ([ef302d2](https://github.com/GermanBerdi/star-wars/commit/ef302d2c849f138ec973f6eed7ea69059afb1e12))
* [main] updating apiRouter import ([1f2c5d6](https://github.com/GermanBerdi/star-wars/commit/1f2c5d652d4ff9d4cad234a772ea97a196a95a9e))
* [main]: correcting error message ([c4c83de](https://github.com/GermanBerdi/star-wars/commit/c4c83de044cfd3fbf0bc02fa3fb2c470b41aae1d))

## [1.3.0](https://github.com/GermanBerdi/star-wars/compare/v1.2.0...v1.3.0) (2025-06-12)


### Features

* [main] add mcp-server ([a5162c3](https://github.com/GermanBerdi/star-wars/commit/a5162c37fa0b53664ae86b889d2efb00cf15c9c5))
* [main] develop MCP starships-tools ([ab99a3c](https://github.com/GermanBerdi/star-wars/commit/ab99a3c928d4cbba2def9955f4da2c2bea4f13c6))
* **main:** configure initial database connection ([b464fba](https://github.com/GermanBerdi/star-wars/commit/b464fba6d4ec52bae7c269052b10940e59a774ba))


### Bug Fixes

* [main] remove duplicated tool ([e907643](https://github.com/GermanBerdi/star-wars/commit/e9076432dce57e9970816f928b1da132a9387b24))

## [1.2.0](https://github.com/GermanBerdi/star-wars/compare/v1.1.0...v1.2.0) (2025-06-12)


### Features

* [main] add /health endpoint ([3c13864](https://github.com/GermanBerdi/star-wars/commit/3c138641c51564f2cd7fa4ed1be904465d455547))
* [main] implementation of the API router structure ([1f634e3](https://github.com/GermanBerdi/star-wars/commit/1f634e3a82f74e3abd4b89f0e6982b34b7298147))

## 1.1.0 (2025-06-11)


### Features

* [master] initialize API with Express and TypeScript 062b18f
