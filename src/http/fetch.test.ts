import { buildQueryString, fetchJson } from './fetch';
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
		const json = await fetchJson( url );

		expect( json ).toStrictEqual( { pages: [] } );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith( url, undefined );
		}
	} );

	test( '200 with init param passed', async () => {
		const json = await fetchJson( url, { mode: 'cors' } );

		await expect( json ).toStrictEqual( { pages: [] } );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				url,
				expect.objectContaining( { mode: 'cors' } )
			);
		}
	} );

	test( '404 response', async () => {
		expect.assertions( 1 );
		await expect( fetchJson( '//en.wikipedia.org/doesNotExist' ) )
			.rejects.toStrictEqual( 'Network request failed' );

		if ( mockedRequests ) {
			expect.assertions( 3 );
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				'//en.wikipedia.org/doesNotExist',
				undefined
			);
		}
	} );
} );

describe( 'buildQueryString()', () => {
	// [description, input, expected]
	type Case = [ string, Record<string, string | number | boolean>, string ];

	const cases: Case[] = [
		[ 'empty object', {}, '' ],
		[ 'single property object', { single: 'value' }, 'single=value' ],
		[
			'multiple mixed property object',
			{ str: 'val', num: 1, bool: true },
			'str=val&num=1&bool=true'
		]
	];
	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, obj, result ) =>
			expect( buildQueryString( obj ) ).toStrictEqual( result )
	);
} );
