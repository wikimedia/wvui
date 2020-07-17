import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue, { PropType } from 'vue';
import WvuiInput from './Input.vue';
import WvuiButton from '../button/Button.vue';
import { InputType } from './InputType';
import './Input.stories.less';

export default {
	title: 'Components/Input',
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
		<div class="sb-input-preview">
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

export const withButton = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput, WvuiButton },
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
				
			>
				<wvui-button action="progressive">Search</wvui-button>
			</wvui-input>
		</div>
	`
	} );

export const wikipediaSearchInput = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput, WvuiButton },
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
					
			>
				<wvui-button>Search</wvui-button>
			</wvui-input>
		</div>
	`
	} );
