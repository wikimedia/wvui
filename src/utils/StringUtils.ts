/**
 * Escapes special characters.
 *
 * @param {string} value Value to be escaped
 *
 * @return {string}
 */
export function regExpEscape( value: string ): string {
	return value.replace( /([\\{}()|.?*+\-^$[\]])/g, '\\$1' );
}

/**
 * Serializes a JS object into a URL query string.
 *
 * @param obj Object whose properties will be serialized. A subset of
 *     ConstructorParameters<typeof URLSearchParams>.
 * @return the query string (without the '?')
 */
export function buildQueryString( obj: Readonly<Record<string, string|number|boolean>> ): string {
	return Object
		.keys( obj )
		.map( ( prop ) => `${prop}=${encodeURIComponent( obj[ prop ] )}` )
		.join( '&' );
}
