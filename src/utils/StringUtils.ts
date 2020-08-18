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
