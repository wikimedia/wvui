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
				type: String as PropType<InputType>,
				default: select( 'Input Type', Object.keys( InputType ), 'search' )
			},
			placeholder: { type: String, default: text( 'Placeholder', 'Search...' ) }
		},
		methods: {
			input: action( 'input' ),
			change: action( 'change' ),
			focus: action( 'focus' ),
			blur: action( 'blur' )
		},
		template: `
		<wvui-input
			:placeholder="placeholder"
			:type="type"
			:disabled="disabled"
			@input="input"
			@change="change"
			@focus="focus"
			@blur="blur"
		></wvui-input>
		`
	} );
