import { boolean, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import './TypeaheadSuggestion.stories.less';
import suggestionsList from '../typeahead-search/mocks/restApi.suggestions.json';

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
				default: boolean( 'Has thumbnail?', true )
			},
			showThumbnail: {
				type: Boolean,
				default: boolean( 'Show thumbnail?', true )
			},
			showDescription: {
				type: Boolean,
				default: boolean( 'Show description?', true )
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
					:showThumbnail="showThumbnail"
					:showDescription="showDescription"
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
				/>
			</li>
		</ol>
		`
	} );
