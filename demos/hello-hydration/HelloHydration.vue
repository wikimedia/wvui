<template>
	<div id="app">
		<wvui-input
			id="searchInput"
			type="search"
			name="search"
			accesskey="f"
			title="Search Wikipedia [Alt+Shift+f]"
			placeholder="Search Wikipedia"
			autocomplete="off"
		/>
	</div>
</template>

<script>
import Vue from 'vue';
import components from '@wikimedia/wvui';

export default Vue.extend( { name: 'HelloHydration', components } );
</script>
