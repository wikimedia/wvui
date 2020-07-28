import WvuiUtils from '../utils/Utils';
import { DirectiveFunction, DirectiveOptions } from 'vue';

const highlightedTextDirectiveHandler: DirectiveFunction =
	( el: HTMLElement, binding ): void => {
		const { query, title } = binding.value;

		if ( !query ) {
			el.innerText = title;
			return;
		}

		const sanitizedQuery = WvuiUtils.htmlEscape( WvuiUtils.regexpEscape( query ) );
		const matchStartIndex = title.search( new RegExp( sanitizedQuery, 'i' ) );

		if ( matchStartIndex < 0 ) {
			el.innerText = title;
			return;
		}

		const matchEndIndex = matchStartIndex + sanitizedQuery.length;
		const highlightedTitle = title.substring( matchStartIndex, matchEndIndex );
		const beforeHighlight = title.substring( 0, matchStartIndex );
		const afterHighlight = title.substring( matchEndIndex, title.length );

		// eslint-disable-next-line max-len
		el.innerHTML = `${beforeHighlight}<em class="wvui-typeahead-suggestion__matching-title">${highlightedTitle}</em>${afterHighlight}`;
	};

/*
* Highlights text if there are matches with a query
* */
export const highlightedText: DirectiveOptions = {
	inserted: highlightedTextDirectiveHandler,
	update: highlightedTextDirectiveHandler
};
