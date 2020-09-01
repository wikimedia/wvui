import { buildQueryString, fetchJson, GetJson } from '../../../http/fetch';
import { SearchClient, SearchResponse } from './SearchClient';

// https://www.mediawiki.org/wiki/API:REST_API/Reference#Search_result_object
// Example: https://en.wikipedia.org/w/rest.php/v1/search/title?q=Jupiter&limit=5
export interface RestResponse {
	pages: RestResult[];
}

interface RestResult {
	id: number;
	key: string;
	title: string;
	description?: string;
	thumbnail?: RestThumbnail | null;
}

interface RestThumbnail {
	url: string;
	width?: number | null;
	height?: number | null;
}

function adaptApiResponse( query: string, response: Record<string, unknown> ): SearchResponse {
	const restResponse: RestResponse = response as unknown as RestResponse;
	return {
		query,
		results:
			restResponse.pages
				.map( ( page ) => ( {
					id: page.id,
					key: page.key,
					title: page.title,
					description: page.description,
					thumbnail: page.thumbnail ? {
						url: page.thumbnail.url,
						width: page.thumbnail.width ?? undefined,
						height: page.thumbnail.height ?? undefined
					} : undefined
				} ) )
	};
}

export function restSearchClient( getJson: GetJson = fetchJson ): SearchClient {
	return {
		// https://www.mediawiki.org/wiki/API:REST_API/Reference#Autocomplete_page_title
		fetchByTitle( query, domain, limit = 10 ): Promise<SearchResponse> {
			query = query.trim();
			if ( !query ) {
				return Promise.resolve( adaptApiResponse( query, { pages: [] } ) );
			}
			const params = {
				q: query,
				limit: limit
			};
			const headers = {
				accept: 'application/json'
			};

			const url = `//${domain}/w/rest.php/v1/search/title?${buildQueryString( params )}`;

			return getJson( url, { headers } ).then( ( json ) => adaptApiResponse( query, json ) );
		}
	};
}
