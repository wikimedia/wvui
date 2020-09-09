import { mount, shallowMount } from '@vue/test-utils';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import * as suggestionsList from '../typeahead-search/mocks/restapi.suggestions.json';

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

it( 'emits mouseover event', () => {
	const wrapper = shallowMount( WvuiTypeaheadSuggestion, {
		propsData: {
			suggestion: suggestionsList.pages[ 1 ]
		}
	} );

	wrapper.get( '.wvui-typeahead-suggestion' ).trigger( 'mouseover' );
	expect( wrapper.emitted().mouseover ).toBeTruthy();
} );

it( 'emits focus event', () => {
	const wrapper = shallowMount( WvuiTypeaheadSuggestion, {
		propsData: {
			suggestion: suggestionsList.pages[ 1 ]
		}
	} );

	wrapper.get( '.wvui-typeahead-suggestion' ).trigger( 'focus' );
	expect( wrapper.emitted().focus ).toBeTruthy();
} );

it( 'emits click event', () => {
	const wrapper = shallowMount( WvuiTypeaheadSuggestion, {
		propsData: {
			suggestion: suggestionsList.pages[ 1 ]
		}
	} );

	wrapper.get( '.wvui-typeahead-suggestion' ).trigger( 'click' );
	expect( wrapper.emitted().click ).toBeTruthy();
} );
