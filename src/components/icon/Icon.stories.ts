import Vue from 'vue';
import WvuiIcon from './Icon.vue';

export default {
	title: 'Components/Icon',
	parameters: { layout: 'centered' }
};

export const tag = (): Vue.Component => Vue.extend( {
	components: { WvuiIcon },
	template: `
		<wvui-icon icon="tag">Tag icon</wvui-icon>
	`
} );
