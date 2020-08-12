import { RestResponse, restSearchClient } from './restApiSearchClient';
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
		);

		expect( searchResult.searchText ).toEqual( 'media' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 2 );
		expect( searchResult.results[ 0 ] ).toStrictEqual( {
			...restResponse.pages[ 0 ],
			// thumbnail: null -> thumbnail: undefined
			thumbnail: undefined
		} );
		expect( searchResult.results[ 1 ] ).toStrictEqual( restResponse.pages[ 1 ] );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				'//en.wikipedia.org/w/rest.php/v1/search/title?q=media&limit=2',
				{ headers: { accept: 'application/json' } }
			);
		}
	} );

	test( '0 results', async () => {
		const restResponse: RestResponse = { pages: [] };
		fetchMock.mockOnce( JSON.stringify( restResponse ) );

		const searchResult = await restSearchClient().fetchByTitle(
			'thereIsNothingLikeThis',
			'en.wikipedia.org'
		);

		expect( searchResult.searchText ).toEqual( 'thereIsNothingLikeThis' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 0 );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				'//en.wikipedia.org/w/rest.php/v1/search/title?q=thereIsNothingLikeThis&limit=10',
				{ headers: { accept: 'application/json' } }
			);
		}
	} );

	test( 'searchText has only a space', async () => {
		const searchResult = await restSearchClient().fetchByTitle(
			' ',
			'foo.org'
		);

		expect( searchResult.searchText ).toEqual( '' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 0 );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 0 );
		}
	} );
} );
