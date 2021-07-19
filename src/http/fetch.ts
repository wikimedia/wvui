interface NullableAbortController {
	abort(): void,
	readonly signal: AbortSignal | undefined
}

// A function which returns an AbortableFetch object.
export type FetchJson = (
	resource: string,
	init?: RequestInit
) => AbortableFetch;

export interface AbortableFetch {
	fetch: Promise<unknown>,
	abort(): void
}

const nullAbortController: Readonly<NullableAbortController> = {
	abort: () => {
		// Do nothing (no-op)
	},
	signal: undefined
};

// A wrapper which combines native fetch() in browsers and the following json() call.
export function fetchJson(
	resource: string,
	init?: RequestInit
): AbortableFetch {

	// As of 2020, browser support for AbortController is limited:
	// https://caniuse.com/abortcontroller
	// so replacing it with no-op if it doesn't exist.
	const controller = window.AbortController ?
		new AbortController() :
		nullAbortController;

	const getJson = fetch( resource, { ...init, signal: controller.signal } )
		.then( ( response ) => {
			if ( !response.ok ) {
				return Promise.reject(
					`Network request failed with HTTP code ${response.status}.`
				);
			}

			return response.json();
		} );

	return {
		fetch: getJson,
		abort: () => controller.abort()
	};
}
