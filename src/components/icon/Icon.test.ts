import { shallowMount } from '@vue/test-utils';
import { Icon, IconVariedByLang, IconVariedByDir } from './../../themes/icons/iconTypes';
import WvuiIcon from './Icon.vue';

const iconSimple: Icon = { path: 'path string' };
const iconShouldFlip: Icon = {
	path: 'path flippable',
	shouldFlip: true,
	shouldFlipExceptions: [ 'he' ]
};
const iconDirLtr: Icon = { path: 'path ltr' };
const iconDirRtl: Icon = { path: 'path ltr' };
const iconDir: IconVariedByDir = {
	dirVariants: {
		ltr: iconDirLtr,
		rtl: iconDirRtl
	},
	default: iconDirLtr
};
const iconLangA: Icon = { path: 'path a' };
const iconLangB: Icon = { path: 'path a' };
const iconLang: IconVariedByLang = {
	langVariants: {
		de: iconLangB
	},
	default: iconLangA
};
const iconInvalid = {
	something: 'invalid'
};

describe( 'matches the snapshot', () => {
	// [description, props]
	type Case = [string, Record<keyof unknown, unknown>];

	const cases: Case[] = [
		[ 'With icon', { icon: iconSimple } ],
		[ 'With icon and hex color', { icon: iconSimple, iconColor: '#ff6347' } ],
		[ 'With icon and title', { icon: iconSimple, iconTitle: 'Add something' } ],
		[ 'With icon that should flip for RTL', { icon: iconShouldFlip } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( WvuiIcon, { propsData: props } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

/* eslint-disable @typescript-eslint/no-explicit-any */
it( 'handles shouldFlip exception', () => {
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconShouldFlip,
			langCode: 'he'
		}
	} );

	expect( ( wrapper.vm as any ).shouldFlip ).toBeFalsy();
} );

it( 'handles text direction default', () => {
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconDir
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconDir.default.path );
} );

it( 'handles rtl text direction', () => {
	document.documentElement.setAttribute( 'dir', 'rtl' );
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconDir
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconDir.dirVariants.rtl.path );
} );

it( 'handles language-specific icon default', () => {
	// Default lang is 'unknown'.
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconLang
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconLang.default.path );
} );

it( 'handles language-specific icon', () => {
	document.documentElement.setAttribute( 'lang', 'de' );
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconLang
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconLang.langVariants.de.path );
} );

it( 'handles language-specific icon with explicit langCode prop', () => {
	document.documentElement.setAttribute( 'lang', 'en' );
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconLang,
			langCode: 'de'
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( iconLang.langVariants.de.path );
} );

it( 'returns nothing given invalid icon', () => {
	const wrapper = shallowMount( WvuiIcon, {
		propsData: {
			icon: iconInvalid
		}
	} );

	expect( ( wrapper.vm as any ).iconPath ).toMatch( '' );
} );
