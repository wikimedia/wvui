import { boolean, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiIcon from './Icon.vue';

export default {
	title: 'Components/Icon',
	parameters: { layout: 'centered' }
};

export const configurable = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiIcon },
		props: {
			icon: { type: String, default: text( 'Icon', 'tag' ) },
			invert: { type: Boolean, default: boolean( 'Invert', false ) },
			slotProp: { type: String, default: text( 'Slot', 'Tag this image' ) }
		},
		template: `
			<wvui-icon :icon="icon" :invert="invert">
				{{slotProp}}
			</wvui-icon>
		`
	} );
