<template>
	<button class="wvui-button" :class="rootClasses" @click="onClick">
		<!--
			@slot Button content
		-->
		<slot />
	</button>
</template>

<script lang="ts">
import { PrimaryAction, isPrimaryAction } from '../../actions/PrimaryAction';
import Vue, { PropType } from 'vue';

/**
 * A button wrapping slotted content.
 *
 * @fires {Event} click
 */
export default Vue.extend( {
	name: 'WvuiButton',
	props: {
		/** See PrimaryAction. */
		action: {
			type: String as PropType<PrimaryAction>,
			default: PrimaryAction.Default,
			validator: isPrimaryAction
		},
		/** True if button should be visually less prominent. */
		quiet: Boolean
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-button--default': this.action === PrimaryAction.Default,
				'wvui-button--progressive': this.action === PrimaryAction.Progressive,
				'wvui-button--destructive': this.action === PrimaryAction.Destructive,
				'wvui-button--framed': !this.quiet,
				'wvui-button--quiet': this.quiet
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
	border-width: @border-width-base;
	border-style: @border-style-base;
	border-radius: @border-radius-base;
	// Support Firefox, Safari: Normalize by removing the `margin`.
	margin: 0;
	padding-left: @padding-horizontal-base;
	padding-right: @padding-horizontal-base;
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
	// Support IE 11: Normalize by showing `overflow`.
	overflow: visible;
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
			box-shadow: @box-shadow-base--focus;
			border-color: @color-primary--focus;
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
}

// Normal “framed” buttons.
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

	// Progressive normal buttons.
	&.wvui-button--progressive:not( [ disabled ] ) {
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

	// Destructive normal buttons.
	&.wvui-button--destructive:not( [ disabled ] ) {
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

	&[ disabled ] {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
	}
}

// Quiet buttons.
.wvui-button--quiet {
	background-color: transparent;
	color: @color-base;
	border-color: transparent;

	&:not( [ disabled ] ) {
		&:hover {
			background-color: @background-color-quiet--hover;
			color: @color-quiet--hover;
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
	&.wvui-button--progressive:not( [ disabled ] ) {
		color: @color-primary;

		&:hover {
			color: @color-primary--hover;
		}

		&:focus {
			color: @color-primary--focus;
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			color: @color-primary--active;
			box-shadow: none;
		}
	}

	// Destructive quiet buttons.
	&.wvui-button--destructive:not( [ disabled ] ) {
		color: @color-destructive;

		&:hover {
			color: @color-destructive--hover;
		}

		&:focus {
			color: @color-destructive--focus;
			border-color: @border-color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			color: @color-destructive--active;
			box-shadow: none;
		}
	}

	&[ disabled ] {
		color: @color-base--disabled;
	}
}
</style>
