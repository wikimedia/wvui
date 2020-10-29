import { mount, shallowMount } from '@vue/test-utils';
import WvuiTypeaheadSuggestion from './TypeaheadSuggestion.vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import * as suggestionsList from '../typeahead-search/mocks/restApi.suggestions.json';

describe( 'matches the snapshots when thumbnail is present/absent', () => {
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

describe( 'matches the snapshots when showThumbnail/showDescription are true/false', () => {
	type Case = [msg: string, props: Record<string, unknown>];

	const cases: Case[] = [
		[ 'showThumbnail: true', { suggestion: suggestionsList.pages[ 1 ] as
			SearchResult, showThumbnail: true } ],
		[ 'showThumbnail: false', { suggestion: suggestionsList.pages[ 1 ] as
			SearchResult, showThumbnail: false } ],
		[ 'showDescription: true', { suggestion: suggestionsList.pages[ 1 ] as
			SearchResult, showDescription: true } ],
		[ 'showDescription: false', { suggestion: suggestionsList.pages[ 1 ] as
			SearchResult, showDescription: false } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiTypeaheadSuggestion, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'event emitting', () => {
	const props = { suggestion: suggestionsList.pages[ 0 ] as SearchResult };
	const wrapper = shallowMount( WvuiTypeaheadSuggestion, { propsData: props } );

	it( 'emits mouseover events', async () => {
		await wrapper.findComponent( WvuiTypeaheadSuggestion )
			.trigger( 'mouseover' );

		expect( wrapper.emitted().mouseover ).toBeTruthy();
	} );

	it( 'emits click events', async () => {
		await wrapper.findComponent( WvuiTypeaheadSuggestion )
			.trigger( 'click' );

		expect( wrapper.emitted().click ).toBeTruthy();
	} );
} );
