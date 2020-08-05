import { mount } from '@vue/test-utils';
import WvuiTypeaheadSuggestionTitle from './TypeaheadSuggestionTitle.vue';
import * as suggestionsList from '../typeahead-suggestion/TypeaheadSuggestion.stories.json';

describe( 'matches the snapshot', () => {
	type Case = [string, Record<string, string>];

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
		]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiTypeaheadSuggestionTitle, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
