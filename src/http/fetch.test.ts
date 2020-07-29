import { buildQueryString, fetch } from './fetch';
import * as jestFetchMock from 'jest-fetch-mock';

describe( 'fetch() using window.fetch', () => {
	jestFetchMock.enableFetchMocks();

	beforeEach( () => {
		fetchMock.resetMocks();
		fetchMock.mockIf( /^https?:\/\/example.org.*$/, async ( req ) => {
			if ( req.url.endsWith( '/validPath' ) ) {
				return {
					body: JSON.stringify( { success: true } ),
					headers: {
						'X-Some-Response-Header': 'Some header value'
					}
				};
			} else {
				return {
					status: 404,
					body: JSON.stringify( { errorCode: 'not_found' } )
				};
			}
		} );
	} );

	test( '200 without init param passed', async () => {
		const response = await fetch( 'https://example.org/validPath' );

		expect( response.ok ).toBeTruthy();
		await expect( response.json() ).resolves.toEqual( { success: true } );

		expect( fetchMock ).toHaveBeenCalledTimes( 1 );
		expect( fetchMock ).toHaveBeenCalledWith(
			'https://example.org/validPath',
			undefined
		);
	} );

	test( '200 with init param passed', async () => {
		const response = await fetch( 'https://example.org/validPath', { method: 'POST', body: 'foo' } );

		expect( response.ok ).toBeTruthy();
		await expect( response.json() ).resolves.toEqual( { success: true } );

		expect( fetchMock ).toHaveBeenCalledTimes( 1 );
		expect( fetchMock ).toHaveBeenCalledWith(
			'https://example.org/validPath',
			expect.objectContaining( {
				method: 'POST',
				body: 'foo'
			} )
		);
	} );

	test( '404', async () => {
		const response = await fetch( 'https://example.org/INVALID' );

		expect( response.ok ).toBeFalsy();
		await expect( response.json() ).resolves.toEqual( { errorCode: 'not_found' } );

		expect( fetchMock ).toHaveBeenCalledTimes( 1 );
		expect( fetchMock ).toHaveBeenCalledWith(
			'https://example.org/INVALID',
			undefined
		);
	} );
} );

describe( 'buildQueryString()', () => {
	// [description, input, expected]
	type Case = [string, Record<string, string|number|boolean>, string];

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
