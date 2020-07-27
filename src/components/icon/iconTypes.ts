/**
 * An icon with a single path.
 */
export interface Icon {
	/** SVG path string. */
	path: SvgPath,
	/** Whether the icon should be flipped horizontally via CSS in RTL mode. */
	shouldFlip?: boolean,
	/**
	 * Language codes that are exceptions to the above property (e.g. the help
	 * icon should flip in RTL mode, but not for Hebrew or Yiddish).
	 */
	shouldFlipExceptions?: string[]
}
type SvgPath = string

/**
 * An icon that varies per language.
 */
export interface IconVariedByLang {
	/** HTMLElement.lang code with corresponding icon. */
	langCodeMap: Record<string, Icon>,
	/** The default icon. */
	default: Icon
}

/**
 * An icon that varies per text direction (but can't just be flipped).
 */
export interface IconVariedByDir {
	/** Icon for RTL dir. */
	rtl: Icon,
	/** The default icon. */
	default: Icon
}

export type AnyIcon = string | Icon | IconVariedByLang | IconVariedByDir;

/**
 * @param icon The icon string or object.
 * @param langCode The HTMLElement.lang code.
 * @param dir The HTMLElement.dir (ltr, rtl, or auto).
 * @return The appropriate SVG path.
 */
export function getIconPath( icon: AnyIcon, langCode: string, dir: string ): string {
	if ( typeof icon === 'string' ) {
		return icon;
	}

	// Icon with a single path.
	if ( 'path' in icon ) {
		return icon.path;
	}

	// Icon that differs per language.
	if ( 'langCodeMap' in icon ) {
		return icon.langCodeMap[ langCode ]?.path || icon.default.path;
	}

	// Icon that differs between LTR and RTL languages but can't just
	// be flipped horizontally.
	return dir === 'rtl' ? icon.rtl.path : icon.default.path;
}

/**
 * @param icon The icon string or object.
 * @param langCode The HTMLElement.lang code.
 * @return Whether the icon should be flipped horizontally in RTL mode.
 */
export function shouldFlip( icon: AnyIcon, langCode: string ): boolean {
	if ( typeof icon === 'string' ) {
		return false;
	}

	if ( 'shouldFlipExceptions' in icon ) {
		// Don't flip if the current language is listed as an exception.
		const exception = icon.shouldFlipExceptions?.indexOf( langCode );
		return exception === undefined || exception === -1;
	}

	if ( 'shouldFlip' in icon ) {
		return !!icon.shouldFlip;
	}

	return false;
}
