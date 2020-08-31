// a function which returns a promise that resolves to a json
export type GetJson = (
	resource: string,
	init?: RequestInit
) => Promise<Record<string, unknown>>;

// A wrapper which combines native fetch() in browsers and the following json() call.
// Currently this rejects the returned promise if window.fetch is not available in the browser.
// The plan is to add a way for clients of this library to pass in an implementation, e.g.
// using jQuery.ajax(), so we can support older browsers in the future.
export function fetchJson(
	resource: string,
	init?: RequestInit
): Promise<Record<string, unknown>> {
	if ( 'fetch' in window ) {
		return window.fetch( resource, init )
			.then( ( response ) => {
				if ( response.ok ) {
					return response.json();
				} else {
					return {};
				}
			} );
	} else {
		return Promise.reject( 'window.fetch() not available' );
	}
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
