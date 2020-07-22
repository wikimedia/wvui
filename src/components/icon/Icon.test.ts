import { shallowMount } from '@vue/test-utils';
import WvuiIcon from './Icon.vue';

const iconString = 'path string';
const iconFlippable = {
	path: 'path flippable',
	flippable: true
};
const iconVariesPerDir = {
	paths: {
		ltr: 'path ltr',
		rtl: 'path rtl'
	}
};
const iconVariesPerLang = {
	languageMap: {
		de: 'b'
	},
	default: 'a',
	paths: {
		a: 'path a',
		b: 'path b'
	}
};

describe( 'matches the snapshot', () => {
	// [description, props, slot]
	type Case = [string, Record<keyof unknown, unknown>, string];

	const cases: Case[] = [
		[ 'With icon', { icon: iconString }, '' ],
		[ 'With icon and hex color', { icon: iconString, iconColor: '#ff6347' }, '' ],
		[ 'With icon and slot content', { icon: iconString }, 'Add something' ],
		[ 'With flippable icon', { icon: iconFlippable }, '' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = shallowMount( WvuiIcon, { propsData: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

/* eslint-disable @typescript-eslint/no-explicit-any */
it( 'handles ltr text direction', () => {
	// Default dir is 'ltr'.
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconVariesPerDir
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconVariesPerDir.paths.ltr );
} );

it( 'handles rtl text direction', () => {
	document.documentElement.setAttribute( 'dir', 'rtl' );
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconVariesPerDir
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconVariesPerDir.paths.rtl );
} );

it( 'handles language-specific icon default', () => {
	// Default lang is 'unknown'.
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconVariesPerLang
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconVariesPerLang.paths.a );
} );

it( 'handles language-specific icon', () => {
	document.documentElement.setAttribute( 'lang', 'de' );
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconVariesPerLang
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconVariesPerLang.paths.b );
} );

it( 'handles language-specific icon with explicit langCode prop', () => {
	document.documentElement.setAttribute( 'lang', 'en' );
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconVariesPerLang,
			langCode: 'de'
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconVariesPerLang.paths.b );
} );
