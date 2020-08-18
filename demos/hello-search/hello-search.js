import Vue from 'vue';
import App from './HelloSearch.vue';
import '@wikimedia/wvui/dist/wvui.css';

Vue.config.productionTip = false;

// http://localhost:8080/hello-search.html

const input = document.getElementById( 'searchInput' );

// eslint-disable-next-line no-console
input.addEventListener( 'focus', () => console.log( 'Preexisting listener invoked.' ) );

setTimeout( function () {
	const value = input instanceof HTMLInputElement ? input.value : '';
	console.log( `value=${value}` ); // eslint-disable-line no-console

	// eslint-disable-next-line no-new
	new Vue( {
		el: '#app',
		render: ( createElement ) => createElement( App, { props: { value } } )
	} );
}, Math.random() * 5000 );
