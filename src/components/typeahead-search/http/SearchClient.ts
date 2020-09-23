export interface SearchClient {
	/**
	 * @param query The search term.
	 * @param domain The base URL for the wiki without protocol. Example: 'sr.wikipedia.org'.
	 * @param limit Maximum number of results.
	 */
	fetchByTitle( query: string, domain: string, limit?: number ): Promise<SearchResponse>;

	/**
	 * @param query The search term.
	 * @param params Parameters for building a URL query string. The query is inserted.
	 * @return The encoded search URL.
	 */
	submitSearchURL( query: string, params?: Record<string, string> ): string;
}

export interface SearchResponse {
	query: string,
	results: SearchResult[];
}

export interface SearchResult {
	/** Integral page identifier. */
	id: number;
	/** Page title in URL-friendly format. Matches the database key. */
	key: string;
	/** Page title. */
	title: string;
	/** Page description. */
	description?: string;
	/** Page image. */
	thumbnail?: SearchResultThumbnail;
}

export interface SearchResultThumbnail {
	url: string;
	/** Image width in pixels. */
	width?: number;
	/** Image height in pixels. */
	height?: number;
}
