import * as StringUtils from './StringUtils';

it( 'should escape regular expression', () => {
	const regexpString = '/s{5}omer\\egexp?-/i';
	const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
	const result = StringUtils.regExpEscape( regexpString );

	expect( result ).toStrictEqual( escapedRegexp );
} );
