/*
* Defines types for text inputs
*/
export enum InputType {
	Text = 'text',
	Search = 'search'
}

/**
 * @param val
 * @return whether an input is a InputType.
 */
export function isInputType( val: unknown ): val is InputType {
	return Object.keys( InputType ).some(
		( key ) => InputType[ key as keyof typeof InputType ] === val
	);
}
