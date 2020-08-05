export default class WvuiStringUtils {
	/*
	* Escapes special characters
	* */
	public static regExpEscape( value: string ): string {
		return value.replace( /([\\{}()|.?*+\-^$[\]])/g, '\\$1' );
	}

	/*
	* Replaces '"<>& characters with HTML special entities
	* */
	public static htmlEscape( value: string ): string {
		return value.replace( /['"<>&]/g, WvuiStringUtils.htmlReplacer );
	}

	/*
	* Replaces specific character to a corresponding
	* HTMl special entity
	* */
	private static htmlReplacer( value: string ): string {
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
}
