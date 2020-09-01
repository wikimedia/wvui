// import { boolean, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';

export default {
	title: 'Components/TypeaheadSearch',
	component: WvuiTypeaheadSearch
};

export const TypeaheadSearch = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSearch },
		props: {
		},
		computed: {
		},
		template: `
		<div style="margin-left: 40px">
			<wvui-typeahead-search />
		</div>
		`
	} );
