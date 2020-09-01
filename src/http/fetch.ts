// A function which returns a promise that resolves to a JSON object
export type GetJson = (
	resource: string,
	init?: RequestInit
) => Promise<Record<string, unknown>>;

// A wrapper which combines native fetch() in browsers and the following json() call.
export function fetchJson(
	resource: string,
	init?: RequestInit
): Promise<Record<string, unknown>> {
	return fetch( resource, init )
		.then( ( response ) => {
			if ( response.ok ) {
				return response.json();
			} else {
				return Promise.reject( 'Network request failed' );
			}
		} );
}

/**
 * Serializes a JS object into a URL query string.
 *
 * @param obj Object whose properties will be serialized. A subset of
 *     ConstructorParameters<typeof URLSearchParams>.
 * @return the query string (without the '?')
 */
export function buildQueryString( obj: Readonly<Record<string, string|number|boolean>> ): string {
	return Object
		.keys( obj )
		.map( ( prop ) => `${prop}=${encodeURIComponent( obj[ prop ] )}` )
		.join( '&' );
}
