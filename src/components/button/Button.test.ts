import { shallowMount } from '@vue/test-utils';
import WvuiButton from './Button.vue';

describe( 'wvui-button', () => {
	it( 'matches the snapshot', () => {
		const wrapper = shallowMount( WvuiButton );
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders button element', () => {
		const wrapper = shallowMount( WvuiButton );

		expect( wrapper.get( 'button' ) ).toBeTruthy();
	} );

	it( 'do something on click', () => {
		const wrapper = shallowMount( WvuiButton );

		wrapper.find( 'button' ).trigger( 'click' );
		expect( wrapper.emitted().click ).toBeTruthy();
	} );
} );
