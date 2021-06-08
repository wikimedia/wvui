import Vue from 'vue';
import { computed, ComputedRef } from '@vue/composition-api';

let counter = 0;

/**
 * Composable for automatic ID generation. Provides a computed property called `id` that returns an
 * automatically generated unique ID to use for the HTML `id` attribute. If an `id` attribute is
 * already set on the component by its parent, the manually set ID is used instead of an
 * automatically generated one. Generated IDs look like 'wvui-my-component-42'.
 *
 * Also provides a utility method called `prefixId` that can be used to generate sub-IDs for
 * elements in the component. For example, if the component's ID is 'wvui-my-component-42', then
 * `prefixId( 'foo' )` will return 'wvui-my-component-42-foo'.
 *
 * @param componentName Component name to use in the generated ID, typically in kebab-case
 * @return Object with a computed property called ID and a function called prefixId
 */
export default function useGeneratedId( componentName? : string ) : {
	/**
	 * Computed property that contains an automatically generated unique HTML ID. If the
	 * component's parent has set an ID, that ID takes precedence. Should be used with
	 * `:id="id"` on the root element.
	 */
	id: ComputedRef<string>,
	/**
	 * Prefix the given string with the component's ID
	 */
	prefixId: ( suffix: string ) => string
} {
	const componentNameWithDash = componentName === undefined ? '' : componentName + '-';
	const generatedId = `wvui-${componentNameWithDash}${counter++}`;

	const id = computed( ( vm : Vue ) => vm.$attrs.id || generatedId );
	const prefixId = function ( this: Vue, suffix : string ) : string {
		// Don't use `this.id` here, because we want `prefixId` to work even if `id` isn't
		// composed in.
		return `${this.$attrs.id || generatedId}-${suffix}`;
	};

	return {
		id,
		prefixId
	};
}
