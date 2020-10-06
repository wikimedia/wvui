// A function which returns an object containing a fetch function.
export type FetchJson = (
	resource: string,
	init?: RequestInit
) => FetchJsonReturn;

export interface FetchJsonReturn {
	fetch: Promise<unknown>
}

// A wrapper which combines native fetch() in browsers and the following json() call.
export function fetchJson(
	resource: string,
	init?: RequestInit
): FetchJsonReturn {
	const getJson = fetch( resource, init )
		.then( ( response ) => {
			if ( !response.ok ) {
				return Promise.reject(
					`Network request failed with HTTP code ${response.status}.`
				);
			}

			return response.json();
		} );

	return {
		fetch: getJson
	};
}
