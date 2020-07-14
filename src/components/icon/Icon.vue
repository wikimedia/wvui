<template>
	<span class="wvui-icon" :class="classes">
		<span class="wvui-icon__content"><slot /></span>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Span with icon background image.
 *
 * Slot may contain text for screen readers and will be visually hidden.
 *
 * Disclaimer: This only works if existing OOUI icon styles are accessible.
 */
export default Vue.extend( {
	name: 'WvuiIcon',
	props: {
		icon: {
			type: String,
			required: true
		},
		invert: {
			type: Boolean
		}
	},
	computed: {
		classes(): Record<string, boolean> {
			// Use the existing OOUI classes for icon images for now.
			return {
				[ 'oo-ui-icon-' + this.icon ]: true,
				'oo-ui-image-invert': this.invert
			};
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-icon {
	background-size: contain; // stylelint-disable-line plugin/no-unsupported-browser-features
	background-position: center center;
	background-repeat: no-repeat;
	display: inline-block;
	height: @size-icon / @font-size-browser / @font-size-base;
	line-height: 2.5;
	margin: 0;
	min-height: @size-icon;
	min-width: @size-icon;
	overflow: hidden;
	padding: 0;
	position: static;
	text-indent: -9999px;
	vertical-align: middle;
	width: @size-icon / @font-size-browser / @font-size-base;
	user-select: none;

	&__content {
		.wvui-visually-hidden();
	}
}
</style>
