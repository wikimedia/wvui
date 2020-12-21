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
				<!-- A slot for passing hidden inputs like
				<input type="hidden" name="language" value="en"> -->
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
					>
						<wvui-typeahead-suggestion
							:id="getSuggestionId( suggestion )"
							:key="suggestion.id"
							:article-path="formAction"
							class="wvui-typeahead-search__suggestion"
							:query="searchQuery"
							:active="suggestionActiveIndex === index"
							:suggestion="suggestion"
							:show-thumbnail="showThumbnail"
							:show-description="showDescription"
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
							>{{ footerSearchText }} <strong>"{{ searchQuery }}"</strong></span>
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
					this.isFooterSelected
			};
		},
		footerUrl(): string {
			return this.urlGenerator.generateUrl( this.searchQuery );
		},
		isFooterSelected(): boolean {
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

			if ( this.isFooterSelected ) {
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
			if ( this.debounceId ) {
				// Cancel the last setTimeout callback in case it hasn't executed yet.
				clearTimeout( this.debounceId );
			}

			this.debounceId = setTimeout( () => {
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

		onSubmit() {
			const event: SubmitEvent = {
				index: this.suggestionActiveIndex,
				numberOfResults: this.suggestionsList.length
			};

			this.$emit( 'submit', event );
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
	// The amount of spacing from the end of the input icon container, typeahead
	// suggestion thumb, and footer icon container to the start of their
	// associated text. We need the text to vertically line up nicely.
	// For pragmatic reasons, we use the spacing from the typeahead suggestion
	// thumb.
	@spacing-end-typeahead-search-figure: @margin-end-typeahead-suggestion-thumb;

	&__form {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;
	}

	&__wrapper {
		position: relative;
		flex-grow: 1;
	}

	&__submit {
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;
		margin-left: -@border-width-base;
		transition: opacity @transition-duration-base;
		opacity: 0;

		&:focus {
			opacity: @opacity-base;
		}
	}

	&__suggestions {
		background-color: @background-color-base;
		display: none;
		box-sizing: border-box;
		max-width: none;
		position: absolute;
		top: @size-base;
		right: 0;
		left: 0;
		border: @border-width-base @border-style-base @border-color-base;
		border-top-width: 0;
		border-radius: 0 0 @border-radius-base @border-radius-base;
		margin: 0;
		padding: 0;
		box-shadow: @box-shadow-menu;
		list-style: none;

		&__footer {
			color: @color-base;
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			display: flex;
			align-items: center;
			border-top: @border-width-base @border-style-base @border-color-heading;
			padding: @padding-vertical-typeahead-suggestion
				@padding-horizontal-typeahead-suggestion
				@padding-vertical-typeahead-suggestion
				@size-search-figure;
			text-decoration: none;
			cursor: pointer;

			&:visited,
			&:active {
				color: @color-base;
			}

			// stylelint-disable-next-line max-nesting-depth
			.wvui-icon {
				// Because the footer icon should line up vertically with the
				// suggestion text when `showThumbnail` is false, we set its width to
				// `auto` here instead of using the more intuitive @size-search-figure
				// variable so that it doesn't have extra horizontal space.
				width: auto;
				height: @size-search-figure;
				margin-right: @spacing-end-typeahead-search-figure;
				font-size: @font-size-typeahead-suggestion-title;
				opacity: @opacity-icon-accessory;
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
		padding-left: @size-search-figure;
	}

	&__input {
		flex-grow: 1;

		.wvui-input__input {
			border: @border-width-base @border-style-base @border-color-base;
			border-radius: @border-radius-base;

			// Button becomes visible on `:hover` so we don't want rounded borders with it.
			&:hover,
			&:focus {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}

	.wvui-input__start-icon {
		left: 0;
	}

	//
	// Rules that alter elements based on a block-level modifier follow.
	//
	&--active,
	&:hover {
		.wvui-typeahead-search__submit {
			opacity: @opacity-base;
		}
	}

	&--has-value {
		.wvui-typeahead-search__input {
			// stylelint-disable-next-line max-nesting-depth
			.wvui-input__input {
				border-bottom-left-radius: 0;
			}
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
		// The amount the width of the input increases when it is focused to allow
		// for the extra spacing around the search figures. The caret position
		// should remain in place for the smoothest transition.
		@size-typeahead-search-focus-addition: @spacing-start-typeahead-search-figure + @spacing-end-typeahead-search-figure;

		.wvui-input__input:focus {
			position: relative;
			// Keep the cursor in the same place on the screen.
			padding-left: calc( @spacing-start-typeahead-search-figure + @size-search-figure + @spacing-end-typeahead-search-figure );
			width: calc( 100% + @size-typeahead-search-focus-addition );
			// Don't let the input grow over the search button.
			left: -@size-typeahead-search-focus-addition;
		}

		.wvui-input__input:focus + .wvui-input__start-icon {
			left: -@size-typeahead-search-focus-addition + @spacing-start-typeahead-search-figure;
		}

		.wvui-typeahead-search__suggestions {
			left: -@size-typeahead-search-focus-addition;
		}

		.wvui-typeahead-search__suggestion {
			padding-left: @spacing-start-typeahead-search-figure;
			padding-right: @padding-horizontal-typeahead-suggestion;
		}

		.wvui-typeahead-search__suggestions__footer {
			padding-left: @spacing-start-typeahead-search-figure;
			padding-right: @padding-horizontal-typeahead-suggestion;
		}

		.wvui-typeahead-search__suggestions-footer-article-icon {
			width: @size-search-figure;
		}
	}
}
</style>
