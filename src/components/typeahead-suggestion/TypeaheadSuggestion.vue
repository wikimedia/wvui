<template>
	<a
		v-if="suggestion"
		:href="suggestionWikiLink"
		:class="rootClasses"
		class="wvui-typeahead-suggestion"
		@mouseover="onMouseOver"
	>
		<span
			v-if="suggestion.thumbnail"
			:style="{backgroundImage: thumbnailBackgroundImage}"
			class="wvui-typeahead-suggestion__thumbnail"
		/>
		<span
			v-else
			class="wvui-typeahead-suggestion__thumbnail-placeholder"
		><wvui-icon :icon="defaultThumbnailIcon" /></span>
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
import WvuiIcon from '../icon/Icon.vue';
import { wvuiIconArticle } from '../../themes/icons';
import WvuiTypeaheadSuggestionTitle
	from '../typeahead-suggestion-title/TypeaheadSuggestionTitle.vue';

export default Vue.extend( {
	name: 'WvuiTypeaheadSuggestion',
	components: { WvuiTypeaheadSuggestionTitle, WvuiIcon },
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
	data() {
		return {
			defaultThumbnailIcon: wvuiIconArticle
		};
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
	},
	watch: {
		active( isActive ) {
			const el = this.$el as HTMLElement;

			if ( isActive ) {
				el.focus();
			} else {
				el.blur();
			}

		}
	},
	methods: {
		onMouseOver( event: MouseEvent ) {
			this.$emit( 'mouseover', event );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-suggestion {
	background-color: @color-base--inverted;
	// stylelint-disable-next-line plugin/no-unsupported-browser-features
	display: flex;
	align-items: center;
	padding: @padding-vertical-typeahead-suggestion @padding-horizontal-typeahead-suggestion;
	text-decoration: none;

	// &--active is supposed to be used both when hover
	// and when navigating with keyboard.
	&--active {
		background-color: @wmui-color-accent90;
	}

	&__thumbnail-placeholder,
	&__thumbnail {
		width: @width-search-suggestion-thumb;
		height: @height-search-suggestion-thumb;
		// Borders tend to cut into the border-radius and it makes the
		// border-radius look smaller on the inside of the box than the outside.
		// Using a box-shadow disguised as a border prevents that from happening
		box-shadow: 0 0
			@border-width-base
			@border-width-base
			@border-color-typeahead-suggestion-thumb;
		border-radius: @border-radius-base;
		background-position: center;
		background-repeat: no-repeat;
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		background-size: cover;
	}

	&__thumbnail {
		display: inline-block;
	}

	&__thumbnail-placeholder {
		background-color: @background-color-typeahead-suggestion-placeholder;
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	&__text {
		overflow: hidden;
		text-indent: @padding-horizontal-base;

		.wvui-typeahead-suggestion__description {
			display: block;
			margin: 0;
			color: @color-placeholder;
			font-size: @font-size-search-suggestion-description;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
}
</style>
