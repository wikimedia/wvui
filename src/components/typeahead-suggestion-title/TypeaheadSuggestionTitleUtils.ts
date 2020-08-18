import * as StringUtils from '../../utils/StringUtils';

/**
 * Formats title adding highlighted query if it matches.
 *
 * @param {string} query String to match with
 * @param {string} title Suggestion title
 * @return [string, string, string]
 */
export function splitStringAtMatch( query: string, title: string ): [ string, string, string] {
	if ( !query ) {
		return [ title, '', '' ];
	}

	const sanitizedQuery = StringUtils.regExpEscape( query );
	const matchStartIndex = title.search( new RegExp( sanitizedQuery, 'i' ) );

	if ( matchStartIndex < 0 ) {
		return [ title, '', '' ];
	}

	const matchEndIndex = matchStartIndex + sanitizedQuery.length;
	const highlightedTitle = title.substring( matchStartIndex, matchEndIndex );
	const beforeHighlight = title.substring( 0, matchStartIndex );
	const afterHighlight = title.substring( matchEndIndex, title.length );

	return [ beforeHighlight, highlightedTitle, afterHighlight ];
}
