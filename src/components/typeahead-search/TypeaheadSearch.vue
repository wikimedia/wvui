<template>
	<div
		class="wvui-typeahead-search"
		:class="rootClasses"
		role="combobox"
		:aria-expanded="isExpandedString"
		aria-haspopup="listbox"
		:aria-owns="suggestionsId"
		@mouseover="onRootMouseOver"
		@mouseout="onRootMouseOut"
		@keydown.up="onKeyDownUp"
		@keydown.down="onKeyDownDown"
		@keydown.escape="onKeyDownEscape"
	>
		<form
			:id="id"
			class="wvui-typeahead-search__form"
			:action="formAction"
			@submit="onSubmit"
		>
			<div class="wvui-typeahead-search__wrapper">
				<wvui-input
					class="wvui-typeahead-search__input"
					:start-icon="startIcon"
					:value="inputValue"
					:type="InputType.Search"
					name="search"
					dir="auto"
					autocapitalize="off"
					v-bind="$attrs"
					autocomplete="off"
					aria-autocomplete="list"
					:aria-controls="suggestionsId"
					:aria-activedescendant="activeSuggestionId"
					@input="onInput"
					@blur="onInputBlur"
					@focus="onInputFocus"
				/>
				<!--
					@slot A slot for passing hidden inputs like
					<input type="hidden" name="language" value="en">
				-->
				<slot />
				<ol
					:id="suggestionsId"
					class="wvui-typeahead-search__suggestions"
					role="listbox"
					:aria-label="suggestionsLabel"
				>
					<li
						v-for="(suggestion, index) in suggestionsList"
						:key="index"
						role="option"
						:aria-selected="isSuggestionSelected(index)"
					>
						<wvui-typeahead-suggestion
							:id="getSuggestionId( suggestion )"
							:key="suggestion.id"
							:search-page-title="searchPageTitle"
							:article-path="formAction"
							class="wvui-typeahead-search__suggestion"
							:query="searchQuery"
							:active="suggestionActiveIndex === index"
							:suggestion="suggestion"
							:show-thumbnail="showThumbnail"
							:show-description="showDescription"
							:highlight-query="highlightQuery"
							@mouseover="onSuggestionMouseOver( index )"
							@mousedown.native="onSuggestionMouseDown"
							@click="onSuggestionClick( suggestion )"
						/>
					</li>
					<li role="option">
						<a
							:id="footerId"
							ref="footer"
							tabindex="-1"
							class="wvui-typeahead-search__suggestions__footer"
							:href="footerUrl"
							:class="footerClasses"
							@mouseover="onFooterHover"
							@mousedown="onSuggestionMouseDown"
							@click="onSuggestionClick()"
						>
							<wvui-icon
								class="wvui-typeahead-search__suggestions-footer-article-icon"
								:icon="articleIcon"
							/>
							<span
								class="wvui-typeahead-search__suggestions__footer__text"
							>{{ footerSearchText }} <strong
								class="wvui-typeahead-search__suggestions__footer__text__query"
							>{{ searchQuery }}</strong></span>
						</a>
					</li>
				</ol>
			</div>
			<wvui-button class="wvui-typeahead-search__submit">
				{{ buttonLabel }}
			</wvui-button>
		</form>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import WvuiTypeaheadSuggestion from '../typeahead-suggestion/TypeaheadSuggestion.vue';
import { InputType } from '../input/InputType';
import WvuiButton from '../button/Button.vue';
import WvuiInput from '../input/Input.vue';
import WvuiIcon from '../icon/Icon.vue';
import {
	AbortableSearchFetch,
	SearchClient,
	SearchResult
} from '../typeahead-search/http/SearchClient';
import { wvuiIconSearch, wvuiIconArticleSearch } from '../../themes/icons';
import { restSearchClient } from './http/restSearchClient';
import { createDefaultUrlGenerator, UrlGenerator } from '../typeahead-suggestion/UrlGenerator';
import { FetchEndEvent, SuggestionClickEvent, SubmitEvent } from './lifecycle-events';
import { DEBOUNCE_INTERVAL } from './TypeaheadSearch.constants';

