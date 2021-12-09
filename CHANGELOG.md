# Changelog

Versions and bullets are arranged contextually chronologically from latest to oldest. Breaking
changes are listed on top, and marked with "BREAKING CHANGE".

## v0.3.4 / 2021-12-09

-   TypeaheadSearch: Avoid use of `.native` event binding (Roan Kattouw)

## v0.3.3 / 2021-11-19

-   [build] Externalize the Vue composition API plugin (Roan Kattouw)
-   [typeahead-search][input] Remove "dir=auto" attribute from TypeaheadSearch and Input components
    (Nicholas Ray)

## v0.3.2 / 2021-11-01

-   [icons] Optimize 'search' icon path (Volker E.)
-   [build] Update stylelint-config-wikimedia to 0.11.1 (Alexander Vorwerk)
-   [typeahead-search] Remove unnecessary slotProp from the default slot (bwang)
-   [typeahead-search] Replace footerSearchText prop with scoped slot to better support translations
    (bwang)

## v0.3.1 / 2021-09-28

-   [docs] Add WVUI deprecation note (Volker E.)
-   [typeahead-search] Replace vars with more appropriate one for shorthand (Volker E.)
-   [typeahead-search] Amend to `.wvui-typeahead-search__suggestions__footer__icon` class (Volker
    E.)
-   [typeahead-search-suggestion][styles] Lighten thumbnail placeholder icon (Volker E.)
-   [typeahead-search] Use `aria-selected` in suggestion list (bwang)

## v0.3.0 / 2021-08-25

-   [docs] Env variable and file path typos (Nikki Nikkhoui)
-   [build] Upgrade Dockerfile image to node12 (Nikki Nikkhoui)
-   [build] Add .DS_Store files to .gitignore (Volker E.​)
-   [docs] Unify terminology on Docker and SSH (Volker E.​)
-   [docs] change docker to docker-compose command (Nikki Nikkhoui)
-   [docs] Use abbreviated option for tee "append" (Nikki Nikkhoui)
-   [build] Add more ignorable files and dirs to .stylelintignore (Volker E.​)
-   [toggle-button] Add new Toggle button component (DannyS712)
-   [progress-bar] Add new Progress bar component (DannyS712)
-   [styles] Use `transition-duration` and `-property` values to DRY up (Volker E.​)
-   [build] Switch base image to node12 / bullseye now it's available (James D. Forrester)
-   [typeahead-search] Wrap those results (Volker E.​)
-   [typeahead-search][typeahead-suggestion] It should be possible to use something other than
    Special:Search (jdlrobson)
-   [icons] Center 'wvuiIconSearch' search icon in canvas (Volker E.​)
-   [build] Upgrade eslint-config-wikimedia from 0.17.0 to 0.20.0 (James D. Forrester)
-   [dropdown] Add `line-height` for correct vertical text position (Volker E.​)
-   [storybook] Set `max-width` instead of `width` on typeahead-search container (Nicholas Ray)
-   [styles] Update WikimediaUI Base to v0.19.0 and use/remove provided variables (Volker E.​)
-   [button] Remove `color` property inherited from normal default button (Volker E.​)
-   [docs] Add link to doc.wikimedia.org Storybook output (DannyS712)
-   [docs] Add up-to-date Storybook demo link to README.md (Volker E.​)
-   [docs] Fix link to "performance section" in README (DannyS712)
-   [dropdown] Add composable for generated IDs, use for ARIA (Roan Kattouw)
-   [dropdown] Add Dropdown and OptionsMenu components (Roan Kattouw)
-   [types] Move type declarations into "types" dir, exclude unneeded files (Eric Gardner)
-   [button] ButtonType.test.ts to test ButtonType (DannyS712)
-   [radio] Remove superfluous `aria-disabled` and restructure disabled rules (Volker E.​)
-   [binary inputs] Add layout styles and options for Checkbox and Radio (Anne Tomasevich)
-   [build] Upgrade @vue/composition-api to 1.0.0-rc.10 (Roan Kattouw)
-   [checkbox] Add the Checkbox component (Anne Tomasevich)
-   [docs] CONTRIBUTING: update links to mailing lists (DannyS712)
-   [build] Prohibit restricted ES6 functions in .eslintrc.json (Roan Kattouw)

## v0.2.0 / 2021-06-01

