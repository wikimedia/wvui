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
			query: { type: String, default: text( 'Query (for highlighting)', 'Ob' ) }
		},
		computed: {
			suggestion(): TypeaheadSuggestion {
				const suggestion = suggestionsList.pages[ 1 ];
				return {
					...suggestionsList.pages[ 1 ],
					thumbnail: this.thumbnail ? suggestion.thumbnail : null
				};
			}
		},
		template: `
		<ul class="sb-suggestions-list" role="listbox">
			<wvui-typeahead-suggestion
				role="option"
				:suggestion="suggestion"
				:active="active"
				:query="query"
			/>
		</ul>
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
		<ul class="sb-suggestions-list">
			<wvui-typeahead-suggestion 
				query="ob"
				v-for="suggestion in suggestionsList" 
				:suggestion="suggestion"
				:key="suggestion.id"
			/>
		</ul>
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
		<div class="sb-search-wrapper">
			<wvui-input icon="search" @input="onInput" placeholder="Type something..."/>
			<ul class="sb-suggestions-list" v-if="suggestionsList.length">
				<wvui-typeahead-suggestion
					query="ob"
					v-for="suggestion in suggestionsList"
					:suggestion="suggestion"
					:key="suggestion.id"
				/>
			</ul>
		</div>
		`
	} );
