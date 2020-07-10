/*
* Defines types for text inputs
* */
export enum TextInputType {
	text = 'text',
	search = 'search'
}

/**
 * @param val
 * @return whether an input is a TextInputType.
 */
export function isTextInputType( val: unknown ): val is TextInputType {
	return Object.keys( TextInputType ).some(
		( key ) => TextInputType[ key as keyof typeof TextInputType ] === val
	);
}
