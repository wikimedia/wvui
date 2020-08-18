import Vue from 'vue';
import App from './HelloHydration.vue';
import '@wikimedia/wvui/dist/wvui.css';

Vue.config.productionTip = false;

const input = document.getElementById( 'input' );
const value = input instanceof HTMLInputElement ? input.value : '';

// eslint-disable-next-line no-console
input.addEventListener( 'focus', () => console.log( 'Preexisting listener invoked.' ) );

// Note that client hydration will fail in development.
// eslint-disable-next-line no-new
new Vue( { el: '#app', render: ( createElement ) => createElement( App, { props: { value } } ) } );
// http://localhost:8080/hello-hydration.html
