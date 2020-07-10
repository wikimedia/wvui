import { shallowMount } from '@vue/test-utils';
import WvuiIcon from './Icon.vue';

describe( 'matches the snapshot', () => {
	// [description, props]
	type Case = [string, Record<keyof unknown, unknown>];

	const cases: Case[] = [
		[ 'With icon', { icon: 'tag' } ],
		[ 'With icon, inverted', { icon: 'tag', invert: true } ],
		[ 'With icon and label', { icon: 'tag', label: 'Tag this image' } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( WvuiIcon, { propsData: props } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
