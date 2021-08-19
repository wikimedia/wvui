<template>
	<div class="wvui-dropdown" :class="rootClasses">
		<div
			ref="handle"
			class="wvui-dropdown__handle"
			tabindex="0"
			role="combobox"
			aria-autocomplete="list"
			:aria-owns="menuId"
			aria-haspopup="listbox"
			:aria-disabled="disabled ? 'true' : null"
			:aria-expanded="showMenu ? 'true' : 'false'"
			@mousedown.prevent
			@click="onClick"
			@blur="showMenu = false"
			@keydown.enter.up.down.prevent.stop="onKeyNavigation"
			@keydown.esc.prevent.stop="showMenu = false"
		>
			<!--
				@slot Display of the selected item
				@binding {OptionsMenuItem|null} selectedItem
				@binding {string} defaultLabel
			-->
			<slot name="selectedItem" :item="selectedItem" :defaultLabel="defaultLabel">
				{{ selectedItem ? selectedItem.label : defaultLabel }}
			</slot>
			<wvui-icon :icon="wvuiIconExpand" class="wvui-dropdown__indicator" />
		</div>
		<wvui-options-menu
			v-show="showMenu"
			:id="menuId"
			ref="menu"
			v-slot="{ item }"
			v-model="wrappedModel"
			class="wvui-dropdown__menu"
			:items="items"
			@select="showMenu = false"
		>
			<!--
				@slot Display of an item in the menu
				@binding {OptionsMenuItem} item
			-->
			<slot name="menuItem" :item="item" />
		</wvui-options-menu>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, PropType } from '@vue/composition-api';
import WvuiIcon from '../icon/Icon.vue';
import WvuiOptionsMenu from '../options-menu/OptionsMenu.vue';
import { OptionsMenuItem } from '../options-menu/OptionsMenuItem';
import { wvuiIconExpand } from '../../themes/icons';
import useGeneratedId from '../../composables/useGeneratedId';

Vue.use( VueCompositionAPI );

/**
 * Dropdown menu, like HTML `<select>`. Displays the selected item (or a default label, if no item
 * is selected), and expands on click to show all available items.
 *
 * Set the available items through the items prop, and get/set the ID of the selected item through
 * v-model. The v-model value will be the .id property of the selected item, or null if no item
 * is selected.
 *
 * How items are displayed can be customized through named slots. The menuItem slot is used for the
 * display of items in the menu, and the selectedItem slot is used for the display of the currently
 * selected item. Note that the item passed to the selectedItem slot will be null if no item is
 * selected.
 *
 * @example
 *     <wvui-dropdown v-model="number" :items="[{id: 1, label: 'One'}, {id: 2, label: 'Two'}]" />
 *
 * @example
 *     <wvui-dropdown v-model="..." :items="...">
 *         <template #menuItem="{ item }">
 *             {{ item.label }} (id: {{item.id}})
 *         </template>
 *         <template #selectedItem="{ item, defaultLabel }">
 *             <template v-if="item !== null">
 *                 {{ item.label }} (id: {{item.id }})
 *             </template>
 *             <template v-else>
 *                 {{ defaultLabel }}
 *             </template>
 *         </template>
 *     </wvui-dropdown>
 */
