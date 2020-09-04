import {
	ActionResponse,
	ActionResult,
	actionSearchClient,
	convertObjectToArray
} from './actionSearchClient';
import * as jestFetchMock from 'jest-fetch-mock';

const mockedRequests = !process.env.TEST_LIVE_REQUESTS;

const page0: ActionResult = {
	pageid: 37298,
	index: 1,
	title: 'Media',
	// T258736: description is different in REST API
	description: 'Disambiguation page providing links to topics that could be referred to ' +
		'by the same search term'
};
const convertedPage0 = {
	id: page0.pageid,
	key: page0.title,
	title: page0.title,
	description: page0.description,
	thumbnail: undefined
};

const thumbUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/' +
	'MediaWiki-smaller-logo.png/80px-MediaWiki-smaller-logo.png';
const page1: ActionResult = {
	pageid: 323710,
	index: 2,
	title: 'MediaWiki',
	description: 'Wiki software',
	thumbnail: {
		source: thumbUrl,
		width: 80,
		height: 76
	}
};
const convertedPage1 = {
	id: page1.pageid,
	key: page1.title,
	title: page1.title,
	description: page1.description,
	thumbnail: {
		url: page1.thumbnail?.source,
		width: page1.thumbnail?.width,
		height: page1.thumbnail?.height
	}
};

const commonRequestURL = '//en.wikipedia.org/w/api.php?format=json&formatversion=2&' +
	'uselang=content&smaxage=300&maxage=300&origin=*&action=query&' +
	'prop=description%7Cpageimages%7Cpageprops&descprefersource=local&ppprop=displaytitle&' +
	'pilicense=any&piprop=thumbnail&pithumbsize=80&generator=prefixsearch';

describe( 'convertObjectToArray', () => {
	test( '0 results', () => {
		expect( convertObjectToArray( {} ) ).toStrictEqual( [] );
	} );
	test( '1 result', () => {
		expect( convertObjectToArray( {
			foo: page0
		} ) ).toStrictEqual( [ page0 ] );
	} );
	test( '2 results', () => {
		expect( convertObjectToArray( {
			foo: page0,
			bar: page1
		} ) ).toStrictEqual( [ page0, page1 ] );
	} );
} );

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
		const actionResponse: ActionResponse = {
			query: {
				pages: {
					37298: page0,
					323710: page1
				}
			}
		};
		fetchMock.mockOnce( JSON.stringify( actionResponse ) );

		const searchResult = await actionSearchClient().fetchByTitle(
			'media',
			'en.wikipedia.org',
			2
		);

		expect( searchResult.query ).toStrictEqual( 'media' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 2 );
		expect( searchResult.results[ 0 ] ).toStrictEqual( convertedPage0 );
		expect( searchResult.results[ 1 ] ).toStrictEqual( convertedPage1 );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				commonRequestURL + '&gpslimit=2&gpssearch=media',
				{ headers: { accept: 'application/json' } }
			);
		}
	} );

	test( '0 results', async () => {
		const actionResponse: ActionResponse = {};
		fetchMock.mockOnce( JSON.stringify( actionResponse ) );

		const searchResult = await actionSearchClient().fetchByTitle(
			'thereIsNothingLikeThis',
			'en.wikipedia.org'
		);

		expect( searchResult.query ).toStrictEqual( 'thereIsNothingLikeThis' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 0 );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 1 );
			expect( fetchMock ).toHaveBeenCalledWith(
				commonRequestURL + '&gpslimit=10&gpssearch=thereIsNothingLikeThis',
				{ headers: { accept: 'application/json' } }
			);
		}
	} );

	test( 'query has only a space', async () => {
		const searchResult = await actionSearchClient().fetchByTitle(
			' ',
			'foo.org'
		);

		expect( searchResult.query ).toStrictEqual( '' );
		expect( searchResult.results ).toBeTruthy();
		expect( searchResult.results.length ).toBe( 0 );

		if ( mockedRequests ) {
			expect( fetchMock ).toHaveBeenCalledTimes( 0 );
		}
	} );

	if ( mockedRequests ) {
		test( 'network error', async () => {
			fetchMock.mockRejectOnce( new Error( 'failed' ) );

			await expect( actionSearchClient().fetchByTitle(
				'anything',
				'en.wikipedia.org'
			) ).rejects.toThrow( 'failed' );
		} );
	}
} );
