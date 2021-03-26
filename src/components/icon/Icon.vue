<template>
	<span class="wvui-icon" :class="rootClasses" @click="onClick">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
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
import Vue, { PropType } from 'vue';
import { AnyIcon, getIconPath, shouldFlip } from './iconTypes';

/**
 * SVG icon.
 *
 * See src/themes/icons.ts for a list of all icons. To use an icon, import it,
 * assign it to a name in your component's data option, then use v-bind
 * to set the icon attribute of the <wvui-icon> element to that name.
 *
 * Alternately, custom or third-party icons could be used as long as the icon
 * prop provided to this component is either a string containing the icon's SVG
 * path or one of the icon types described in ./iconTypes.ts.
 */
export default Vue.extend( {
	name: 'WvuiIcon',
	props: {
		/** The SVG path or an object containing that path plus other data. */
		icon: {
			type: [ String, Object ] as PropType<AnyIcon>,
			required: true
		},
		/**
		 * Paint value. Numerical color value (e.g. hex code, rgba), color
		 * keywords, and paint keywords are allowed. See
		 * https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint for all
		 * options.
		 */
		iconColor: {
			type: String,
			default: '#000'
		},
		/**
		 * Accessible title for SVG. String or message object. If not included,
		 * the SVG will be hidden from screen readers via aria-hidden="true".
		 */
		iconTitle: {
			type: [ String, Object ],
			default: ''
		},
		/**
		 * Explicitly set the current HTMLElement.lang. See
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang.
		 * Defaults to the document lang.
		 */
		langCode: {
			type: String,
			default: (): string => document.documentElement.lang
		}
	},
	data(): Record<string, string> {
		return {
			// Initially, use the document dir. Once the component mounts, we'll
			// check the element's computed style and update dir if needed.
			dir: document.documentElement.dir
		};
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-icon--flip-for-rtl': shouldFlip( this.icon, this.langCode )
			};
		},
		lacksTitle(): boolean {
			return !this.iconTitle;
		},
		iconPath(): string {
			return getIconPath( this.icon, this.langCode, this.dir );
		}
	},
	mounted() {
		// Now that the component is mounted, check its computed style and update dir
		const computedStyle = window.getComputedStyle( this.$el );
		this.dir = computedStyle?.direction || this.dir;
	},
	methods: {
		onClick( event: Event ): void {
			this.$emit( 'click', event );
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
	display: inline-flex; /* stylelint-disable-line plugin/no-unsupported-browser-features */
	justify-content: center;
	// For inline, inline-block, and table layouts.
	vertical-align: middle;
}

// Horizontally flip icons that should be flipped for RTL languages.
[ dir='rtl' ] .wvui-icon--flip-for-rtl svg {
	transform: scaleX( -1 );
}
</style>
