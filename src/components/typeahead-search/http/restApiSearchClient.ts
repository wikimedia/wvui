import { buildQueryString, fetch } from '../../../http/fetch';
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

function adaptApiResponse( searchText: string, restResponse: RestResponse ): SearchResponse {
	return {
		searchText,
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

// https://www.mediawiki.org/wiki/API:REST_API/Reference#Autocomplete_page_title
function fetchByTitle(
	searchText: string,
	domain: string,
	limit: number
): Promise<SearchResponse> {
	searchText = searchText.trim();
	if ( !searchText ) {
		return Promise.resolve( adaptApiResponse( searchText, { pages: [] } ) );
	}
	const params = {
		q: searchText,
		limit: limit
	};
	const headers = {
		accept: 'application/json'
	};

	const url = `//${domain}/w/rest.php/v1/search/title?${buildQueryString( params )}`;
	return fetch( url, { headers } )
		.then( ( response ) => response.json() )
		.then( ( response ) => adaptApiResponse( searchText, response ) );
}

export function restSearchClient(): SearchClient {
	return {
		fetchByTitle( searchText, domain, limit = 10 ) {
			return fetchByTitle( searchText, domain, limit );
		}
	};
}