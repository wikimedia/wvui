import { mount } from '@vue/test-utils';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { TypeaheadSuggestion } from './TypeaheadSuggestion';
import * as suggestionsList from './TypeaheadSuggestion.stories.json';

describe( 'matches the snapshot', () => {
	type Case = [string, Record<string, TypeaheadSuggestion>];

	const cases: Case[] = [
		[ 'With thumnail', { suggestion: suggestionsList.pages[ 1 ] as TypeaheadSuggestion } ],
		[ 'Without thumnail', { suggestion: suggestionsList.pages[ 0 ] as TypeaheadSuggestion } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiTypeaheadSuggestion, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'should highlight query in the title', () => {
	const suggestion: TypeaheadSuggestion = suggestionsList.pages[ 1 ] as TypeaheadSuggestion;
	const wrapper = mount(
		WvuiTypeaheadSuggestion,
		{
			propsData: {
				suggestion,
				query: 'ob'
			}
		} );
	const emElement = wrapper.find( '.wvui-typeahead-suggestion__matching-title' );

	expect( wrapper.element ).toMatchSnapshot();
	expect( emElement ).toBeTruthy();
} );
