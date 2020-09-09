<template>
	<div id="app">
		<wvui-typeahead-search
			:accesskey="searchAccessKey"
			:title="searchTitle"
			:placeholder="searchPlaceholder"
			:initial-query="searchQuery"
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
		searchAccessKey: {
			type: String,
			default: ''
		},
		searchTitle: {
			type: String,
			default: ''
		},
		searchPlaceholder: {
			type: String,
			default: ''
		},
		searchQuery: {
			type: String,
			default: ''
		}
	}
} );
</script>
