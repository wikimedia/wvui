# Changelog

Versions and bullets are arranged contextually chronologically from latest to oldest.

## v0.1.2 / YYYY-MM-DD (to be released)

## v0.1.1 / 2021-04-21

-   [button][styles] Fix hover and active for p/d quiet buttons (Roan Kattouw)
-   [typeahead-search] Ensure the suggestion footer works the same on keyboard and mouse. (bwang)
-   [typeahead-search] Handle text overflow in search suggestion footer by using ellipsis (bwang)
-   [typeahead-search] Prevent search button text from overflowing on small screens (bwang)
-   [typeahead-search] Update debounce interval (Clare Ming)
-   [typeahead-suggestion-title] Preserve graphemes during splitting (Sam Smith)
-   [build] Make Prettier prettier and add `format:etc` script for staged files (Volker E)
-   [build] Update .browserslistrc to reflect current modern supported browsers (Volker E)
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