export default defineComponent( {
	name: 'WvuiDropdown',
	components: { WvuiIcon, WvuiOptionsMenu },
	model: {
		prop: 'selectedItemId',
		event: 'change'
	},
	props: {
		/**
		 * Available items in the menu. The items' IDs must be unique within each dropdown.
		 */
		items: {
			type: Array as PropType<OptionsMenuItem[]>,
			required: true
			// No validation here; if the value is invalid, the OptionsMenu validator will catch it
		},

		/**
		 * The ID of the selected item, or null if no item is selected. This is the v-model value.
		 */
		selectedItemId: {
			type: String as PropType<string | null>,
			default: null
		},

		/**
		 * Label to display when no item is selected.
		 */
		defaultLabel: {
			type: String,
			default: ''
		},

		/**
		 * Whether the dropdown is disabled. Disabled dropdowns can't be interacted with.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const { prefixId } = useGeneratedId( 'dropdown' );

		return {
			prefixId
		};
	},
	data: () => ( {
		wvuiIconExpand,
		// Whether the menu is visible
		showMenu: false
	} ),
	computed: {
		wrappedModel: {
			get() : string|null {
				return this.selectedItemId;
			},
			set( newValue : string | null ) {
				/**
				 * Emitted when the selected item changes
				 *
				 * @param {string|null} newValue ID of the selected item, or null if no selection
				 */
				this.$emit( 'change', newValue );
			}
		},
		rootClasses() : Record<string, boolean> {
			return {
				'wvui-dropdown--disabled': this.disabled,
				'wvui-dropdown--open': this.showMenu,
				'wvui-dropdown--value-selected': this.selectedItemId !== null,
				'wvui-dropdown--no-selections': this.selectedItemId === null
			};
		},
		menuId() : string {
			return this.prefixId( 'menu' );
		},
		itemsById() : Record<string, OptionsMenuItem> {
			const result : Record<string, OptionsMenuItem> = {};
			for ( const item of this.items ) {
				result[ item.id ] = item;
			}
			return result;
		},
		selectedItem() : OptionsMenuItem | null {
			return this.selectedItemId !== null && this.itemsById[ this.selectedItemId ] || null;
		}
	},
	methods: {
		onKeyNavigation( event: KeyboardEvent ) {
			if ( this.disabled ) {
				return;
			}

			const wasShown = this.showMenu;
			if ( !this.showMenu ) {
				this.showMenu = true;
				if ( event.key === 'Enter' ) {
					// This Enter keypress means we wanted to open the menu, not select anything, so
					// don't delegate this keypress to the menu. If we do, it could trigger a
					// selection and immediately close the menu again.
					return;
				}
			}

			// Delegate to the menu component
			( this.$refs.menu as InstanceType<typeof WvuiOptionsMenu> )
				.handleKeyboardEvent( event );

			if ( event.key === 'Enter' && wasShown ) {
				// Make sure the menu is hidden. handleKeyboardEvent() may have emitted a
				// select event, in which case onSelect() will already have hidden the menu.
				// But if this enter keypress didn't cause anything to be selected, we
				// still want to hide the menu.
				this.showMenu = false;
			}
		},
		onClick() {
			if ( this.disabled ) {
				return;
			}
			this.showMenu = !this.showMenu;
			( this.$refs.handle as HTMLElement ).focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-dropdown {
	display: inline-block;
	position: relative;
	min-width: 280px;

	&__indicator {
		color: @color-base;
		position: absolute;
		// Vertically center the handle indicator by moving it down 50% of the height of the handle,
		// then moving it up by 50% of the height of the icon (translateY uses the element height
		// while top uses the offset parent's height)
		top: 50%;
		transform: translateY( -50% );
		right: @padding-horizontal-base;
		transition-property: color;
		transition-duration: @transition-base;

		svg {
			width: @size-indicator;
			height: @size-indicator;
		}
	}

	&__handle {
		background-color: @background-color-framed;
		color: @color-base;
		position: relative;
		box-sizing: border-box;
		min-height: @size-base;
		width: @size-full;
		border: @border-base;
		border-radius: @border-radius-base;
		// Add extra padding-right to make space for the handle indicator
		// Use 2 * horizontal-base because we need padding on both sides of the indicator
		padding: @padding-vertical-base
			calc( 2 * @padding-horizontal-base ~'+' @size-indicator )
			@padding-vertical-base
			@padding-horizontal-base;
		line-height: @line-height-component;
		transition-property: background-color, color, border-color, box-shadow;
		transition-duration: @transition-base;
		cursor: pointer;

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
			border-color: @border-color-base--hover;

			.wvui-dropdown__indicator {
				color: @color-base--hover;
			}
		}

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
			outline: 0;
		}

		&:active {
			color: @color-base--active;
			border-color: @border-color-base--active;
		}
	}

	&__menu {
		position: absolute;
		left: 0;
		z-index: 4;
		width: @size-full;
		margin-top: -@border-width-base;
	}

	&--open {
		.wvui-dropdown__handle {
			background-color: @background-color-framed--hover;

			&:hover .wvui-dropdown__indicator {
				color: @color-base;
			}
		}
	}

	&--disabled {
		.wvui-dropdown__handle {
			background-color: @background-color-base--disabled;
			color: @color-base--disabled;
			border-color: @border-color-base--disabled;
			text-shadow: @text-shadow-base--disabled;
			cursor: @cursor-base--disabled;

			&:hover .wvui-dropdown__indicator {
				color: @color-base--disabled;
			}
		}

		// stylelint-disable-next-line no-descending-specificity
		.wvui-dropdown__indicator {
			color: @color-base--disabled;
		}
	}
}

</style>
