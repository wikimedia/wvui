import { boolean } from '@storybook/addon-knobs';
import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';
import './TypeaheadSearch.stories.less';

export default {
	title: 'Components/TypeaheadSearch',
	component: WvuiTypeaheadSearch
};

export const TypeaheadSearch = (): Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSearch },
		props: {
			showThumbnail: {
				type: Boolean,
				default: boolean( 'Show thumbnail?', true )
			},
			showDescription: {
				type: Boolean,
				default: boolean( 'Show description?', true )
			}
		},
		methods: {
			onFetchStart: action( 'fetch-start' ),
			onFetchEnd: action( 'fetch-end' )
		},
		template: `
			<div class="sb-typeahead-search">
				<wvui-typeahead-search
					id="typeahead-search"
					accesskey="f"
					aria-label="Search Wikipedia"
					form-action="/w/index.php"
					title="Search Wikipedia [Alt+Shift+f]"
					placeholder="Search Wikipedia"
					button-label="Search"
					footer-search-text="Search for pages containing"
					suggestions-label="search suggestions"
					:showThumbnail="showThumbnail"
					:showDescription="showDescription"
					@fetch-start="onFetchStart"
					@fetch-end="onFetchEnd"
				>
					<input type="hidden" name="title" value="Special:Search">
				</wvui-typeahead-search>
			</div>
		`
	} );
