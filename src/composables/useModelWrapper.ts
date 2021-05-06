import { computed, WritableComputedRef, Ref } from '@vue/composition-api';

// The value we're modeling could be one of these simple types, or an array of
// values of those types.
export type ModelValue = string | number | boolean | unknown[];

/**
 * Provide a computed property that models an input value.
 *
 * This is useful when setting v-model on a component, which then needs to set
 * v-model on an input that it contains. We can't just reuse the first v-model
 * because that would mean mutating a prop. Instead, we need a separate computed
 * property that manually handles setting the value and emitting an event.
 *
 * See the Radio component for sample usage.
 *
 * @param modelValueRef A reactive reference of the modelValue prop provided by
 *                      the parent component via v-model.
 * @param emit Vue's $emit function
 * @return The computed property
 */
export default function useModelWrapper(
	modelValueRef: Ref<ModelValue>,
	// This is Vue's emit function; we don't need to type it more specifically.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	emit: ( event: string, ...args: any[] ) => void,
): WritableComputedRef<ModelValue> {
	return computed( {
		get: () => modelValueRef.value,
		set: ( value: ModelValue ) => emit( 'input', value )
	} );
}

// Prop type definition for the component's modelValue prop.
export const modelValueProp = {
	type: [ String, Number, Boolean, Array ],
	default: false
};
