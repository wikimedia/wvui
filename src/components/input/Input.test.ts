import { mount, shallowMount } from '@vue/test-utils';
import WvuiInput from './Input.vue';
import WvuiIcon from './../icon/Icon.vue';
import { wvuiIconSearch, wvuiIconInfo } from '../../themes/icons';
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

it( 'should render start icon', () => {
	const wrapper = shallowMount( WvuiInput, {
		propsData: { startIcon: wvuiIconSearch },
		stubs: {
			'wvui-icon': WvuiIcon
		}
	} );

	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.classes() ).toContain( 'wvui-input--has-start-icon' );
	expect( wrapper.find( '.wvui-input__start-icon' ) ).toBeTruthy();
} );

it( 'should render end icon', () => {
	const wrapper = shallowMount( WvuiInput, {
		propsData: {
			endIcon: wvuiIconInfo
		},
		stubs: {
			'wvui-icon': WvuiIcon
		}
	} );

	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.classes() ).toContain( 'wvui-input--has-end-icon' );
	expect( wrapper.find( '.wvui-input__end-icon' ) ).toBeTruthy();
} );

it( 'should render a clear icon', () => {
	const wrapper = shallowMount(
		WvuiInput,
		{
			propsData: { clearable: true, value: 'Some value' },
			stubs: {
				'wvui-icon': WvuiIcon
			}
		}
	);
	const clearElement = wrapper.find( '.wvui-input__end-icon' );

	expect( wrapper.element ).toMatchSnapshot();
	expect( wrapper.classes() ).toContain( 'wvui-input--clearable' );
	expect( clearElement ).toBeTruthy();
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
	const clearElement = wrapper.find( '.wvui-input__end-icon' );
	const input = wrapper.find( 'input' ).element as HTMLInputElement;

	expect( input.value ).toEqual( 'Some value' );
	await clearElement.trigger( 'click' );
	expect( input.value ).toEqual( '' );
	expect( wrapper.emitted().input ).toBeTruthy();
} );
