import { mount, Wrapper } from '@vue/test-utils';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';
import * as jestFetchMock from 'jest-fetch-mock';
import * as actionApiPages from './mocks/actionapi.suggestions.json';
import Vue from 'vue';

it( 'matches a snapshot', () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData: { buttonLabel: 'Search' } } );

	expect( wrapper.element ).toMatchSnapshot();
} );

it( 'should set correct classes for wrapper', async () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData: { buttonLabel: 'Search' } } );
	const input = wrapper.find( '.wvui-input__input' );
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const data = wrapper.vm.$data as any;

	await wrapper.trigger( 'mouseover' );

	expect( data.isHovered ).toStrictEqual( true );

	expect( wrapper.classes() ).toContain( 'wvui-typeahead-search--active' );

	await input.trigger( 'focus' );

	expect( data.isFocused ).toStrictEqual( true );

	expect( wrapper.classes() ).toContain( 'wvui-typeahead-search--focused' );

	await input.trigger( 'blur' );

	expect( data.isFocused ).toStrictEqual( false );

	expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--focused' );

	await wrapper.trigger( 'mouseout' );

	expect( data.isHovered ).toStrictEqual( false );

	expect( wrapper.classes() ).not.toContain( 'wvui-typeahead-search--active' );
} );

it( 'should set initial input value', () => {
	const initialInputValue = 'Some value';
	const wrapper = mount( WvuiTypeaheadSearch, {
		propsData: { initialInputValue, buttonLabel: '' }
	} );
	const input = wrapper.find( '.wvui-input__input' ).element as HTMLInputElement;

	expect( input.value ).toStrictEqual( initialInputValue );
} );

it( 'should set button label', () => {
	const buttonLabel = 'Some label';
	const wrapper = mount( WvuiTypeaheadSearch, {
		propsData: { buttonLabel }
	} );
	const button = wrapper.find( '.wvui-typeahead-search .wvui-button' );

	expect( button.text() ).toStrictEqual( buttonLabel );
} );

describe( 'with search results', () => {
	let wrapper: Wrapper<Vue>;
	let input: Wrapper<Vue>;
	let inputElement: HTMLInputElement;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapperVm: any;

	beforeAll( async () => {
		jestFetchMock.enableFetchMocks();

		fetchMock.mockIf( /^\/\/en.wikipedia.org\//, async () => {
			return {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				body: JSON.stringify( { query: { pages: ( actionApiPages as any ).pages } } ),
				headers: {
					'Content-Type': 'application/json'
				}
			};
		} );

		jest.useFakeTimers();

		wrapper = mount( WvuiTypeaheadSearch, { propsData: { buttonLabel: 'Search' } } );
		input = wrapper.find( '.wvui-input__input' );
		inputElement = input.element as HTMLInputElement;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		wrapperVm = wrapper.vm as any;

		await input.trigger( 'focus' );
		await input.setValue( 'test' );

		jest.runTimersToTime( 200 );

		await wrapper.vm.$nextTick();
	} );

	afterAll( () => {
		jestFetchMock.disableFetchMocks();
	} );

	it( 'matches snapshot with results', () => {
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'shows suggestions list', () => {
		const list = wrapper.find( '.wvui-typeahead-search__suggestions' );
		const suggestionItemComponent = wrapper
			.findAllComponents( { name: 'wvui-typeahead-suggestion' } );

		expect( list ).toBeTruthy();
		expect( suggestionItemComponent.length ).toEqual( 10 );
	} );

	it( 'sets value and highlights a suggestion on key down', async () => {
		await wrapper.trigger( 'keydown.down' );
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect( inputElement.value ).toStrictEqual( ( actionApiPages as any ).pages[ 0 ]?.title );

		expect( wrapperVm.$data.suggestionActiveIndex ).toStrictEqual( 0 );

		const activeSuggestion = wrapper.find( '.wvui-typeahead-suggestion--active' );

		expect( activeSuggestion ).toBeTruthy();
	} );

	it( 'highlights suggestion on mouseover', async () => {
		const suggestionItemComponent = wrapper
			.findComponent( { name: 'wvui-typeahead-suggestion' } );

		await suggestionItemComponent.trigger( 'mouseover' );

		expect( suggestionItemComponent.vm.$props.active ).toBe( true );
	} );

	it( 'sets query as the input value on last item navigated with keyboard', async () => {
		const footerClassName = 'wvui-typeahead-search__suggestions__footer';
		const footer = wrapper.find( `.${footerClassName}` );

		await wrapper.trigger( 'keydown.up' );

		expect( inputElement.value ).toBe( 'test' );
		expect( footer.classes() ).toContain( `${footerClassName}--active` );
	} );

	it( 'opens Special Search on last item navigated with keyboard and on enter pressed',
		async () => {
			wrapperVm.$refs.containingSearch.click = jest.fn();

			await wrapper.trigger( 'keydown.enter' );

			expect( wrapperVm.$refs.containingSearch.click ).toHaveBeenCalled();
		} );

} );
