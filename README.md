# 📘 Sample of Collboard module with the tool, art _(object on the board)_, and attributes

Simple sample module for [Collboard.com](https://collboard.com/) created via [@collboard/modules-sdk](https://www.npmjs.com/package/@collboard/modules-sdk).

[![Use this template](https://raw.githubusercontent.com/collboard/docs/main/buttons/use-this-template.button.png)](https://github.com/collboard/module-sample-objects/generate)
[![License](https://img.shields.io/github/license/collboard/module-sample-objects.svg?style=flat)](https://raw.githubusercontent.com/collboard/module-sample-objects/master/LICENSE)
[![Test](https://github.com/collboard/module-sample-objects/actions/workflows/test.yml/badge.svg)](https://github.com/collboard/module-sample-objects/actions/workflows/test.yml)
[![Lint](https://github.com/collboard/module-sample-objects/actions/workflows/lint.yml/badge.svg)](https://github.com/collboard/module-sample-objects/actions/workflows/lint.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/collboard/module-sample-objects/badge.svg)](https://snyk.io/test/github/collboard/module-sample-objects)
[![Issues](https://img.shields.io/github/issues/collboard/module-sample-objects.svg?style=flat)](https://github.com/collboard/module-sample-objects/issues)

## How to create your first module from this template

1. **Clone** this repository
2. **Install** NPM dependencies
3. Change `@collboard/module-sample-objects` to your module name and scope
4. Start developing!

```bash
npm start
```

5. _(optional)_ **Install** [recommended VSCode extensions](./.vscode/extensions.json)
6. _(optional)_ Add `collboard-module` topic tag to your module repository details

_Note: Look at all of our [templates](https://github.com/topics/collboard-module-template) and [miscellaneous Collboard modules on GitHub](https://github.com/topics/collboard-module) to pick best fit for your project._

_Note: You can also [start from scratch](https://github.com/collboard/modules-sdk#how-to-develop-your-first-module) instead of using this template._

## Publishing the module

To compile, pack and send the module to Collboard module store server run:

```bash
colldev publish --token YOUR_TOKEN
```

_Tip: In this template, there is [automated GitHub workflow](./.github/workflows/publish.yml) to publish after a new version automatically._
