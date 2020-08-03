import { buildQueryString, fetch } from './fetch';
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
		const response = await fetch( url );

		expect( response.ok ).toBeTruthy();
		await expect( response.json() ).resolves.toEqual( { pages: [] } );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith( url, undefined );
		}
	} );

	test( '200 with init param passed', async () => {
		const response = await fetch( url, { mode: 'cors' } );

		expect( response.ok ).toBeTruthy();
		await expect( response.json() ).resolves.toEqual( { pages: [] } );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				url,
				expect.objectContaining( { mode: 'cors' } )
			);
		}
	} );

	test( '404 response', async () => {
		const response = await fetch( '//en.wikipedia.org/doesNotExist' );

		expect( response.ok ).toBeFalsy();
		await expect( response.text() ).resolves.toContain( 'Page not found' );

		if ( mockedRequests ) {
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
