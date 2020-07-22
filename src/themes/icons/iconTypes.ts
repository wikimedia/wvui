/**
 * An icon with a single path.
 */
export interface Icon {
	/** SVG path. */
	path: string,
	/** Whether the icon should be flipped horizontally via CSS in RTL mode. */
	shouldFlip?: boolean,
	/**
	 * Language codes that are exceptions to the above property (e.g. the help
	 * icon should flip in RTL mode, but not for Hebrew or Yiddish).
	 */
	shouldFlipExceptions?: Array<string>
}

/**
 * An icon that varies per language.
 */
export interface IconVariedByLang {
	/** Language code key with corresponding icon. */
	langVariants: Record<string, Icon>,
	/** The default icon. */
	default: Icon
}

/**
 * An icon that varies per text direction (but can't just be flipped).
 */
export interface IconVariedByDir {
	/** Text direction key with corresponding icon. */
	dirVariants: Record<string, Icon>,
	/** The default icon. */
	default: Icon
}
