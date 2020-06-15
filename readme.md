# 🧩 Wikimedia Vue UI

Vue.js user interface component library prototype for MediaWiki's Vector skin.

## Table of contents

<!--
  Markdown Preview Enhanced is used to automatically generate the table of contents. You don't
  have to use it but please leave these directives for those who choose to. It helps keeps the
  table of contents in sync.
-->
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Development](#development)
  - [Quick start](#quick-start)
  - [NPM scripts](#npm-scripts)
  - [Conventions](#conventions)
    - [Vue.js](#vuejs)
    - [TypeScript](#typescript)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)
  - [Integrated development workflow](#integrated-development-workflow)
  - [Versioning](#versioning)
  - [Editor and IDE support](#editor-and-ide-support)
    - [Visual Studio Code](#visual-studio-code)
      - [Recommended extensions](#recommended-extensions)
  - [Git strategy](#git-strategy)
    - [Author guidelines](#author-guidelines)
    - [Reviewer guidelines](#reviewer-guidelines)
- [Library design goals](#library-design-goals)

<!-- /code_chunk_output -->

## Installation and version history

Install the library and Vue.js v2:

```bash
npm i --save-prefix= vue@2 @wikimedia/wvui
```

WVUI is [semantically versioned](https://semver.org). See the [changelog](changelog.md) for release
notes.

We recommend pinning WVUI to an exact patch version. For example:

```json
  …,
  "dependencies": {
    …,
    "@wikimedia/wvui": "1.2.3",
    …
  }
  …,
```

<details>
<summary>Expand for details…</summary>

WVUI is semantically versioned but bugs occasionally slip through. They're easier for consumers to
identify when upgrades are tracked deliberately via package.json. If
[semver ranges](https://docs.npmjs.com/misc/semver) are used instead, like `"^1.2.3"`, only the
verbose and noisy package-lock.json will change on an upgrade which may go unnoticed. Additionally,
new features are easier to consider and socialize at upgrade time when minor / major version
upgrades are intentional and reflected in package.json.

The recommendation to use exact patch versions like `"1.2.3"` may seem pedantic but if a project
specifies dependencies with looser versioning instead, that project will be at the mercy of its
dependencies instead of in control of them.

</details>

## Development

### Quick start

```bash
npm i
```

### NPM scripts

- `install` / `i`: install project dependencies.
- `test` / `t`: run different types of tests including unit tests. See [testing](#testing).
- `run format`: apply lint fixes automatically where available.
- `version`: increment the version and publish a new release. See [versioning](#versioning).

💡 Tip: add `-s` to omit verbose command echoing. E.g., `npm -s i` or `npm -s run format`.

Undocumented scripts are considered internal utilities and not expressly supported workflows.

<details markdown>
<summary><a href="http://nvm.sh">NVM</a> is recommended to configure the Node.js version used
whenever executing these scripts. Expand for example…</summary>

```bash
# Install the project's recommended Node.js version. This is a one-time installation command and
# does not need to be run again except when the project's .nvmrc is revised. `nvm use` will print an
# error message if this command needs to be run again.
nvm install "$(<.nvmrc)"

# Configure the current shell's environment to use the recommended Node.js version. This command
# should be run whenever opening a new shell to work on the project _prior_ to executing any of the
# project's NPM scripts, especially `npm install`.
nvm use

# Install the project's development and production dependencies. This is a one-time installation
# command and does not need to be run again except when the project's package.json `dependencies` or
# `devDependencies` are revised.
npm install

# All dependencies are now available. Execute any project scripts as wanted.
```

</details>

### Conventions

#### Vue.js

The [Vue.js Style Guide] is adhered to where possible.

[vue.js style guide]: https://vuejs.org/v2/style-guide

#### TypeScript

- All top-level file symbols should be fully typed. Seams should not have their types inferred
  because they are most likely to have subtle flaws.
- All named functions and methods should have inputs and output typed. When functions are fully
  typed, their contents usually can be inferred.
- Favor type inference for locals rather than explicit typing. Locals are unlikely to have incorrect
  typing assumptions and the verbosity of typing is usually a hindrance.
- Use TypeScript typing where available, JSDocs where not.

### Testing

#### Unit Tests

- WVUI uses [Vue Test Utils](https://vue-test-utils.vuejs.org/),
  the official unit testing utility library for Vue.js.
- WVUI uses [Jest](https://jestjs.io) as a test runner.
- Tests for every component should be colocated with the component itself:

```
|-- src
    |-- components
        |-- your-component
            |-- YourComponent.vue
            |-- YourComponent.test.ts
```

- WVUI uses [snapshot testing](https://jestjs.io/docs/en/snapshot-testing),
  snapshot files are colocated with components as well:

```
|-- src
    |-- components
        |-- your-component
            |-- YourComponent.vue
            |-- YourComponent.test.ts
            |-- YourComponent.snap.ts
```

- Coverage report will be created automatically in `coverage` directory.

To run tests, use `npm test` command (see [NPM scripts](#npm-scripts)).

### Integrated development workflow

_Example: I want to see my local WVUI library changes live in my app or MediaWiki skin._

Package linking is the primary _integrated_ development workflow for use when isolated development
is impractical. Tight coupling of WVUI to a specific implementation is strongly discouraged.
Nevertheless, it is often the case that changes tested live in the context of a particular use case
are wanted prior to publishing. For example, perhaps a bug only manifests easily in one target.

The steps are:

1. Clone the WVUI repository if you haven't already.
2. Enter the WVUI directory.
3. Install the WVUI dependencies if you haven't already (see [NPM scripts](#npm-scripts)).
4. Note WVUI's directory. For example, `wvuiDir="$PWD"`.
5. Enter your integration project's directory. For example, if you are integrating WVUI into Vector,
   the command might be `cd ~/dev/mediawiki/skins/Vector`. This location should contain a
   package.json with a `@wikimedia/wvui` dependency (either `dependency`, `devDependency`, or
   `peerDependency`).
6. Symbolically link the development WVUI into the integration project via `npm link "$wvuiDir"`
   where `$wvuiDir` is the location of WVUI. This swaps the published production WVUI library for a
   link to your local development copy.
7. Verify the link is correct by seeing where that it resolves to WVUI's location. For example,
   `readlink -m node_modules/@wikimedia/wvui` should match `$wvuiDir`.
8. Perform all development and iteration wanted in WVUI and integration project.
9. Unlink the development WVUI via `npm unlink @wikimedia/wvui`. This deletes the _symlink_ to your
   development copy of WVUI.

The above process seems a little clumsy because it is initially. However, it's quite practical and
becomes easy with practice.

### Versioning

To publish a new release:

1. Update the [changelog](changelog.md) with release notes.
2. Commit the changelog.
3. Execute `npm version <patch|minor|major>`.

<details markdown>
<summary>Expand for example…</summary>

```bash
# Review the changes since the last release. For example,
# `git log "$(git describe --tags --abbrev=0)..@" --oneline`.

# Document a new feature and a couple bug fixes since the last release. (Emacs can also be used to
# edit the changelog.)
vim changelog.md

# Stage the changelog.
git add changelog.md

# Commit the changelog.
git commit -m '[docs][changelog] prepare release notes'

# Attempt a complete release.
npm version minor
```

</details>

<details markdown>
<summary>The NPM scripts are configured to help ensure that only tested artifacts are published on
Git and npmjs.com. Expand for details…</summary>

By executing `npm version`, the following scripts are invoked in this order:

1. `preversion`: test that the workspace contains no uncommitted changes.
2. **`version`**: increment the version, clean, build, and test the candidate, commit, and tag the
   change.
3. `postversion`: call `publish`.
4. `prepublishOnly`: push the Git tag to the remote.
5. **`publish`**: push the artifacts to npmjs.com as per usual.

In detail, `version` is a built-in NPM script that increases the package.json's `version` property
(`patch`, `minor`, or `major`) as specified, commits the result to version control, and adds a Git
tag. Prior to committing the version bump, clean, build, and test the candidate artifact. See
`npm help version` for further details.

The `preversion` NPM script, which runs prior to `version`, is defined to test that Git's version
control state is clean before that happens. No uncommitted changes are allowed! For example, imagine
if a superfluous file containing a password was unintentionally in the workspace and published to
npmjs.com.

The `postversion` NPM script, which runs after `version`, simply enforces that the `publish` NPM
script is called.

Before `publish` is executed, `prepublishOnly` pushes the current commit and tag to the Git remote.
If the push or publish fail due to connectivity, you should probably call `npm publish` directly
which will re-push the tag and archive as needed.

Finally, the `publish` script is executed which releases the raw files built into the wild at the
[npm registry](https://www.npmjs.com). See `npm help publish` for further details.

The intended result is:

- Uncommitted changes (both modifications and untracked files) are forbidden.
- Only clean and tested packages are published.
- Git tags are available for all releases.
- Git tags pushed and NPM artifacts publishes are always in sync.

See also:

- [NPM scripts](https://docs.npmjs.com/misc/scripts)
- [NPM version](https://docs.npmjs.com/cli/version)
</details>

### Editor and IDE support

Great workflows often require great tooling and those tools need to be configured. This section
describes how to optimize your editor or IDE for optimal usage.

#### Visual Studio Code

- Configure your line length to 100. For example, add common widths: `"editor.rulers": [ 80, 100 ]`.

##### Recommended extensions

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Enable `vetur.experimental.templateInterpolationService` for HTML template type checking in
  single file components.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Lower the logging level to informational by setting `cSpell.logLevel` to `"Information"`.
- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

### Git strategy

- Authors should revise the changelog each commit so this work is not postponed to release.
- WVUI uses a "squash-and-merge" convention for changes.<sup>[0](#squash-and-merge)</sup>
- Operating system and editor-specific files are not considered.<sup>[1](#git-ignore)</sup>
- The Git configuration should be precise and accurate like any other part of the codebase. The
  .gitignore file, for instance, should not become cluttered or vague.

<details markdown>
<summary><sup><a name="squash-and-merge">0</a></sup>Expand for details on squash-and-merge…</summary>

Development of a change worth merging is often messy. A merge-worthy change usually occurs over
multiple patchsets in a Gerrit patch or commits in a GitHub pull request. These interim changes can
often be quite noisy in themselves and not useful or even detrimental to preserve distinctly in the
Git log. Example improvements during review often include whitespace changes, bug fixes, refactoring
of introduced code, and renaming of new symbols.

Therefor, distinct interim commits are collapsed into a single logical commit at merge time that
often satisfies the intent of the original commit. The tradeoffs are that only a single polished
commit representative of all of that back-and-forth discourse during code review is made at the
expense that less noteworthy history is lost.

</details>

<details markdown>
<summary><sup><a name="git-ignore">1</a></sup>Expand for details on OS and editor-specific files…</summary>

Different programmers use different editors and IDEs. WVUI will attempt to facilitate different
workflows, especially in the form of documentation, but will avoid making changes specific to them
such as ignoring Vim swap files.

OS-specific files such as [.DS_Store](https://wikipedia.org/wiki/.DS_Store) and
[Thumbs.db](https://wikipedia.org/wiki/Windows_thumbnail_cache) should be excluded by the user's
global Git configuration as they're unwanted in every repository and not specific to WVUI. See
[gitignore documentation](https://git-scm.com/docs/gitignore) for details.

_Example:_

1. Add a global exclusions file by executing
   `git config --global core.excludesfile '~/.gitignore'` or updating your `~/.gitconfig` manually:

```gitconfig
excludesfile = ~/.gitignore
```

2. Always ignore `.DS_Store` files by executing `echo .DS_Store >> ~/.gitignore` or updating your
   `~/.gitignore` manually:

```gitignore
.DS_Store
```

</details>

#### Author guidelines

The expectations for submitting a patch are:

- Write your best work.
- Functional changes compile, run, and pass tests.
- Established patterns at least within the WVUI repository are considered.
- Any submitted change is an overall improvement. The rationale is that if a patch is an overall
  improvement, it's obvious to merge. If it's not, why should should it be merged?
- Smaller patches get better reviews.

#### Reviewer guidelines

- The goal of code review is to help write great code, not only prevent bad code from being written.
  The distinction is that the former is helping to achieve whereas the latter is focused on
  prevention. Nourishing good ideas is better than extinguishing formative ideas.
- Be specific when providing constructive feedback. Vague concerns, such as "there are many reasons"
  or "it's more nuanced than that," prevent further discussion and create invisible barriers to
  participation that cannot be overcome. Make your point and allow the author to address it.
- If you as a reviewer are making requests of the author, attempt to match their level of effort and
  timeliness. Everyone is busy and doing their best but differently abled.
- Be open-minded. New ideas, especially standard ideas that are only new to you, are not inherently
  bad. You are responsible in part for creating the culture you want.

## Library design goals

- Deploy search to all test wikis before August 31, 2020: frwiktionary, hewiki, ptwikiversity,
  frwiki, euwiki, fawiki.
- Relevant, modern, efficient, iterative contributor workflows.
- Delightful user experiences shareable as an NPM package and reusable everywhere with and without
  MediaWiki.
- Fully typed. Accurate typing improves comprehension for tooling and programmers.
- [Semantically versioned](https://semver.org).
- Thoroughly documented for development and usage; everything needed to be productive is in the
  readme.
- Well tested and robust.
