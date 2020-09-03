import { mount } from '@vue/test-utils';
import WvuiTypeaheadSearch from './TypeaheadSearch.vue';

it( 'matches a snapshot', () => {
	const wrapper = mount( WvuiTypeaheadSearch );

	expect( wrapper.element ).toMatchSnapshot();
} );
