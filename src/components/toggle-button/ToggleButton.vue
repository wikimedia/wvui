<template>
	<button
		class="wvui-toggle-button"
		:class="rootClasses"
		:aria-pressed="isActive"
		@mousedown.prevent
		@click="onClick"
	>
		<!--
			@slot Button content
		-->
		<slot />
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * A toggle button wrapping slotted content.
 *
 * @author DannyS712
 *
 * @fires {Event} change
 */
export default Vue.extend( {
	name: 'WvuiToggleButton',
	props: {
		/**
		 * Whether the button should be set to "on" or not. It is the responsibility
		 * of the calling code to handle updating this property each time the button
		 * is toggled, by listening to the 'change' event.
		 */
		isActive: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			// Provide --inactive too so that we can simplify selectors
			return {
				'wvui-toggle-button--active': this.isActive,
				'wvui-toggle-button--inactive': !this.isActive
			};
		}
	},
	methods: {
		onClick(): void {
			// Event provides the new value, listener should save this in a property
			// that is bound to isActive so that the toggle gets updated as well.
			this.$emit( 'change', !this.isActive );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

// Base styles are based on the wvui-button styles.
.wvui-toggle-button {
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
		background-color: @background-color-framed;
		color: @color-base;
		border-color: @border-color-base;
		// Use hand cursor. This is non-standard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: pointer;

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-base--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}

	&[ disabled ] {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
		border-color: @border-color-base--disabled;
	}

	&--active:disabled {
		// Same as OOUI.
		// FIXME: Need to settle this primary active color as `@background-color` var.
		background-color: mix( @color-primary--active, @background-color-filled--disabled, 35% );
	}

	&--active:not( [ disabled ] ) {
		background-color: @color-primary--active;
		color: @color-base--inverted;
		border-color: @border-color-primary--active;

		&:focus {
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:hover {
			// Same as not hovering, needed to override the rule of hovering over all
			// non-disabled instances set above.
			background-color: @color-primary--active;
			color: @color-base--inverted;
		}
	}
}
</style>
