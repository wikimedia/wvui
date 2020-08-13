import * as StringUtils from './StringUtils';

it( 'should escape regular expression', () => {
	const regexpString = '/s{5}omer\\egexp?-/i';
	const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
	const result = StringUtils.regExpEscape( regexpString );

	expect( result ).toStrictEqual( escapedRegexp );
} );

it( 'should escape HTML', () => {
	const htmlString = '\'<>"& a';
	const escapedHtml = '&#039;&lt;&gt;&quot;&amp; a';
	const result = StringUtils.htmlEscape( htmlString );

	expect( result ).toStrictEqual( escapedHtml );
} );