-   [button] BREAKING CHANGE: Add 'type' prop to replace 'quiet', add 'primary' (Roan Kattouw)
-   [button][actions] BREAKING CHANGE: Rename 'PrimaryAction' to 'ButtonAction' (Volker E.​)
-   [icon] BREAKING CHANGE: Remove iconColor prop, control color with CSS instead (Roan Kattouw)
-   [radio] Add the Radio component (Anne Tomasevich)
-   [radio] Improve handling of modelValue prop in Radio stories (Anne Tomasevich)
-   [button] Remove `color-quiet-hover` (Volker E.​)
-   [icons] Add 'wvuiIconShare' share icon (Volker E.​)
-   [icons] Update outdated 'wvuiIconSearch' search icon (Volker E.​)
-   [typeahead-search][typeahead-suggestion] Wrap overlong words in title and footer (Volker E.​)
-   [typeahead-search] Fix combobox background for non-white background themes (Volker E.​)
-   [typeahead-search] Remove quotation marks from footer (Sam Smith)
-   [typeahead-search]Optionally disable query match highlighting (Sam Smith)
-   [input] InputType: fix TSDoc (Simon Legner)
-   [button][input] Fix prop type inference when used with validator (Simon Legner)
-   [binary input] Normalize by setting `margin` to `0` (Volker E.​)
-   [docs] Add contributing guidelines & refactor the existing README (Anne Tomasevich)
-   [docs] Amend phrasing and link (Volker E.​)
-   [docs] Update Storybook info in the contributing guidelines (Anne Tomasevich)
-   [docs][developers] Fix changelog file name and fix Gerrit name (Volker E.​)
-   [storybook] Fix control.options deprecation warning (Roan Kattouw)
-   [storybook] Make dynamic source code display look a little nicer (Roan Kattouw)
-   [storybook] Fix story parameter typing in Button story (Roan Kattouw)
-   [storybook] Add icon dropdown to button story (Roan Kattouw)
-   [storybook][icon] List languages from shouldFlipExceptions (Roan Kattouw)
-   [build] Switch back to npm's lockfileversion 1 (Volker E.​)
-   [build] Add Gerrit change-id hook to Husky (Eric Gardner)
-   [build] Upgrade Storybook to v6.2.9 (Roan Kattouw)
-   [build] Publish new wvui development versions through Docker container (Nikki Nikkhoui)
-   [build] Create a dedicated "wvui-search" entry point and bundle (Eric Gardner)
-   [build] Add the Vue Composition API plugin (Anne Tomasevich)
-   [build] Change 'package.json' indentation to tabs (Volker E.​)
-   [build][stylelint] Add 'stylelint-order' plugin (Volker E.​)
-   [build] Add 'browserslist-config-wikimedia' (Volker E.​)
-   [build][styles] Expand 'stylelint-order' rules and format (Volker E.​)
-   [build] Pin devDependencies (Volker E.​)

## v0.1.1 / 2021-04-21

-   [button][styles] Fix hover and active for p/d quiet buttons (Roan Kattouw)
-   [typeahead-search] Ensure the suggestion footer works the same on keyboard and mouse. (bwang)
-   [typeahead-search] Handle text overflow in search suggestion footer by using ellipsis (bwang)
-   [typeahead-search] Prevent search button text from overflowing on small screens (bwang)
-   [typeahead-search] Update debounce interval (Clare Ming)
-   [typeahead-suggestion-title] Preserve graphemes during splitting (Sam Smith)
-   [build] Make Prettier prettier and add `format:etc` script for staged files (Volker E.​)
-   [build] Update .browserslistrc to reflect current modern supported browsers (Volker E.​)
-   [build][storybook] Optimize button and input stories for mobile usage (jdlrobson)
-   [build] Upgrade 'storybook' to 6.2.8 (Roan Kattouw)
-   [build][docs] Migrate Storybook stories from knobs to controls; add docs addon (Roan Kattouw)
-   [build] Install NPM from buster backports (Nikki Nikkhoui)
-   [build] Remove comments from .eslintrc.json (Umherirrender)
-   [docs] Uppercase README.md & CHANGELOG.md file names to align to pseudo-standard (Kunal Mehta)
-   [docs][changelog] Create next section (DannyS712)

## v0.1.0 / 2021-02-11

-   [fix][http][IE11] Don't assume native Promise support
-   [components] Use `@size-search-figure` variable across Input, TypeaheadSuggestion,
    TypeaheadSearch
-   [icon] Add component, styles, and icon data
-   [input] Add button control for input
-   [search] Make SearchClient submit parameters optional
-   [search] Allow consumer fetch implementation to be passed
-   [typeahead-search] Add debouncer to onInput method
-   [typeahead-search] Amend submit `margin` property
-   [typeahead-search] Correct `@size-typeahead-search-focus-addition` value
-   [typeahead-search] Correct suggestions width
-   [typeahead-search] Display 'id' prop as id attribute of search form.
-   [typeahead-search] Don't show search results if input has lost focus before promise resolves
-   [typeahead-search] Drop unnecessary usages of calc
-   [typeahead-search] Add `fulltext=1` query param to suggestions footer
-   [typeahead-search] Fix footer suggestions click bug
-   [typeahead-search] Make footer suggestion background color on hover the same as other
    suggestions
