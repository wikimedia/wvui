<template>
	<div id="app">
		<wvui-input
			id="searchInput"
			type="search"
			name="search"
			placeholder="Search Wikipedia"
			title="Search Wikipedia [Alt+Shift+f]"
			accesskey="f"
			autocomplete="off"
			:value="value"
		/>
	</div>
</template>

<script>
import Vue from 'vue';
import components from '@wikimedia/wvui';

export default Vue.extend( {
	name: 'HelloSearch',
	components,
	props: {
		value: {
			type: String,
			default: ''
		}
	}
} );
</script>
