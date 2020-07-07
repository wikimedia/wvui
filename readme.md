# 🧩 Wikimedia Vue UI

Wikimedia Vue UI components. Wikimedia Foundation's Vue.js shared user-interface components for
Wikipedia, MediaWiki, and beyond. See **[quick start](#quick-start)** to contribute.

## Table of contents

<!--
    Markdown Preview Enhanced is used to automatically generate the table of contents. You don't
    have to use it but please leave these directives for those who choose to. It helps keeps the
    table of contents in sync.
-->
<!-- prettier-ignore-start -->
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

- [Table of contents](#table-of-contents)
- [Installation and version history](#installation-and-version-history)
- [Development](#development)
  - [Quick start](#quick-start)
  - [NPM scripts](#npm-scripts)
  - [Conventions](#conventions)
    - [Vue.js](#vuejs)
    - [Less](#less)
    - [TypeScript](#typescript)
  - [Storybook workflow](#storybook-workflow)
  - [Testing](#testing)
    - [Unit tests](#unit-tests)
      - [Coverage](#coverage)
  - [Integrated development workflow](#integrated-development-workflow)
  - [Changing dependencies](#changing-dependencies)
  - [Versioning](#versioning)
  - [Editor and IDE support](#editor-and-ide-support)
    - [Visual Studio Code](#visual-studio-code)
      - [Recommended extensions](#recommended-extensions)
  - [Git strategy](#git-strategy)
    - [Author guidelines](#author-guidelines)
    - [Reviewer guidelines](#reviewer-guidelines)
  - [Known issues](#known-issues)
  - [Compatibility](#compatibility)
    - [JavaScript](#javascript)
    - [Less](#less-1)
- [Performance](#performance)
  - [Bundle size](#bundle-size)
    - [bundlesize configuration](#bundlesize-configuration)
- [Library design goals](#library-design-goals)

<!-- /code_chunk_output -->
<!-- prettier-ignore-end -->

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
    "…": "…",
    "@wikimedia/wvui": "1.2.3",
    "…": "…"
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

### Different builds

There is currently one bundle available:

-   **Combined**: the complete library. This bundle is the simplest to use because it contains all
    code but is not performant if only part is used or if different parts should be loaded at
    different times. ⚠️ This chunk is standalone and should not be loaded with split chunks.

        	- **wvui**.js/css: the complete library and default export. No other chunks required.

Each chunk is side-effect free. All chunks are fully compiled ES5 / CSS and require a Vue.js
runtime. See [peerDependencies](package.json).

See the [performance section](#performance) for related topics.

## Development

### Quick start

```bash
npm i
npm start
```

### NPM scripts

-   `install` / `i`: install project dependencies.
-   `start`: run Storybook [development](#development) flow.
-   `test` / `t`: run different types of tests including unit tests. See [testing](#testing).
-   `run test:unit`: run the unit tests. Pass `-u` to update all Jest snapshots.
-   `run format`: apply lint fixes automatically where available.
-   `version`: increment the version and publish a new release. See [versioning](#versioning).

Scripts containing `:` delimiters in their names are sub-scripts. They are invoked by the outermost
delimited name (and possibly other scripts). For example, `test:unit` is executed by `test`.

Undocumented scripts are considered internal utilities and not expressly supported workflows.

💡 Tips:

-   Add `--` to pass arguments to the script command. For example, `npm run test:unit -- -u`.
-   Add `-s` to omit verbose command echoing. For example, `npm -s i` or `npm -s run format`.

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

The [Vue.js Style Guide](https://vuejs.org/v2/style-guide) is adhered to where possible.

#### Less

[BEM](http://getbem.com) naming conventions are adhered to where possible.

#### TypeScript

-   All top-level file symbols should be fully typed. Seams should not have their types inferred
    because they are most likely to have subtle flaws.
-   All named functions and methods should have inputs and output typed. When functions are fully
    typed, their contents usually can be inferred.
-   Favor type inference for locals rather than explicit typing. Locals are unlikely to have
    incorrect typing assumptions and the verbosity of typing is usually a hindrance.
-   Use TypeScript typing where available, JSDoc typing where not. Avoid typing both as this is
    verbose and the docs may be incorrect.

### Storybook workflow

As the primary development flow WVUI uses
[Storybook](https://storybook.js.org/docs/guides/guide-vue/) which allows developing UI components
in isolation without worrying about  
specific dependencies and requirements. Storybook uses so called
[stories](https://storybook.js.org/docs/basics/writing-stories/). For each SFC (single file
component) its story should be placed in the same directory:

```
|-- src
    |-- components
        |-- your-component
            |-- YourComponent.vue
            |-- YourComponent.stories.ts
```

Each story represents a single visual state of a component.

WVUI uses different Storybook [addons](https://storybook.js.org/addons/), namely:

-   [Knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs) that allows you to
    edit component props dynamically.
-   [Actions](https://github.com/storybookjs/storybook/tree/master/addons/actions) to retrieve data
    from event handlers.
-   [a11y](https://github.com/storybookjs/storybook/tree/master/addons/a11y) to analyze
    accessibility issues.
-   [links](https://github.com/storybookjs/storybook/tree/master/addons/links) which allows a
    developer to create links that navigate between different stories.
-   [backgrounds](https://github.com/storybookjs/storybook/tree/master/addons/backgrounds) to change
    background colors inside the preview
-   [viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport) to display UI
    components in different sizes and layouts
-   [storysource](https://github.com/storybookjs/storybook/tree/master/addons/storysource) to show
    story source in Storybook.

To start developing with Storybook, simply run `npm start` command (see
[NPM scripts](#npm-scripts)). This command will open Storybook in your browser.

### Testing

To run tests, use `npm test` command (see [NPM scripts](#npm-scripts)).

#### Unit tests

-   WVUI uses [Vue Test Utils](https://vue-test-utils.vuejs.org/), the official unit testing utility
    library for Vue.js.
-   WVUI uses [Jest](https://jestjs.io) as a test runner.
-   Tests for every component should be colocated with the component itself:

```
|-- src
    |-- components
        |-- your-component
            |-- YourComponent.vue
            |-- YourComponent.test.ts
```

-   WVUI uses [snapshot testing](https://jestjs.io/docs/en/snapshot-testing), snapshot files are
    colocated with components as well:

```
|-- src
    |-- components
        |-- your-component
            |-- YourComponent.vue      <-- Functional code and test subject
            |-- YourComponent.test.ts  <-- Unit tests
            |-- YourComponent.snap.ts  <-- Jest snapshot rendered component HTML
```

##### Coverage

Coverage reports are generated automatically in the [docs/coverage] directory whenever unit tests
are executed.

Coverage thresholds are configured under [.jest/jest.config.json]. These are lower limits for the
entire repo and, as a convention, the number is rounded down to the nearest 10%. For example, if the
actual repository coverage is 89%, the threshold is configured to 80%. See [Jest documentation] for
details.

⚠️ `./src/entries/*.ts` is excluded from the coverage report and expected to be side-effect free.

[docs/coverage]: docs/coverage
[.jest/jest.config.json]: .jest/jest.config.json
[jest documentation]: https://jestjs.io/docs/en/configuration.html#coveragethreshold-object

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

### Changing dependencies

-   Always configure your environment with NVM _prior_ to un/installing dependencies as these
    operations modify the NPM lockfile. See [NPM scripts](#npm-scripts) for example usage.
-   Obviously, carefully consider any proposed new dependencies. Runtime dependencies that increase
    the bandwidth consumption should be given especial care and implicit dependencies should be
    avoided.
-   When adding or revising NPM dependencies, pin `dependencies` and `devDependencies` to exact
    patch versions for the same reasons pinning WVUI itself to patch version is recommended. See
    [Installation and version history](#installation-and-version-history) for details.
-   Dependencies are not transpiled and must be ES5. Additionally, dependencies must only use
    supported browser APIs.

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

-   Uncommitted changes (both modifications and untracked files) are forbidden.
-   Only clean and tested packages are published.
-   Git tags are available for all releases.
-   Git tags pushed and NPM artifacts publishes are always in sync.

See also:

-   [NPM scripts](https://docs.npmjs.com/misc/scripts)
-   [NPM version](https://docs.npmjs.com/cli/version)
</details>

### Editor and IDE support

Great workflows often require great tooling and those tools need to be configured. This section
describes how to optimize your editor or IDE for optimal usage.

#### Visual Studio Code

-   Configure your line length to 100. For example, add common widths:
    `"editor.rulers": [ 80, 100 ]`.

##### Recommended extensions

-   [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Enable
    `vetur.experimental.templateInterpolationService` for HTML template type checking in single file
    components.
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) -
    Lower the logging level to informational by setting `cSpell.logLevel` to `"Information"`.
-   [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

### Git strategy

-   Authors should revise the changelog each commit so this work is not postponed to release.
-   WVUI uses a "squash-and-merge" convention for changes.<sup>[0](#squash-and-merge)</sup>
-   Operating system and editor-specific files are not considered.<sup>[1](#git-ignore)</sup>
-   The Git configuration should be precise and accurate like any other part of the codebase. The
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

1. Add a global exclusions file by executing `git config --global core.excludesfile '~/.gitignore'`
   or updating your `~/.gitconfig` manually:

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

-   Write your best work.
-   Functional changes compile, run, and pass tests.
-   Established patterns at least within the WVUI repository are considered.
-   Any submitted change is an overall improvement. The rationale is that if a patch is an overall
    improvement, it's obvious to merge. If it's not, why should should it be merged?
-   Smaller patches get better reviews.

#### Reviewer guidelines

-   The goal of code review is to help write great code, not only prevent bad code from being
    written. The distinction is that the former is helping to achieve whereas the latter is focused
    on prevention. Nourishing good ideas is better than extinguishing formative ideas.
-   Be specific when providing constructive feedback. Vague concerns, such as "there are many
    reasons" or "it's more nuanced than that," prevent further discussion and create invisible
    barriers to participation that cannot be overcome. Make your point and allow the author to
    address it. When possible, suggest an approach or reference with your request. The more clearly
    you express the changes you want, the easier it will be for the author to provide.
-   If you as a reviewer are making requests of the author, attempt to match their level of effort
    and timeliness. Everyone is busy and doing their best but differently abled.
-   Be open-minded. New ideas, especially standard ideas that are only new to you, are not
    inherently bad. It's ok to downvote to request improved documentation or clarification but not
    for an education in industry standard practice. You are responsible in part for creating the
    culture you want.

### Known issues

-   `Vue.extend()` is used for the type inference of components. This is anticipated to be replaced
    by `defineComponent()` in the Vue _v3_ Composition API.
-   [Storybook is incompatible with Vue Devtools]. Tap "Open canvas in a new tab" as a workaround.
-   "Download the React DevTools…" is printed to the browser console
    [when running Storybook](https://github.com/storybookjs/storybook/issues/4853).
-   If Storybook encounters an error when booting, it does not launch even after the error is
    resolved.
-   JavaScript configuration files are not type checked when building the library. This seems to be
    because Webpack shakes out dead code. All types can be tested manually via
    `npx tsc --noEmit --incremental false`.

[storybook is incompatible with vue devtools]:
	https://github.com/storybookjs/storybook/issues/1708#issuecomment-630262553

### Compatibility

WVUI uses [Browserslist] to help support and enforce browser compatibility. Supported targets are
configured in [.browserslistsrc](.browserslistsrc) according to [MediaWiki grade A compatibility].
To see the current list, execute `npx browserslist`.

[browserslist]: https://github.com/browserslist/browserslist
[mediawiki grade a compatibility]:
	https://www.mediawiki.org/wiki/Compatibility#Browser_support_matrix

#### JavaScript

JavaScript build products are linted for ES5 compatibility.

#### Less

Less inputs are linted for compatibility and automatically prefixed for browser vendors according to
the Browserslist config via the [PostCSS][autoprefixer] plugin. The current configuration only adds
vendor prefixes like `-webkit-transition:all 1s; transition:all 1s`, _not_ polyfills. `#rgba` color
syntax, like `#0000` for `transparent`, are also replaced as needed by cssnano. The prefixes used
can be seen by executing `npx autoprefixer --info`.

[postcss]: https://github.com/postcss/postcss
[autoprefixer]: https://github.com/postcss/autoprefixer
[cssnano]: https://cssnano.co

## Performance

### Bundle composition and source maps

The contents of each bundle generated can be evaluated through its source map. [source-map-explorer]
and [Webpack Bundle Analyzer] are used to generate reports for minified and minified + gzipped
bundle breakdowns. The reports are similar but crosschecking may be useful.

[source-map-explorer]: https://github.com/danvk/source-map-explorer
[webpack bundle analyzer]: https://github.com/webpack-contrib/webpack-bundle-analyzer
[docs/sourcemaps]: docs/sourceMaps

### Bundle size

WVUI uses Webpack for bundling different library entry points into distinct build products or
"bundles". All JavaScript and CSS build product bandwidth performances are tracked and tested with
[bundlesize] and versioned in [bundlesize.config.json]. Reports are generated under
[docs/minGzipBundleSize.txt].

The rule of thumb is: identical data generally compresses well. It is recommended to evaluate
performance using the minified gzipped outputs. For example, some CSS selectors are distant but have
identical rules. This creates a large uncompressed CSS bundle when compiled. However, the compressed
size may be negligible. Use the bundlesize tests to evaluate gzipped sizes before making
optimizations that impede readability.

<details markdown>
<summary>Expand for manual evaluation details…</summary>

If a second opinion is wanted, consider using the gzip CLI:

```bash
# Individual chunk sizes (min / min+gz).
ls -1 dist/*.{js,css}|
sort|
while IFS= read filename; do
	printf \
		'%s: %sB / %sB\n' \
		"$filename" \
		"$(wc -c < "$filename"|numfmt --to=iec-i)" \
		"$(gzip -c "$filename"|wc -c|numfmt --to=iec-i)"
done

# All chunks concatenated (allows maximum possible compression). This makes sense if a request to
# ResourceLoader will depend on multiple chunks.
printf \
	'%s: %sB / %sB\n' \
	"Total" \
	"$(cat dist/*.{js,css}|wc -c|numfmt --to=iec-i)" \
	"$(cat dist/*.{js,css}|gzip -c|wc -c|numfmt --to=iec-i)"
```

</details>

[docs/mingzipbundlesize.txt]: docs/minGzipBundleSize.txt
[bundlesize]: https://github.com/siddharthkp/bundlesize
[bundlesize.config.json]: bundlesize.config.json

#### bundlesize configuration

When changing the [bundlesize configuration](bundlesize.config.json):

-   The values in the configuration are upper limits. As a convention, the number is rounded up to
    the nearest tenth of a kibibyte. For example, a new file added of size `4.15 KB` would have its
    initial limit set at `4.2 KB`. Whenever intentional changes causes its limit to increase or
    decrease beyond a tenth of a kibibyte boundary, the size should be revised.
-   bundlesize internally uses Bytes utility which [only supports base-2 units]. Case-insensitive
    decimal [JEDEC notation] is used in the config. This means 1.5 KB or 1.5 kb is 1536 bytes, _not_
    1500 bytes.
-   ⚠️ Warning: values that cannot be parsed are _silently ignored_! When making changes, verify
    that a comparison of two values is printed like `2.54KB < maxSize 2.6KB (gzip)`. If only one
    number is shown (e.g., `2.54KB (gzip)`), the number has been entered incorrectly.
-   ⚠️ Warning: values entered must have a leading units position specified. Sub-one sizes like
    `.5 KB` must be written with a leading zero like `0.5 KB` or they will not be pared.
-   The bundlesize thresholds specify minified gzipped maximums. Outputs are minified as part of the
    build process and gzip is the most common HTTP compression.

[jedec notation]: https://en.wikipedia.org/wiki/Template:Quantities_of_bytes
[only supports base-2 units]:
	https://github.com/visionmedia/bytes.js#bytesparsestringnumber-value-numbernull

## Library design goals

-   Deploy search to all test wikis before August 31, 2020: frwiktionary, hewiki, ptwikiversity,
    frwiki, euwiki, fawiki.
-   Relevant, modern, efficient, iterative contributor workflows.
-   Delightful user experiences shareable as an NPM package and reusable everywhere with and without
    MediaWiki.
-   Fully typed. Accurate typing improves comprehension for tooling and programmers.
-   [Semantically versioned](https://semver.org).
-   Thoroughly documented for development and usage; everything needed to be productive is in the
    readme.
-   Well tested and robust.
