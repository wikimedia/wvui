import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import { OptionsMenuItem } from '../options-menu/OptionsMenuItem';
import WvuiOptionsMenu from './OptionsMenu.vue';

const baseItems: OptionsMenuItem[] = [
	{ id: '1', label: 'One' },
	{ id: '2', label: 'Two', disabled: true },
	{ id: '3', label: 'Three' },
	{ id: '4', label: 'Four' }
];

const makeKeyEvent = ( key: string ) : KeyboardEvent =>
	new KeyboardEvent( 'keydown', { key } );

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		propsData: Record<keyof unknown, unknown>,
		scopedSlots: Record<string, string>
	];

	const cases : Case[] = [
		[
			'Nothing selected',
			{
				items: baseItems
			},
			{}
		],
		[
			'Item selected',
			{
				items: baseItems,
				selectedItemId: '3'
			},
			{}
		],
		[
			'Nonexistent item selected',
			{
				items: baseItems,
				selectedItemId: '42'
			},
			{}
		],
		[
			'Disabled item selected',
			{
				items: baseItems,
				selectedItemId: '2'
			},
			{}
		],
		[
			'Custom slot',
			{
				items: baseItems
			},
			{
				default: `
					<p slot-scope="{ item }">
						{{item.label }} (ID: {{item.id}})
						<template v-if="item.disabled">(DISABLED)</template>
					</p>
				`
			}
		]
	];
	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, propsData, scopedSlots ) => {
		const wrapper = shallowMount(
			WvuiOptionsMenu,
			{ propsData, scopedSlots }
		);
		expect( wrapper.element ).toMatchSnapshot();
	} );

} );

describe( 'OptionsMenu', () => {
	const basicProps = {
		items: baseItems
	};

	it( 'emits select event when an item is clicked', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, { propsData: basicProps } );
		await wrapper.findAll( 'li' ).at( 0 ).trigger( 'click' );

		expect( wrapper.emitted( 'select' ) ).toBeTruthy();
		expect( wrapper.emitted( 'select' )?.[ 0 ] ).toEqual( [ baseItems[ 0 ].id ] );
	} );

	it( 'emits no event when a disabled item is clicked', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, { propsData: basicProps } );
		await wrapper.findAll( 'li' ).at( 1 ).trigger( 'click' );

		expect( wrapper.emitted( 'select' ) ).toBeFalsy();
	} );

	it( 'makes an element active on mousedown, removes active on mouseup', async () => {
		// We have to do a full mount and attach to the document so that the mouseup listener works
		const wrapper = mount( WvuiOptionsMenu, {
			propsData: basicProps,
			attachTo: document.body
		} );
		const firstItem = wrapper.findAll( 'li' ).at( 0 );

		expect( firstItem.classes() ).not.toContain( 'wvui-options-menu__item--active' );
		await firstItem.trigger( 'mousedown' );
		expect( firstItem.classes() ).toContain( 'wvui-options-menu__item--active' );
		await firstItem.trigger( 'mouseup' );
		expect( firstItem.classes() ).not.toContain( 'wvui-options-menu__item--active' );
	} );

	it( 'does not make a disabled element active on mousedown', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, { propsData: basicProps } );
		const disabledItem = wrapper.findAll( 'li' ).at( 1 );

		expect( disabledItem.classes() ).not.toContain( 'wvui-options-menu__item--active' );
		await disabledItem.trigger( 'mousedown' );
		expect( disabledItem.classes() ).not.toContain( 'wvui-options-menu__item--active' );

	} );

	it( 'moves highlight when pressing down arrow with no selection', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: basicProps
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 0 );

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		// Skips over the disabled item at index 1
		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 2 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 3 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		// Loop back to the start
		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );
	} );

	it( 'moves highlight when pressing up arrow with no selection', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: basicProps
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 0 );

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowUp' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowUp' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 3 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowUp' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 2 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		// Loop back to the start, skipping over the disabled item at index 1
		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowUp' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );
	} );

	it( 'moves highlight when pressing down arrow with existing selection', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: {
				...basicProps,
				selectedItemId: '3'
			}
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 3 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );
	} );

	it( 'skips over two disabled items in a row', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: {
				items: [
					{ id: '1', label: 'One' },
					{ id: '2', label: 'Two', disabled: true },
					{ id: '3', label: 'Three', disabled: true },
					{ id: '4', label: 'Four' }
				]
			}
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 0 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 1 );
		expect( wrapper.findAll( 'li' ).at( 3 ).classes() )
			.toContain( 'wvui-options-menu__item--highlighted' );

	} );

	it( 'does not highlight an item on down arrow if all items are disabled', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: {
				items: [
					{ id: '1', label: 'One', disabled: true },
					{ id: '2', label: 'Two', disabled: true },
					{ id: '3', label: 'Three', disabled: true },
					{ id: '4', label: 'Four', disabled: true }
				]
			}
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 0 );
	} );

	it( 'selects the highlighted item when pressing enter, and unsets highlight', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: {
				...basicProps,
				selectedItemId: '3'
			}
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		vueComponent.handleKeyboardEvent( makeKeyEvent( 'Enter' ) );
		await vueComponent.$nextTick();

		expect( wrapper.emitted( 'select' ) ).toBeTruthy();
		expect( wrapper.emitted( 'select' )?.[ 0 ] ).toEqual( [ baseItems[ 3 ].id ] );
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 0 );
	} );

	it( 'unsets the highlight when selecting an item using the mouse', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: {
				...basicProps,
				selectedItemId: '3'
			}
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		await wrapper.findAll( 'li' ).at( 2 ).trigger( 'click' );
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 0 );
	} );

	it( 'unsets active and highlight when items array changes', async () => {
		const wrapper = shallowMount( WvuiOptionsMenu, {
			propsData: {
				...basicProps,
				selectedItemId: '3'
			}
		} );
		const vueComponent = wrapper.vm as Vue & {
			handleKeyboardEvent: ( event: KeyboardEvent ) => void
		};

		vueComponent.handleKeyboardEvent( makeKeyEvent( 'ArrowDown' ) );
		await vueComponent.$nextTick();
		await wrapper.findAll( 'li' ).at( 0 ).trigger( 'mousedown' );
		await wrapper.setProps( { items: [ ...basicProps.items, { id: '5', label: 'Five' } ] } );
		expect( wrapper.findAll( '.wvui-options-menu__item--highlighted' ).length ).toEqual( 0 );
		expect( wrapper.findAll( '.wvui-options-menu__item--active' ).length ).toEqual( 0 );
	} );

	it( 'checks for duplicate item IDs', async () => {
		const consoleSpy = jest.spyOn( console, 'error' );
		shallowMount( WvuiOptionsMenu, {
			propsData: {
				items: [
					{ id: '1', label: 'One' },
					{ id: '2', label: 'Two' },
					{ id: '1', label: 'One again' },
					{ id: '2', label: 'Two again' }
				]
			}
		} );
		// await wrapper.vm.$nextTick();
		expect( consoleSpy ).toHaveBeenCalledWith( 'Duplicate item ID 1' );

	} );
} );
