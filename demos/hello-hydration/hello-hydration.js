import Vue from 'vue';
import App from './HelloHydration.vue';
import '@wikimedia/wvui/dist/wvui.css';

Vue.config.productionTip = false;

// Note that client hydration will fail in development.
// eslint-disable-next-line no-new
new Vue( { el: '#app', render: ( createElement ) => createElement( App ) } );
// http://localhost:8080/hello-hydration.html
