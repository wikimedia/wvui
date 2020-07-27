export interface TypeaheadSuggestion {
	key: string;
	description: string | null;
	title: string;
	thumbnail: TypeaheadSuggestionThumbnail | null
}

export interface TypeaheadSuggestionThumbnail {
	mimetype: string;
	width: number;
	size: number | null
	height: number;
	url: string
}
