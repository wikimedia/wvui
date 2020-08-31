import { fetchJson } from './fetch';

test( 'fetch() not available', async () => {
	expect.assertions( 1 );
	await expect( fetchJson( 'anything' ) ).rejects.toStrictEqual( 'window.fetch() not available' );
} );
