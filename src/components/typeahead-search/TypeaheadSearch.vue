<template>
	<div
		class="wvui-typeahead-search"
		:class="rootClasses"
		role="combobox"
		aria-expanded="true"
		aria-haspopup="listbox"
		aria-owns="wvui-typeahead-search__suggestions"
		@mouseover="onRootMouseOver"
		@mouseout="onRootMouseOut"
		@keydown="onKeyDown"
	>
		<form
			id="wvui-typeahead-search__search"
			class="wvui-search-form"
			action="https://wikipedia.org/search-redirect.php"
		>
			<input type="hidden" name="family" value="wikipedia">
			<input type="hidden" name="language" value="en">

			<wvui-input
				id="wvui-typeahead-search__input"
				placeholder="Search Wikipedia"
				:start-icon="startIcon"
				:value="inputValue"
				:type="InputType.Search"
				autocomplete="off"
				autocapitalize="off"
				aria-autocomplete="list"
				aria-controls="wvui-typeahead-search__suggestions"
				title="Search Wikipedia [Alt+Shift+f]"
				accesskey="f"
				aria-label="Search Wikipedia"
				dir="auto"
				name="search"
				@input="onInput"
				@blur="onInputBlur"
				@focus="onInputFocus"
			/>
			<wvui-button>
				Search
			</wvui-button>
		</form>
		<ol
			v-if="suggestionsList.length > 0 && isFocused"
			id="wvui-typeahead-search__suggestions"
			class="wvui-typeahead-search__suggestions"
			role="listbox"
			aria-label="search suggestions"
		>
			<li
				v-for="(suggestion, index) in suggestionsList"
				:key="index"
				role="option"
			>
				<wvui-typeahead-suggestion
					:key="suggestion.id"
					:query="searchQuery"
					:active="suggestionActiveIndex === index"
					:suggestion="suggestion"
					@mouseover="onSuggestionMouseOver( index )"
					@focus="onSuggestionFocused( index )"
					@click="onSuggestionClick"
				/>
			</li>
			<li>
				<a
					ref="containingSearch"
					class="wvui-typeahead-search__suggestions__footer"
					:href="searchContainingUrl"
					:class="footerClasses"
					@mouseover="onFooterHover"
				>
					<wvui-icon :icon="articlesIcon" />
					<span
						class="wvui-typeahead-search__suggestions__footer__text"
					>Search for pages containing <strong>"{{ searchQuery }}"</strong></span>
				</a>
			</li>
		</ol>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import WvuiTypeaheadSuggestion
	from '../typeahead-suggestion/TypeaheadSuggestion.vue';
import { InputType } from '../input/InputType';
import WvuiButton from '../button/Button.vue';
import WvuiInput from '../input/Input.vue';
import WvuiIcon from '../icon/Icon.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import { wvuiIconSearch, wvuiIconArticleSearch } from '../../themes/icons';
import suggestionsList from './TypeaheadSearch.stories.json';

