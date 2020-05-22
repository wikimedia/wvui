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
- [Development](#development)
  - [Quick start](#quick-start)
  - [NPM scripts](#npm-scripts)

<!-- /code_chunk_output -->

## Usage

## Development

### Quick start

```bash
npm i
```

### NPM scripts

- `install` / `i`: install project dependencies. 

<details markdown>
<summary>
<a href="http://nvm.sh">NVM</a> is recommended to configure the Node.js version used whenever executing these scripts. For example…
</summary>

```bash
# Install the project's recommended Node.js version. This is a one-time installation command and
# does not need to be run again except when the project's .nvmrc is revised. `nvm use` will print an
# error message if this command needs to be run again.
nvm install $(<.nvmrc)

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