export default Vue.extend( {
	name: 'WvuiTypeaheadSearch',
	components: { WvuiTypeaheadSuggestion, WvuiButton, WvuiInput, WvuiIcon },

	// Pass all attributes to input
	inheritAttrs: false,

	props: {
		initialInputValue: {
			type: String,
			default: ''
		},
		buttonLabel: {
			type: String,
			required: true
		},
		formAction: {
			type: String,
			required: true
		},
		client: {
			type: Object as PropType<SearchClient>,
			default: () => restSearchClient()
		},
		urlGenerator: {
			type: Object as PropType<UrlGenerator>,
			default: () => createDefaultUrlGenerator()
		},
		domain: {
			type: String,
			default: 'en.wikipedia.org'
		},
		/**
		 * Used on projects where search does not match the MediaWiki default
		 * e.g. Wikimedia Commons
		 */
		searchPageTitle: {
			type: String,
			default: 'Special:Search'
		},
		footerSearchText: {
			type: String,
			required: true
		},
		suggestionsLabel: {
			type: String,
			required: true
		},
		focused: {
			type: Boolean,
			default: false
		},
		id: {
			type: String,
			required: true
		},
		showThumbnail: {
			type: Boolean,
			default: true
		},
		showDescription: {
			type: Boolean,
			default: true
		},
		highlightQuery: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			startIcon: wvuiIconSearch,
			articleIcon: wvuiIconArticleSearch,
			isHovered: false,
			suggestionActiveIndex: -1,
			suggestionsList: [] as SearchResult[],
			isFocused: this.focused,
			searchQuery: '',
			inputValue: this.initialInputValue,
			InputType,
			isExpanded: false,
			request: null as AbortableSearchFetch | null,
			debounceId: null as NodeJS.Timeout | null
		};
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-typeahead-search--active': this.isHovered,
				'wvui-typeahead-search--has-value': !!this.searchQuery,
				'wvui-typeahead-search--expanded': this.isExpanded,
				'wvui-typeahead-search--show-thumbnail': this.showThumbnail
			};
		},
		footerClasses(): Record<string, boolean> {
			return {
				'wvui-typeahead-search__suggestions__footer--active':
					this.isFooterActive
			};
		},
		footerUrl(): string {
			return this.urlGenerator.generateUrl( this.searchQuery, {
				title: this.searchPageTitle
			} );
		},
		isFooterActive(): boolean {
			return this.suggestionActiveIndex === this.suggestionsList.length;
		},
		suggestionsId(): string {
			return `${this.id}-suggestions`;
		},
		activeSuggestionId(): string {
			if ( !this.isExpanded ) {
				return '';
			}

			if (
				this.suggestionActiveIndex < 0 ||
				this.suggestionActiveIndex > this.suggestionsList.length
			) {
				return '';
			}

			if ( this.isFooterActive ) {
				return this.footerId;
			}

			return this.getSuggestionId( this.suggestionsList[ this.suggestionActiveIndex ] );
		},
		footerId(): string {
			return `${this.suggestionsId}-footer`;
		},
		isExpandedString(): string {
			return this.isExpanded ? 'true' : 'false';
		}
	},
	mounted: function () {
		if ( this.initialInputValue ) {
			// Programmatic changes to the input don't trigger the input event so we
			// manually call the onInput method here.
			this.onInput( this.initialInputValue );
		}
	},
	methods: {
		/**
		 * Return value of "aria-selected" for a given suggestion
		 *
		 * Suggestion is considered "selected" if input value matches suggestion
		 * "selected" is distinct from "active", 'suggestionActiveIndex' updates on hover and
		 * doesn't affect the input value, This definition means a user can enter a value that
		 * matches a suggestion exactly and that suggestion is considered "selected" even
		 * though the user doesn't interact with the list via keyboard or mouse.
		 *
		 * This behavior is approximately equivalent to
		 * W3's "List Autocomplete with Automatic Selection" example
		 * https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html#ex2_label
		 *
		 * @param {number} index
		 * @return {string} either 'true' or 'false'
		 */
		isSuggestionSelected( index: number ): string {
			const suggestionTitle = this.suggestionsList[ index ].title;
			const isSelected = this.inputValue.toLowerCase() === suggestionTitle.toLowerCase();
			return isSelected && !this.isFooterActive ? 'true' : 'false';
		},

		/**
		 * A convenience method to update those properties that should be updated when new
		 * suggestions are available.
		 *
		 * @param {string} query
		 * @param {SearchResult[]} suggestions
		 */
		updateSuggestions( query: string, suggestions: SearchResult[] ) {
			this.searchQuery = query;
			this.suggestionsList = suggestions;
			this.suggestionActiveIndex = -1;
			this.isExpanded = !!this.searchQuery && this.isFocused;
		},

		/**
		 * A convenience method to update those properties that should be update when clearing the
		 * suggestions.
		 */
		clearSuggestions() {
			this.updateSuggestions( '', [] );
		},

		onInput( value: string ) {
			this.inputValue = value;

			if ( this.debounceId ) {
				// Cancel the last setTimeout callback in case it hasn't executed yet.
				clearTimeout( this.debounceId );
			}

			this.debounceId = setTimeout( () => {
				this.inputValue = value;
				const query = value.trim();

				if ( this.request ) {
				// Cancel the last request before making a new one in case it is still
				// pending. This call is expected to be inert if the request has
				// already finished.
					this.request.abort();
				}

				if ( !query ) {
					this.clearSuggestions();

					return;
				}

				this.$emit( 'fetch-start' );

				this.request = this.client.fetchByTitle( value, this.domain );

				this.request.fetch.then( ( { results } ) => {
					this.updateSuggestions( query, results );

					// Event
					const event: FetchEndEvent = {
						numberOfResults: results.length,
						query
					};

					this.$emit( 'fetch-end', event );
				} )
					.catch( () => {
					// Error handling?
					} );
			}, DEBOUNCE_INTERVAL );
		},
		onSuggestionMouseOver( index: number ) {
			this.suggestionActiveIndex = index;
		},
		onInputFocus() {
			this.isHovered = true;
			this.isFocused = true;
			this.isExpanded = !!this.searchQuery;
		},
		onInputBlur() {
			this.isFocused = false;
			this.isHovered = false;
			this.isExpanded = false;
		},
		onFooterHover() {
			this.suggestionActiveIndex = this.suggestionsList.length;
		},
		onRootMouseOver() {
			this.isHovered = true;
		},
		onRootMouseOut() {
			this.isHovered = this.isFocused;
			this.suggestionActiveIndex = -1;
		},

		// A click event is only fired after "a mousedown and mouseup over the same screen
		// location" [0].
		//
		// A blur event is fired "when an element loses focus either via the pointing device..."
		// [1].
		//
		// When the user clicks a search suggestion, the browser will fire a mousedown event and
		// then a blur event as the input loses focus. Therefore, we cancel the mousedown event so
		// that the input never loses focus. Moreover, there's a mouseup over the same screen
		// location, then a click event is fired.
		//
		// This solution was written up by Alexey Lebedev here: https://stackoverflow.com/a/10653160
		//
		// [0] https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-eventgroupings-mouseevents
		// [1] https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-eventgroupings-htmlevents-h3
		onSuggestionMouseDown( event: MouseEvent ) {
			event.preventDefault();
		},

		onSuggestionClick( suggestion?: SearchResult ) {
			const event: SuggestionClickEvent = {
				index: this.suggestionActiveIndex,
				numberOfResults: this.suggestionsList.length
			};

			// State updates
			this.inputValue = suggestion ? suggestion.title : this.searchQuery;
			this.updateSuggestions( this.inputValue, [] );

			this.isFocused = true;
			this.isExpanded = false;

			// Event
			this.$emit( 'suggestion-click', event );
		},

		onKeyDownUp( event: KeyboardEvent ) { this.handleKeyUpDown( event, -1 ); },
		onKeyDownDown( event: KeyboardEvent ) { this.handleKeyUpDown( event, 1 ); },
		handleKeyUpDown( event: KeyboardEvent, offset: number ) {
			if ( !this.isFocused || !this.isExpanded ) {
				return;
			}

			// By default, when the focuses an input and presses the up key, the caret is moved to
			// the beginning of the input. Cancel the event as we always want the caret to be at the
			// end of the input.
			event.preventDefault();

			this.nudgeActiveSuggestion( offset );
		},
		nudgeActiveSuggestion( offset: number ) {
			let newSuggestionActiveIndex = this.suggestionActiveIndex;

			newSuggestionActiveIndex += offset;

			// Remember that -1 means that no suggestion is currently highlighted. The next
			// suggestion "above" is actually the bottommost suggestion.
			if ( newSuggestionActiveIndex < -1 ) {
				newSuggestionActiveIndex = this.suggestionsList.length;

			// We use the > operator here (rather than >=) to replicate the behavior of the current
			// search widget in MediaWiki Core - if the user has highlighted the bottommost
			// suggestion, they have to press down _twice_ in order to highlight the topmost
			// suggestion.
			} else if ( newSuggestionActiveIndex > this.suggestionsList.length + 1 ) {
				newSuggestionActiveIndex = 0;
			}

			this.suggestionActiveIndex = newSuggestionActiveIndex;

			// Update the input's value
			const item = this.suggestionsList[ newSuggestionActiveIndex ];

			this.inputValue = item ? item.title : this.searchQuery;
		},

		onKeyDownEscape( event: KeyboardEvent ) {
			event.preventDefault();

			// Per https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html#kbd_label_textbox,
			// all variations of the Combobox with Listbox Popup pattern should clear the textbox
			// when the escape key is pressed. However, this is not the case in the current search
			// widget in MediaWiki Core.
			// this.inputValue = '';

			this.isExpanded = false;
		},

		// Per https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html#kbd_label_textbox,
		// when the user pressed the enter key:
		//
		// - If the suggestions list (the listbox) isn't displayed, then nothing should happen; or
		//
		// - If the suggestions list is displayed and a suggestion hasn't been highlighted, then
		//   the first suggestion should be highlighed
		//
		// However, the search search widget in MediaWiki Core, simply submits the parent form.
		//
		// onKeyDownEnter( _event: KeyboardEvent ) { /* ... */ }

		getSuggestionId( suggestion: SearchResult ): string {
			return `wvui-typeahead-search-suggestion-${suggestion.id}`;
		},

		onSubmit( event: Event ) {
			// When the user presses the enter key, we prevent form
			// submission when the suggestion footer is active.
			// Instead, we directly navigate to `footerUrl` to ensure
			// the link is the same on both mouse and keyboard
			if ( this.suggestionActiveIndex === this.suggestionsList.length ) {
				event.preventDefault();
				window.location.assign( this.footerUrl );
			}

			const submitEvent: SubmitEvent = {
				index: this.suggestionActiveIndex,
				numberOfResults: this.suggestionsList.length
			};

			this.$emit( 'submit', submitEvent );
		}
	}
} );

