import { mount, shallowMount } from '@vue/test-utils';
import WvuiInput from './Input.vue';
import WvuiButton from '../button/Button.vue';
import { InputType } from './InputType';

describe( 'matches the snapshot', () => {
	type Case = [string, Record<keyof unknown, unknown>];

	const cases: Case[] = Object.values( InputType ).map( ( type ) => [
		`Input Type: ${type} `,
		{ type }
	] ) as Case[];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( WvuiInput, { propsData: props } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'should render an icon', () => {
	const wrapper = shallowMount( WvuiInput, { propsData: { icon: 'search' } } );
	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.find( '.wvui-input__icon' ) ).toBeTruthy();
} );

it( 'should render a button in a slot', () => {
	const wrapper = shallowMount(
		WvuiInput,
		{
			propsData: { icon: 'search' },
			stubs: {
				'wvui-button': WvuiButton
			},
			slots: {
				default: '<wvui-button>Search</wvui-button>'
			}
		}
	);
	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.classes() ).toContain( 'wvui-input--has-control' );
	expect( wrapper.find( '.wvui-input__control' ) ).toBeTruthy();
	expect( wrapper.find( '.wvui-button' ) ).toBeTruthy();
} );

it( 'emits input events', async () => {
	const wrapper = shallowMount( WvuiInput );

	await wrapper.get( 'input' ).trigger( 'input' );
	expect( wrapper.emitted().input ).toBeTruthy();
} );

it( 'emits change events', () => {
	const wrapper = shallowMount( WvuiInput );

	wrapper.get( 'input' ).trigger( 'change' );
	expect( wrapper.emitted().change ).toBeTruthy();
} );

it( 'emits focus events', () => {
	const wrapper = shallowMount( WvuiInput );

	wrapper.get( 'input' ).trigger( 'focus' );
	expect( wrapper.emitted().focus ).toBeTruthy();
} );

it( 'emits blur events', () => {
	const wrapper = shallowMount( WvuiInput );

	wrapper.get( 'input' ).trigger( 'blur' );
	expect( wrapper.emitted().blur ).toBeTruthy();
} );

it( 'should emit focus on icon click', async () => {
	const wrapper = mount( WvuiInput, { propsData: { icon: 'search' } } );
	const iconElement = wrapper.find( '.wvui-input__icon' );
	const input: HTMLElement = wrapper.find( 'input' ).element;
	const focusSpy = jest.spyOn( input, 'focus' );

	await iconElement.trigger( 'click' );

	expect( focusSpy ).toHaveBeenCalled();

} );
