export default class WvuiUtils {
	public static regexpEscape( value: string ): string {
		return value.replace( /([\\{}()|.?*+\-^$[\]])/g, '\\$1' );
	}

	public static htmlEscape( value: string ): string {
		return value.replace( /['"<>&]/g, WvuiUtils.htmlReplacer );
	}

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
