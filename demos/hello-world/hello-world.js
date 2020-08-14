import Vue from 'vue';
import components from '@wikimedia/wvui';
import '@wikimedia/wvui/dist/wvui.css';

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new /** @type {import( 'vue' ).VueConstructor} */ ( Vue )( {
	el: '#app',
	components,
	render: ( createElement ) => createElement( components.WvuiButton, 'Hello world!' )
} );
