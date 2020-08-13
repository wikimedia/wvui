/*
* Replaces specific character to a corresponding
* HTMl special entity
* */
function htmlReplacer( value: string ): string {
	switch ( value ) {
		case '\'':
			return '&#039;';
		case '"':
			return '&quot;';
		case '<':
			return '&lt;';
		case '>':
			return '&gt;';
		case '&':
			return '&amp;';
		default:
			return value;
	}
}

/*
* Escapes special characters
* */
export function regExpEscape( value: string ): string {
	return value.replace( /([\\{}()|.?*+\-^$[\]])/g, '\\$1' );
}

/*
* Replaces '"<>& characters with HTML special entities
* */
export function htmlEscape( value: string ): string {
	return value.replace( /['"<>&]/g, htmlReplacer );
}
