import { mount, Wrapper } from '@vue/test-utils';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';
import * as jestFetchMock from 'jest-fetch-mock';
import * as restApiSuggestions from './mocks/restApi.suggestions.json';
import { DEBOUNCE_INTERVAL } from './TypeaheadSearch.constants';
import Vue from 'vue';
import { SearchResponse } from './http/SearchClient';

const propsData = {
	buttonLabel: 'Search',
	placeholder: 'Search Wikipedia',
	formAction: '/w/index.php',
	initialInputValue: '',
	footerSearchText: 'Search for pages containing',
	suggestionsLabel: 'search suggestions',
	domain: 'en.wikipedia.org',
	id: 'foo'
};

const defaultSlot = [
	'<input type="hidden" name="title" value="Special:Search">'
];

it( 'matches the snapshot', () => {
	const wrapper = mount( WvuiTypeaheadSearch, {
		propsData,
		slots: {
			default: defaultSlot
		}
	} );

	expect( wrapper.element ).toMatchSnapshot();
} );

it( 'should handle the user hovering', async () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData } );

	// The user's mouse enters the input's bounding rectangle
	await wrapper.trigger( 'mouseover' );

	expect( wrapper.classes() ).toContain( 'wvui-typeahead-search--active' );

	// ---

	// The user's mouse leaves the input's bounding rectangle
	await wrapper.trigger( 'mouseout' );

	expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--active' );
} );

it( 'should handle the user focusing', async () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData } );
	const input = wrapper.find( '.wvui-input__input' );

	// The user focuses the input
	await input.trigger( 'focus' );

	expect( wrapper.vm.$data.isFocused ).toStrictEqual( true );

	// ---

	// The user's focus leaves the input

	await input.trigger( 'blur' );

	expect( wrapper.vm.$data.isFocused ).toStrictEqual( false );
} );

it( 'should set the input value', () => {
	const initialInputValue = 'Some value';
	const wrapper = mount( WvuiTypeaheadSearch, {
		propsData: { ...propsData, initialInputValue }
	} );
	const input = wrapper.find( '.wvui-input__input' ).element as HTMLInputElement;

	expect( input.value ).toStrictEqual( initialInputValue );
} );

it( 'should set the button label', () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData } );
	const button = wrapper.find( '.wvui-typeahead-search .wvui-button' );

	expect( button.text() ).toStrictEqual( propsData.buttonLabel );
} );

