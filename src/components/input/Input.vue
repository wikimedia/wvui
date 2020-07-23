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
			v-if="hasControlSlot"
			ref="button"
			class="wvui-input__button"
		>
			<slot />
		</span>
	</div>
</template>

<script lang="ts">
import { InputType, isInputType } from './InputType';
import Vue, { PropType } from 'vue';

// Hardcoded svg for search icon, will be removed after icon <wvui-icon/> is ready
// eslint-disable-next-line max-len
const mwIconSearch = 'M7.5 13c3.04 0 5.5-2.46 5.5-5.5S10.54 2 7.5 2 2 4.46 2 7.5 4.46 13 7.5 13zm4.55.46A7.432 7.432 0 0 1 7.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0C11.64 0 15 3.36 15 7.5c0 1.71-.57 3.29-1.54 4.55l6.49 6.49-1.41 1.41-6.49-6.49z';

export default Vue.extend( {
	name: 'WvuiInput',
	inheritAttrs: false,
	props: {
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
		}
	},
	data() {
		return {
			// temporary hardcoded icons
			searchIcon: mwIconSearch
		};

	},
	computed: {
		/*
		* Checks if slot component is provided
		* */
		hasControlSlot(): boolean {
			return !!this.$scopedSlots.default;
		},
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-input--button': !!this.$scopedSlots.default,
				'wvui-input--icon': !!this.icon
			};
		}
	},
	methods: {
		onInput( event: InputEvent ): void {
			this.$emit( 'input', event );
		},
		onChange( event: Event ): void {
			this.$emit( 'change', event );
		},
		onFocus( event: FocusEvent ): void {
			this.$emit( 'focus', event );
		},
		onBlur( event: FocusEvent ): void {
			this.$emit( 'blur', event );
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

	&__icon {
		position: absolute;
		top: 50%;
		transform: translateY( -50% );
		line-height: 1;
		padding-left: @padding-horizontal-input-text;
		pointer-events: none;
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

	&--icon {
		.wvui-input__input {
			padding-left: @padding-horizontal-input-text * 2 + @size-icon;
		}
	}

	&:hover {
		&__input {
			border-color: @border-color-input--hover;
		}
	}

	&__button {
		height: @size-base;

		// Eliminate the gap between the button and the input.
		& .wvui-button {
			height: 100%;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			border-left-width: 0;
		}
	}

	&--button {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;

		& > .wvui-input__input {
			flex: 1;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
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
