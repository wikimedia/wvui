<template>
	<ul
		class="wvui-options-menu"
		role="listbox"
	>
		<li
			v-for="( item, index ) in items"
			:key="item.id"
			class="wvui-options-menu__item"
			:class="itemClasses( item, index )"
			role="option"
			:aria-disabled="item.disabled ? true : null"
			:aria-selected="selectedItemId === item.id"
			@click="onItemClick( item )"
			@mousedown.prevent="onItemMousedown( item, index )"
		>
			<!--
				@slot Display of an individual item in the list
				@binding {OptionsMenuItem} item
			-->
			<slot :item="item">
				{{ item.label }}
			</slot>
		</li>
	</ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { OptionsMenuItem } from './OptionsMenuItem';

/**
 * Menu that displays a set of options, and lets the user select one.
 *
 * This component is designed to be used inside other components. The logic for keyboard navigation
 * between items is implemented here, but this component doesn't attach keyboard event listeners.
 * The parent component is expected to listen for keyboard events and call handleKeyboardEvent().
 *
 * Set the available items through the items prop, and get/set the ID of the selected item through
 * v-model. The v-model value will be the .id property of the selected item, or null if no item
 * is selected.
 *
 * How items are displayed in the menu can be customized through the main slot. By default, the
 * item's label is used.
 *
 * @example
 *     <wvui-options-menu
 *         v-model="number"
 *         :items="[{id: 1, label: 'One'}, {id: 2, label: 'Two'}]"
 *     />
 *
 * @example
 *     <wvui-options-menu
 *         #default="{ item }"
 *         v-model="number"
 *         :items="[{id: 1, label: 'One'}, {id: 2, label: 'Two'}]"
 *     >
 *         {{ item.label }} (id: {{ item.id }})
 *     </wvui-options-menu>
 */
