<template>
	<span class="wvui-typeahead-suggestion__title">
		<!--eslint-disable-next-line max-len-->
		{{ titleChunks[ 0 ] }}<span class="wvui-typeahead-suggestion__match">{{ titleChunks[ 1 ] }}</span>{{ titleChunks[ 2 ] }}
	</span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { splitStringAtMatch } from './TypeaheadSuggestionTitleUtils';

export default Vue.extend( {
	name: 'WvuiTypeaheadSuggestionTitle',
	props: {
		query: {
			type: String as PropType<string>,
			default: ''
		},
		title: {
			type: String as PropType<string>,
			required: true
		}
	},
	computed: {
		/**
		 * Formats title adding highlighted query if it matches.
		 *
		 * @return [ string, string, string ]
		 */
		titleChunks(): [ string, string, string ] {
			return splitStringAtMatch( this.query, this.title );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-suggestion__title {
	display: block;
	margin: 0 0 2px 0;
	color: @color-base;
	font-size: @font-size-search-suggestion-title;
	font-weight: @font-weight-bold;
}

.wvui-typeahead-suggestion__match {
	font-weight: @font-weight-normal;
}

</style>
