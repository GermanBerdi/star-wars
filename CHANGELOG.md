# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.8.0](https://github.com/GermanBerdi/star-wars/compare/v1.7.0...v1.8.0) (2025-07-04)


### Features

* [main] add intelligence, wisdom and charisma ([7dfd81e](https://github.com/GermanBerdi/star-wars/commit/7dfd81e1b7bde3620acc01241828b58b70e7a141))
* [main] add reassign abilities ([d919c43](https://github.com/GermanBerdi/star-wars/commit/d919c43de85409de56f5f8a635746dd2d2b58c43))
* [main] add rotate turn ([94370f5](https://github.com/GermanBerdi/star-wars/commit/94370f5317f7061ffc631148b3da7418d59ed42d))
* [main] implement getByIdPopulated to return fight with characters details ([990517a](https://github.com/GermanBerdi/star-wars/commit/990517a8727149299dcca0d7ac46f2bfbbc18a0f))
* [main] implement getFightById ([6bcf790](https://github.com/GermanBerdi/star-wars/commit/6bcf79091d940861e71ac34b015ecfa0a5a79a07))
* [main] implement last_exceptional_strength_id to preserve exceptional strength values and avoid re-rolling ([ad6cb09](https://github.com/GermanBerdi/star-wars/commit/ad6cb09deaa0953e97695a401f3d034e99349afc))
* [main] implement listFightsTool and  performActionTool ([12b5ab4](https://github.com/GermanBerdi/star-wars/commit/12b5ab4e4f007b29d3277cab1670246e09b86572))
* [main] implement string templates for application messages ([b52ec40](https://github.com/GermanBerdi/star-wars/commit/b52ec40766e0d9a31b27d1035c4dfba81d429605))
* [main] implemented endpoints GET /api/fights/:id and /api/fights/:id/populated ([32f7942](https://github.com/GermanBerdi/star-wars/commit/32f794290fc2ae619a84c6c423454d9b0dcccdc7))
* [main] implementing reassign abilities tool ([1bc05f8](https://github.com/GermanBerdi/star-wars/commit/1bc05f8b929ac1437ea6b9387eb360bbea912430))
* [main] move query interfaces from service interface to repository interface ([ea35c7f](https://github.com/GermanBerdi/star-wars/commit/ea35c7f18cea979c1eec07c2dcf7cd8dbb56b063))
* [main] refactor create and getById ([d0b8599](https://github.com/GermanBerdi/star-wars/commit/d0b8599c1dfc1fd03d84d3ad3fe4691c9a59d668))
* [main] Refactor IFightPopulatedRow interface ([90b7743](https://github.com/GermanBerdi/star-wars/commit/90b7743e57c9b2fbb14b0919763ed53231498309))
* [main] refactor performAction to reduce database access ([a08d5f2](https://github.com/GermanBerdi/star-wars/commit/a08d5f294e697c649f933ddb74791a7ef07a75d2))
* [main] refactor update tool to new desing, develop reroll abilities and hit dices tools ([bccfdd2](https://github.com/GermanBerdi/star-wars/commit/bccfdd27e254b2bf7e2e407dead62d08329aea31))
* [main] refactoring perform action response ([fe84777](https://github.com/GermanBerdi/star-wars/commit/fe847771b262f83739a71a84570335933c4301aa))
* [main] reordering tools, moving armor-types into character group, fixing tool names ([a830218](https://github.com/GermanBerdi/star-wars/commit/a8302184879424e7b50473afafefc9f100625fbb))
* [SWCS-1] adapt {{url}}/api/fights router for multi-participant battles with or without teams, remove console.log from router ([98cfee0](https://github.com/GermanBerdi/star-wars/commit/98cfee0d490ee7703be208219ff50544bdf3bf6c))
* [SWCS-1] adapt character-template interfaces and enums to new design ([e341df9](https://github.com/GermanBerdi/star-wars/commit/e341df9fd843ec4029640c5f15e6cf555a0ec081))
* [SWCS-1] adapt character-template service to new design and add remove method ([d34d5c2](https://github.com/GermanBerdi/star-wars/commit/d34d5c2909be4c9c09904d3d002c9cc6990b10ad))
* [SWCS-1] adapt create method in fight service, comment out getByIdPopulated and perform action related code until adapted ([613007f](https://github.com/GermanBerdi/star-wars/commit/613007f477f2153995e4afef78d0fdd7b537fa80))
* [SWCS-1] adapt fight interfaces to new design, comment out update interface, remove deprecated populate interface ([3c04b1d](https://github.com/GermanBerdi/star-wars/commit/3c04b1d03ea5adfc363a831345ff3a89c845ad4b))
* [SWCS-1] adapt fight tools to new multi-participant design, improve descriptions and error messages ([7bc2c76](https://github.com/GermanBerdi/star-wars/commit/7bc2c76c5bca80ce93b18c94e756b18851f48673))
* [SWCS-1] adapt get character template by ID tool to new design, improve descriptions and error messages ([db0297f](https://github.com/GermanBerdi/star-wars/commit/db0297f96d6d14ecf0d8d1bcb10130c85824e16e))
* [SWCS-1] adapt list characters tool to new design, improve descriptions and error messages ([5a86c0f](https://github.com/GermanBerdi/star-wars/commit/5a86c0f555e8f18cd13cabaf9f8f4f6c94f757b4))
* [SWCS-1] adapt repository to new character-template design and add remove operation ([cb3432d](https://github.com/GermanBerdi/star-wars/commit/cb3432df932c547950b8366769c45a0db06870e5))
* [SWCS-1] adapt update character template tool to new design, improve descriptions and error messages ([6eeb272](https://github.com/GermanBerdi/star-wars/commit/6eeb2728b0526bd463d045ead1a88ec57feb9171))
* [SWCS-1] Add initiative system with setParticipantsOrder service and endpoint ([3776a7e](https://github.com/GermanBerdi/star-wars/commit/3776a7eb99c5799a9feffc72be71a6dd6604f54f))
* [SWCS-1] add MCP tool for creating character templates ([ecdf938](https://github.com/GermanBerdi/star-wars/commit/ecdf938b002c6746d22aedb8c3042a089ae7b9de))
* [SWCS-1] add new tools to MCP server ([afce934](https://github.com/GermanBerdi/star-wars/commit/afce9349588d325b42329388eb1d49208ae8cd86))
* [SWCS-1] add participant tools for new multi-participant design, improve descriptions and error messages ([d512c5c](https://github.com/GermanBerdi/star-wars/commit/d512c5c7ea6a3f232bfc59acdd7d9887f40ec9d9))
* [SWCS-1] add remove character template tool, improve descriptions and error messages ([b618a09](https://github.com/GermanBerdi/star-wars/commit/b618a099a95f8ad8790ef784865cb4050cd4477f))
* [SWCS-1] Add rolls service with dice enum and roll functionality ([4cbba6e](https://github.com/GermanBerdi/star-wars/commit/4cbba6edf96eca7c4246d7de870fbd423e42cf88))
* [SWCS-1] comment out perform action tool until adapted to new design ([eb9eda3](https://github.com/GermanBerdi/star-wars/commit/eb9eda3f3d0648c19ce9ca85e56d1f695dc3938e))
* [SWCS-1] create participant service and interface ([33993e5](https://github.com/GermanBerdi/star-wars/commit/33993e50e3d695dca2df2b1d0d6bc4f7942a682f))
* [SWCS-1] implement {url}}/api/fights/:fightId/participants router to add and list fight participants ([3424e7f](https://github.com/GermanBerdi/star-wars/commit/3424e7f2d37023c0fe737f60adfee00da358c930))
* [SWCS-1] implement available_teams configuration in fight service create, update API and MCP ([5cf6b46](https://github.com/GermanBerdi/star-wars/commit/5cf6b4691f5e132db6450001112ea8f218924af7))
* [SWCS-1] implement fight update functionality in fight service, update API and MCP ([89878a6](https://github.com/GermanBerdi/star-wars/commit/89878a6f05a4447f8da8cc3cfa451ac534c2cbd7))
* [SWCS-1] implement participants repository ([6b33063](https://github.com/GermanBerdi/star-wars/commit/6b33063cabf05749ea1efcd2973a1cfdda44f9d9))
* [SWCS-1] modification of character domain to character template to address the new multiple fights paradigm ([3c15142](https://github.com/GermanBerdi/star-wars/commit/3c15142cae52f2ce84de6051cd680acc7fc64004))
* [SWCS-1] replace winnerId enum with participant ID, replace turn enum with turn number, add fightStatus for battle state tracking ([b337b6d](https://github.com/GermanBerdi/star-wars/commit/b337b6d2bae58bf19ef4abf148f41dfdb26fc021))
* [SWCS-1] temporarily comment out action interfaces and service ([2d5188e](https://github.com/GermanBerdi/star-wars/commit/2d5188e7f10934f05a233e4d9ad9d2a456e57e43))
* [SWCS-1] update HP field description with AD&D 2E based formula ([f691422](https://github.com/GermanBerdi/star-wars/commit/f69142202807eafae2175720a3db3673c830adc8))
* [SWCS-1] use new characterTemplate schema, remove console.log from router, implement delete endpoint, improve error messages with more precise HTTP codes ([1c9b1b8](https://github.com/GermanBerdi/star-wars/commit/1c9b1b8ef0a0724598d799dd919dd3f290cf5138))
* [SWCS-14] add armor types reading functionality with endpoint, service, repo and mcp-tool ([be00a32](https://github.com/GermanBerdi/star-wars/commit/be00a323a50a7e11657592c5361323669fc0dfee))
* [SWCS-18] add character classes endpoint with service and repository, move character-templates to character module for better organization ([c0a2c6d](https://github.com/GermanBerdi/star-wars/commit/c0a2c6d2bc705b3c13d86de4fb7d737037eb587d))
* [SWCS-18] add get /:id routes ([321ee12](https://github.com/GermanBerdi/star-wars/commit/321ee1253116d4d83e9cc4a02bcaaa6bfb7c1305))
* [SWCS-18] add getById and getByAbilityScore ([8141749](https://github.com/GermanBerdi/star-wars/commit/81417490d9e915c22674dc17bd459959699e64bf))
* [SWCS-18] add MCP tool integration for character classes listing ([353d46f](https://github.com/GermanBerdi/star-wars/commit/353d46fb7581c28fc3ab21744e79cea4f8d43026))
* [SWCS-18] add MCP tools for abilities strength, dexterity and constitution with detailed descriptions ([a88ff43](https://github.com/GermanBerdi/star-wars/commit/a88ff43e844a125f89fe614b98346ed8ca0ec0a9))
* [SWCS-18] add REST endpoints for strength, dexterity and constitution abilities with services and repositories ([b8c93c4](https://github.com/GermanBerdi/star-wars/commit/b8c93c40f7809ec0e70f6b8bb549b0022b3d1274))
* [SWCS-18] add thac0s router ([b2d061b](https://github.com/GermanBerdi/star-wars/commit/b2d061bb247453b0593ee5eeae6491fbc2139e17))
* [SWCS-18] improve create character route, add validateCreateCharacterTemplate ([28b2b74](https://github.com/GermanBerdi/star-wars/commit/28b2b74b7d67e262af975c0ae7975047ea8b09d3))
* [SWCS-18] refactor create ([43e36d4](https://github.com/GermanBerdi/star-wars/commit/43e36d440cf0ba2d0bb9586959bb72d7c1099205))
* [SWCS-19] group character-calculations and rolls-calculations ([19e5092](https://github.com/GermanBerdi/star-wars/commit/19e50921a3b7b2105ad2035bc55ceb2decfc3638))
* [SWCS-21] reroll abilities and update character template now work with the new desing ([3c769ea](https://github.com/GermanBerdi/star-wars/commit/3c769ea3bced3e2336eb100c61a510812bafd00e))
* [SWCS-23] add reroll hit dices endpoint for character templates ([4b0d0df](https://github.com/GermanBerdi/star-wars/commit/4b0d0df85e86d2eb0c840bba3d0ba8aa70e94618))


### Bug Fixes

* [main] add hasExcepcionalStrength ([5cba71f](https://github.com/GermanBerdi/star-wars/commit/5cba71f174f2e539dd521586d22ff48d984aed5d))
* [main] add restoreOrRollExceptionalStrength ([01028d1](https://github.com/GermanBerdi/star-wars/commit/01028d11d4e1b2884d6acf46ccbac109165a1f17))
* [main] added spacing between external library imports and internal imports ([7ade14c](https://github.com/GermanBerdi/star-wars/commit/7ade14ccd5b3374153d88773e686f97764e6f55f))
* [main] added Turn enum ([040d79e](https://github.com/GermanBerdi/star-wars/commit/040d79eaabbcb21b8f60a2d84934763783951f79))
* [main] corrected a spelling error ([2553b10](https://github.com/GermanBerdi/star-wars/commit/2553b1008f21e7d2bde6b1362cc3659d4b83858b))
* [main] getById checks if id doesn't exist ([dfa7f76](https://github.com/GermanBerdi/star-wars/commit/dfa7f76640f4e7056b12032e6d673be7feed9af0))
* [main] making opcional abilities to re-roll ([9308ddf](https://github.com/GermanBerdi/star-wars/commit/9308ddfe072b386d6dd121ecc38035a066091149))
* [main] moved ICombatant interface to actions-interface ([b14a93a](https://github.com/GermanBerdi/star-wars/commit/b14a93a4a7836813efc4038c841f2210d59dd4b9))
* [main] normalize get id from req.params ([21a1cdb](https://github.com/GermanBerdi/star-wars/commit/21a1cdbff4d3f1ff9280fd7377b049daf978ef0f))
* [main] refactor create character template tool ([69b6caf](https://github.com/GermanBerdi/star-wars/commit/69b6cafb8a72c72e0118a4b44fe1252668ce8e66))
* [main] registered getFightByIdTool in MCP server ([943a15d](https://github.com/GermanBerdi/star-wars/commit/943a15d82ab05195a444cadc9adcfa343dd7c0a0))
* [main] removed unused import ([c4d45f1](https://github.com/GermanBerdi/star-wars/commit/c4d45f1bb688e052e6d95ed8a306cc2a7b2d32b7))
* [main] rename field to character_name to avoid SQL reserved keywords ([2f4f836](https://github.com/GermanBerdi/star-wars/commit/2f4f83622bca5b1d5480e4d164317e7bd1274b82))
* [main] rename file name ([4f4cfa1](https://github.com/GermanBerdi/star-wars/commit/4f4cfa1d8f413aab9f30c0a40122eaa2145d1252))
* [main] reorder tools paths according to services ([a4e596b](https://github.com/GermanBerdi/star-wars/commit/a4e596b6b659b6e27ed8e681542ebe19405cb376))
* [main] tool name can't contain blank spaces ([d2a56d8](https://github.com/GermanBerdi/star-wars/commit/d2a56d8b8ddb52eb5fe1a23666ab14da57d5b889))
* [main] use ICharacterRowDataPacket interface from repository interfaces ([4547401](https://github.com/GermanBerdi/star-wars/commit/45474013ec1c034f068e258c9ef99150b643794b))
* [main] using "getting" instead of "fetching" to match the terminology between the tool and the endpoints ([41c2640](https://github.com/GermanBerdi/star-wars/commit/41c2640675d4437bbbf6afafe440f0fffdc48f86))
* [main] using "getting" instead of "fetching" to match the terminology used in the API ([a079f26](https://github.com/GermanBerdi/star-wars/commit/a079f26a2a3eb2c174a0f78a49524b9f7a056a7c))
* [SWCS-1] Add remove fight MCP tool ([b414536](https://github.com/GermanBerdi/star-wars/commit/b414536a7e26f70bda6041808d9331f9b51270a1))
* [SWCS-1] Add remove functionality to fights CRUD ([79bb3e9](https://github.com/GermanBerdi/star-wars/commit/79bb3e96ae7ce5128b1e4b885f6f6df76cd94502))
* [SWCS-1] add removeFightTool ([6349179](https://github.com/GermanBerdi/star-wars/commit/6349179bf811276a71e5b5146e8bb57fec3c3388))
* [SWCS-1] align update template schema with create template descriptions ([d2efc28](https://github.com/GermanBerdi/star-wars/commit/d2efc28d4bbb95ddc2bf002e8579f66021671d7d))
* [SWCS-1] comment out action code until adapted for multi-participant battles ([575785d](https://github.com/GermanBerdi/star-wars/commit/575785dfac447bb4570f2582c228737fd40ec075))
* [SWCS-1] grammar fix ([bcd35c7](https://github.com/GermanBerdi/star-wars/commit/bcd35c7777821a1b87910c1dfd8a7ddf5e58ab49))
* [SWCS-1] implement initiative tool using the method developed in fight service ([6173760](https://github.com/GermanBerdi/star-wars/commit/6173760d3dfcdc91c5a07aefb908613f15388d0e))
* [SWCS-1] Remove fight populated route - no longer needed ([8bc58e4](https://github.com/GermanBerdi/star-wars/commit/8bc58e41d31f15cb3a457f5779d15cc95427acf2))
* [SWCS-1] remove getByIdPopulated from old duel design, comment out updateFight until adapted for multi-participant design ([22595c8](https://github.com/GermanBerdi/star-wars/commit/22595c8fdc977ca297104070b3e66cf96814dc1e))
* [SWCS-1] remove interface from old 1v1 battle design ([17cee7f](https://github.com/GermanBerdi/star-wars/commit/17cee7fe3fd80e4ee2b367927f989361b2c83328))
* [SWCS-1] renaming characters to character-templates ([59eda70](https://github.com/GermanBerdi/star-wars/commit/59eda70c7e52644401e1802c165c227b92fd74c3))
* [SWCS-1] set internal Docker IP for database ([443eed5](https://github.com/GermanBerdi/star-wars/commit/443eed538f898590a658a5031c80fb72d73c6f64))
* [SWCS-14] update template tools to use armor class instead of 3-18 value range as defense ([82c59a6](https://github.com/GermanBerdi/star-wars/commit/82c59a6acd115000333a8b1d490dd2516ca6b76a))
* [SWCS-18] add getById ([b530f15](https://github.com/GermanBerdi/star-wars/commit/b530f150e484a76c4416a00c6abf89b3d5dd72b0))
* [SWCS-18] add getById ([420f55a](https://github.com/GermanBerdi/star-wars/commit/420f55a0b28639de2f70078d5b6edf1da89a882a))
* [SWCS-18] comment code until it's ready for the new design ([5818577](https://github.com/GermanBerdi/star-wars/commit/581857749d31767fa928c6f69dceaba3b98a81c1))
* [SWCS-18] fix message ([3c0bfc2](https://github.com/GermanBerdi/star-wars/commit/3c0bfc2651d6810ac4b2e943c714af97ce23cf20))
* [SWCS-18] implement thac0s router, service and repo ([f19e589](https://github.com/GermanBerdi/star-wars/commit/f19e5896c92d71d77f00ac2564b9b4936c928876))
* [SWCS-18] improve rolls service ([317e716](https://github.com/GermanBerdi/star-wars/commit/317e7164aad26a69818beb723803943d5f4cc899))
* [SWCS-18] minor fixes ([6f16f51](https://github.com/GermanBerdi/star-wars/commit/6f16f51e15a8c3611ab60627af720ded6b822fbc))
* [SWCS-18] using import types ([825dd94](https://github.com/GermanBerdi/star-wars/commit/825dd940ad8a170dcf0f01b6e3c88484ac630f09))
* [SWCS-19] group abilities service ([9ca7230](https://github.com/GermanBerdi/star-wars/commit/9ca72307e649e12d8688946ca548bdb467c4e2df))
* [SWCS-19] improve response status, use import type ([c4a3257](https://github.com/GermanBerdi/star-wars/commit/c4a3257c3e2386e75ac1ac8706e850c08f28b5fe))
* [SWCS-19] improve response status, use import type ([6087332](https://github.com/GermanBerdi/star-wars/commit/60873324f162e04b9dfc581ef426e140f97665a3))
* [SWCS-19] move router inside routes directory ([fbe4bee](https://github.com/GermanBerdi/star-wars/commit/fbe4beee5cc9dd3600337dde90756ecb0b3f4008))
* [SWCS-19] use import type ([c63900b](https://github.com/GermanBerdi/star-wars/commit/c63900b9e24b4224030e109079f1f24f1c496d86))
* [SWCS-19] use import type ([bd80786](https://github.com/GermanBerdi/star-wars/commit/bd807863ea5a82a5b7e5ddfd56211a4af5058b67))
* [SWCS-19] use import type ([132300b](https://github.com/GermanBerdi/star-wars/commit/132300b5f86726f7b92cb82fb759847ed9351c89))
* [SWCS-19] use import type ([8ecc65f](https://github.com/GermanBerdi/star-wars/commit/8ecc65f0a68be04b582a4bb7c90d8dfdaa6770ed))
* [SWCS-19] use import type ([52bbf72](https://github.com/GermanBerdi/star-wars/commit/52bbf7299a555eb051bf2825f6bf96208d4f09f8))
* [SWCS-19] use import type ([63908cc](https://github.com/GermanBerdi/star-wars/commit/63908cc402c762d376433e578a2db0ea9f3fc41c))
* [SWCS-19] use import type, using abilities-service ([dd2baab](https://github.com/GermanBerdi/star-wars/commit/dd2baab0973d0544f7fe018944c69fc0e36204a8))
* [SWCS-21] remove speed, add RerollAbilitiesReq ([396747b](https://github.com/GermanBerdi/star-wars/commit/396747b0fcc1194d192b7f3630eea3e44e99fd4c))
* [SWCS-21] remove speed, add RerollAbilitiesReq ([8eb8013](https://github.com/GermanBerdi/star-wars/commit/8eb801371844de54e7234d94a53acbace204e4f7))
* {main} rename field to character_name to avoid SQL reserved keywords ([2913ece](https://github.com/GermanBerdi/star-wars/commit/2913ece7a906708dd27be4f1aaee917619ee3f43))

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
