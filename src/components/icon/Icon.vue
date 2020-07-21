<template>
	<span class="wvui-icon" :class="classes">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:width="size"
			:height="size"
			viewBox="0 0 20 20"
			aria-hidden="true"
			role="presentation"
		>
			<g :fill="iconColor">
				<path :d="iconPath" />
			</g>
		</svg>
		<span class="wvui-icon__content"><slot /></span>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * SVG icon.
 *
 * See src/themes/icons.ts for a list of all icons and src/themes/iconGroups.ts
 * for icons grouped by category. To use an icon, import it or the iconGroup
 * it's in, assign it to a name in your component's data option, then use v-bind
 * to set the icon attribute of the <wvui-icon> element to that name.
 *
 * Alternately, custom or third-party icons could be used as long as the icon
 * prop provided to this component is either a string containing the icon path
 * or an object with a `path` property.
 *
 * Some icons should be flipped in RTL languages and some icons differ per
 * language. This component relies on the dir and lang attributes of the <html>
 * element, respectively, to handle those instances. See src/themes/icons.ts
 * for data structure (e.g. wvuiIconBold).
 *
 * Slot may contain text for screen readers and will be visually hidden.
 */
export default Vue.extend( {
	name: 'WvuiIcon',
	props: {
		/** The svg path or an object containing that path plus other data. */
		icon: {
			type: [ String, Object ],
			required: true
		},
		/** Numerical color value (e.g. hex code, rgba) or keyword. */
		iconColor: {
			type: String,
			default: 'currentColor'
		},
		/** The height and width of the icon, in pixels. */
		size: {
			type: [ Number, String ],
			default: 20
		},
		/** Explicitly set the language or default to document lang. */
		langCode: {
			type: String,
			default: (): string => document.documentElement.lang
		}
	},
	data(): Record<string, string> {
		return {
			dir: document.documentElement.dir || 'ltr'
		};
	},
	computed: {
		classes(): Record<string, boolean> {
			return {
				'wvui-icon--flippable': this.icon?.flippable
			};
		},
		iconPath(): string {
			// Icon with a single path.
			if ( !this.icon.paths ) {
				return this.icon?.path || this.icon;
			}

			// Icon that differs per language.
			if ( this.icon.languageMap ) {
				// If there's a path specified for this language, use it.
				const iconKey = this.icon.languageMap?.[ this.langCode ];
				if ( iconKey && this.icon.paths?.[ iconKey ] ) {
					return this.icon.paths?.[ iconKey ];
				}

				// Use the default path if there is one.
				return this.icon.paths?.[ this.icon.default ] || '';
			}

			// Icon that differs between LTR and RTL languages but can't just
			// be flipped horizontally.
			return this.icon.paths?.[ this.dir ] || '';
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-icon {
	align-items: center;
	// Maintain an inline outer element while using flexbox to center the SVG
	// and avoid extra space around the image.
	display: inline-flex; // stylelint-disable-line plugin/no-unsupported-browser-features
	justify-content: center;
	// For inline, inline-block, and table layouts.
	vertical-align: middle;
	user-select: none;

	// Text content is only for screen readers.
	&__content {
		.wvui-visually-hidden();
	}
}

// Horizontally flip icons that should be flipped for RTL languages.
[ dir='rtl' ] .wvui-icon--flippable svg {
	transform: scaleX( -1 );
}
</style>
