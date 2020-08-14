import Vue from 'vue';
import App from './HelloSearch.vue';
import '@wikimedia/wvui/dist/wvui.css';

if ( process.env.NODE_ENV !== 'production' ) { // eslint-disable-line no-undef
	Vue.config.productionTip = false;
}

// Note that client hydration will fail in development.
// eslint-disable-next-line no-new
new Vue( {
	el: '#app',
	render: ( createElement ) => createElement( App )
} );
// http://localhost:8080/hello-search.html
