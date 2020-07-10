import { shallowMount } from '@vue/test-utils';
import WvuiTextIput from './TextInput.vue';

describe( 'wvui-text-input', () => {
	it( 'matches the snapshot', () => {
		const wrapper = shallowMount( WvuiTextIput );
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'emits input events', () => {
		const wrapper = shallowMount( WvuiTextIput );
		wrapper.get( 'input' ).trigger( 'input' );
		expect( wrapper.emitted().input ).toBeTruthy();
	} );

	it( 'emits change events', () => {
		const wrapper = shallowMount( WvuiTextIput );
		wrapper.get( 'input' ).trigger( 'change' );
		expect( wrapper.emitted().change ).toBeTruthy();
	} );
} );
