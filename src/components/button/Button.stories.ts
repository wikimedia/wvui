import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiButton from './Button.vue';
import WvuiIcon from '../icon/Icon.vue';
import { ButtonType } from './ButtonType';
import { PrimaryAction } from '../../actions/PrimaryAction';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';
import './Button.stories.less';
import { lookupIcon, makeOptionalIconArgType } from '../icon/Icon.stories';

export default {
	title: 'Components/Button',
	component: WvuiButton,
	argTypes: {
		action: {
			// eslint-disable-next-line es/no-object-values
			options: Object.values( PrimaryAction ),
			control: 'inline-radio',
			defaultValue: PrimaryAction.Default
		},
		type: {
			// eslint-disable-next-line es/no-object-values
			options: Object.values( ButtonType ),
			control: 'inline-radio',
			defaultValue: ButtonType.Normal
		},
		default: {
			control: 'text',
			defaultValue: 'Click me'
		},
		disabled: {
			control: 'boolean',
			table: {
				category: 'Attributes'
			}
		},
		icon: {
			...makeOptionalIconArgType(),
			description: 'Icon to prepend to the button content'
		},
		...makeActionArgTypes( [ 'click' ] )
	},
	parameters: {
		layout: 'centered'
	}
};

export const Configurable = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiButton, WvuiIcon },
		props: Object.keys( argTypes ),
		computed: {
			slotContents() {
				return this.default;
			},
			iconData() {
				return lookupIcon( this.icon );
			},
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [ 'default', 'icon' ] );
			}
		},
		template: `
			<wvui-button v-bind="filteredProps" v-on="actionListeners">
				<wvui-icon v-if="iconData" :icon="iconData" iconColor="currentColor" />
				{{ slotContents }}
			</wvui-button>
		`
	} );

export const AllCombinations = ( _args: Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiButton, WvuiIcon },
		props: Object.keys( argTypes ),
		data() {
			return {
				types: ButtonType,
				actions: PrimaryAction
			};
		},
		computed: {
			slotContents() {
				return this.default;
			},
			iconData() {
				return lookupIcon( this.icon );
			}
		},
		template: `
			<table class="sb-button-combinations">
				<thead>
					<th></th>
					<th v-for="(action, actionName) in actions" :key="action" scope="col">
						{{ actionName }}
					</th>
				</thead>
				<tbody>
					<template v-for="(type, typeName) in types">
						<tr v-for="disabled in [ false, true ]" :key="type + disabled">
							<th scope="row">
								{{ typeName }} {{ disabled ? 'disabled' : '' }}
							</th>
							<td v-for="(action, actionName) in actions" :key="action">
								<wvui-button
									:action="action"
									:type="type"
									:disabled="disabled"
								>
									<wvui-icon
										v-if="iconData"
										:icon="iconData"
										iconColor="currentColor"
									/>
									{{ slotContents }}
								</wvui-button>
							</td>
						</tr>
					</template>
				</tbody>
				<tfoot class="sb-button-combinations-hint-mobile">
					<tr>
						<td
							:colspan="Object.keys( actions ).length + 1"
						>
							Please scroll horizontally to see all combinations.
						</td>
					</tr>
				</tfoot>
			</table>
		`
	} );

AllCombinations.argTypes = {
	action: {
		table: {
			disable: true
		}
	},
	disabled: {
		table: {
			disable: true
		}
	},
	type: {
		table: {
			disable: true
		}
	}
};
