<template>
	<span class="wvui-icon" :class="rootClasses">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 20 20"
			:aria-hidden="lacksTitle"
		>
			<title v-if="iconTitle">{{ iconTitle }}</title>
			<g :fill="iconColor">
				<path :d="iconPath" />
			</g>
		</svg>
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
		/** The SVG path or an object containing that path plus other data. */
		icon: {
			type: [ String, Object ],
			required: true
		},
		/** Numerical color value (e.g. hex code, rgba) or keyword. */
		iconColor: {
			type: String,
			default: 'currentColor'
		},
		/**
		 * Accessible title for SVG. String or message object. If not included,
		 * the SVG will be hidden from screen readers.
		 */
		iconTitle: {
			type: [ String, Object ],
			default: ''
		},
		/** Explicitly set the language or default to document lang. */
		langCode: {
			type: String,
			default: (): string => document.documentElement.lang
		}
	},
	data(): Record<string, string> {
		return {
			dir: document.documentElement.dir
		};
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-icon--flip-for-rtl': this.shouldFlip
			};
		},
		shouldFlip(): boolean {
			// Don't flip if the current language is listed as an exception.
			if ( this.icon.shouldFlipExceptions ) {
				return this.icon.shouldFlipExceptions.indexOf( this.langCode ) === -1;
			}

			return this.icon?.shouldFlip;
		},
		lacksTitle(): boolean {
			return !this.iconTitle;
		},
		iconPath(): string {
			// Icon with a single path.
			if ( this.icon.path ) {
				return this.icon.path;
			}

			// Icon that differs per language.
			if ( this.icon.langVariants ) {
				return this.icon.langVariants[ this.langCode ]?.path || this.icon.default.path;
			}

			// Icon that differs between LTR and RTL languages but can't just
			// be flipped horizontally.
			if ( this.icon.dirVariants ) {
				return this.icon.dirVariants[ this.dir ]?.path || this.icon.default.path;
			}

			return '';
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
	// Equivalent to @size-icon in ems relative to our base 0.875em font size.
	font-size: unit( @min-size-icon ) / @font-size-browser / @font-size-base;
	justify-content: center;
	// For inline, inline-block, and table layouts.
	vertical-align: middle;
	user-select: none;
}

// Horizontally flip icons that should be flipped for RTL languages.
[ dir='rtl' ] .wvui-icon--flip-for-rtl svg {
	transform: scaleX( -1 );
}
</style>
