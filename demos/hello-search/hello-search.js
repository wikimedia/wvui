import Vue from 'vue';
import App from './HelloSearch.vue';
import '@wikimedia/wvui/dist/wvui.css';

Vue.config.productionTip = false;

// http://localhost:8080/hello-search.html

const input = document.getElementById( 'searchInput' );

// eslint-disable-next-line no-console
input.addEventListener( 'focus', () => console.log( 'Preexisting listener invoked.' ) );

setTimeout( function () {
	const searchAccessKey = input instanceof HTMLInputElement ? input.accessKey : '';
	const searchTitle = input instanceof HTMLInputElement ? input.title : '';
	const searchPlaceholder = input instanceof HTMLInputElement ? input.placeholder : '';
	const searchQuery = input instanceof HTMLInputElement ? input.value : '';
	console.log( `searchQuery=${searchQuery}` ); // eslint-disable-line no-console

	// eslint-disable-next-line no-new
	new Vue( {
		el: '#app',
		render: ( createElement ) => createElement(
			App,
			{ props: { searchAccessKey, searchTitle, searchPlaceholder, searchQuery } }
		)
	} );
}, Math.random() * 5000 );
