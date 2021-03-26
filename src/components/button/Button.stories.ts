import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiButton from './Button.vue';
import { PrimaryAction } from '../../actions/PrimaryAction';
import { makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';

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
		...makeActionArgTypes( [ 'click' ] )
	},
	parameters: {
		layout: 'centered'
	}
};

export const Configurable = ( args : Args, { argTypes } : StoryContext ): Vue.Component =>
	Vue.extend( {
		components: { WvuiButton },
		props: Object.keys( argTypes ),
		computed: {
			slotContents() {
				return this.default;
			},
			actionListeners() {
				return makeActionListeners( args, argTypes );
			}
		},
		template: `
			<wvui-button v-bind="$props" v-on="actionListeners">{{ slotContents }}</wvui-button>
		`
	} );

export const AllCombinations = (
	_args : Record<string, unknown>,
	{ argTypes } : { argTypes: Record<string, unknown> }
): Vue.Component =>
	Vue.extend( {
		components: { WvuiButton },
		props: Object.keys( argTypes ),
		data() {
			return {
				actions: [ 'default', 'progressive', 'destructive' ],
				combinations: {
					Normal: { disabled: false, quiet: false },
					Disabled: { disabled: true, quiet: false },
					Quiet: { disabled: false, quiet: true },
					'Quiet disabled': { disabled: true, quiet: true }
				}
			};
		},
		computed: {
			slotContents() {
				return this.default;
			}
		},
		template: `
			<table style="border-spacing: 16px;">
				<thead>
					<tr>
						<th scope="col">Action</th>
						<th
							v-for="(props, name) in combinations"
							:key="name"
							scope="col"
						>
							{{ name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="action in actions" :key="action">
						<th scope="row">
							{{ action[0].toUpperCase() + action.slice( 1 ) }}
						</th>
						<td v-for="(props, name) in combinations" :key="name">
							<wvui-button
								:action="action"
								v-bind="props"
							>
								{{ slotContents }}
							</wvui-button>
						</td>
					</tr>
				</tbody>
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
	quiet: {
		table: {
			disable: true
		}
	}
};
