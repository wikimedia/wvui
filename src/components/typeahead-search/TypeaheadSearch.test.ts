import { mount, Wrapper } from '@vue/test-utils';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';
import Vue from 'vue';

it( 'matches a snapshot', () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData: { buttonLabel: 'Search' } } );

	expect( wrapper.element ).toMatchSnapshot();
} );

it( 'should set correct classes for wrapper', async () => {
	const wrapper = mount( WvuiTypeaheadSearch, { propsData: { buttonLabel: 'Search' } } );
	const input = wrapper.find( '.wvui-input__input' );
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



	//
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
	const button = wrapper.find( '.wvui-button' );

	expect( button.text() ).toStrictEqual( buttonLabel );
} );

describe( 'with search results', () => {
	let wrapper: Wrapper<Vue>;
	let input: Wrapper<Vue>;

	beforeEach( async () => {
		wrapper = mount( WvuiTypeaheadSearch, { propsData: { buttonLabel: 'Search' } } );
		input = wrapper.find( '.wvui-input__input' );

		await input.trigger( 'focus' );

		await wrapper.find( '.wvui-input__input' ).setValue( 'search' );

		await wrapper.vm.$nextTick();
	} );

	it( 'matches snapshot with results', () => {
		expect( wrapper.element ).toMatchSnapshot();
	} );

} );
