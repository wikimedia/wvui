import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue, { PropType } from 'vue';
import WvuiInput from './Input.vue';
import { InputType } from './InputType';

export default {
	title: 'Components/wvui-input',
	component: WvuiInput,
	parameters: { layout: 'centered' }
};

export const configurable = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			type: {
				type: String as PropType<keyof typeof InputType>,
				default: select( 'Input Type', Object.keys( InputType ), 'Search' )
			},
			placeholder: { type: String, default: text( 'Placeholder', 'Search...' ) }
		},
		data() {
			return {
				InputType
			};
		},
		methods: {
			input: action( 'input' ),
			change: action( 'change' ),
			focus: action( 'focus' ),
			blur: action( 'blur' )
		},
		template: `
		<div style="width: 100%; min-width: 400px">
				<wvui-input
						:placeholder="placeholder"
            :type="InputType[ type ]"
						:disabled="disabled"
						@input="input"
						@change="change"
						@focus="focus"
						@blur="blur"
				/>
		</div>
		`
	} );

export const withIcon = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) }
		},
		data() {
			return {
				InputType
			};
		},

		template: `
		<div class="sb-input-preview">
				<wvui-input
						placeholder="Search..."
            :type="InputType.Search"
						icon="search"
						:disabled="disabled"
					
				/>
		</div>
	`
	} );
