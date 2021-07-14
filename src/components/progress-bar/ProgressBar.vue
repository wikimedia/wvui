<template>
	<div
		class="wvui-progress-bar"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div class="wvui-progress-bar__bar" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Progress bar, currently only supports indeterminate type (i.e. the bar will scroll across the
 * width of the display and then reappear at the start, rather than reflecting a specific amount
 * of progress having been made).
 *
 * @author DannyS712
 */
export default Vue.extend( {
	name: 'WvuiProgressBar'
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-progress-bar {
	background-color: @background-color-base;
	box-sizing: border-box;
	max-width: @max-width-base;
	border: @border-base;
	border-radius: @border-radius-progress-bar;
	box-shadow: @box-shadow-progress-bar;
	overflow-x: hidden;

	&__bar {
		background-color: @background-color-progress-bar-bar;
		width: 40%;
		height: @size-small;
		animation: wvui-progress-bar__bar--slide 2s infinite linear;
	}
}

@keyframes wvui-progress-bar__bar--slide {
	from {
		transform: translate( -100% );
	}

	to {
		transform: translate( 350% );
	}
}

</style>
