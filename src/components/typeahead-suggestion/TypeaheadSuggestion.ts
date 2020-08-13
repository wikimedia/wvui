export interface TypeaheadSuggestion {
	/** Page title in URL-friendly format. Matches the database key. */
	key: string;
	/** Page title. */
	title: string;
	/** Page description. */
	description?: string;
	/** Page image thumbnail. */
	thumbnail?: TypeaheadSuggestionThumbnail
}

export interface TypeaheadSuggestionThumbnail {
	/** Thumbnail width in pixels. */
	width: number;
	/** Thumbnail height in pixels. */
	height: number;
	/** Thumbnail url. */
	url: string
}
