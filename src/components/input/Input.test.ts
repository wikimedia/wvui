import { InputType } from './InputType';
import WvuiInput from './Input.vue';
import { mount, shallowMount } from '@vue/test-utils';

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

it( 'focuses on selection', async () => {
	const wrapper = shallowMount(
		WvuiInput,
		{
			attachTo: document.body,
			propsData: {
				focus: true,
				value: 'abc',
				selection: { start: 1, end: 2, direction: 'forward' }
			}
		}
	);
	await wrapper.vm.$nextTick();
	const input = wrapper.find( 'input' ).element as HTMLInputElement;
	expect( document.activeElement ).toBe( input );
	expect( input.selectionStart ).toBe( 1 );
	expect( input.selectionEnd ).toBe( 2 );
	expect( input.selectionDirection ).toBe( 'forward' );
} );

it( 'should render an icon', () => {
	const wrapper = shallowMount( WvuiInput, { propsData: { icon: 'search' } } );

	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.find( '.wvui-input__icon' ) ).toBeTruthy();
} );

it( 'should render a clear icon', () => {
	const wrapper = shallowMount(
		WvuiInput,
		{ propsData: { clearable: true, value: 'Some value' } }
	);
	const clearElement = wrapper.find( '.wvui-input__indicator' );

	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.classes() ).toContain( 'wvui-input--clearable' );
	expect( clearElement ).toBeTruthy();
} );

it( 'should render an indicator', () => {
	const wrapper = shallowMount( WvuiInput, { propsData: { indicator: 'info' } } );

	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.find( '.wvui-input__indicator' ) ).toBeTruthy();
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
/*
* It is supposed to be reconsidered once
* wvui-icon component is done.
* */
it( 'should set and clear value', async () => {
	const wrapper = mount( WvuiInput, { propsData: { clearable: true, value: 'Some value' } } );
	const clearElement = wrapper.find( '.wvui-input__indicator' );
	const input = wrapper.find( 'input' ).element as HTMLInputElement;

	expect( input.value ).toEqual( 'Some value' );

	await clearElement.trigger( 'click' );

	expect( input.value ).toEqual( '' );
	expect( wrapper.emitted().input ).toBeTruthy();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect( ( wrapper.vm as any ).iconName ).toEqual( 'clear' );
} );