enum KeyCodes {
	KEY_UP = 38,
	KEY_DOWN = 40,
	KEY_ENTER = 13
}
export default Vue.extend( {
	name: 'WvuiTypeaheadSearch',
	components: { WvuiTypeaheadSuggestion, WvuiButton, WvuiInput, WvuiIcon },
	data() {
		return {
			startIcon: wvuiIconSearch,
			articlesIcon: wvuiIconArticleSearch,
			isHovered: false,
			suggestionActiveIndex: -1,
			suggestions: [],
			isFocused: false,
			searchQuery: '',
			inputValue: '',
			InputType
		};
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-typeahead-search--active': this.isHovered,
				'wvui-typeahead-search--focused': this.isFocused
			};
		},
		footerClasses(): Record<string, boolean> {
			return {
				'wvui-typeahead-search__suggestions__footer--active':
					this.suggestionActiveIndex === this.suggestionsList.length
			};
		},
		suggestionsList(): SearchResult[] {
			return this.searchQuery.length ? suggestionsList.pages as [] : [];
		},
		searchContainingUrl(): string {
			return encodeURI( `/w/index.php?search=${this.searchQuery}&title=Special Search&wprov=acrw1_-1&fulltext=1` );
		},
		isSearchContainingSelected(): boolean {
			return this.suggestionActiveIndex === this.suggestionsList.length;
		}
	},
	methods: {
		onInput( value: string ): void {
			this.searchQuery = value;
		},
		onSuggestionMouseOver( index: number ): void {
			this.suggestionActiveIndex = index;
		},
		onSuggestionFocused( index: number ): void {
			this.isFocused = true;
			this.suggestionActiveIndex = index;
		},
		setValue( index: number ): void {
			const item = this.suggestionsList[ index ];

			if ( !item ) {
				this.inputValue = this.searchQuery;
			} else {
				const { title } = item;
				this.inputValue = title;
			}

		},
		onInputFocus(): void {
			this.isHovered = true;
			this.isFocused = true;
		},
		onInputBlur(): void {
			if ( this.suggestionActiveIndex === -1 ) {
				this.isFocused = false;
			}
			this.isHovered = false;
		},
		onFooterHover(): void {
			this.suggestionActiveIndex =
				this.suggestionsList.length;
		},
		onRootMouseOver(): void {
			this.isHovered = true;
		},
		onRootMouseOut(): void {
			this.isHovered = this.isFocused;
			this.suggestionActiveIndex = -1;
		},
		onSuggestionClick(): void {
			this.isFocused = true;
		},
		getNextActiveIndex( index: number ): number {
			const { length } = this.suggestionsList;

			// We should count footer as well
			const fullLength = length + 1;

			return ( index + fullLength ) % fullLength;

		},
		navigateToContainingSearch() {
			const link = this.$refs.containingSearch as HTMLAnchorElement;
			link.click();
		},
		onKeyDown( event: KeyboardEvent ) {
			const { which } = event;

			if ( !this.suggestionsList.length || !this.isFocused ) {
				return;
			}

			switch ( which ) {
				case KeyCodes.KEY_ENTER: {
					if ( this.isSearchContainingSelected ) {
						event.preventDefault();

						return this.navigateToContainingSearch();
					}

					break;
				}
				case KeyCodes.KEY_UP:
				case KeyCodes.KEY_DOWN: {
					let offset = 0;

					if ( which === KeyCodes.KEY_UP ) {
						offset = -1;
					} else if ( which === KeyCodes.KEY_DOWN ) {
						offset = 1;
					}

					if ( offset !== 0 ) {
						this.suggestionActiveIndex = this.getNextActiveIndex(
							this.suggestionActiveIndex + offset
						);

						this.setValue( this.suggestionActiveIndex );
					}

				}

			}
		}
	}

} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-search {
	max-width: 500px;
	min-width: 350px;
	border: @border-width-base solid @border-color-base;
	position: relative;
	margin: 0;
	border-radius: @border-radius-base;

	.wvui-search-form {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;
	}

	.wvui-button {
		border: @border-width-base @border-style-base @border-color-base;
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;
		margin: -1px -1px -1px 0;
		transition: all @transition-duration-medium;
		opacity: 0;
	}

	&__suggestions {
		position: absolute;
		box-sizing: border-box;
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		width: calc( 100% - 51px );
		max-width: none;
		left: -21px;
		top: 30px;
		margin: 0;
		padding: 0;
		border: @border-width-base @border-style-base @border-color-base;
		box-shadow: @box-shadow-menu;
		border-radius: 0 0 @border-radius-base @border-radius-base;
		background: #fff;
		list-style: none;
		z-index: -1;

		&__footer {
			height: 34px;
			border-top: @border-width-base @border-style-base @border-color-heading;
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			display: flex;
			align-items: center;
			padding: @padding-vertical-typeahead-suggestion @padding-horizontal-base;
			cursor: pointer;
			text-decoration: none;
			color: @color-base;

			&:visited,
			&:active {
				color: @color-base;
			}

			&--active {
				background-color: @background-color-primary;
			}

			.wvui-icon {
				font-size: @font-size-search-suggestion-title;
				width: @width-search-suggestion-thumb;
				height: @width-search-suggestion-thumb;
				opacity: @opacity-icon-accessory;
			}

			&__text {
				padding-left: @padding-horizontal-base;
				padding-right: @padding-horizontal-base;
				font-size: @font-size-search-suggestion-title;
				// stylelint-disable-next-line plugin/no-unsupported-browser-features
				@supports (padding-inline-start: @padding-horizontal-base) {
					// Reset paddings for all modern browsers.
					padding-right: 0;
					padding-left: 0;
					padding-inline-start: @padding-horizontal-base;
				}
			}
		}
	}

	.wvui-input {
		width: auto;
		flex-grow: 1;
		margin: -1px 0 -1px -1px;
		z-index: 1;

		.wvui-input__input {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			border-right-width: 0;
		}
	}

	&--active {
		.wvui-button {
			opacity: @opacity-base;
		}
	}

	.wvui-button:focus {
		opacity: @opacity-base;
	}

	&--focused {
		.wvui-input {
			transform: translateX( -20px );
			margin-right: -20px;

			.wvui-input__input {
				padding-left: 55px;

				& ~ .wvui-input__start-icon {
					padding-left: 20px;
				}
			}
		}
	}
}
</style>
