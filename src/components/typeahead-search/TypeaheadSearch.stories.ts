import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';
import './TypeaheadSearch.stories.less';

export default {
	title: 'Components/TypeaheadSearch',
	component: WvuiTypeaheadSearch,
	argTypes: {
		buttonLabel: {
			defaultValue: 'Search'
		},
		formAction: {
			defaultValue: '/w/index.php'
		},
		footerSearchText: {
			defaultValue: 'Search for pages containing'
		},
		suggestionsLabel: {
			defaultValue: 'search suggestions'
		},
		id: {
			defaultValue: 'typeahead-search'
		},
		client: {
			control: false
		},
		urlGenerator: {
			control: false
		},
		placeholder: {
			control: {
				type: 'text'
			},
			table: {
				category: 'Attributes'
			},
			defaultValue: 'Search Wikipedia'
		},
		...makeActionArgTypes( [ 'fetch-start', 'fetch-end', 'suggestion-click', 'submit' ] )
	}
};

export const Configurable = ( args: Args, { argTypes } : StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: { WvuiTypeaheadSearch },
		props: Object.keys( argTypes )
			.filter( ( propName ) => ![ 'client', 'urlGenerator' ].includes( propName ) ),
		computed: {
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [ 'default' ] );
			}
		},
		template: `
			<div class="sb-typeahead-search">
				<wvui-typeahead-search
					v-bind="filteredProps"
					v-on="actionListeners"
				/>
			</div>
		`
	} );
