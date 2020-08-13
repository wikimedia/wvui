import { fetch } from './fetch';

test( 'fetch() not available', async () => {
	expect.assertions( 1 );
	await expect( fetch( 'anything' ) ).rejects.toStrictEqual( 'window.fetch() not available' );
} );
