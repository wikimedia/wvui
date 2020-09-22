import { addParameters } from '@storybook/vue';
import './preview.less';

// Disable informational message in the browser console log:
//
//   You are running Vue in development mode.
//   Make sure to turn on production mode when deploying for production.
//   See more tips at https://vuejs.org/guide/deployment.html
//
// This setting only applies to documentation.
//
// The conditional is necessary to work around a conflicting definition of Vue.
// https://github.com/storybookjs/storybook/issues/7379
if ( 'Vue' in window && window.Vue.config ) {
	window.Vue.config.productionTip = false;
}

// See wikimedia-ui-base breakpoints
const viewports = {
	mobile: {
		name: 'Mobile',
		styles: { width: '320px', height: '320px' }
	},
	tablet: {
		name: 'Tablet',
		styles: { width: '720px', height: '720px' }
	},
	desktop: {
		name: 'Desktop',
		styles: { width: '1000px', height: '1000px' }
	},
	'desktop-wide': {
		name: 'Wide desktop',
		styles: { width: '1200px', height: '1200px' }
	},
	'desktop-extra-wide': {
		name: 'Extra-wide desktop',
		styles: { width: '2000px', height: '2000px' }
	}
};

const backgrounds = {
	values: [
		{ name: 'white', value: '#fff' }, // @wmui-color-base100
		{ name: 'dark', value: '#202122' }, // @wmui-color-base10
		{ name: 'black', value: '#000' } // @wmui-color-base0
	]
};

addParameters( { viewport: { viewports }, backgrounds } );