-   [typeahead-search] Make non-blank `initialInputValue` prop call `onInput`
-   [typeahead-search] Make search button appear as part of input box
-   [typeahead-search] Remove explicit height on suggestion footer
-   [typeahead-search] Remove max-width/min-width
-   [typeahead-search] Singularize footer article icon prop/class
-   [typeahead-search] Use calc for calculations involving em and px units
-   [typeahead-search][bug] Correct CSS class name to fix suggestion width issues
-   [typeahead-search][input] Correct spacing around input start icon and end icon
-   [typeahead-search] Emit suggestion-click and submit events
-   [typeahead-search] Fix suggestion-click event data
-   [typeahead-search] Show footer when there aren't suggestions
-   [typeahead-search][typeahead-suggestion] UrlGenerator uses formAction
-   [typeahead-search][typeahead-suggestion] Style `showThumbnail` prop
-   [typeahead-search] Add network client
-   [typeahead-search] Export the typeahead suggestion component
-   [typeahead-suggestion] Add keyboard support for suggestions list
-   [typeahead-suggestion-title] Add highlighting component
-   [typeahead-suggestion] Add initial styles and props
-   [wikimedia-ui] Adjust font-size of suggestion title/description
-   [build] Disable minification for CommonJS bundle
-   [build] Expand the 'stylelint' options shorthands for readability
-   [build] Re-enable source maps for non-CJS bundles
-   [build] Update 'prettier' linter devDependency
-   [build] Update 'stylelint' linter devDependency
-   [build] Update 'wikimedia-ui-base' to latest
-   [build] .webpack/common.js - clean up doc block
-   [build] `npm run doc:size` needs to generate built assets first
-   [build] Add note about using NFS volumes on macOS
-   [build] Improve performance of `npm t`
-   [build] merge npm doc and docs command
-   [build] Temporarily drop source map documentation generation from `npm doc`
-   [build] Remove unset env variable
-   [build] Upgrade dependencies
-   [build] Fix audited NPM packages
-   [build] Split icons into a distinct entry
-   [build][dev] Add production and pre-release scripts
-   [build] Add `npm doc` command
-   [build] Add back git fetch and checkout master in release-dev
-   [build] Add .dockerignore...(again)
-   [docs] Publish source map explorer as part of documentation
-   [docs] Remove squash and merge section from README
-   [docs] Add explicit named anchor in readme
-   [docs] Correct readme for git tags
-   [docs] Fix formatting bugs in readme.
-   [docs] Make readme.md gitiles markdown compliant
-   [docs] Add named anchor to WVUI readme
-   [docs][dev] Document way to clear Jest cache

## v0.0.1 / 2020-07-24

-   [dev] Decrease test coverage to 80%
-   [component][input] Add clear action for input
-   [component][input] Add indicator implementation for input
-   [component][input] Add icon implementation for input
-   [component][button] Add initial styles
-   [dev] Upgrade dependencies
-   [build][fix] Don't push tags for development releases
-   [build][fix] Publish bundled CSS and types
-   [build][dev] Include WVUI version in release
-   [build][dev] Move docs to development release script
-   [component][button] Flesh out props
-   [dev] Upgrade dependencies
-   [build][fix] Export TypeScript definitions
-   [component] Add initial TextInput styles and props
-   [build][dev] Enable development releases
-   [dev] Add wikimedia-ui theme
-   [dev] Prevent prettier from checking less files
-   [build][dev] Enable CSS automatic vendor prefixing
-   [dev] Add package.json files
-   [dev] Split ESLint extends and rules
-   [docs][dev] Document source maps
-   [dev] Suppress superfluous Jest style warning
-   [dev] Improve ESLint TypeScript config and fix JS config typing
-   [dev] Add Storybook preview styles
-   [dev] Disable Prettier for everything except JSON and Markdown files
-   [docs] Update readme
-   [dev][build] Add basic webpack configuration
-   [dev] Format JSON and Markdown better
-   [dev] Lint the dist directory
-   [dev] Add Storybook viewports
-   [dev] Improve Jest configuration
-   [dev][build] lint styles against browser support matrix
-   [dev][build] remove deprecated Vue.js types
-   [build][dev] upgrade dependencies
-   [build][less][dev] add wikimedia-ui-base
-   [dev] Format JSON files
-   [build][dev] Upgrade Fork TS Checker Webpack Plugin
-   [dev] Add ESLint and stylelint configs and scripts
-   [dev] Suppress Webpack performance hints for the Storybook build
-   [dev] Enable test coverage thresholds
-   [dev] Improve Jest configuration
-   [dev] Suppress Vue.js Storybook build type reminder
-   [dev] Add bundlesize test configuration
-   [dev][docs] Add Storybook development flow, and update readme
-   [docs] add initial Less naming conventions
-   [docs] add installation recommendations
-   [dev][docs] format markdown files
-   [dev][docs] Add missing types, docs, and update guidelines
-   [dev] move types under src/
-   [dev][build] Test on Git precommit
-   [docs] Add notes on Git strategy
-   [dev][build] Add Jest configuration
-   [build] rename to Wikimedia Vue UI
-   [docs] add integrated development workflow to readme
-   [docs] add IDE tips section
-   [dev][build] Add NPM version scripts
-   [docs] tweak NVM disclosure and quote example
-   [dev][build] Add NVM
-   [build][docs] Add package.json and readme
