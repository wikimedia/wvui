import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import WvuiButton from './Button.vue';

export default {
    title: 'Components/wvui-button',
    component: WvuiButton,
    parameters: { layout: 'centered' }
};

export const WvuiButtons = (): Vue.Component => Vue.extend( {
    components: { WvuiButton },
    methods: { click: action( 'click' ) },
    template: `
		<wvui-button @click="click">label</wvui-button>
	`
} );
