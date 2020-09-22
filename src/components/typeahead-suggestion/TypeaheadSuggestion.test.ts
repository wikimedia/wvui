import { mount, shallowMount } from '@vue/test-utils';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import * as suggestionsList from './TypeaheadSuggestion.stories.json';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<string, SearchResult>];

	const cases: Case[] = [
		[ 'With thumbnail', { suggestion: suggestionsList.pages[ 1 ] as SearchResult } ],
		[ 'Without thumbnail', { suggestion: suggestionsList.pages[ 0 ] as SearchResult } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiTypeaheadSuggestion, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'should focus/blur on active/inactive states', async () => {
	const div = document.createElement( 'div' );

	div.id = 'root';
	document.body.appendChild( div );

	const wrapper = mount( WvuiTypeaheadSuggestion, {
		attachTo: '#root',
		propsData: {
			suggestion: suggestionsList.pages[ 1 ]
		}
	} );
	const el = wrapper.element as HTMLElement;

	await wrapper.setProps( { active: true } );

	expect( el ).toBe( document.activeElement );

	await wrapper.setProps( { active: false } );

	expect( el ).not.toBe( document.activeElement );

} );

it( 'emits mouseover event', () => {
	const wrapper = shallowMount( WvuiTypeaheadSuggestion, {
		propsData: {
			suggestion: suggestionsList.pages[ 1 ]
		}
	} );

	wrapper.get( '.wvui-typeahead-suggestion' ).trigger( 'mouseover' );
	expect( wrapper.emitted().mouseover ).toBeTruthy();
} );
