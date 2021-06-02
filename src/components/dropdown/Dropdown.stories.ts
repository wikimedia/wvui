import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiDropdown from './Dropdown.vue';
import WvuiButton from '../button/Button.vue';
import { OptionsMenuItem } from '../options-menu/OptionsMenuItem';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';

export default {
	title: 'Components/Dropdown',
	component: WvuiDropdown,
	argTypes: {
		items: {
			defaultValue: [
				{ id: '1', label: 'One' },
				{ id: '2', label: 'Two' },
				{ id: '3', label: 'Three', disabled: true },
				{ id: '4', label: 'Four' }
			] as OptionsMenuItem[],
			control: 'object'
		},
		defaultLabel: {
			defaultValue: 'Select something...'
		},
		'v-model': {
			name: 'selectedItemId',
			control: null
		},
		...makeActionArgTypes( [ 'change' ] )
	},
	parameters: {
		layout: 'centered'
	}
};

export const Configurable = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiDropdown },
		props: Object.keys( argTypes ),
		data: () => ( {
			currentValue: null
		} ),
		computed: {
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [ 'selectedItem', 'menuItem', 'vModel' ] );
			}
		},
		template: `
			<div>
				<p>
					v-model value: <input v-model="currentValue" />
				</p>
				<wvui-dropdown
					v-model="currentValue"
					v-bind="filteredProps"
					v-on="actionListeners"
				/>
			</div>
		`
	} );

export const CustomSlots = ( args: Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiDropdown, WvuiButton },
		props: Object.keys( argTypes ),
		data: () => ( {
			currentValue: null
		} ),
		computed: {
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [ 'selectedItem', 'menuItem', 'vModel' ] );
			}
		},
		template: `
			<div>
				<wvui-dropdown
					v-model="currentValue"
					v-bind="filteredProps"
					v-on="actionListeners"
				>
					<template #menuItem="{ item }">
						{{ item.label }} (ID: {{item.id}})
					</template>
					<template #selectedItem="{ item, defaultLabel }">
						<template v-if="item">
							Selected item: {{ item.label }} (ID: {{item.id}} )
						</template>
						<template v-else>
							No item selected: {{ defaultLabel }}
						</template>
					</template>
				</wvui-dropdown>
				<wvui-button @click="currentValue = null">Clear selection</wvui-button>
			</div>
		`
	} );
