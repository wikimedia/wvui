import { fetchJson } from './fetch';
import * as jestFetchMock from 'jest-fetch-mock';

const mockedRequests = !process.env.TEST_LIVE_REQUESTS;

describe( 'fetch() using window.fetch', () => {
	const url = '//en.wikipedia.org/w/rest.php/v1/search/title?q=jfgkdajgioj&limit=10';

	beforeAll( () => {
		jestFetchMock.enableFetchMocks();
	} );

	afterAll( () => {
		jestFetchMock.disableFetchMocks();
	} );

	beforeEach( () => {
		fetchMock.resetMocks();
		if ( !mockedRequests ) {
			fetchMock.disableMocks();
		}
		fetchMock.mockIf( /^\/\/en.wikipedia.org\//, async ( req ) => {
			if ( req.url === url ) {
				return {
					body: JSON.stringify( { pages: [] } ),
					headers: {
						'Content-Type': 'application/json'
					}
				};
			} else {
				return {
					status: 404,
					body: 'Page not found'
				};
			}
		} );
	} );

	test( '200 without init param passed', async () => {
		const { fetch } = fetchJson( url );
		const json = await fetch;

		expect( json ).toStrictEqual( { pages: [] } );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 ); // eslint-disable-line jest/no-conditional-expect
			expect( fetchMock ).toHaveBeenCalledWith( url, undefined ); // eslint-disable-line jest/no-conditional-expect
		}
	} );

	test( '200 with init param passed', async () => {
		const { fetch } = fetchJson( url, { mode: 'cors' } );
		const json = await fetch;

		await expect( json ).toStrictEqual( { pages: [] } );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 ); // eslint-disable-line jest/no-conditional-expect
			expect( fetchMock ).toHaveBeenCalledWith( // eslint-disable-line jest/no-conditional-expect
				url,
				expect.objectContaining( { mode: 'cors' } )
			);
		}
	} );

	test( '404 response', async () => {
		expect.assertions( 1 );
		const { fetch } = fetchJson( '//en.wikipedia.org/doesNotExist' );

		await expect( fetch )
			.rejects.toStrictEqual( 'Network request failed with HTTP code 404.' );

		if ( mockedRequests ) {
			expect.assertions( 3 );
			expect( fetchMock ).toHaveBeenCalledTimes( 1 ); // eslint-disable-line jest/no-conditional-expect
			expect( fetchMock ).toHaveBeenCalledWith( // eslint-disable-line jest/no-conditional-expect
				'//en.wikipedia.org/doesNotExist',
				undefined
			);
		}
	} );
} );
