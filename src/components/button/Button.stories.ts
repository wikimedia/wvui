import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import Button from './Button.vue';

export default {
    title: 'Components/wvui-button',
    component: Button,
    parameters: { layout: 'centered' }
};

export const Buttons = (): Vue.Component => Vue.extend( {
    components: { Button },
    methods: { click: action( 'click' ) },
    template: `
		<button @click="click">Test</button>
	`
} );
