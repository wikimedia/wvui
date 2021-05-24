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
		},
		highlightQuery: {
			type: Boolean as PropType<boolean>,
			default: true
		}
	},
	computed: {
		/**
		 * If highlighting is enabled, returns the title with the part that matches the query
		 * highlighted. If highlighting is disabled, returns the unmodified title in a form
		 * compatible with the template above.
		 *
		 * @return [ string, string, string ]
		 */
		titleChunks(): [ string, string, string ] {
			if ( this.highlightQuery ) {
				return splitStringAtMatch( this.query, this.title );
			}

			return [ '', this.title, '' ];
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-suggestion__title {
	color: @color-base;
	display: block;
	margin: 0 0 2px 0;
	font-size: @font-size-typeahead-suggestion-title;
	font-weight: @font-weight-bold;
}

.wvui-typeahead-suggestion__match {
	font-weight: @font-weight-normal;
}

</style>
