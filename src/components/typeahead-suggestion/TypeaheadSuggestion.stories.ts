import { boolean, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import WvuiInput from '../input/Input.vue';
import { TypeaheadSuggestion } from './TypeaheadSuggestion';
import './TypeaheadSuggestion.stories.less';
import suggestionsList from './TypeaheadSuggestion.stories.json';

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
			suggestion(): TypeaheadSuggestion {
				const suggestion = suggestionsList.pages[ 1 ] as TypeaheadSuggestion;

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
				suggestionsList: suggestionsList.pages
			};
		},
		template: `
		<ol class="sb-search__suggestions">
			<li v-for="suggestion in suggestionsList" >
				<wvui-typeahead-suggestion
					query="co"
					:suggestion="suggestion"
					:key="suggestion.id"
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
				isVisible: false
			};
		},
		computed: {
			suggestionsList(): TypeaheadSuggestion[] {
				return this.isVisible ? ( suggestionsList.pages as [] ).slice( 0, 6 ) : [];
			}
		},
		methods: {
			onInput( event: InputEvent ): void {
				const { target } = event;

				this.isVisible = !!( target as HTMLInputElement ).value;
			}
		},
		template: `
		<div class="sb-search">
			<wvui-input 
				icon="search" 
				@input="onInput" 
				placeholder="Type something…"
			/>
			<ol
				v-if="suggestionsList.length"
				class="sb-search__suggestions"
				role="listbox"
			>
				<li 
					v-for="suggestion in suggestionsList" 
					role="option"
				>
					<wvui-typeahead-suggestion
						query="co"
						:suggestion="suggestion"
						:key="suggestion.id"
					/>
				</li>
			</ol>
		</div>
		`
	} );
