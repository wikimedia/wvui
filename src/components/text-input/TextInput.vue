<template>
	<div :class="wrapperClasses">
		<input
			autocomplete="off"
			aria-autocomplete="list"
			dir="auto"
			:class="classes"
			v-bind="$attrs"
			:disabled="disabled"
			@input="onInput"
			@change="onChange"
		>
	</div>
</template>

<script lang="ts">
import { TextInputType, isTextInputType } from './TextInputType';
import Vue, { PropType } from 'vue';

export default Vue.extend( {
	name: 'WvuiTextInput',
	inheritAttrs: false,
	props: {
		type: {
			type: String as PropType<TextInputType>,
			default: TextInputType.search,
			validator: isTextInputType
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},
	computed: {
		wrapperClasses(): Record<string, boolean> {
			return {
				'wvui-text-input': true
			};
		},
		classes(): Record<string, boolean> {
			return {
				'wvui-text-input-field': true,
				'wvui-text-input-field--disabled': this.disabled,
				'wvui-text-input-field--enabled': !this.disabled,
				'wvui-text-input-field--search': this.type === TextInputType.search,
				'wvui-text-input-field--text': this.type === TextInputType.text
			};
		}
	},
	methods: {
		onInput( event: InputEvent ) {
			this.$emit( 'input', event );
		},
		onChange( event: Event ) {
			this.$emit( 'change', event );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-text-input {
	position: relative;
	vertical-align: middle;
	box-sizing: border-box;

	[ type='search' ] {
		// Support: Safari, Chrome (Blink).
		&::-webkit-search-decoration,
		&::-webkit-search-cancel-button {
			display: none;
		}
	}

	.wvui-text-input-field {
		background-color: @background-color-base;
		box-shadow: @box-shadow-widget;
		color: @color-base--emphasized;
		margin: 0;
		border: @border-width-base @border-style-base @border-color-base;
		border-radius: @border-radius-base;
		padding: 6px 8px;
		font-size: inherit;
		font-family: inherit;
		line-height: @line-height-base;
		display: block;
		width: 100%;
		box-sizing: border-box;
		height: @size-base;

		&::-ms-clear {
			display: none;
		}

		&:focus {
			outline: 0;
			border-color: @wmui-color-accent50;
			box-shadow: @box-shadow-base--focus;
		}

		&--enabled {
			transition:
				border-color @transition-duration-medium,
				box-shadow @transition-duration-medium
			;
		}

		&--disabled {
			background-color: @background-color-base--disabled;
			-webkit-text-fill-color: @color-placeholder;
			color: @color-placeholder;
			text-shadow: @text-shadow-base--disabled;
			border-color: @border-color-base--disabled;
		}

		.wvui-placeholder({
			color: @color-placeholder;
			opacity: 1;
		});
	}

	&:hover {
		.wvui-text-input-field {
			border-color: @border-color-input--hover;
		}
	}
}
</style>
