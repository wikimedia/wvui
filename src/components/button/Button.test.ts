import { ButtonType } from './ButtonType';
import { ButtonAction } from './ButtonAction';
import { shallowMount } from '@vue/test-utils';
import WvuiButton from './Button.vue';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<keyof unknown, unknown>, slot: string];

	const cases: Case[] = [
		[ 'No props and no slot', {}, '' ],
		...( Object.values( ButtonAction ).map( ( action ) => [
			`${action} action`,
			{ action },
			''
		] ) as Case[] ),
		...( Object.values( ButtonType ).map( ( type ) => [
			`${type} type`,
			{ type },
			''
		] ) as Case [] ),
		[ 'Slotted', {}, '<span>Label</span>' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = shallowMount( WvuiButton, { propsData: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'emits click events', () => {
	const wrapper = shallowMount( WvuiButton );
	wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.emitted().click ).toBeTruthy();
} );
