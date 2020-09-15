import WvuiButton from '@/components/button/Button.vue';
import WvuiIcon from '@/components/icon/Icon.vue';
import WvuiInput from '@/components/input/Input.vue';
import WvuiTypeaheadSuggestion from '@/components/typeahead-suggestion/TypeaheadSuggestion.vue';
import WvuiTypeaheadSearch from '@/components/typeahead-search/TypeaheadSearch.vue';

// Export version as a named export so that the default export so that the default export can be
// passed to the Vue app instance's components directly.
export const version = VERSION;

// Export all components available in the library.
export default {
	WvuiButton,
	WvuiInput,
	WvuiIcon,
	WvuiTypeaheadSuggestion,
	WvuiTypeaheadSearch
};
