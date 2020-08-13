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
			v-if="icon"
			ref="icon"
			class="wvui-input__icon"
		>
			<!--For now icon is hardcoded inline, it will be replaced with
			wvui-icon once it's ready-->
			<span class="wvui-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					aria-hidden="true"
					role="presentation"
				>
					<g fill="#72777d">
						<path :d="searchIcon" />
					</g>
				</svg>
			</span>
		</span>
		<span
			v-if="isClearable || hasIndicator"
			ref="indicator"
			class="wvui-input__indicator"
			@click="onClear"
		>
			<span
				class="wvui-icon"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 20 20"
					aria-hidden="true"
					role="presentation"
				>
					<g fill="#72777d">
						<path :d="clearIcon" />
					</g>
				</svg>
			</span>
		</span>
		<span
			v-if="hasButtonSlot"
			ref="button"
			class="wvui-input__button"
		>
			<slot name="button" :disabled="disabled" />
		</span>
	</div>
</template>

<script lang="ts">
import { InputType, isInputType } from './InputType';
import Vue, { PropType } from 'vue';

// Hardcoded svg for search icon, will be removed after icon <wvui-icon/> is ready
// eslint-disable-next-line max-len
const mwIconSearch = 'M7.5 13c3.04 0 5.5-2.46 5.5-5.5S10.54 2 7.5 2 2 4.46 2 7.5 4.46 13 7.5 13zm4.55.46A7.432 7.432 0 0 1 7.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0C11.64 0 15 3.36 15 7.5c0 1.71-.57 3.29-1.54 4.55l6.49 6.49-1.41 1.41-6.49-6.49z';
// Hardcoded svg for clear action, will be removed after icon <wvui-icon/> is ready
// eslint-disable-next-line max-len
const mwIconClose = 'M4.34 2.93l12.73 12.73-1.41 1.41L2.93 4.35z M17.07 4.34L4.34 17.07l-1.41-1.41L15.66 2.93z';
// Hardcoded svg for indicator , will be removed after icon <wvui-icon/> is ready
// eslint-disable-next-line max-len
export const mwIconInfo = 'M9.5 16A6.61 6.61 0 0 1 3 9.5 6.61 6.61 0 0 1 9.5 3 6.61 6.61 0 0 1 16 9.5 6.63 6.63 0 0 1 9.5 16zm0-14A7.5 7.5 0 1 0 17 9.5 7.5 7.5 0 0 0 9.5 2zm.5 6v4.08h1V13H8.07v-.92H9V9H8V8zM9 6h1v1H9z';

export default Vue.extend( {
	name: 'WvuiInput',
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
		icon: {
			type: String,
			default: null
		},
		indicator: {
			type: String,
			default: null
		},
		// clearable property will override indicator property.
		clearable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentValue: this.value,
			// temporary hardcoded icons
			searchIcon: mwIconSearch,
			clearIcon: this.clearable ? mwIconClose : mwIconInfo
		};

	},
	computed: {
		/**
		 * Checks if slot component is provided.
		 *
		 * @return boolean
		 */
		hasButtonSlot(): boolean {
			return !!this.$scopedSlots.button;
		},
		isClearable(): boolean {
			return this.clearable &&
				!!this.currentValue &&
				!this.disabled;
		},
		hasIndicator(): boolean {
			return !this.clearable && !!this.indicator;
		},
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-input--has-icon': !!this.icon,
				'wvui-input--clearable': this.clearable,
				'wvui-input--has-button': !!this.$scopedSlots.button
			};
		},

		/*
		* Creates a MutationObserver instance for adjusting indicator position
		* according to button slot DOM changes
		* See https://developer.mozilla.org/ru/docs/Web/API/MutationObserver
		* */
		slotObserver(): MutationObserver | null {
			if ( !this.hasButtonSlot ) {
				return null;
			}

			return new MutationObserver( () => {
				this.adjustIndicator();
			} );
		}
	},
	mounted() {
		if ( this.slotObserver ) {
			this.initSlotObserver();
		}

		// Initial adjustment
		this.$nextTick( () => {
			this.adjustIndicator();
		} );
	},
	beforeDestroy() {
		// Clean up observer
		this.slotObserver?.disconnect();
	},
	methods: {
		onInput( event: InputEvent ): void {
			const target = event.target as HTMLInputElement;
			const { value } = target;

			this.setCurrentValue( value );

			// Initially, clear indicator is hidden and after input
			// has some value, we need to adjust clear indicator
			// according to slotted button width
			this.$nextTick( () => {
				if ( value.length === 1 ) {
					/* istanbul ignore next */
					this.adjustIndicator();
				}
			} );

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
		onClear(): void {
			if ( this.clearable ) {
				this.$emit( 'input', '' );
				this.setCurrentValue( '' );
			}
		},
		setCurrentValue( value: string | number ): void {
			this.currentValue = value;
		},
		/*
		* Adjusts input's right position for indicator if slot component is provided.
		* */
		adjustIndicator: function (): void {
			if ( !this.hasButtonSlot ||
				( !this.clearable &&
				!this.currentValue ) ) {
				return;
			}

			const $control = this.$refs.button as HTMLElement;
			const $indicator = this.$refs.indicator as HTMLElement;

			// $refs are not accessible in test cases, so exclude it from coverage
			/* istanbul ignore if */
			if ( $control && $indicator ) {
				// eslint-disable-next-line no-jquery/no-other-methods
				const { width } = $control.getBoundingClientRect();

				$indicator.style.right = `${width}px`;
			}

		},
		initSlotObserver(): void {
			const $control = this.$refs.button as HTMLElement;

			// Subscribe to slot changes
			this.slotObserver?.observe(
				$control,
				{ attributes: true, childList: true, characterData: true, subtree: true }
			);

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

	&__icon,
	&__indicator {
		position: absolute;
		top: 50%;
		transform: translateY( -50% );
		line-height: 1;
		padding-left: @padding-horizontal-input-text;
	}

	&__icon {
		pointer-events: none;
	}

	&__indicator {
		right: 0;
		padding-right: @padding-horizontal-input-text;
	}

	&__button {
		height: @size-base;

		// Eliminate the gap between the button and the input.
		& .wvui-button.wvui-button--framed {
			height: 100%;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			border-left-width: 0;
		}
	}

	&--clearable {
		.wvui-input__indicator {
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

			& ~ .wvui-input__icon,
			& ~ .wvui-input__indicator {
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

	&--has-icon {
		.wvui-input__input {
			padding-left: @padding-horizontal-input-text * 2 + @size-icon;
		}
	}

	&--has-button {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;

		& > .wvui-input__input {
			flex: 1;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	// stylelint-disable-next-line no-duplicate-selectors
	&--clearable {
		// add padding for input if it's clearable
		.wvui-input__input {
			padding-right: @size-icon + @padding-horizontal-input-text;
		}
	}

	&:hover {
		&__input {
			border-color: @border-color-input--hover;
		}
	}
}
// Temp: hardcoded icon styles from
// https://github.com/wikimedia/wvui/pull/47
.wvui-icon {
	align-items: center;
	// Maintain an inline outer element while using flexbox to center the SVG
	// and avoid extra space around the image.
	display: inline-flex; // stylelint-disable-line plugin/no-unsupported-browser-features
	justify-content: center;
	// For inline, inline-block, and table layouts.
	vertical-align: middle;
	user-select: none;
}
</style>
