import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiRadio from './Radio.vue';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';
import './Radio.stories.less';

export default {
	title: 'Components/Radio',
	component: WvuiRadio,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		default: {
			control: 'text',
			defaultValue: 'Configurable radio input'
		},
		'v-model': {
			name: 'modelValue',
			control: null
		},
		inputValue: {
			control: 'text',
			defaultValue: 'radio-configurable'
		},
		name: {
			control: 'text',
			defaultValue: 'radio-group'
		},
		...makeActionArgTypes( [ 'input' ] )
	}
};

// A single radio, which is useful for demonstrating the configurable parts of
// the radio component, but not useful for demonstrating the value prop or the
// on/off state (since it can only be selected once, then it cannot be
// de-selected).
export const Configurable = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiRadio },
		props: Object.keys( argTypes ),
		data() {
			return {
				currentValue: ''
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
			<div class="sb-radio-wrapper">
				<wvui-radio
					v-model="currentValue"
					v-bind="filteredProps"
					v-on="actionListeners"
				>
					{{ slotContents }}
				</wvui-radio>
			</div>
		`
	} );

// A group of radios, useful for demonstrating on/off state and value changes,
// but not the individual properties of each radio.
export const RadioGroup = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiRadio },
		props: Object.keys( argTypes ),
		data() {
			return {
				radioValue: 'radio-2',
				radios: [
					{
						label: 'Radio 1',
						value: 'radio-1',
						disabled: false
					},
					{
						label: 'Radio 2 (initially selected)',
						value: 'radio-2',
						disabled: false
					},
					{
						label: 'Radio 3, which has a very long label that spans onto a second line',
						value: 'radio-3',
						disabled: false
					},
					{
						label: 'Radio 4 (disabled)',
						value: 'radio-4',
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
			<div class="sb-radio-wrapper">
				<wvui-radio
					v-for="radio in radios"
					:key="'radio-' + radio.value"
					v-model="radioValue"
					:input-value="radio.value"
					:name="$props.name"
					:disabled="radio.disabled"
					v-on="actionListeners"
				>
					{{ radio.label }}
				</wvui-radio>
			</div>
		`
	} );

const groupArgTypes = {
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
	inline: {
		table: {
			disable: true
		}
	}
};
RadioGroup.argTypes = groupArgTypes;

export const InlineRadios = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiRadio },
		props: Object.keys( argTypes ),
		data() {
			return {
				radioValue: 'radio-1',
				radios: [
					{
						label: 'Radio 1',
						value: 'radio-1'
					},
					{
						label: 'Radio 2',
						value: 'radio-2'
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
			<div class="sb-radio-wrapper">
				<wvui-radio
					v-for="radio in radios"
					:key="'radio-' + radio.value"
					v-model="radioValue"
					:input-value="radio.value"
					:name="$props.name"
					:inline="true"
					v-on="actionListeners"
				>
					{{ radio.label }}
				</wvui-radio>
			</div>
		`
	} );

InlineRadios.argTypes = groupArgTypes;
