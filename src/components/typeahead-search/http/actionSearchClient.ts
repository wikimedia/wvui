import { fetchJson, FetchJson } from '../../../http/fetch';
import { buildQueryString } from '../../../utils/StringUtils';
import { SearchClient, SearchResponse } from './SearchClient';

// https://www.mediawiki.org/wiki/API:Query
// https://www.mediawiki.org/wiki/API:Prefixsearch
export interface ActionResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	query?: { pages: Record<keyof any, ActionResult> };
}

export interface ActionResult {
	index: number; // 1-based
	pageid: number;
	title: string;
	pageprops?: PageProps;
	description?: string;
	thumbnail?: ActionThumbnail;
}

interface ActionThumbnail {
	source: string;
	width?: number;
	height?: number;
}

interface PageProps {
	displaytitle?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertObjectToArray( pages?: Record<keyof any, ActionResult> ): ActionResult[] {
	if ( !pages ) {
		return [];
	}

	return Object.keys( pages ).map( ( key ) => pages[ key ] );
}

function adaptApiResponse( query: string, actionResponse: ActionResponse ): SearchResponse {
	return {
		query,
		results:
			convertObjectToArray( actionResponse.query?.pages )
				.map( ( { pageid, title, pageprops, description, thumbnail } ) => ( {
					id: pageid,
					key: title,
					title: pageprops?.displaytitle || title,
					description,
					thumbnail: thumbnail ? {
						url: thumbnail.source,
						width: thumbnail.width,
						height: thumbnail.height
					} : undefined
				} ) )
	};
}

export function actionSearchClient( getJson: FetchJson = fetchJson ): SearchClient {
	return {
		fetchByTitle( query, domain, limit = 10 ): Promise<SearchResponse> {
			query = query.trim();

			// [todo] [IE11] Remove `&& Promise` conditional when native Promise support is assumed.
			if ( !query && Promise ) {
				return Promise.resolve( { query, results: [] } );
			}

			// https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&smaxage=300&maxage=300&origin=*&uselang=content&prop=pageimages%7Cdescription%7Cpageprops&list=&generator=prefixsearch&pithumbsize=80&pilicense=any&descprefersource=local&ppprop=displaytitle&gpssearch=ios&gpslimit=10
			const params: Record<string, string> = {
				format: 'json',
				formatversion: '2',
				// Use the wiki's content language (T97096) to enable cached responses.
				uselang: 'content',
				smaxage: '300', // seconds
				maxage: '300', // seconds
				origin: '*',
				action: 'query',
				prop: 'description|pageimages|pageprops',
				descprefersource: 'local',
				ppprop: 'displaytitle',
				pilicense: 'any',
				piprop: 'thumbnail',
				pithumbsize: '80', // TODO: discuss thumbnail size to request.
				generator: 'prefixsearch',
				gpslimit: limit.toString(),
				gpssearch: query
			};
			const headers = {
				accept: 'application/json'
			};

			const url = `//${domain}/w/api.php?${buildQueryString( params )}`;
			return getJson( url, { headers } )
				.then( ( json ) => adaptApiResponse( query, json as ActionResponse ) );
		},
		submitSearchURL(
			query,
			params = { title: 'Special:Search' } ) {
			return `/w/index.php?${buildQueryString( { ...params, search: query } )}`;
		}
	};
}
