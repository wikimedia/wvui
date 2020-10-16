import { buildQueryString } from '../../utils/StringUtils';
import { SearchResult } from '../typeahead-search/http/SearchClient';

export interface UrlGenerator {

	/**
	 * Generates the URL that the user agent should navigate to when the user clicks the typeahead
	 * suggestion.
	 *
	 * @param suggestion
	 * @param params Additional parameters to include in the URL's query string
	 * @return
	 */
	generateUrl( suggestion: SearchResult | string, params?: Record<string, string> ): string;
}

/**
 * Generates URLs for suggestions like those in MediaWiki's mediawiki.searchSuggest implementation.
 *
 * @return The URL generator
 */
export function createDefaultUrlGenerator(): UrlGenerator {
	return {
		generateUrl(
			suggestion: SearchResult | string,
			params = {
				title: 'Special:Search'
			}
		): string {
			if ( typeof suggestion !== 'string' ) {
				suggestion = suggestion.title;
			}

			return `/w/index.php?${buildQueryString( { ...params, search: suggestion } )}`;
		}
	};
}
