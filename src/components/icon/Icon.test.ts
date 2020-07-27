import { shallowMount } from '@vue/test-utils';
import { Icon } from './iconTypes';
import WvuiIcon from './Icon.vue';

const iconString = 'path string';
const iconShouldFlip: Icon = {
	path: 'path should flip',
	shouldFlip: true
};

describe( 'matches the snapshot', () => {
	// [description, props]
	type Case = [string, Record<keyof unknown, unknown>];

	const cases: Case[] = [
		[ 'With icon', { icon: iconString } ],
		[ 'With icon and hex color', { icon: iconString, iconColor: '#ff6347' } ],
		[ 'With icon and title', { icon: iconString, iconTitle: 'Add something' } ],
		[ 'With icon that should flip for RTL', { icon: iconShouldFlip } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( WvuiIcon, { propsData: props } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
