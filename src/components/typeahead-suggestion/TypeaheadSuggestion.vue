<template>
	<a
		v-if="suggestion"
		:href="suggestionWikiLink"
		:class="rootClasses"
		class="wvui-typeahead-suggestion"
	>
		<span
			v-if="suggestion.thumbnail"
			:style="{backgroundImage: thumbnailBackgroundImage}"
			class="wvui-typeahead-suggestion__thumbnail"
		/>
		<span
			v-else
			class="wvui-typeahead-suggestion__thumbnail-placeholder"
		/>
		<span class="wvui-typeahead-suggestion__text">
			<wvui-typeahead-suggestion-title
				:query="query"
				:title="suggestion.title"
			/>
			<span
				v-if="suggestion.description"
				class="wvui-typeahead-suggestion__description"
			>{{ suggestion.description }}</span>
		</span>
	</a>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import WvuiTypeaheadSuggestionTitle
	from '../typeahead-suggestion-title/TypeaheadSuggestionTitle.vue';

export default Vue.extend( {
	name: 'WvuiTypeaheadSuggestion',
	components: { WvuiTypeaheadSuggestionTitle },
	props: {
		active: {
			type: Boolean,
			default: false
		},
		query: {
			type: String as PropType<string>,
			default: ''
		},
		suggestion: {
			type: Object as PropType<SearchResult>,
			required: true
		}
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-typeahead-suggestion--active': this.active
			};
		},
		/**
		 * Generates wikipedia link for a suggestion.
		 *
		 * @return {string}
		 * */
		suggestionWikiLink(): string {
			return `/wiki/${this.suggestion.key}`;
		},
		/**
		 * Generates a proper value for background-image.
		 *
		 * @return {string}
		 * */
		thumbnailBackgroundImage(): string {
			return `url(${this.suggestion.thumbnail?.url})`;
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-suggestion {
	background-color: #fff;
	// stylelint-disable-next-line plugin/no-unsupported-browser-features
	display: flex;
	align-items: center;
	padding: 8px @padding-horizontal-base;
	text-decoration: none;

	// css class is supposed to be used when navigating with keyboard
	&:hover,
	&--active {
		background-color: @wmui-color-accent90;
	}

	&__thumbnail-placeholder,
	&__thumbnail {
		display: block;
		min-width: @thumb-width-search-suggestion;
		min-height: @thumb-height-search-suggestion;
		max-width: @thumb-width-search-suggestion;
		max-height: @thumb-height-search-suggestion;
		box-shadow: 0 0 @border-width-base @border-width-base @wmui-color-base80;
		border-radius: @border-radius-base;
		background-position: center;
		background-repeat: no-repeat;
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		background-size: cover;
	}

	&__thumbnail-placeholder {
		// temporary placeholder, probably will be replaced with <wvui-icon>
		background-image: url( https://di-searchland.web.app/img/placeholder.svg );
	}

	&__text {
		overflow: hidden;
		text-indent: 12px;

		.wvui-typeahead-suggestion__description {
			display: block;
			margin: 0;
			color: @wmui-color-base30;
			font-size: @font-size-search-suggestion-description;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
}
</style>
