<template>
	<button class="wvui-button" @click="onClick">
		<slot />
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'WvuiButton',
	methods: {
		onClick( event: MouseEvent ): void {
			this.$emit( 'click', event );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '~wikimedia-ui-base/wikimedia-ui-base.less';

.wvui-button {
	background: @wmui-color-base20;
	color: #fff;
	transition: all 1s;
}
</style>
