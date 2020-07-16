import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { PrimaryAction } from '../../actions/PrimaryAction';
import Vue, { PropType } from 'vue';
import WvuiButton from './Button.vue';

export default {
	title: 'Components/Button',
	parameters: { layout: 'centered' }
};

export const configurable = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiButton },
		props: {
			enabled: { type: Boolean, default: boolean( 'Enabled', true ) },
			action: {
				type: String as PropType<keyof typeof PrimaryAction>,
				default: select( 'Action', Object.keys( PrimaryAction ), 'Default' )
			},
			quiet: { type: Boolean, default: boolean( 'Quiet', false ) },
			slotProp: { type: String, default: text( 'Slot', 'Label' ) }
		},
		data() {
			return { PrimaryAction };
		},
		methods: { click: action( 'click' ) },
		template: `
		<wvui-button
			:disabled="!enabled"
			:action="PrimaryAction[ action ]"
			:quiet="quiet"
			@click="click"
		>
			{{slotProp}}
		</wvui-button>
	`
	} );

export const combinations = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiButton },
		data() {
			return {
				PrimaryAction,
				combinations: [
					{ enabled: true, quiet: false },
					{ enabled: true, quiet: true },
					{ enabled: false, quiet: false },
					{ enabled: false, quiet: true }
				]
			};
		},
		methods: { click: action( 'click' ) },
		template: `
		<table>
			<thead>
				<tr>
					<th scope="col">Action</th>
					<th scope="col">Normal</th>
					<th scope="col">Quiet</th>
					<th scope="col">Disabled</th>
					<th scope="col">Quiet disabled</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="action in Object.keys( PrimaryAction )" :key="action">
					<th scope="row">{{action}}</th>
					<td v-for="combo, index in combinations" :key="index">
						<wvui-button
							:disabled="!combo.enabled"
							:action="PrimaryAction[ action ]"
							:quiet="combo.quiet"
							@click="click"
						>
							Label
						</wvui-button>
					</td>
				</tr>
			</tbody>
		</table>
	`
	} );
