import { shallowMount } from '@vue/test-utils';
import { ModelValue } from '../../composables/useModelWrapper';
import WvuiRadio from './Radio.vue';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<keyof unknown, unknown>, slot: string];

	type InputValue = string | number | boolean;
	interface PropsObject {
		modelValue: ModelValue,
		inputValue: InputValue,
		name: string,
	}
	const generateProps = (
		modelValue: ModelValue,
		inputValue: InputValue,
		name: string
	): PropsObject => {
		return { modelValue, inputValue, name };
	};

	const cases: Case[] = [
		[ 'String value', generateProps( 'radio-1', 'radio-1', 'radios-string' ), 'Radio 1' ],
		[ 'Number value', generateProps( 2, 2, 'radios-number' ), 'Radio 2' ],
		[ 'Boolean value', generateProps( true, true, 'radios-boolean' ), 'True' ],
		[ 'Disabled', {
			disabled: true,
			...generateProps( 'radio-1', 'radio-disabled', 'radios-string' )
		}, 'Disabled radio' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = shallowMount( WvuiRadio, { propsData: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Radio', () => {
	it( 'emits input event with value when selected', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( WvuiRadio, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );

		expect( wrapper.emitted( 'input' ) ).toBeTruthy();
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'radio-2' ] );
	} );

	it( 'is selected when modelValue matches inputValue', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-1',
			name: 'radio-group'
		};
		const wrapper = shallowMount( WvuiRadio, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is not selected when modelValue does not match inputValue', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( WvuiRadio, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( false );
	} );

	it( 'focuses on the input on label click', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( WvuiRadio, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;
		input.focus = jest.fn();

		await wrapper.find( 'label' ).trigger( 'click' );

		expect( input.focus ).toHaveBeenCalled();
	} );
} );
