import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue, { PropType } from 'vue';
import WvuiInput from './Input.vue';
import WvuiButton from '../button/Button.vue';
import { InputType } from './InputType';
import { wvuiIconSearch, wvuiIconInfo } from '../../themes/icons';
import './Input.stories.less';

const directions = [ 'rtl', 'ltr' ];

const directionMixin = {
	watch: {
		direction: ( newValue: string ) => {
			window.document.documentElement.setAttribute( 'dir', newValue );
		}
	},
	beforeMount() {
		window.document.documentElement.dir = 'ltr';
	}
};

export default {
	title: 'Components/Input',
	component: WvuiInput,
	parameters: { layout: 'centered' }
};

export const configurable = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		mixins: [ directionMixin ],
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			type: {
				type: String as PropType<keyof typeof InputType>,
				default: select( 'Input Type', Object.keys( InputType ), 'Search' )
			},
			placeholder: { type: String, default: text( 'Placeholder', 'Search…' ) },
			direction: {
				type: String,
				default: select( 'Lang Direction', directions, 'ltr' )
			}
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
		mixins: [ directionMixin ],
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			direction: {
				type: String,
				default: select( 'Lang Direction', directions, 'ltr' )
			}
		},
		data() {
			return {
				InputType,
				searchIcon: wvuiIconSearch
			};
		},

		template: `
		<div class="sb-input">
			<wvui-input
				placeholder="Search…"
				:type="InputType.Search"
				:start-icon="searchIcon"
				:disabled="disabled"
			/>
		</div>
	`
	} );

export const withEndIcon = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		mixins: [ directionMixin ],
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			direction: {
				type: String,
				default: select( 'Lang Direction', directions, 'ltr' )
			}
		},
		data() {
			return {
				InputType,
				endIcon: wvuiIconInfo
			};
		},
		template: `
		<div class="sb-input">
			<wvui-input
				placeholder="Search…"
				:type="InputType.Search"
				:end-icon="endIcon"
				:disabled="disabled"
			/>
		</div>
	`
	} );

export const withClearAction = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		mixins: [ directionMixin ],
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			direction: {
				type: String,
				default: select( 'Lang Direction', directions, 'ltr' )
			}
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
		mixins: [ directionMixin ],
		props: {
			disabled: { type: Boolean, default: boolean( 'Disabled', false ) },
			direction: {
				type: String,
				default: select( 'Lang Direction', directions, 'ltr' )
			}
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
	Japanese: '探す',
	Greek: 'Αναζήτηση',
	Swedish: 'Söka',
	Hebrew: 'לחפש',
	Arabic: 'بحث'
};

const rtlWords = [ 'לחפש', 'بحث' ];

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
		data() {
			return {
				startIcon: wvuiIconSearch
			};
		},
		computed: {
			placeholder() {
				return `${this.buttonLabel}…`;
			}
		},
		watch: {
			buttonLabel( newValue ) {
				const isRtl = rtlWords.indexOf( newValue ) >= 0;

				document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
			}
		},
		template: `
		<div class="sb-input sb-input--has-button">
			<wvui-input
				:placeholder="placeholder"
				:disabled="disabled"
				:start-icon="startIcon"
				icon="search"
				:clearable="true"
			/>
			<wvui-button :disabled="disabled">{{ buttonLabel }}</wvui-button>
		</div>
	`
	} );
