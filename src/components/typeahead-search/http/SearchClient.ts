export interface AbortableSearchFetch {
	fetch: Promise<SearchResponse>,
	// Abort the request. This may also abort the reading of the response body
	// depending on the implementation (e.g. when calling AbortController's abort
	// method).
	abort(): void
}

export interface SearchClient {
	/**
	 * @param query The search term.
	 * @param domain The base URL for the wiki without protocol. Example: 'sr.wikipedia.org'.
	 * @param limit Maximum number of results.
	 */
	fetchByTitle(
		query: string,
		domain: string,
		limit?: number,
	): AbortableSearchFetch,
}

export interface SearchResponse {
	query: string,
	results: SearchResult[],
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
