import Vue from 'vue';
import App from './HelloSearch.vue';
import '@wikimedia/wvui/dist/wvui.css';

Vue.config.productionTip = false;

// http://localhost:8080/hello-search.html
function render() {
	// eslint-disable-next-line no-new
	new Vue( { el: '#app', render: ( createElement ) => createElement( App ) } );
}

document.getElementById( 'searchInput' ).addEventListener( 'focus', render, { once: true } );
