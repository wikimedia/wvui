import { mount, shallowMount } from '@vue/test-utils';
import { OptionsMenuItem } from '../options-menu/OptionsMenuItem';
import WvuiDropdown from './Dropdown.vue';
import WvuiOptionsMenu from '../options-menu/OptionsMenu.vue';

const baseItems: OptionsMenuItem[] = [
	{ id: '1', label: 'One' },
	{ id: '2', label: 'Two', disabled: true },
	{ id: '3', label: 'Three' }
];

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		propsData: Record<keyof unknown, unknown>,
		scopedSlots: Record<string, string>
	];

	const selectedItemSlot = `
		<p slot-scope="{ item, defaultLabel }">
			<template v-if="item">
				Something selected: {{ item.label }} (ID: {{item.id }})
				<template v-if="item.disabled">(DISABLED)</template>
			</template>
			<template v-else>
				Nothing selected: {{ defaultLabel }}
			</template>
		</p>
	`;

	const cases : Case[] = [
		[
			'No default label, nothing selected',
			{
				items: baseItems
			},
			{}
		],
		[
			'With default label, nothing selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something'
			},
			{}
		],
		[
			'Item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something',
				selectedItemId: '3'
			},
			{}
		],
		[
			'Nonexistent item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something',
				selectedItemId: '42'
			},
			{}
		],
		[
			'Disabled item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something',
				selectedItemId: '2'
			},
			{}
		],
		[
			'Custom selectedItem slot, no item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something'
			},
			{
				selectedItem: selectedItemSlot
			}
		],
		[
			'Custom selectedItem slot, item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something',
				selectedItemId: '1'
			},
			{
				selectedItem: selectedItemSlot
			}
		],
		[
			'Custom selectedItem slot, nonexistent item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something',
				selectedItemId: '42'
			},
			{
				selectedItem: selectedItemSlot
			}
		],
		[
			'Custom selectedItem slot, disabled item selected',
			{
				items: baseItems,
				defaultLabel: 'Choose something',
				selectedItemId: '2'
			},
			{
				selectedItem: selectedItemSlot
			}
		]
	];
	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, propsData, scopedSlots ) => {
		const wrapper = shallowMount(
			WvuiDropdown,
			{ propsData, scopedSlots }
		);
		expect( wrapper.element ).toMatchSnapshot();
	} );

} );

describe( 'Dropdown', () => {
	const basicProps = {
		items: baseItems
	};

	it( 'opens menu and focuses handle when clicked', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps, attachTo: document.body } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'click' );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
		expect( wrapper.find( '.wvui-dropdown__handle' ).element ).toBe( document.activeElement );
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'click' );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
	} );

	it( 'opens menu when arrow key is pressed', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
	} );

	it( 'does not open menu or focus handle on click or arrow key if disabled', async () => {
		const wrapper = mount( WvuiDropdown, {
			propsData: {
				...basicProps,
				disabled: true
			},
			attachTo: document.body
		} );
		const handle = wrapper.find( '.wvui-dropdown__handle' );
		const menu = wrapper.find( '.wvui-dropdown__menu' );

		await handle.trigger( 'click' );
		expect( menu.isVisible() ).toBeFalsy();
		expect( handle.element ).not.toBe( document.activeElement );

		await handle.trigger( 'keydown', { key: 'ArrowDown' } );
		expect( menu.isVisible() ).toBeFalsy();
	} );

	it( 'closes menu on escape and on blur', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'click' );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'keydown', { key: 'Escape' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();

		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'click' );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'blur' );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
	} );

	it( 'emits change event and closes menu when a selection is made', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps } );
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'click' );
		wrapper.findComponent( WvuiOptionsMenu ).vm.$emit( 'select', baseItems[ 0 ].id );
		await wrapper.vm.$nextTick();
		expect( wrapper.emitted( 'change' ) ).toBeTruthy();
		expect( wrapper.emitted( 'change' )?.[ 0 ] ).toEqual( [ baseItems[ 0 ].id ] );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
	} );

	it( 'emits change event and closes menu on enter when an item is highlighted', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps } );
		const handle = wrapper.find( '.wvui-dropdown__handle' );
		const menu = wrapper.find( '.wvui-dropdown__menu' );

		// Cause the menu to open and the first item to be highlighted
		await handle.trigger( 'keydown', { key: 'ArrowDown' } );
		expect( menu.isVisible() ).toBeTruthy();
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		await handle.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted( 'change' ) ).toBeTruthy();
		expect( wrapper.emitted( 'change' )?.[ 0 ] ).toEqual( [ baseItems[ 0 ].id ] );
		expect( menu.isVisible() ).toBeFalsy();

	} );

	it( 'opens and closes menu on enter', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
		await wrapper.find( '.wvui-dropdown__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
	} );

	it( 'opens the menu on enter without triggering selection', async () => {
		const wrapper = mount( WvuiDropdown, { propsData: basicProps } );
		const handle = wrapper.find( '.wvui-dropdown__handle' );

		// Cause the menu to open and the first item to be highlighted
		await handle.trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		// Close the menu
		await handle.trigger( 'keydown', { key: 'Escape' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeFalsy();
		// The item should still be highlighted
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		await handle.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.wvui-dropdown__menu' ).isVisible() ).toBeTruthy();
		// Item should be highlighted but not selected
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.not.toContain( 'wvui-options-menu__item--selected' );
		// No change event should have been emitted
		expect( wrapper.emitted( 'change' ) ).toBeFalsy();
	} );
} );
