import WvuiUtils from './StringUtils';

it( 'should escape regular expression', () => {
	const regexpString = '/s{5}omer\\egexp?-/i';
	const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
	const result = WvuiUtils.regExpEscape( regexpString );

	expect( result ).toStrictEqual( escapedRegexp );
} );

it( 'should escape HTML', () => {
	const htmlString = '\'<>"& a';
	const escapedHtml = '&#039;&lt;&gt;&quot;&amp; a';
	const result = WvuiUtils.htmlEscape( htmlString );

	expect( result ).toStrictEqual( escapedHtml );
} );
