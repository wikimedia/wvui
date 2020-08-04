import { RestResponse, restSearchClient } from './restApiSearchClient';
import * as jestFetchMock from 'jest-fetch-mock';

const mockedRequests = !process.env.TEST_LIVE_REQUESTS;

describe( 'restSearchClient', () => {
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
					excerpt: 'Media',
					description: 'Wikimedia disambiguation page',
					thumbnail: null
				},
				{
					id: 323710,
					key: 'MediaWiki',
					title: 'MediaWiki',
					excerpt: 'MediaWiki',
					description: 'wiki software',
					thumbnail: {
						width: 200,
						height: 189,
						url: thumbUrl
					}
				}
			]
		};
		fetchMock.mockResponse( JSON.stringify( restResponse ) );

		const searchResult = await restSearchClient().fetchByTitle(
			'media',
			'en.wikipedia.org',
			2
		);

		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 2 );
		expect( searchResult.results[ 0 ] ).toStrictEqual( {
			id: 37298,
			key: 'Media',
			title: 'Media',
			description: 'Wikimedia disambiguation page',
			thumbnail: undefined
		} );
		expect( searchResult.results[ 1 ] ).toStrictEqual( {
			id: 323710,
			key: 'MediaWiki',
			title: 'MediaWiki',
			description: 'wiki software',
			thumbnail: {
				width: 200,
				height: 189,
				url: thumbUrl
			}
		} );

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
		fetchMock.mockResponse( JSON.stringify( restResponse ) );

		const searchResult = await restSearchClient().fetchByTitle(
			'thereIsNothingLikeThis',
			'en.wikipedia.org'
		);

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
} );
