import { color, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiIcon from './Icon.vue';
import * as icons from '../../themes/icons';

export default {
	title: 'Components/Icon',
	parameters: { layout: 'centered' }
};

export const iconsLTR = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiIcon },
		props: {
			iconColor: { type: String, default: color( 'Icon color', 'rgba(32,33,34,1)' ) },
			langCode: {
				type: String,
				default: text( 'Language code', window.document.documentElement.lang )
			}
		},
		data() {
			return {
				icons,
				icon: null
			};
		},
		beforeMount() {
			window.document.documentElement.setAttribute( 'dir', 'ltr' );
		},
		template: `
		<div>
			<div v-for="icon in Object.keys( icons )" :key="icon">
				<p>
					<wvui-icon
						:icon="icons[ icon ]"
						:iconColor="iconColor"
						:langCode="langCode"
					>
						{{ icon }}
					</wvui-icon>
					{{ icon }}
				</p>
			</div>
		</div>
		`
	} );

export const iconsRTL = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiIcon },
		props: {
			iconColor: { type: String, default: color( 'Icon color', 'rgba(32,33,34,1)' ) },
			langCode: {
				type: String,
				default: text( 'Language code', window.document.documentElement.lang )
			}
		},
		data() {
			return {
				icons,
				icon: null
			};
		},
		beforeMount() {
			window.document.documentElement.setAttribute( 'dir', 'rtl' );
		},
		template: `
		<div>
			<div v-for="icon in Object.keys( icons )" :key="icon">
				<p>
					<wvui-icon
						:icon="icons[ icon ]"
						:iconColor="iconColor"
						:langCode="langCode"
					>
						{{ icon }}
					</wvui-icon>
					{{ icon }}
				</p>
			</div>
		</div>
		`
	} );
