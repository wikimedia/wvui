import { shallowMount } from '@vue/test-utils';
import { ModelValue } from '../../composables/useModelWrapper';
import WvuiCheckbox from './Checkbox.vue';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<keyof unknown, unknown>, slot: string];

	type InputValue = string | number | boolean;
	interface PropsObject {
		modelValue: ModelValue,
		inputValue: InputValue
	}
	const generateProps = ( modelValue: ModelValue, inputValue: InputValue ): PropsObject => {
		return { modelValue, inputValue };
	};

	const cases: Case[] = [
		[ 'Enabled', generateProps( true, 'checkbox-1' ), 'Checkbox 1' ],
		[ 'Disabled', {
			disabled: true,
			...generateProps( false, 'checkbox-1' )
		}, 'Disabled checkbox' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = shallowMount(
			WvuiCheckbox,
			{ propsData: props, slots: { default: slot } }
		);
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Checkbox', () => {
	it( 'emits input event with boolean value when selected for single checkbox', async () => {
		const props = { modelValue: false, inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );

		expect( wrapper.emitted( 'input' ) ).toBeTruthy();
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ true ] );
	} );

	it( 'emits input event with array value when selected for a checkbox group', async () => {
		const props = { modelValue: [], inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );

		expect( wrapper.emitted( 'input' ) ).toBeTruthy();
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ [ 'checkbox-1' ] ] );
	} );

	it( 'is selected when value is true for single checkbox', async () => {
		const props = { modelValue: true, inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is not selected when value does not match inputValue', async () => {
		const props = { modelValue: false, inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( false );
	} );

	it( 'is selected when when inputValue is present in value array', async () => {
		const props = { modelValue: [ 'checkbox-1' ], inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is not selected when when inputValue is not present in value array', async () => {
		const props = { modelValue: [ 'checkbox-1' ], inputValue: 'checkbox-2' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( false );
	} );

	it( 'focuses on the input on label click', async () => {
		const props = { modelValue: true, inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;
		input.focus = jest.fn();

		await wrapper.find( 'label' ).trigger( 'click' );

		expect( input.focus ).toHaveBeenCalled();
	} );

	it( 'clicks the label on enter keydown', async () => {
		const props = { modelValue: true, inputValue: 'checkbox-1' };
		const wrapper = shallowMount( WvuiCheckbox, { propsData: props } );
		const label = wrapper.find( 'label' ).element as HTMLLabelElement;
		label.click = jest.fn();

		await wrapper.find( 'label' ).trigger( 'keydown.enter' );

		expect( label.click ).toHaveBeenCalled();
	} );
} );
