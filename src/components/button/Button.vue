<template>
	<button class="wvui-button" :class="rootClasses" @click="onClick">
		<!--
			@slot Button content
		-->
		<slot />
	</button>
</template>

<script lang="ts">
import { ButtonType, isButtonType } from './ButtonType';
import { ButtonAction, isButtonAction } from './ButtonAction';
import Vue, { PropType } from 'vue';

/**
 * A button wrapping slotted content.
 *
 * @fires {Event} click
 */
export default Vue.extend( {
	name: 'WvuiButton',
	props: {
		/**
		 * What type of action the button will cause to be taken when clicked.
		 * See ButtonAction for what each value means.
		 */
		action: {
			type: String as PropType<ButtonAction>,
			default: ButtonAction.Default,
			// use arrow function for type inference of property
			validator: ( value ) => isButtonAction( value )
		},
		/**
		 * Button type. See ButtonType for what each value means.
		 */
		type: {
			type: String as PropType<ButtonType>,
			default: ButtonType.Normal,
			// use arrow function for type inference of property
			validator: ( value ) => isButtonType( value )
		}
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-button--action-default': this.action === ButtonAction.Default,
				'wvui-button--action-progressive': this.action === ButtonAction.Progressive,
				'wvui-button--action-destructive': this.action === ButtonAction.Destructive,
				'wvui-button--type-primary': this.type === ButtonType.Primary,
				'wvui-button--type-normal': this.type === ButtonType.Normal,
				'wvui-button--type-quiet': this.type === ButtonType.Quiet,
				'wvui-button--framed': this.type !== ButtonType.Quiet
			};
		}
	},
	methods: {
		onClick( event: Event ): void {
			this.$emit( 'click', event );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-button {
	box-sizing: border-box;
	// Interactive elements have a minimum touch area.
	min-width: @min-size-base;
	min-height: @min-size-base;
	max-width: @max-width-button;
	// Support Firefox, Safari: Normalize by removing the `margin`.
	margin: 0;
	border-width: @border-width-base;
	border-style: @border-style-base;
	border-radius: @border-radius-base;
	padding-right: @padding-horizontal-base;
	padding-left: @padding-horizontal-base;
	// Support IE 11: Normalize by showing `overflow`.
	overflow: visible;
	// Support all browsers: Normalize by inheriting `font-family`.
	// Initial value depends on user-agent.
	font-family: inherit;
	// Support all browsers: Normalize by inheriting `font-size` over initial value of `none`.
	font-size: inherit;
	font-weight: bold;
	// Support Edge, Firefox, and IE: Normalize by removing the inheritance of `text-transform`.
	text-transform: none;
	// Contents are single line.
	white-space: nowrap;
	transition: border-color @transition-base, background-color @transition-base, color @transition-base, box-shadow @transition-base;

	// Support Firefox: Normalize by hiding the inner focus `border` and `padding`.
	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	&:focus {
		// Hide the standard focus outline. A border and box-shadow representation is added below.
		outline: 0;
	}

	&:not( [ disabled ] ) {
		color: @color-base;
		// Use hand cursor. This is nonstandard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: pointer;

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-base--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--emphasized;
			box-shadow: none;
		}
	}

	&[ disabled ] {
		border-color: transparent;
	}

	.wvui-icon {
		// Any icons used in the button content should have the color of the surrounding text
		// This overrides the color rule in Icon.vue, and ensures that the rules below changing the
		// text color for progressive and destructive buttons also apply to icons.
		color: inherit;
	}
}

// Non-quiet “framed” buttons (normal and primary types)
.wvui-button--framed {
	&:not( [ disabled ] ) {
		background-color: @background-color-framed;
		border-color: @border-color-base;

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--active;
			border-color: @border-color-base--active;
		}
	}

	&[ disabled ] {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
	}
}

.wvui-button--type-primary {
	// Progressive primary buttons
	&.wvui-button--action-progressive:not( [ disabled ] ) {
		background-color: @color-primary;
		color: @color-base--inverted;
		border-color: @color-primary;

		&:hover {
			background-color: @color-primary--hover;
			border-color: @color-primary--hover;
		}

		&:focus {
			background-color: @color-primary--focus;
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @color-primary--active;
			border-color: @color-primary--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}

	// Destructive primary buttons
	&.wvui-button--action-destructive:not( [ disabled ] ) {
		background-color: @color-destructive;
		color: @color-base--inverted;
		border-color: @color-destructive;

		&:hover {
			background-color: @color-destructive--hover;
			border-color: @color-destructive--hover;
		}

		&:focus {
			background-color: @color-destructive--focus;
			border-color: @color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			background-color: @color-destructive--active;
			border-color: @color-destructive--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}
}

.wvui-button--type-normal {
	// Normal progressive buttons
	&.wvui-button--action-progressive:not( [ disabled ] ) {
		color: @color-primary;

		&:hover {
			color: @color-primary--hover;
			border-color: @border-color-primary--hover;
		}

		&:focus {
			color: @color-primary--focus;
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: lighten( @color-primary--active, 60% );
			color: @color-primary--active;
			border-color: @border-color-primary--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}

	// Normal destructive buttons
	&.wvui-button--action-destructive:not( [ disabled ] ) {
		color: @color-destructive;

		&:hover {
			color: @color-destructive--hover;
			border-color: @border-color-destructive--hover;
		}

		&:focus {
			color: @color-destructive--focus;
			border-color: @border-color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			background-color: lighten( @color-destructive--active, 60% );
			color: @color-destructive--active;
			border-color: @border-color-destructive--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}
}

// Quiet buttons.
.wvui-button--type-quiet {
	background-color: transparent;
	color: @color-base;
	border-color: transparent;

	&:not( [ disabled ] ) {
		&:hover {
			background-color: @background-color-quiet--hover;
		}

		&:focus {
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @background-color-quiet--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}

	// Progressive quiet buttons.
	&.wvui-button--action-progressive:not( [ disabled ] ) {
		color: @color-primary;

		&:hover {
			// FIXME @background-color-primary--hover exists but is a little lighter
			background-color: fade( #347bff, 20% );
			color: @color-primary--hover;
		}

		&:focus {
			color: @color-primary--focus;
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @color-primary--active;
			color: @color-base--inverted;
			border-color: @color-primary--active;
			box-shadow: none;
		}
	}

	// Destructive quiet buttons.
	&.wvui-button--action-destructive:not( [ disabled ] ) {
		color: @color-destructive;

		&:hover {
			// FIXME @background-color-destructive--hover should exist but doesn't
			background-color: fade( #d11d13, 20% );
			color: @color-destructive--hover;
		}

		&:focus {
			color: @color-destructive--focus;
			border-color: @border-color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			background-color: @color-destructive--active;
			color: @color-base--inverted;
			border-color: @color-destructive--active;
			box-shadow: none;
		}
	}

	&[ disabled ] {
		color: @color-base--disabled;
	}
}
</style>
