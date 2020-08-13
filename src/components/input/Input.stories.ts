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
			placeholder: { type: String, default: text( 'Placeholder', 'Search…' ) }
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
			<wvui-input
				:placeholder="placeholder"
				:disabled="disabled"
				:type="InputType[type]"
				@input="input"
				@change="change"
				@focus="focus"
				@blur="blur"
			/>
		`
	} );

export const withStartIcon = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) }
		},
		template: `
			<wvui-input
				placeholder="Search…"
				type="search"
				startIcon="search"
				:disabled="disabled"
			/>
		`
	} );

export const withEndIcon = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) }
		},
		template: `
			<wvui-input
				placeholder="Search…"
				type="search"
				endIcon="info"
				:disabled="disabled"
			/>
		`
	} );

export const withClearAction = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) }
		},
		methods: {
			input: action( 'input' )
		},
		template: `
			<wvui-input
				placeholder="Type something…"
				type="search"
				:clearable="true"
				:disabled="disabled"
				value="Some value"
				@input="input"
			/>
		`
	} );

export const withButton = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput, WvuiButton },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) }
		},
		template: `
		<div class="sb-input-field">
			<wvui-input placeholder="Search…" :disabled="disabled" />
			<wvui-button :disabled="disabled">Search</wvui-button>
		</div>
	`
	} );

const searchLanguageMap = {
	English: 'Search',
	Russian: 'Искать',
	Vietnamese: 'Tìm kiếm',
	Japanese: '探す',
	Greek: 'Αναζήτηση',
	Swedish: 'Söka',
	Mazandeerani: 'جستجو کردن'
};

export const wikipediaSearchInput = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput, WvuiButton },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			clearable: { type: Boolean, default: boolean( 'Clearable', true ) },
			buttonLabel: {
				type: String,
				default: select( 'Label language', searchLanguageMap, 'Search' )
			}
		},
		template: `
		<div class="sb-input-field">
			<wvui-input
				placeholder="Search…"
				startIcon="search"
				:disabled="disabled"
				:clearable="clearable"
			/>
			<wvui-button :disabled="disabled">{{ buttonLabel }}</wvui-button>
		</div>
	`
	} );
