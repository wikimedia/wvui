import { boolean, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import WvuiInput from '../input/Input.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import './TypeaheadSuggestion.stories.less';
import suggestionsList from '../typeahead-search/TypeaheadSearch.stories.json';

const KEY_UP = 38;
const KEY_DOWN = 40;

export default {
	title: 'Components/TypeaheadSuggestion',
	component: WvuiTypeaheadSuggestion
};

export const configurable = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSuggestion },
		props: {
			thumbnail: {
				type: Boolean,
				default: boolean( 'Thumbnail?', true )
			},
			active: { type: Boolean, default: boolean( 'Active?', false ) },
			query: { type: String, default: text( 'Query (for highlighting)', 'Co' ) }
		},
		computed: {
			suggestion(): SearchResult {
				const suggestion = suggestionsList.pages[ 1 ] as SearchResult;

				return {
					...suggestion,
					thumbnail: this.thumbnail ? suggestion.thumbnail : undefined
				};
			}
		},
		template: `
		<ol class="sb-search__suggestions" role="listbox">
			<li role="option">
				<wvui-typeahead-suggestion
					:suggestion="suggestion"
					:active="active"
					:query="query"
					domain="en.wikipedia.org"
				/>
			</li>
		</ol>
		`
	} );

export const exampleList = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSuggestion },
		data() {
			return {
				suggestionsList: suggestionsList.pages,
				activeIndex: -1
			};
		},
		methods: {
			onSuggestionMouseOver( index: number ) {
				this.activeIndex = index;
			}
		},
		template: `
		<ol class="sb-search__suggestions">
			<li v-for="(suggestion, index) in suggestionsList" >
				<wvui-typeahead-suggestion
					@mouseover="onSuggestionMouseOver( index )"
					query="co"
					:active="activeIndex === index"
					:suggestion="suggestion"
					:key="suggestion.id"
					domain="en.wikipedia.org"
				/>
			</li>
		</ol>
		`
	} );

export const withInput = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSuggestion, WvuiInput },
		data() {
			return {
				isVisible: false,
				activeIndex: -1
			};
		},
		computed: {
			suggestionsList(): SearchResult[] {
				return this.isVisible ? suggestionsList.pages as [] : [];
			}
		},
		methods: {
			onInput( value: string ): void {
				this.isVisible = !!value;
			},
			getNextActiveIndex( index: number ): number {
				const { length } = this.suggestionsList;

				return ( index + length ) % length;

			},
			onSuggestionMouseOver( index: number ) {
				this.activeIndex = index;
			},
			onKeyDown( event: KeyboardEvent ) {
				const { which } = event;

				if ( !this.suggestionsList.length ) {
					return;
				}

				switch ( which ) {
					case KEY_UP:
					case KEY_DOWN: {
						let offset = 0;
						if ( which === KEY_UP ) {
							offset = -1;
						} else if ( which === KEY_DOWN ) {
							offset = 1;
						}

						if ( offset !== 0 ) {
							this.activeIndex =
								this.getNextActiveIndex( this.activeIndex + offset );
						}

					}

				}
			}

		},
		template: `
		<div class="sb-search" @keydown="onKeyDown">
			<wvui-input 
				icon="search" 
				@input="onInput" 
				placeholder="Type something…"
			/>
			<ol
				v-if="suggestionsList.length"
				class="sb-search__suggestions sb-search__suggestions--typeahead"
				role="listbox"
			>
				<li 
					v-for="(suggestion, index) in suggestionsList" 
					role="option"
				>
					<wvui-typeahead-suggestion
						query="co"
						:active="activeIndex === index"
						:suggestion="suggestion"
						:key="suggestion.id"
						@mouseover="onSuggestionMouseOver( index )"
						domain="en.wikipedia.org"
					/>
				</li>
			</ol>
		</div>
		`
	} );
