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
		<div class="sb-input-preview">
			<wvui-input
				:placeholder="placeholder"
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
				placeholder="Search…"
				:type="InputType.Search"
				icon="search"
				:disabled="disabled"
			/>
		</div>
	`
	} );

export const withIndicator = (): Vue.Component =>
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
				placeholder="Search…"
				:type="InputType.Search"
				indicator="info"
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
		<div class="sb-input-preview">
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
		<div class="sb-input-preview">
			<wvui-input
				placeholder="Search…"
				:disabled="disabled"
			>
				<template slot="button">
					<wvui-button>Search</wvui-button>
				</template>
			</wvui-input>
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
		<div class="sb-input-preview">
			<wvui-input
				placeholder="Search…"
				icon="search"
				:disabled="disabled"
				indicator="test"
				:clearable="true"
			>
				<template slot="button" scope="props">
					<wvui-button :disabled="disabled">{{ buttonLabel }}</wvui-button>
				</template>
				
			</wvui-input>
		</div>
	`
	} );
