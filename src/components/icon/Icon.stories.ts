import { color, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiIcon from './Icon.vue';
import * as iconGroups from './../../themes/iconGroups';

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
				iconGroups,
				icon: null
			};
		},
		beforeMount() {
			window.document.documentElement.setAttribute( 'dir', 'ltr' );
		},
		template: `
		<div>
			<div v-for="iconGroup in Object.keys( iconGroups )" :key="iconGroup">
				<h2>{{ iconGroup.replace( 'wvuiIconGroup', '' ) }}</h2>
				<div v-for="icon in Object.keys( iconGroups[ iconGroup ] )" :key="icon">
					<p>
						<wvui-icon
							:icon="iconGroups[ iconGroup ][ icon ]"
							:iconColor="iconColor"
							:langCode="langCode"
						>
							{{ icon }}
						</wvui-icon>
						{{ icon }}
					</p>
				</div>
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
				iconGroups,
				icon: null
			};
		},
		beforeMount() {
			window.document.documentElement.setAttribute( 'dir', 'rtl' );
		},
		template: `
		<div>
			<div v-for="iconGroup in Object.keys( iconGroups )" :key="iconGroup">
				<h2>{{ iconGroup.replace( 'wvuiIconGroup', '' ) }}</h2>
				<div v-for="icon in Object.keys( iconGroups[ iconGroup ] )" :key="icon">
					<p>
						<wvui-icon
							:icon="iconGroups[ iconGroup ][ icon ]"
							:iconColor="iconColor"
							:langCode="langCode"
						>
							{{ icon }}
						</wvui-icon>
						{{ icon }}
					</p>
				</div>
			</div>
		</div>
		`
	} );
