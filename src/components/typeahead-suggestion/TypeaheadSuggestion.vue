<template>
	<a
		v-if="suggestion"
		:href="suggestionWikiLink"
		:class="rootClasses"
		class="wvui-typeahead-suggestion"
		@mouseover="onMouseOver"
		@click="onClick"
	>
		<span
			v-if="showThumbnail && suggestion.thumbnail"
			:style="{backgroundImage: thumbnailBackgroundImage}"
			class="wvui-typeahead-suggestion__thumbnail"
		/>
		<span
			v-else-if="showThumbnail"
			class="wvui-typeahead-suggestion__thumbnail-placeholder"
		><wvui-icon
			:icon="defaultThumbnailIcon"
			class="wvui-typeahead-suggestion__thumbnail-icon"
		/></span>
		<span class="wvui-typeahead-suggestion__text">
			<wvui-typeahead-suggestion-title
				:query="query"
				:title="suggestion.title"
			/>
			<span
				v-if="showDescription && suggestion.description"
				class="wvui-typeahead-suggestion__description"
			>{{ suggestion.description }}</span>
		</span>
	</a>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SearchResult } from '../typeahead-search/http/SearchClient';
import WvuiIcon from '../icon/Icon.vue';
import { wvuiIconImageLayoutFrameless } from '../../themes/icons';
import WvuiTypeaheadSuggestionTitle
	from '../typeahead-suggestion-title/TypeaheadSuggestionTitle.vue';
import { UrlGenerator, createDefaultUrlGenerator } from './UrlGenerator';

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
		},
		urlGenerator: {
			type: Object as PropType<UrlGenerator>,
			default: createDefaultUrlGenerator
		},
		showThumbnail: {
			type: Boolean,
			default: true
		},
		showDescription: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			defaultThumbnailIcon: wvuiIconImageLayoutFrameless
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
			return this.urlGenerator.generateUrl( this.suggestion );
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
	methods: {
		onMouseOver( event: MouseEvent ) {
			this.$emit( 'mouseover', event );
		},
		onClick( event: MouseEvent ) {
			this.$emit( 'click', event );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-typeahead-suggestion {
	// stylelint-disable-next-line plugin/no-unsupported-browser-features
	display: flex;
	align-items: center;
	padding: @padding-vertical-typeahead-suggestion @padding-horizontal-typeahead-suggestion;
	text-decoration: none;

	// &--active is supposed to be used both when hover
	// and when navigating with keyboard.
	&--active {
		background-color: @background-color-base--hover;
	}

	&__thumbnail-placeholder,
	&__thumbnail {
		background-position: center;
		background-repeat: no-repeat;
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		background-size: cover;
		// min-width is used to prevent a thumbnail from gets
		// squished if a description is lengthy.
		min-width: @min-width-typeahead-suggestion-thumb;
		width: @size-typeahead-suggestion-thumb;
		height: @size-typeahead-suggestion-thumb;
		border-radius: @border-radius-base;
		// Borders tend to cut into the border-radius and it makes the
		// border-radius look smaller on the inside of the box than the outside.
		// Using a box-shadow disguised as a border prevents that from happening.
		box-shadow: 0 0
			@border-width-base
			@border-width-base
			@border-color-typeahead-suggestion-thumb;
	}

	&__thumbnail {
		display: inline-block;

		&-placeholder {
			background-color: @background-color-typeahead-suggestion-placeholder;
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		&-icon {
			opacity: @opacity-icon-accessory;
		}
	}

	&__text {
		overflow: hidden;
		padding-left: @padding-horizontal-typeahead-suggestion;
		padding-right: @padding-horizontal-typeahead-suggestion;

		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		@supports ( padding-inline-start: @padding-horizontal-typeahead-suggestion ) {
			// Reset paddings for all modern browsers.
			padding-right: 0;
			padding-left: 0;
			padding-inline-start: @padding-horizontal-typeahead-suggestion;
		}

		.wvui-typeahead-suggestion__description {
			color: @color-placeholder;
			display: block;
			font-size: @font-size-typeahead-suggestion-description;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
}
</style>
