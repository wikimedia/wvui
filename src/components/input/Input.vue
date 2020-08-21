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
			:value="currentValue"
			@input="onInput"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
		>
		<span
			v-if="startIcon"
			class="wvui-input__start-icon"
		>
			<wvui-icon
				:icon="startIcon"
			/>
		</span>
		<span
			v-if="isClearable || endIcon"
			class="wvui-input__end-icon"
			@click="onEndIconClick"
		>
			<wvui-icon
				:icon="endIcon || clearIcon"
			/>
		</span>
	</div>
</template>

<script lang="ts">
import { InputType, isInputType } from './InputType';
import Vue, { PropType } from 'vue';
import WvuiIcon from '../icon/Icon.vue';
import { AnyIcon } from '../icon/iconTypes';
import { wvuiIconClose } from '../../themes/icons';

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
		 * Overrides indicator with a clear button at the end of the input element that when pressed
		 * deletes the input's contents. The elements automatically hides and appears based on input
		 * state.
		 */
		clearable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentValue: this.value,
			clearIcon: wvuiIconClose
		};
	},
	computed: {
		isClearable(): boolean {
			return this.clearable &&
				!!this.currentValue &&
				!this.disabled;
		},
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-input--has-start-icon': !!this.startIcon,
				'wvui-input--has-end-icon': !!this.endIcon || this.clearable,
				'wvui-input--clearable': this.clearable
			};
		}
	},
	methods: {
		onInput( event: InputEvent ): void {
			const target = event.target as HTMLInputElement;
			const { value } = target;

			this.setCurrentValue( value );

			this.$emit( 'input', value );
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
			this.currentValue = value;
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-input {
	position: relative; // For proper positioning of icons and slotted elements
	vertical-align: middle;
	box-sizing: border-box;

	&__start-icon,
	&__end-icon {
		position: absolute;
		line-height: 1;
		top: 0;
		min-height: @size-icon;
		height: 100%;
		padding-left: @padding-horizontal-input-text;
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;
		align-items: center;
		opacity: @opacity-icon-accessory;
	}

	&__start-icon {
		pointer-events: none;
	}

	&__end-icon {
		right: 0;
		padding-right: @padding-horizontal-input-text;
	}

	&--clearable {
		.wvui-input__end-icon {
			cursor: pointer;
		}
	}

	&__input {
		background-color: @background-color-base;
		box-shadow: @box-shadow-widget;
		color: @color-base--emphasized;
		margin: 0;
		border: @border-width-base @border-style-base @border-color-base;
		border-radius: @border-radius-base;
		padding: @padding-input-text;
		font-size: inherit;
		font-family: inherit;
		line-height: @line-height-base;
		display: block;
		width: 100%;
		box-sizing: border-box;
		height: @size-base;

		&:not( [ disabled ] ) {
			transition: border-color @transition-duration-medium, box-shadow @transition-duration-medium;
		}

		&[ disabled ] {
			background-color: @background-color-base--disabled;
			-webkit-text-fill-color: @color-placeholder;
			color: @color-placeholder;
			text-shadow: @text-shadow-base--disabled;
			border-color: @border-color-base--disabled;

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

		// Non standard pseudo-element
		// Support: Internet Explorer 10, Internet Explorer 11, and Microsoft Edge.
		// For details see https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-clear
		&::-ms-clear {
			display: none;
		}

		&:focus {
			outline: 0;
			border-color: @wmui-color-accent50;
			box-shadow: @box-shadow-base--focus;
		}

		&[ type='search' ] {
			// Support: Safari, Chrome (Blink).
			&::-webkit-search-decoration,
			&::-webkit-search-cancel-button {
				display: none;
			}
		}
	}

	&--has-start-icon {
		.wvui-input__input {
			padding-left: @padding-horizontal-input-text * 2 + @size-icon;
		}
	}

	&--has-end-icon {
		.wvui-input__input {
			padding-right: @padding-horizontal-input-text * 2 + @size-icon;
		}
	}

	&:hover {
		&__input {
			border-color: @border-color-input--hover;
		}
	}
}
</style>
