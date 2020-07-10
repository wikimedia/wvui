import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue, { PropType } from 'vue';
import WvuiTextInput from './TextInput.vue';
import { TextInputType } from './TextInputType';

export default {
	title: 'Components/wvui-textinput',
	component: WvuiTextInput,
	parameters: { layout: 'centered' }
};

export const configurable = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiTextInput },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			type: {
				type: String as PropType<TextInputType>,
				default: select( 'Input Type', Object.keys( TextInputType ), 'search' )
			},
			placeholder: { type: String, default: text( 'Placeholder', 'Search...' ) }
		},
		methods: {
			input: action( 'input' ),
			change: action( 'change' )
		},
		template: `
		<wvui-text-input
			:placeholder="placeholder"
			:type="type"
			:disabled="disabled"
			@input="input"
			@change="change"
		></wvui-text-input>
		`
	} );
