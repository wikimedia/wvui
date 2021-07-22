import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiToggleButton from './ToggleButton.vue';
import './ToggleButton.stories.less';

export default {
	title: 'Components/ToggleButton',
	component: WvuiToggleButton,
	argTypes: {
		isActive: {
			control: null
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
		}
	},
	parameters: {
		layout: 'centered'
	}
};

export const Configurable = ( _args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiToggleButton },
		props: Object.keys( argTypes ),
		data: () => ( {
			// Don't use the isActive arg at all
			reallyIsActive: false
		} ),
		computed: {
			slotContents() {
				return this.default;
			}
		},
		methods: {
			onChange( newValue: boolean ) {
				this.reallyIsActive = newValue;
			}
		},
		template: `
			<wvui-toggle-button
				v-bind:is-active="reallyIsActive"
				v-bind:disabled="disabled"
				v-on:change="onChange"
			>
				{{ slotContents }}
			</wvui-toggle-button>
		`
	} );

export const AllCombinations = ( _args: Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiToggleButton },
		props: Object.keys( argTypes ),
		computed: {
			slotContents() {
				return this.default;
			}
		},
		template: `
			<table class="sb-toggle-button-combinations">
				<thead>
					<th></th>
					<th>Default</th>
					<th>Active</th>
				</thead>
				<tbody>
					<tr v-for="disabled in [ false, true ]" :key="'toggle' + disabled">
						<th scope="row">
							{{ disabled ? 'Disabled' : 'Enabled' }}
						</th>
						<td v-for="isActive in [ false, true ]"
							:key="'toggle' + disabled + isActive"
						>
							<wvui-toggle-button
								:is-active="isActive"
								:disabled="disabled"
							>
								{{ slotContents }}
							</wvui-toggle-button>
						</td>
					</tr>
				</tbody>
			</table>
		`
	} );

AllCombinations.argTypes = {
	isActive: {
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
