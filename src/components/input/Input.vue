<template>
	<div
		class="wvui-input"
		:class="rootClasses"
	>
		<input
			ref="input"
			dir="auto"
			class="wvui-input__input"
			v-bind="$attrs"
			:disabled="disabled"
			:type="type"
			:value="computedValue"
			@input="onInput"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
		>
		<wvui-icon
			v-if="startIcon"
			:icon="startIcon"
			class="wvui-input__start-icon"
		/>
		<wvui-icon
			v-if="isClearable || endIcon"
			:icon="endIcon || clearIcon"
			class="wvui-input__end-icon"
			@click="onEndIconClick"
		/>
	</div>
</template>

<script lang="ts">
import { InputType, isInputType } from './InputType';
import Vue, { PropType } from 'vue';
import WvuiIcon from '../icon/Icon.vue';
import { AnyIcon } from '../icon/iconTypes';
import { wvuiIconClear } from '../../themes/icons';

export default Vue.extend( {
	name: 'WvuiInput',
	components: { WvuiIcon },
	/**
	 * All attributes set on the components such as disabled and type are passed to the underlying
	 * input.
	 */
	inheritAttrs: false,
	props: {
		value: {
			type: [ String, Number ],
			default: ''
		},
		type: {
			type: String as PropType<InputType>,
			default: InputType.Text,
			validator: isInputType
		},
		disabled: {
			type: Boolean,
			default: false
		},
		/** An icon at the start of the input element. Similar to a ::before pseudo-element. */
		startIcon: {
			type: [ String, Object ] as PropType<AnyIcon | undefined>,
			default: undefined
		},
		/** An icon at the end of the input element. Similar to an ::after pseudo-element. */
		endIcon: {
			type: [ String, Object ] as PropType<AnyIcon | undefined>,
			default: undefined
		},
		/**
		 * Override end icon with a clear button at the end of the input element. When clear is
		 * pressed the input's contents is deleted. The elements automatically hides and appears
		 * based on input state.
		 */
		clearable: {
			type: Boolean,
			default: false
		}
	},
	data(): Record<string, string | number | AnyIcon> {
		return {
			newValue: this.value,
			clearIcon: wvuiIconClear
		};
	},
	computed: {
		isClearable(): boolean {
			return this.clearable &&
				!!this.computedValue &&
				!this.disabled;
		},
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-input--has-start-icon': !!this.startIcon,
				'wvui-input--has-end-icon': !!this.endIcon || this.clearable,
				'wvui-input--clearable': this.clearable
			};
		},
		computedValue: {
			get(): string | number {
				return this.newValue as string | number;
			},
			set( value: string | number ) {
				this.newValue = value;
				this.$emit( 'input', value );
			}
		}
	},
	watch: {
		// Update input value on v-model change
		value( value: string | number ): void {
			this.newValue = value;
		}
	},
	methods: {
		onInput( event: InputEvent ): void {
			const target = event.target as HTMLInputElement;
			const { value } = target;

			this.setCurrentValue( value );
		},
		onChange( event: Event ): void {
			this.$emit( 'change', event );
		},
		onFocus( event: FocusEvent ): void {
			this.$emit( 'focus', event );
		},
		onBlur( event: FocusEvent ): void {
			this.$emit( 'blur', event );
		},
		onEndIconClick(): void {
			if ( this.clearable ) {
				this.setCurrentValue( '' );
				this.$emit( 'input', '' );
			}
		},
		setCurrentValue( value: string | number ): void {
			this.computedValue = value;
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-input {
	position: relative; // For proper positioning of icons and slotted elements
	box-sizing: border-box;

	&__start-icon,
	&__end-icon {
		min-height: @size-icon;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: @opacity-icon-accessory;
	}

	&__start-icon {
		left: @start-input-text-icon;
		pointer-events: none;
	}

	&__end-icon {
		right: @end-input-text-icon;
	}

	&--clearable {
		.wvui-input__end-icon {
			box-sizing: border-box;
			width: @size-base;
			right: @border-width-base;
			padding: 0 @padding-horizontal-input-text;
			cursor: pointer;

			// stylelint-disable-next-line max-nesting-depth
			svg {
				width: @size-indicator;
			}
		}
	}

	&__input {
		background-color: @background-color-base;
		box-shadow: @box-shadow-base;
		color: @color-base--emphasized;
		margin: 0;
		border: @border-width-base @border-style-base @border-color-base;
		border-radius: @border-radius-base;
		padding: @padding-input-text;
		font-size: inherit;
		font-family: inherit;
		line-height: @line-height-component;
		display: block;
		width: 100%;
		box-sizing: border-box;
		height: @size-base;

		&:not( [ disabled ] ) {
			transition: border-color @transition-duration-medium, box-shadow @transition-duration-medium;

			&:hover {
				border-color: @border-color-input--hover;
			}

			&:focus {
				outline: 0;
				border-color: @border-color-base--focus;
				box-shadow: @box-shadow-base--focus;
			}
		}

		&[ disabled ] {
			background-color: @background-color-base--disabled;
			-webkit-text-fill-color: @color-placeholder;
			color: @color-placeholder;
			text-shadow: @text-shadow-base--disabled;
			border-color: @border-color-base--disabled;

			// stylelint-disable-next-line max-nesting-depth
			& ~ .wvui-input__start-icon,
			& ~ .wvui-input__end-icon {
				pointer-events: none;
				opacity: @opacity-base--disabled;
			}
		}

		&::placeholder {
			color: @color-placeholder;
			opacity: 1;
		}

		// Support IE 10-11, and Edge 12+: Hide proprietary pseudo-element.
		// See https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-clear
		&::-ms-clear {
			display: none;
		}

		&[ type='search' ] {
			// Support Safari/iOS: Normalize by applying `none`,
			// Chrome would accept `textfield` as well.
			/* stylelint-disable plugin/no-unsupported-browser-features */
			/* autoprefixer: ignore next */
			-webkit-appearance: none;
			// Support Firefox.
			/* autoprefixer: ignore next */
			-moz-appearance: textfield;
			/* stylelint-enable plugin/no-unsupported-browser-features */

			// Support: Safari, Chrome (Blink).

			// stylelint-disable-next-line max-nesting-depth
			&::-webkit-search-decoration,
			&::-webkit-search-cancel-button {
				display: none;
			}
		}
	}

	&--has-start-icon {
		// stylelint-disable-next-line no-descending-specificity
		.wvui-input__input {
			padding-left: @padding-horizontal-input-text * 2 + @size-icon;
		}
	}

	&--has-end-icon {
		// stylelint-disable-next-line no-descending-specificity
		.wvui-input__input {
			padding-right: @padding-horizontal-input-text * 2 + @size-icon;
		}
	}
}
</style>
