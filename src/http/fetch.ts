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
