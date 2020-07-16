import { PrimaryAction } from '../../actions/PrimaryAction';
import { shallowMount } from '@vue/test-utils';
import WvuiButton from './Button.vue';

describe( 'matches the snapshot', () => {
	// [description, props, slot]
	type Case = [string, Record<keyof unknown, unknown>, string];

	const cases: Case[] = [
		[ 'No props and no slot', {}, '' ],
		...( Object.values( PrimaryAction ).map( ( action ) => [
			`${action} action`,
			{ action },
			''
		] ) as Case[] ),
		[ 'Quiet', { quiet: true }, '' ],
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
