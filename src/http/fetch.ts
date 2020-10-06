// A function which returns a promise that resolves to a JSON object
export type FetchJson = (
	resource: string,
	init?: RequestInit
) => Promise<unknown>;

// A wrapper which combines native fetch() in browsers and the following json() call.
export function fetchJson(
	resource: string,
	init?: RequestInit
): Promise<unknown> {
	return fetch( resource, init )
		.then( ( response ) => {
			if ( !response.ok ) {
				return Promise.reject(
					`Network request failed with HTTP code ${response.status}.`
				);
			}

			return response.json();
		} );
}
