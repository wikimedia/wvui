import { regExpEscape, buildQueryString } from './StringUtils';

it( 'should escape regular expression', () => {
	const regexpString = '/s{5}omer\\egexp?-/i';
	const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
	const result = regExpEscape( regexpString );

	expect( result ).toStrictEqual( escapedRegexp );
} );

describe( 'buildQueryString()', () => {
	type Case = [ msg: string, props: Record<string, string | number | boolean>, expected: string ];

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
