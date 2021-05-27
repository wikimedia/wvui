import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiCheckbox from './Checkbox.vue';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';
import './Checkbox.stories.less';

export default {
	title: 'Components/Checkbox',
	component: WvuiCheckbox,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		default: {
			control: 'text',
			defaultValue: 'Configurable checkbox input'
		},
		'v-model': {
			name: 'modelValue',
			control: null
		},
		inputValue: {
			control: 'text',
			defaultValue: 'checkbox-configurable'
		},
		...makeActionArgTypes( [ 'input' ] )
	}
};

export const Configurable = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiCheckbox },
		props: Object.keys( argTypes ),
		data() {
			return {
				currentValue: false
			};
		},
		computed: {
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [ 'default', 'vModel' ] );
			},
			slotContents() {
				return this.default;
			}
		},
		template: `
			<div class="sb-checkbox-wrapper">
				<wvui-checkbox
					v-model="currentValue"
					v-bind="filteredProps"
					v-on="actionListeners"
				>
					{{ slotContents }}
				</wvui-checkbox>
			</div>
		`
	} );

export const CheckboxGroup = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiCheckbox },
		props: Object.keys( argTypes ),
		data() {
			return {
				checkboxesValue: [
					'checkbox-1',
					'checkbox-2',
					'checkbox-6'
				],
				checkboxes: [
					{
						label: 'Checkbox 1',
						value: 'checkbox-1',
						disabled: false
					},
					{
						label: 'Checkbox 2 (initially selected)',
						value: 'checkbox-2',
						disabled: false
					},
					{
						label: 'Checkbox 3, with a very long label that spans onto a second line',
						value: 'checkbox-3',
						disabled: false
					},
					{
						label: 'Checkbox 4 (indeterminate)',
						value: 'checkbox-4',
						indeterminate: true,
						disabled: false
					},
					{
						label: 'Checkbox 5 (disabled)',
						value: 'checkbox-5',
						disabled: true
					},
					{
						label: 'Checkbox 6 (initially selected, disabled)',
						value: 'checkbox-6',
						disabled: true
					}
				]
			};
		},
		computed: {
			actionListeners() {
				return makeActionListeners( args, argTypes );
			}
		},
		template: `
			<div class="sb-checkbox-wrapper">
				<wvui-checkbox
					v-for="checkbox in checkboxes"
					:key="checkbox.value"
					v-model="checkboxesValue"
					:input-value="checkbox.value"
					:disabled="checkbox.disabled"
					:indeterminate="checkbox.indeterminate"
					v-on="actionListeners"
				>
					{{ checkbox.label }}
				</wvui-checkbox>
			</div>
		`
	} );

CheckboxGroup.argTypes = {
	default: {
		table: {
			disable: true
		}
	},
	inputValue: {
		table: {
			disable: true
		}
	},
	disabled: {
		table: {
			disable: true
		}
	},
	indeterminate: {
		table: {
			disable: true
		}
	}
};