// ESLint will also check the styles below (and in other Single File
// Components). Because there are numerous max-len error-causing lines from
// long `calc` styles/variables below, conflicts with competing stylelint
// rules, and because ESLint ignores `eslint-disable` comments placed in the
// styles themselves, we regrettably set it here instead.
//
// See "Known Limitations" from vue-eslint-parser:
// https://github.com/vuejs/vue-eslint-parser#%EF%B8%8F-known-limitations
//
/* eslint-disable max-len */
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-search {
	// Add `background-color` as `border` is around input including button.
	background-color: @background-color-base;
	// Border is styled the same as the input border to visually encapsulate
	// search submit button.
	border: @border-width-base @border-style-base @border-color-base;
	border-radius: @border-radius-base;

	&__form {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;
	}

	&__wrapper {
		flex-grow: 1;
		// Makes search results start at the same horizontal position as input.
		position: relative;
		// Set negative margin to make button border overlap with
		// `.wvui-typeahead-search`'s border.
		margin: -@border-width-base;
	}

	&__submit {
		opacity: 0;
		position: relative;
		// Prevent submit button from shrinking on smaller viewports, which causes
		// the button label to overflow.
		flex-shrink: 0;
		// Set negative margin to make button border overlap with
		// `.wvui-typeahead-search`'s border on all but start margin.
		// The input already has a negative margin which causes part of the button's
		// border and input's border to intentionally overlap.
		margin: -@border-width-base -@border-width-base -@border-width-base 0;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		transition-property: opacity;
		transition-duration: @transition-duration-base;

		&:hover {
			// Make the button be on top of the input border when the button is hovered.
			z-index: 1;
		}

		&:focus {
			opacity: @opacity-base;
			// Make the button be on top of the input border when the input is
			// hovered while the button is focused.
			z-index: 1;
		}
	}

	&__suggestions {
		background-color: @background-color-base;
		list-style: none;
		display: none;
		position: absolute;
		top: @size-base;
		right: 0;
		left: 0;
		box-sizing: border-box;
		margin: 0;
		border: @border-width-base @border-style-base @border-color-base;
		border-top-width: 0;
		border-radius: 0 0 @border-radius-base @border-radius-base;
		padding: 0;
		box-shadow: @box-shadow-menu;

		&__footer {
			color: @color-base;
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			display: flex;
			align-items: center;
			border-top: @border-width-base @border-style-base @border-color-heading;
			padding: @padding-vertical-typeahead-suggestion
				@padding-horizontal-typeahead-suggestion
				@padding-vertical-typeahead-suggestion
				@size-input-icon-container;
			text-decoration: none;
			cursor: pointer;

			&:visited,
			&:active {
				color: @color-base;
			}

			// stylelint-disable-next-line max-nesting-depth
			.wvui-icon {
				color: @color-accessory;
				// Because the footer icon should line up vertically with the
				// suggestion text when `showThumbnail` is false, we set its width to
				// `auto` here instead of using the more intuitive @size-search-figure
				// variable so that it doesn't have extra horizontal space.
				width: auto;
				height: @size-search-figure;
				margin-right: @padding-horizontal-base;
			}
		}

		&__footer--active {
			background-color: @background-color-base--hover;
		}

		&__footer__text {
			font-size: @font-size-typeahead-suggestion-title;
		}
	}

	&__suggestion {
		padding-left: @size-input-icon-container;
	}

	.wvui-input__input {
		border-right-color: transparent;
	}

	//
	// Rules that alter elements based on a block-level modifier follow.
	//
	&--has-value {
		.wvui-input__input {
			border-bottom-left-radius: 0;
		}
	}

	&--active,
	&:hover {
		.wvui-typeahead-search__submit {
			opacity: @opacity-base;
		}

		.wvui-typeahead-search__input {
			// Allow the input's border to be on top of the parent's border when
			// focused or hovered.
			z-index: 1;
		}

		.wvui-input__input {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	&--expanded {
		.wvui-typeahead-search__suggestions {
			display: block;
		}
	}

	&--show-thumbnail {
		// The amount of space between the typeahead search figure's parent
		// component and the typeahead search figure (input icon container,
		// suggestion thumbnail, and footer icon container). We want this space to
		// be uniform so that the figures vertically line up nicely. For pragmatic
		// reasons, we use the horizontal padding of the typeahead suggestion.
		@spacing-start-typeahead-search-figure: @padding-horizontal-typeahead-suggestion;
		// The amount of spacing from the end of the input icon container, typeahead
		// suggestion thumb, and footer icon container to the start of their
		// associated text. We need the text to vertically line up nicely.
		// For pragmatic reasons, we use the spacing from the typeahead suggestion
		// thumb.
		@spacing-end-typeahead-search-figure: @margin-end-typeahead-suggestion-thumb;
		// The amount the width of the input increases when it is focused to allow
		// for the extra spacing around the search figures. The caret position
		// should remain in place for the smoothest transition.
		@size-typeahead-search-focus-addition: @spacing-start-typeahead-search-figure + @spacing-end-typeahead-search-figure;

		.wvui-input__input {
			padding-left: @size-search-figure;
		}

		.wvui-input__start-icon {
			width: @size-search-figure;
		}

		.wvui-input__input:focus {
			position: relative;
			// Don't let the input grow over the search button.
			left: -@size-typeahead-search-focus-addition;
			width: calc( @size-full + @size-typeahead-search-focus-addition );
			// Keep the cursor in the same place on the screen.
			padding-left: calc( @spacing-start-typeahead-search-figure + @size-search-figure + @spacing-end-typeahead-search-figure );
		}

		.wvui-input__input:focus + .wvui-input__start-icon {
			// We use @border-width-base here since the input's start icon position
			// is relative to the input's container (which is outside the input's
			// border) when the input has focus.
			left: -@size-typeahead-search-focus-addition + @spacing-start-typeahead-search-figure + @border-width-base;
		}

		.wvui-typeahead-search__suggestions {
			left: -@size-typeahead-search-focus-addition;
		}

		.wvui-typeahead-search__suggestion {
			padding-right: @padding-horizontal-typeahead-suggestion;
			padding-left: @spacing-start-typeahead-search-figure;
		}

		.wvui-typeahead-search__suggestions__footer {
			padding-right: @padding-horizontal-typeahead-suggestion;
			padding-left: @spacing-start-typeahead-search-figure;
		}

		.wvui-typeahead-search__suggestions__footer__text,
		.wvui-typeahead-search__suggestions__footer__text__query {
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			hyphens: auto;
			// Progressive enhancement. Fine to override unsupported Android 4. See T280982.
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			word-break: break-word;
			// Legacy `word-wrap`; IE 6-11, Edge 12+, Firefox 3.5+, Chrome 4+, Safari 3.1+,
			//   Opera 11.5+, iOS 3.2+, Android 2.1+
			// `overflow-wrap` is W3 standard, but it doesn't seem as if browser vendors
			//   will abandon `word-wrap` (it has wider support), therefore no duplication.
			word-wrap: break-word;
		}

		.wvui-typeahead-search__suggestions-footer-article-icon {
			// Prevent the icon container from shrinking when large text is present
			flex-shrink: 0;
			width: @size-search-figure;
		}
	}
}
</style>
