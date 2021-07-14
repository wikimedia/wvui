import Vue from 'vue';
import WvuiProgressBar from './ProgressBar.vue';

export default {
	title: 'Components/ProgressBar',
	component: WvuiProgressBar,
	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Indeterminate = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiProgressBar },
		template: `
			<div>
				<wvui-progress-bar></wvui-progress-bar>
			</div>
		`
	} );
