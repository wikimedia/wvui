// A wrapper for native fetch() in browsers.
// Currently this rejects the returned promise if window.fetch is not available in the browser.
// The plan is to add a fallback so we can support older browsers in the future.
export function fetch( resource: string, init?: RequestInit ): Promise<Response> {
	if ( 'fetch' in window ) {
		return window.fetch( resource, init );
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
