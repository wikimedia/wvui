<template>
	<!--eslint-disable-next-line vue/no-v-html-->
	<span class="wvui-typeahead-suggestion__title" v-html="highlightedTitle" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import WvuiUtils from '../../utils/Utils';

export default Vue.extend( {
	name: 'WvuiTypeaheadSuggestionTitle',
	inheritAttrs: false,
	props: {
		query: {
			type: String as PropType<string | undefined>,
			default: undefined
		},
		title: {
			type: String as PropType<string | undefined>,
			default: undefined
		}
	},
	computed: {
		/*
		* Formats title adding highlighted query if it matches
		* */
		highlightedTitle(): string | string[] {
			if ( !this.query ) {
				return this.title as string;
			}

			const title = this.title as string;

			const sanitizedQuery = WvuiUtils.htmlEscape( WvuiUtils.regExpEscape( this.query ) );
			const matchStartIndex = title.search( new RegExp( sanitizedQuery, 'i' ) );

			if ( matchStartIndex < 0 ) {
				return WvuiUtils.htmlEscape( title );
			}

			const matchEndIndex = matchStartIndex + sanitizedQuery.length;
			const highlightedTitle = title.substring( matchStartIndex, matchEndIndex );
			const beforeHighlight = title.substring( 0, matchStartIndex );
			const afterHighlight = title.substring( matchEndIndex, title.length );

			// eslint-disable-next-line max-len
			return `${beforeHighlight}<em class="wvui-typeahead-suggestion__match">${highlightedTitle}</em>${afterHighlight}`;
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-suggestion__title {
	margin: 0 0 2px 0;
	color: @wmui-color-base10;
	font-size: 15px;
	font-weight: bold;
}

.wvui-typeahead-suggestion__match {
	// Remove italic
	font-style: inherit;
	text-decoration: underline;
}

</style>
