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
		<div class="sb-input">
			<wvui-input
				:placeholder="placeholder"
				:disabled="disabled"
				:type="InputType[type]"
				@input="input"
				@change="change"
				@focus="focus"
				@blur="blur"
			/>
		</div>
		`
	} );

export const withStartIcon = (): Vue.Component =>
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
		<div class="sb-input">
			<wvui-input
				placeholder="Search…"
				:type="InputType.Search"
				start-icon="search"
				:disabled="disabled"
			/>
		</div>
	`
	} );

export const withEndIcon = (): Vue.Component =>
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
		<div class="sb-input">
			<wvui-input
				placeholder="Search…"
				:type="InputType.Search"
				end-icon="info"
				:disabled="disabled"
			/>
		</div>
	`
	} );

export const withClearAction = (): Vue.Component =>
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
		methods: {
			input: action( 'input' )
		},
		template: `
		<div class="sb-input">
			<wvui-input
				placeholder="Type something…"
				:type="InputType.Search"
				:clearable="true"
				:disabled="disabled"
				value="Some value"
				@input="input"
			/>
		</div>
	`
	} );

export const withButton = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput, WvuiButton },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) }
		},
		template: `
		<div class="sb-input sb-input--has-button">
			<wvui-input
				placeholder="Search…"
				:disabled="disabled"
			/>
			<wvui-button :disabled="disabled">Search</wvui-button>
		</div>
	`
	} );

const searchLanguageMap = {
	English: 'Search',
	Russian: 'Искать',
	Vietnamese: 'Tìm kiếm',
	Japaneese: '探す',
	Greek: 'Αναζήτηση',
	Swedish: 'Söka',
	Mazandeerani: 'جستجو کردن'
};

export const wikipediaSearchInput = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput, WvuiButton },
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			buttonLabel: {
				type: String,
				default: select( 'Label language', searchLanguageMap, 'Search' )
			}
		},
		template: `
		<div class="sb-input sb-input--has-button">
			<wvui-input
				placeholder="Search…"
				icon="search"
				:disabled="disabled"
				start-icon="test"
				:clearable="true"
			/>
			<wvui-button :disabled="disabled">{{ buttonLabel }}</wvui-button>
		</div>
	`
	} );
