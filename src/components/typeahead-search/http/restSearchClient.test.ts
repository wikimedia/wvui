import { RestResponse, restSearchClient } from './restSearchClient';
import * as jestFetchMock from 'jest-fetch-mock';

const mockedRequests = !process.env.TEST_LIVE_REQUESTS;

describe( 'restApiSearchClient', () => {
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
	} );

	test( '2 results', async () => {
		const thumbUrl = '//upload.wikimedia.org/wikipedia/commons/0/01/MediaWiki-smaller-logo.png';
		const restResponse: RestResponse = {
			pages: [
				{
					id: 37298,
					key: 'Media',
					title: 'Media',
					description: 'Wikimedia disambiguation page',
					thumbnail: null
				},
				{
					id: 323710,
					key: 'MediaWiki',
					title: 'MediaWiki',
					description: 'wiki software',
					thumbnail: {
						width: 200,
						height: 189,
						url: thumbUrl
					}
				}
			]
		};
		fetchMock.mockOnce( JSON.stringify( restResponse ) );

		const searchResult = await restSearchClient().fetchByTitle(
			'media',
			'en.wikipedia.org',
			2
		).fetch;

		const controller = new AbortController();

		expect( searchResult.query ).toStrictEqual( 'media' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 2 );
		expect( searchResult.results[ 0 ] ).toStrictEqual( {
			...restResponse.pages[ 0 ],
			// thumbnail: null -> thumbnail: undefined
			thumbnail: undefined
		} );
		expect( searchResult.results[ 1 ] ).toStrictEqual( restResponse.pages[ 1 ] );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 ); // eslint-disable-line jest/no-conditional-expect
			expect( fetchMock ).toHaveBeenCalledWith( // eslint-disable-line jest/no-conditional-expect
				'//en.wikipedia.org/w/rest.php/v1/search/title?q=media&limit=2',
				{ headers: { accept: 'application/json' }, signal: controller.signal }
			);
		}
	} );

	test( '0 results', async () => {
		const restResponse: RestResponse = { pages: [] };
		fetchMock.mockOnce( JSON.stringify( restResponse ) );

		const searchResult = await restSearchClient().fetchByTitle(
			'thereIsNothingLikeThis',
			'en.wikipedia.org'
		).fetch;

		const controller = new AbortController();
		expect( searchResult.query ).toStrictEqual( 'thereIsNothingLikeThis' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 0 );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 ); // eslint-disable-line jest/no-conditional-expect
			expect( fetchMock ).toHaveBeenCalledWith( // eslint-disable-line jest/no-conditional-expect
				'//en.wikipedia.org/w/rest.php/v1/search/title?q=thereIsNothingLikeThis&limit=10',
				{ headers: { accept: 'application/json' }, signal: controller.signal }
			);
		}
	} );

	if ( mockedRequests ) {
		test( 'network error', async () => {
			fetchMock.mockRejectOnce( new Error( 'failed' ) );

			await expect( restSearchClient().fetchByTitle(
				'anything',
				'en.wikipedia.org'
			).fetch ).rejects.toThrow( 'failed' );
		} );
	}
} );
