import { shallowMount } from '@vue/test-utils';
import { Icon, IconFlipForRtl } from './iconTypes';
import WvuiIcon from './Icon.vue';

const iconString: Icon = 'path string';
const iconShouldFlip: IconFlipForRtl = {
	path: 'path should flip',
	shouldFlip: true
};

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<keyof unknown, unknown>];

	const cases: Case[] = [
		[ 'With icon', { icon: iconString } ],
		[ 'With icon and title', { icon: iconString, iconTitle: 'Add something' } ],
		[ 'With icon that should flip for RTL', { icon: iconShouldFlip } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( WvuiIcon, { propsData: props } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
