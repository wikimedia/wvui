<template>
	<li
		v-if="suggestion"
		class="wvui-typeahead-suggestion"
		:class="rootClasses"
		v-bind="$attrs"
	>
		<a :href="suggestionWikiLink" class="wvui-typeahead-suggestion__link">
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
				<!--eslint-disable-next-line vue/no-v-html-->
				<span
					v-highlighted-text="{query: query, title: suggestion.title}"
					class="wvui-typeahead-suggestion__title"
				/>
				<span
					class="wvui-typeahead-suggestion__description"
				>{{ suggestion.description }}</span>
			</span>
		</a>
	</li>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { TypeaheadSuggestion } from './TypeaheadSuggestion';
import { highlightedText } from '../../directives';

export default Vue.extend( {
	name: 'WvuiTypeaheadSuggestion',
	directives: {
		highlightedText
	},
	inheritAttrs: false,
	props: {
		active: {
			type: Boolean,
			default: false
		},
		query: {
			type: String,
			default: null
		},
		suggestion: {
			type: Object as PropType<TypeaheadSuggestion>,
			default: null
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

	&__link {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;
		align-items: center;
		padding: 8px @padding-horizontal-base;
		text-decoration: none;
	}

	&__text {
		overflow: hidden;

		.wvui-typeahead-suggestion__title,
		.wvui-typeahead-suggestion__description {
			display: block;
		}

		.wvui-typeahead-suggestion__title {
			margin: 0 0 2px 0;
			color: @wmui-color-base10;
			font-size: 15px;
			font-weight: bold;
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

	&__matching-title {
		// Remove italic
		font-style: inherit;
		text-decoration: underline;
	}
}
</style>
