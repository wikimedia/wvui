import { mount } from '@vue/test-utils';
import WvuiTypeaheadSuggestionTitle from './TypeaheadSuggestionTitle.vue';
import * as suggestionsList from '../typeahead-search/mocks/restApi.suggestions.json';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<string, unknown>];

	const { title } = suggestionsList.pages[ 1 ];
	const cases: Case[] = [
		[
			'With highlight (query matches)',
			{
				title,
				query: title.substring( 0, 2 )
			}
		],
		[
			'Without highlight (no query)',
			{ title: suggestionsList.pages[ 1 ].title }
		],
		[
			'Without highlight (query doesn\'t match)',
			{ title: suggestionsList.pages[ 1 ].title, query: '123' }
		],
		[
			'Without highlight (query matches but highlighting is disabled)',
			{
				title,
				query: title.substring( 0, 2 ),
				highlightQuery: false
			}
		]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiTypeaheadSuggestionTitle, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
