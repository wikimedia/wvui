<template>
	<button @click="onClick">
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
