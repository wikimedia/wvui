import { GetJson } from '../../../http/fetch';

export interface SearchClient {
	/**
	 * @param query search string to search for
	 * @param domain the base URL for the wiki without protocol. Example: 'sr.wikipedia.org'
	 * @param limit maximum number of results
	 * @param fetchJsonImpl a function which returns a promise that resolves to a json
	 */
	fetchByTitle(
		query: string,
		domain: string,
		limit?: number,
		fetchJsonImpl?: GetJson
	): Promise<SearchResponse>;
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