export default Vue.extend( {
	name: 'WvuiOptionsMenu',
	model: {
		prop: 'selectedItemId',
		event: 'select'
	},
	props: {
		/**
		 * Items to list in the menu. Item IDs must be unique within each menu.
		 */
		items: {
			type: Array as PropType<OptionsMenuItem[]>,
			required: true,
			validator: function ( items ) {
				if ( !Array.isArray( items ) ) {
					return false;
				}
				// Check for duplicate item IDs
				const seenIDs : Record<string, boolean> = {};
				for ( const item of items as OptionsMenuItem[] ) {
					if ( seenIDs[ item.id ] ) {
						// eslint-disable-next-line no-console
						console.error( `Duplicate item ID ${item.id}` );
						return false;
					}
					seenIDs[ item.id ] = true;
				}
				return true;
			}
		},
		/**
		 * The ID of the selected item, or null if no item is selected. This is the v-model value.
		 */
		selectedItemId: {
			type: String as PropType<string|null>,
			default: null
		}
	},
	data() {
		return {
			// Index of the active item (item the mouse is being held down on), or null if none
			activeItemIndex: null as number|null,
			// Index of the item currently highlighted with keyboard navigation, or null if none
			highlightedItemIndex: null as number|null
		};
	},
	watch: {
		items() {
			// If the items array changes, the indexes may not point to the same items anymore,
			// and may be out of bounds
			this.activeItemIndex = null;
			this.highlightedItemIndex = null;
		}
	},
	methods: {
		itemClasses( item: OptionsMenuItem, index: number ) : Record<string, boolean> {
			return {
				'wvui-options-menu__item--selected': this.selectedItemId === item.id,
				'wvui-options-menu__item--active': this.activeItemIndex === index,
				'wvui-options-menu__item--highlighted': this.highlightedItemIndex === index,
				'wvui-options-menu__item--enabled': !item.disabled,
				'wvui-options-menu__item--disabled': !!item.disabled
			};
		},
		onItemMousedown( item: OptionsMenuItem, index: number ) {
			if ( item.disabled ) {
				return;
			}
			this.activeItemIndex = index;
			const mouseupHandler = () : void => {
				this.activeItemIndex = null;
				document.documentElement.removeEventListener( 'mouseup', mouseupHandler );
			};
			document.documentElement.addEventListener( 'mouseup', mouseupHandler );
		},
		onItemClick( item: OptionsMenuItem ) {
			if ( !item.disabled ) {
				this.$emit( 'select', item.id );
				this.highlightedItemIndex = null;
			}
		},
		// This is a method instead of a computed property because it's needed so infrequently
		getSelectedItemIndex() : number|null {
			if ( this.selectedItemId === null ) {
				return null;
			}
			// We're not allowed to use .findIndex() because we're targeting ES5
			let selectedItemIndex = -1;
			for ( let i = 0; i < this.items.length; i++ ) {
				if ( this.items[ i ].id === this.selectedItemId ) {
					selectedItemIndex = i;
				}
			}
			return selectedItemIndex === -1 ? null : selectedItemIndex;
		},
		moveHighlight( direction: 'backward' | 'forward' ) {
			if ( this.items.length === 0 ) {
				return;
			}

			const move = direction === 'backward' ? -1 : 1;
			// Function that returns the previous/next index, wrapping around the start/end.
			// ( i + move ) % length doesn't work, because -1 % length is -1, but we need length-1.
			// Adding length to the left-hand side gets us the right result when i=0 and move=-1.
			const nextIndex = ( i: number ) : number =>
				( i + move + this.items.length ) % this.items.length;
			let startIndex : number;

			if ( this.highlightedItemIndex === null ) {
				// Start at the selected item, if there is one, and move by one.
				// If no item is selected, start at the first item and don't move.
				const selectedItemIndex = this.getSelectedItemIndex();
				startIndex = selectedItemIndex === null ? 0 : nextIndex( selectedItemIndex );
			} else {
				startIndex = nextIndex( this.highlightedItemIndex );
			}

			// startIndex is the item we would like to highlight next, but it may be disabled.
			// If it is, keep stepping until we find a non-disabled item, or until we loop
			// back around to startIndex
			let potentialIndex : number|null = startIndex;
			if ( this.items[ potentialIndex ].disabled ) {
				potentialIndex = nextIndex( potentialIndex );
				while ( this.items[ potentialIndex ].disabled && potentialIndex !== startIndex ) {
					potentialIndex = nextIndex( potentialIndex );
				}
				if ( this.items[ potentialIndex ].disabled ) {
					// We looped around and didn't find a non-disabled item: all items are disabled
					potentialIndex = null;
				}
			}
			this.highlightedItemIndex = potentialIndex;
		},
		selectHighlightedItem() {
			if ( this.highlightedItemIndex !== null ) {
				this.$emit( 'select', this.items[ this.highlightedItemIndex ].id );
				this.highlightedItemIndex = null;
			}
		},
		handleKeyboardEvent( event: KeyboardEvent ) {
			if ( event.key === 'Enter' ) {
				this.selectHighlightedItem();
			} else if ( event.key === 'ArrowUp' ) {
				this.moveHighlight( 'backward' );
			} else if ( event.key === 'ArrowDown' ) {
				this.moveHighlight( 'forward' );
			}
		}
	}
} );

</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-options-menu {
	background-color: @background-color-base;
	box-sizing: border-box;
	margin: 0;
	border: @border-base;
	border-radius: 0 0 @border-radius-base @border-radius-base;
	padding: 0;

	&__item {
		color: @color-base;
		list-style: none;
		padding: @padding-menu;
		overflow: hidden;
		line-height: @line-height-component;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition: background-color @transition-base, color @transition-base;

		&--enabled {
			cursor: pointer;

			&:hover {
				background-color: @background-color-base--hover;
			}
		}

		&--active,
		&--active:hover {
			background-color: @background-color-primary;
			color: @color-base--emphasized;
		}

		&--highlighted {
			background-color: @background-color-base--hover;
		}

		&--selected,
		&--selected:hover {
			background-color: @background-color-primary;
		}

		&--active&--selected {
			color: @color-primary;
		}

		&--disabled {
			color: @color-base--disabled;
			cursor: @cursor-base--disabled;
		}
	}
}
</style>
