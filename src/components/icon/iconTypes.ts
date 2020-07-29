type SvgPath = string

/**
 * An icon with a single path.
 */
export type Icon = SvgPath;

/**
 * An icon with a single path that should flip horizontally in RTL mode.
 */
export interface IconFlipForRtl {
	/** SVG path string. */
	path: SvgPath,
	/** Indicates that the icon should be flipped via CSS in RTL mode. */
	shouldFlip: true,
	/**
	 * Language codes that are exceptions to the above property (e.g. the help
	 * icon should flip in RTL mode, but not for Hebrew or Yiddish).
	 */
	shouldFlipExceptions?: string[]
}

/**
 * An icon that varies per language.
 */
export interface IconVariedByLang {
	/** HTMLElement.lang code with corresponding icon. */
	langCodeMap: Record<string, Icon | IconFlipForRtl>,
	/** The default icon. */
	default: Icon | IconFlipForRtl
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

export type AnyIcon = Icon | IconFlipForRtl | IconVariedByLang | IconVariedByDir;

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
		const langCodeIcon = langCode in icon.langCodeMap ?
			icon.langCodeMap[ langCode ] :
			icon.default;
		return typeof langCodeIcon === 'string' ? langCodeIcon : langCodeIcon.path;
	}

	// Icon that differs between LTR and RTL languages but can't just
	// be flipped horizontally.
	return dir === 'rtl' ? icon.rtl : icon.default;
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
