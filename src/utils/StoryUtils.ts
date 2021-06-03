import { Args, ArgTypes } from '@storybook/addons';

export function filterKeys( obj: Record<string, unknown>, keysToRemove: string[] )
: Record<string, unknown> {
	const filtered = Object.assign( {}, obj );
	for ( const key of keysToRemove ) {
		delete filtered[ key ];
	}
	return filtered;
}

/**
 * Map event names to action listeners.
 *
 * Finds entries in argTypes that have the 'action' property set, and returns an object mapping
 * those event names to the listeners for those actions.
 *
 * To use this for e.g. the 'click' and 'mouseover' events, add the following to argTypes in either
 * the file's export default or to an individual story:
 *     argTypes: {
 *         // other stuff
 *         ...makeActionArgTypes( [ 'click', 'mouseover' ] )
 *     }
 *
 * Then in your story component, add a computed property:
 *     computed: {
 *         actionListeners() {
 *             return makeActionListeners( args, argTypes );
 *         }
 *     }
 *
 * and pass this computed property to the component's v-on in the template:
 *
 *     template: `
 *         <wvui-button
 *             v-bind="$props"
 *             v-on="actionListeners"
 *         />
 *     `
 *
 * @param args The args parameter passed to the story
 * @param argTypes The argTypes parameter passed to the story
 * @return Object for use in v-on=""
 */
export function makeActionListeners( args: Args, argTypes: ArgTypes ) : Record<string, () => void> {
	const listeners = {} as Record<string, () => void>;
	for ( const argName in argTypes ) {
		const argType = argTypes[ argName ];
		if ( argType.action ) {
			listeners[ argName ] = args[ argName ] as () => void;
		}
	}
	return listeners;
}

/**
 * Transform an array like [ 'click', 'focus' ] to an object for use in argTypes.
 * For usage see makeActionListeners().
 *
 * Returns an object that looks like:
 * {
 *     click: {
 *         action: 'click',
 *         table: { category: 'Events' }
 *     },
 *     focus: {
 *         action: 'focus',
 *         table: { category: 'Events' }
 *     }
 * }
 *
 * @param eventNames Array of event names
 * @return An object describing event args
 */
export function makeActionArgTypes( eventNames: string[] ) : ArgTypes {
	const result = {} as ArgTypes;
	for ( const eventName of eventNames ) {
		result[ eventName ] = {
			action: eventName,
			table: {
				category: 'Events'
			}
		};
	}
	return result;
}
