export interface TypeaheadSuggestion {
	key: string;
	description?: string;
	title: string;
	thumbnail?: TypeaheadSuggestionThumbnail
}

export interface TypeaheadSuggestionThumbnail {
	mimetype: string;
	width: number;
	size?: number
	height: number;
	url: string
}
