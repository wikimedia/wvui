<template>
	<div id="app">
		<wvui-input id="input" :value="value" />
	</div>
</template>

<script>
import Vue from 'vue';
import components from '@wikimedia/wvui';

export default Vue.extend( {
	name: 'HelloHydration',
	components,
	props: {
		value: {
			type: String,
			default: ''
		}
	}
} );
</script>
