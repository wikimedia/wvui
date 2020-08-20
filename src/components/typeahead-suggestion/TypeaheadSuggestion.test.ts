import { mount } from '@vue/test-utils';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import * as suggestionsList from './TypeaheadSuggestion.stories.json';

describe( 'matches the snapshot', () => {
	type Case = [string, Record<string, SearchResult>];

	const cases: Case[] = [
		[ 'With thumbnail', { suggestion: suggestionsList.pages[ 1 ] as SearchResult } ],
		[ 'Without thumbnail', { suggestion: suggestionsList.pages[ 0 ] as SearchResult } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiTypeaheadSuggestion, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'should focus/blur on active/inactive states', () => {
	const div = document.createElement( 'div' );
	div.id = 'root';
	document.body.appendChild( div );
	const wrapper = mount( WvuiTypeaheadSuggestion, {
		attachTo: '#root'
	} );
	const el = wrapper.element as HTMLElement;

	console.log(el);

	wrapper.setData( { active: true } );

	expect( el ).toBe( document.activeElement );

	wrapper.destroy()

	// wrapper.setData( { active: false } );
	//
	// expect( el ).not.toBe( document.activeElement );
} );
