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
import { TypeaheadSuggestion } from './TypeaheadSuggestion';
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
			type: String as PropType<string | undefined>,
			default: undefined
		},
		suggestion: {
			type: Object as PropType<TypeaheadSuggestion | undefined>,
			default: undefined
		}
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-typeahead-suggestion--active': this.active
			};
		},
		/*
		* Generates wikipedia link for a suggestion.
		* */
		suggestionWikiLink(): string {
			return `/wiki/${this.suggestion?.key}`;
		},
		/*
		* Generates a proper value for background-image
		* */
		thumbnailBackgroundImage(): string {
			return `url(${this.suggestion?.thumbnail?.url})`;
		}
	},
	methods: {
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
		min-width: @typeahead-suggestion-thumb-width;
		min-height: @typeahead-suggestion-thumb-height;
		max-width: @typeahead-suggestion-thumb-width;
		max-height: @typeahead-suggestion-thumb-height;
		border: @border-width-base @border-style-base @wmui-color-base80;
		border-radius: @border-radius-base;
		margin: 0 12px 0 0;
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

		.wvui-typeahead-suggestion__title,
		.wvui-typeahead-suggestion__description {
			display: block;
		}

		.wvui-typeahead-suggestion__description {
			margin: 0;
			color: @wmui-color-base30;
			font-size: 13px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
}
</style>
