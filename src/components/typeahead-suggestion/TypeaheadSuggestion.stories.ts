import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';
import './TypeaheadSuggestion.stories.less';
import defaultSuggestionsList from '../typeahead-search/mocks/restApi.suggestions.json';
import T277256SuggestionsList from '../typeahead-search/mocks/T277256.suggestions.json';

const firstSuggestion = defaultSuggestionsList.pages[ 1 ] as SearchResult;

export default {
	title: 'Components/TypeaheadSuggestion',
	component: WvuiTypeaheadSuggestion,
	argTypes: {
		query: {
			defaultValue: 'co'
		},
		suggestion: {
			table: {
				disable: true
			}
		},
		urlGenerator: {
			table: {
				disable: true
			}
		},
		...makeActionArgTypes( [ 'click', 'mouseover' ] )
	}
};

export const Configurable = ( args: Args, { argTypes } : StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSuggestion },
		props: Object.keys( argTypes )
			// eslint-disable-next-line no-restricted-syntax
			.filter( ( prop ) => ![ 'urlGenerator', 'suggestion' ].includes( prop ) ),
		computed: {
			suggestion(): SearchResult {
				return {
					id: 42,
					key: this.suggestionTitle as string,
					title: this.suggestionTitle as string,
					description: this.suggestionDescription as string,
					thumbnail: this.suggestionHasThumbnail as boolean ?
						{ url: this.suggestionThumbnailUrl as string } : undefined
				};
			},
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [
					'suggestionTitle',
					'suggestionDescription',
					'suggestionHasThumbnail',
					'suggestionThumbnailUrl'
				] );
			}
		},
		template: `
			<ol class="sb-search__suggestions" role="listbox">
				<li role="option">
					<wvui-typeahead-suggestion
						:suggestion="suggestion"
						v-bind="filteredProps"
						v-on="actionListeners"
					/>
				</li>
			</ol>
		`
	} );

Configurable.argTypes = {
	suggestionTitle: {
		control: 'text',
		defaultValue: firstSuggestion.title,
		description: 'Page title in the suggestion data',
		table: {
			category: 'Suggestion data'
		}
	},
	suggestionDescription: {
		control: 'text',
		defaultValue: firstSuggestion.description,
		description: 'Page description in the suggestion data',
		table: {
			category: 'Suggestion data'
		}
	},
	suggestionHasThumbnail: {
		control: 'boolean',
		defaultValue: true,
		description: 'Whether the suggestion data contains a thumbnail',
		table: {
			category: 'Suggestion data'
		}
	},
	suggestionThumbnailUrl: {
		control: 'text',
		defaultValue: firstSuggestion.thumbnail?.url,
		description: 'Thumbnail URL in the suggestion data',
		table: {
			category: 'Suggestion data'
		}
	}
};

type SuggestionsList = { pages: Record<string, unknown>[] };

function makeExampleListStory( suggestionsList : SuggestionsList, defaultQuery: string ) :
	( ( args: Args, context: StoryContext ) => Vue.Component ) {
	const story = ( args: Args, { argTypes } : StoryContext ) : Vue.Component =>
		Vue.extend( {
			components: { WvuiTypeaheadSuggestion },
			props: Object.keys( argTypes )
				// eslint-disable-next-line no-restricted-syntax
				.filter( ( prop ) => ![ 'urlGenerator', 'suggestion' ].includes( prop ) ),
			data() {
				return {
					suggestionsList: suggestionsList.pages,
					activeIndex: -1
				};
			},
			computed: {
				actionListeners() {
					return makeActionListeners( args, argTypes );
				}
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
						v-bind="$props"
						v-on="actionListeners"
						@mouseover="onSuggestionMouseOver( index )"
						:active="activeIndex === index"
						:suggestion="suggestion"
						:key="suggestion.id"
					/>
				</li>
			</ol>
			`
		} );
	story.argTypes = {
		active: {
			table: {
				disable: true
			}
		},
		query: {
			defaultValue: defaultQuery
		}
	};
	return story;
}

export const ExampleList = makeExampleListStory( defaultSuggestionsList, 'co' );

// This story serves to demonstrate how the highlighting mechanism in the
// typeahead-suggestion/typeahead-suggestion-title component handles languages with characters
// represented by more than one Unicode scalar values.
//
// See https://phabricator.wikimedia.org/T277256 and https://phabricator.wikimedia.org/T35242 for
// detail.
export const ExampleListWithGraphemes = makeExampleListStory( T277256SuggestionsList, 'ইতাল' );
