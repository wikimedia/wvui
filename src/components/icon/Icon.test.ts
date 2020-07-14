import { shallowMount } from '@vue/test-utils';
import WvuiIcon from './Icon.vue';

describe( 'matches the snapshot', () => {
	// [description, props, slot]
	type Case = [string, Record<keyof unknown, unknown>, string];

	const cases: Case[] = [
		[ 'With icon', { icon: 'tag' }, '' ],
		[ 'With icon, inverted', { icon: 'tag', invert: true }, '' ],
		[ 'With icon and slot content', { icon: 'tag' }, 'Tag this image' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = shallowMount( WvuiIcon, { propsData: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
