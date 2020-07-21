<template>
	<div class="wvui-input">
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
			:style="iconStyles"
			@click="onIconClick"
		>
			<!--For now icon is hardcoded inline, it will be replaced with
			wvui-icon once it's ready-->
			<span
				class="wvui-icon"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="#72777d"
					viewBox="0 0 24 24"
				>
					<title id="icon">icon</title>
					<g>
						<path :d="searchIcon" />
					</g>
				</svg>
			</span>
		</span>
	</div>
</template>

<script lang="ts">
import { InputType, isInputType } from './InputType';
import Vue, { PropType } from 'vue';

// Hardcoded icon svg for search icon, will be removed after icon <wvui-icon/> is ready
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
		iconOffset: {
			type: [ String, Number ],
			default: 0
		}
	},
	data() {
		return {
			iconStyles: {
				marginRight: this.iconOffset ? `${this.iconOffset}px` : undefined,
				marginLeft: this.iconOffset ? `${this.iconOffset}px` : undefined
			},
			// temporary hardcoded icon
			searchIcon: mwIconSearch
		};

	},
	mounted() {
		this.$nextTick( () => {
			this.adjustIcon();
		} );
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
		},
		/*
		* Sets focus to input if icon is clicked
		* */
		onIconClick(): void {
			this.$nextTick( () => {
				const $input = this.$refs.input as HTMLInputElement;

				$input.focus(); // eslint-disable-line no-jquery/no-event-shorthand
			} );
		},

		/*
		* Adjusts input's left padding if icon is provided
		* */
		adjustIcon: function (): void {
			if ( this.icon ) {
				const $icon = this.$refs.icon as HTMLElement;
				const $input = this.$refs.input as HTMLElement;
				// eslint-disable-next-line no-jquery/no-other-methods
				const { width } = $icon.getBoundingClientRect();
				const offset = this.iconOffset as number;
				const { paddingLeft } = this.getInputInitialPaddings();

				$input.style.paddingLeft = `${width + ( offset * 2 ) + paddingLeft}px`;
			}
		},
		/*
		* Calculates initial input's paddings
		* */
		getInputInitialPaddings: function (): Record<string, number> {
			const $input = this.$refs.input as HTMLElement;
			const inputStyles = getComputedStyle( $input );
			const paddingRight = +( inputStyles.paddingRight.replace( 'px', '' ) );
			const paddingLeft = +( inputStyles.paddingLeft.replace( 'px', '' ) );

			return { paddingRight, paddingLeft };
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
		padding-left: 9px;
		top: 50%;
		transform: translateY(-50%);
		line-height: 1;
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
			transition:
				border-color @transition-duration-medium,
				box-shadow @transition-duration-medium
			;
		}

		&[ disabled ] {
			background-color: @background-color-base--disabled;
			-webkit-text-fill-color: @color-placeholder;
			color: @color-placeholder;
			text-shadow: @text-shadow-base--disabled;
			border-color: @border-color-base--disabled;

			& + .wvui-input__icon {
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

	&:hover {
		&__input {
			border-color: @border-color-input--hover;
		}
	}
}
// Temp: hardcoded icon styles from mw-components
.wvui-icon {
	align-items: center;
	// stylelint-disable
	display: inline-flex;
	font-feature-settings: 'liga';
	// stylelint-enable
	font-size: 1.5em;
	justify-content: center;
	letter-spacing: normal;
	line-height: 1;
	text-indent: 0;
	-webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
	-moz-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
	transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
	vertical-align: middle;
	user-select: none;
}
</style>