describe( 'typing into input', () => {
	let onFetchStart: jest.Mock;
	let onFetchEnd: jest.Mock;
	let client: Record<string, jest.Mock>;
	let wrapper: Wrapper<Vue>;
	let input: Wrapper<Vue>;
	let fetchPromise: Promise<SearchResponse>;

	beforeEach( () => {
		onFetchStart = jest.fn();
		onFetchEnd = jest.fn();

		client = {
			fetchByTitle: jest.fn( () => {
				return {
					fetch: fetchPromise,
					abort: jest.fn()
				};
			} )
		};

		wrapper = mount( WvuiTypeaheadSearch, {
			propsData: {
				...propsData,
				client
			},
			listeners: {
				'fetch-start': onFetchStart,
				'fetch-end': onFetchEnd
			},
			slots: {
				default: defaultSlot
			}
		} );
		input = wrapper.find( '.wvui-input__input' );

		jest.useFakeTimers( 'modern' );
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );

	it( 'emits `fetch-start` and `fetch-end` events when successful response', async () => {
		fetchPromise = Promise.resolve( {
			query: 'test',
			results: []
		} );

		expect( onFetchStart.mock.calls.length ).toBe( 0 );
		expect( onFetchEnd.mock.calls.length ).toBe( 0 );

		input.setValue( 'test' );
		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		expect( onFetchStart.mock.calls.length ).toBe( 1 );
		expect( onFetchEnd.mock.calls.length ).toBe( 0 );

		await fetchPromise;

		expect( onFetchStart.mock.calls.length ).toBe( 1 );
		expect( onFetchEnd.mock.calls.length ).toBe( 1 );
	} );

	it( 'emits `fetch-start` but not `fetch-end` event when failed response', async () => {
		fetchPromise = Promise.reject( new Error( 'Network Error Test' ) );

		input.setValue( 'test' );
		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		expect( onFetchStart.mock.calls.length ).toBe( 1 );
		expect( onFetchEnd.mock.calls.length ).toBe( 0 );

		return fetchPromise.catch( () => {
			expect( onFetchStart.mock.calls.length ).toBe( 1 );
			expect( onFetchEnd.mock.calls.length ).toBe( 0 );
		} );

	} );

	it( 'does not call search client or emit events when blank input', async () => {
		input.setValue( '  ' );
		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		expect( onFetchStart.mock.calls.length ).toBe( 0 );
		expect( onFetchEnd.mock.calls.length ).toBe( 0 );
		expect( client.fetchByTitle.mock.calls.length ).toBe( 0 );
		expect( wrapper.vm.$data.suggestionsList ).toEqual( [ ] );
		expect( wrapper.vm.$data.searchQuery ).toEqual( '' );
	} );

	it( 'aborts the previous request when new input', async () => {
		fetchPromise = new Promise( () => {
			// No-op (represents a promise that hasn't resolved yet).
		} );

		input.setValue( 'first query' );
		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		expect( client.fetchByTitle.mock.results[ 0 ].value.abort.mock.calls.length ).toBe( 0 );

		input.setValue( 'second query' );
		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		expect( client.fetchByTitle.mock.results[ 0 ].value.abort.mock.calls.length ).toBe( 1 );

		input.setValue( '' );
		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		expect( client.fetchByTitle.mock.results[ 0 ].value.abort.mock.calls.length ).toBe( 1 );
		expect( client.fetchByTitle.mock.results[ 1 ].value.abort.mock.calls.length ).toBe( 1 );
	} );
} );

describe( 'when there are search results', () => {
	let wrapper: Wrapper<Vue>;
	let input: Wrapper<Vue>;
	let inputElement: HTMLInputElement;

	beforeEach( async () => {
		jestFetchMock.enableFetchMocks();

		fetchMock.mockIf( /^\/\/en.wikipedia.org\//, async () => {
			return {
				body: JSON.stringify( { pages: restApiSuggestions.pages } ),
				headers: {
					'Content-Type': 'application/json'
				}
			};
		} );

		jest.useFakeTimers( 'modern' );

		wrapper = mount( WvuiTypeaheadSearch, {
			propsData,
			slots: {
				default: defaultSlot
			}
		} );

		input = wrapper.find( '.wvui-input__input' );
		inputElement = input.element as HTMLInputElement;

		await input.trigger( 'focus' );
		await input.setValue( 'test' );

		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		await wrapper.vm.$nextTick();
	} );

	afterEach( () => {
		jest.useRealTimers();
		jestFetchMock.disableFetchMocks();
	} );

	it( 'matches the snapshot', () => {
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'shows suggestions list', () => {
		const suggestionItemComponent = wrapper.findAllComponents( {
			name: 'wvui-typeahead-suggestion'
		} );

		expect( wrapper.vm.$data.isExpanded ).toBeTruthy();
		expect( wrapper.classes() ).toContain( 'wvui-typeahead-search--expanded' );
		expect( suggestionItemComponent.length ).toEqual( restApiSuggestions.pages.length );
	} );

	it( 'sets value and highlights a suggestion on key down', async () => {

		// Note well that you can't trigger keydown.foo events via Wrapper#trigger. See
		// https://github.com/vuejs/vue-test-utils/issues/1295 for discussion.
		//
		// See also https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
		// for a list of accepted values for the key options entry.
		await wrapper.trigger( 'keydown', { key: 'ArrowDown' } );

		const expectedInputElementValue = restApiSuggestions.pages[ 0 ].title;

		expect( inputElement.value ).toStrictEqual( expectedInputElementValue );

		const expectedActiveIndex = 0;

		expect( wrapper.vm.$data.suggestionActiveIndex ).toStrictEqual( expectedActiveIndex );

		// ---

		const suggestion = wrapper.findAll( '.wvui-typeahead-suggestion' )
			.at( expectedActiveIndex );

		expect( suggestion.classes() ).toContain( 'wvui-typeahead-suggestion--active' );
	} );

	it( 'highlights suggestion on mouseover', async () => {
		const suggestion1 = wrapper.findComponent( {
			name: 'wvui-typeahead-suggestion'
		} );

		await suggestion1.trigger( 'mouseover' );

		expect( suggestion1.classes() ).toContain( 'wvui-typeahead-suggestion--active' );

		// ---

		const suggestion2 = wrapper.find( '.wvui-typeahead-search__suggestions__footer' );

		await suggestion2.trigger( 'mouseover' );

		expect( suggestion1.classes() ).not.toContain( 'wvui-typeahead-suggestion--active' );
		expect( suggestion2.classes() ).toContain(
			'wvui-typeahead-search__suggestions__footer--active'
		);
	} );

	// eslint-disable-next-line max-len
	it( 'wraps around to the footer suggestion when the user immediately presses up on the keyboard', async () => {
		const footerClassName = 'wvui-typeahead-search__suggestions__footer';
		const footer = wrapper.find( `.${footerClassName}` );

		await wrapper.trigger( 'keydown', { key: 'ArrowUp' } );

		expect( inputElement.value ).toBe( 'test' );
		expect( footer.classes() ).toContain( `${footerClassName}--active` );
	} );

	// eslint-disable-next-line max-len
	it( 'wraps around to the top of the suggestions list when navigating with the keyboard', async () => {
		await wrapper.trigger( 'keydown', { key: 'ArrowUp' } );
		await wrapper.trigger( 'keydown', { key: 'ArrowUp' } );
		await wrapper.trigger( 'keydown', { key: 'ArrowDown' } );
		await wrapper.trigger( 'keydown', { key: 'ArrowDown' } );

		expect( inputElement.value ).toStrictEqual( 'test' );

		let expectedActiveIndex = restApiSuggestions.pages.length + 1;

		expect( wrapper.vm.$data.suggestionActiveIndex ).toStrictEqual( expectedActiveIndex );

		// ---

		await wrapper.trigger( 'keydown', { key: 'ArrowDown' } );

		expect( inputElement.value ).toStrictEqual( restApiSuggestions.pages[ 0 ].title );

		expectedActiveIndex = 0;

		expect( wrapper.vm.$data.suggestionActiveIndex ).toStrictEqual( expectedActiveIndex );
	} );

	it( 'responds when the user clicks a suggestion', async () => {
		const suggestionComponent = wrapper.findComponent( {
			name: 'wvui-typeahead-suggestion'
		} );

		await suggestionComponent.trigger( 'click' );

		// We expect:

		// 1. The list of suggestions to be hidden
		expect( wrapper.vm.$data.isExpanded ).toBeFalsy();
		expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--expanded' );

		// ---

		// 2. The input's value to have been set the suggestion's title
		const suggestion = restApiSuggestions.pages[ 0 ];

		expect( inputElement.value ).toBe( suggestion.title ); // 2
	} );

	it( 'responds when the user clicks suggestions footer', async () => {
		const suggestionComponent = wrapper.find( '.wvui-typeahead-search__suggestions__footer' );

		await suggestionComponent.trigger( 'click' );

		// We expect:

		// 1. The list of suggestions to be hidden
		expect( wrapper.vm.$data.isExpanded ).toBeFalsy();
		expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--expanded' );

		// ---

		// 2. The input's value set to the search query
		expect( inputElement.value ).toBe( 'test' );

		// 3. The link's href needs to be maintained after the component's click
		// callbacks have executed so the browser can navigate to it.
		expect( suggestionComponent.attributes( 'href' ) ).toContain( 'search=test' );
		expect( suggestionComponent.attributes( 'href' ) ).toContain( 'fulltext=1' );
	} );

	it( 'hides the suggestions list when the user presses the escape key', async () => {
		await wrapper.trigger( 'keydown', { key: 'Escape' } );

		expect( wrapper.vm.$data.isExpanded ).toBeFalsy();
		expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--expanded' );
	} );

	it( 'hides the suggestions list when the user clears the input', async () => {
		await input.setValue( '' );

		jest.advanceTimersByTime( DEBOUNCE_INTERVAL );

		await wrapper.vm.$nextTick();

		// The suggestions list should be hidden
		expect( wrapper.vm.$data.isExpanded ).toBeFalsy();
		expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--expanded' );

		// ... and there shouldn't be any highlighted suggestions.
		expect( wrapper.vm.$data.suggestionActiveIndex ).toBe( -1 );
		expect( wrapper.find( '.wvui-typeahead-suggestion--active' ).exists() ).toBeFalsy();

		// ---

		await wrapper.trigger( 'keydown', { key: 'ArrowDown' } );

		expect( wrapper.vm.$data.suggestionActiveIndex ).toBe( -1 );
		expect( wrapper.find( '.wvui-typeahead-suggestion--active' ).exists() ).toBeFalsy();
	} );
} );
