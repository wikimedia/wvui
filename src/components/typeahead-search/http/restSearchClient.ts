import { fetchJson, FetchJson } from '../../../http/fetch';
import { buildQueryString } from '../../../utils/StringUtils';
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

function adaptApiResponse( query: string, restResponse: RestResponse ): SearchResponse {
	return {
		query,
		results:
			restResponse.pages
				.map( ( { id, key, title, description, thumbnail } ) => ( {
					id,
					key,
					title,
					description,
					thumbnail: thumbnail ? {
						url: thumbnail.url,
						width: thumbnail.width ?? undefined,
						height: thumbnail.height ?? undefined
					} : undefined
				} ) )
	};
}

export function restSearchClient( getJson: FetchJson = fetchJson ): SearchClient {
	return {
		// https://www.mediawiki.org/wiki/API:REST_API/Reference#Autocomplete_page_title
		fetchByTitle( query, domain, limit = 10 ): Promise<SearchResponse> {
			query = query.trim();

			// [todo] [IE11] Remove `&& Promise` conditional when native Promise support is assumed.
			if ( !query && Promise ) {
				return Promise.resolve( adaptApiResponse( query, { pages: [] } ) );
			}

			const params = {
				q: query,
				limit
			};
			const headers = {
				accept: 'application/json'
			};

			const url = `//${domain}/w/rest.php/v1/search/title?${buildQueryString( params )}`;
			const { fetch } = getJson( url, { headers } );

			return fetch.then( ( json ) => adaptApiResponse( query, json as RestResponse ) );
		},
		submitSearchURL(
			query,
			params = { title: 'Special:Search' } ) {
			return `/w/index.php?${buildQueryString( { ...params, search: query } )}`;
		}
	};
}
