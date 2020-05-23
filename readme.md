# 🧩 @wikimedia/mw-vue-components

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
- [Usage](#usage)
- [Version history](#version-history)
- [Development](#development)
  - [Quick start](#quick-start)
  - [NPM scripts](#npm-scripts)
  - [Versioning](#versioning)
- [Library design goals](#library-design-goals)

<!-- /code_chunk_output -->

## Usage

## Version history

This library is [semantically versioned](https://semver.org). See the [changelog](changelog.md) for
release notes.

## Development

### Quick start

```bash
npm i
```

### NPM scripts

- `install` / `i`: install project dependencies. 
- `version`: increment the version and publish a new release. See [versioning](#versioning).

Undocumented scripts are considered internal utilities and not expressly supported workflows.

<details markdown>
<summary>
<a href="http://nvm.sh">NVM</a> is recommended to configure the Node.js version used whenever executing these scripts. Expand for example…
</summary>

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
<summary>
The NPM scripts are configured to help ensure that only tested artifacts are published on Git and
npmjs.com. Expand for details…
</summary>

By executing `npm version`, the following scripts are invoked in this order:
1. `preversion`: test that the workspace contains no uncommitted changes.
2. **`version`**: increment the version, clean, build, and test the candidate, commit, and tag the
	change.
3. `postversion`: call `publish`.
4. `prepublishOnly`: push the Git tag to the remote.
5. **`publish`**: push the artifacts to npmjs.com as per usual.

In detail, `version` is a built-in NPM script that increases the package.json's `version` property
(`patch`, `minor`, or `major`) as specified, commits the result to version control, and adds a Git
tag. Prior to committing the version bump, clean, build, and test the candidate artifact.  See
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

## Library design goals

- Deploy search to all test wikis before August 31, 2020: frwiktionary, hewiki, ptwikiversity,
	frwiki, euwiki, fawiki.
- Relevant, modern, efficient, iterative contributor workflows.
- Delightful user experiences shareable as an NPM package and reusable everywhere with and without
	MediaWiki.
- [Semantically versioned](https://semver.org).
