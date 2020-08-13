import * as StringUtils from '../../utils/StringUtils';

/*
* Formats title adding highlighted query if it matches
* */
export function getTitleChunks( query: string, title: string ): string[] {
	if ( !query ) {
		return [ title ];
	}

	const sanitizedQuery = StringUtils.htmlEscape( StringUtils.regExpEscape( query ) );
	const matchStartIndex = title.search( new RegExp( sanitizedQuery, 'i' ) );

	if ( matchStartIndex < 0 ) {
		return [ StringUtils.htmlEscape( title ) ];
	}

	const matchEndIndex = matchStartIndex + sanitizedQuery.length;
	const highlightedTitle = title.substring( matchStartIndex, matchEndIndex );
	const beforeHighlight = title.substring( 0, matchStartIndex );
	const afterHighlight = title.substring( matchEndIndex, title.length );

	return [ beforeHighlight, highlightedTitle, afterHighlight ];
}
