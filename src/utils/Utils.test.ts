import WvuiUtils from './Utils';

it( 'should escape regexp', () => {
	const regexpString = '/s{5}omer\\egexp?-/i';
	const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
	const result = WvuiUtils.regexpEscape( regexpString );

	expect( result ).toEqual( escapedRegexp );
} );

it( 'should escape html', () => {
	const htmlString = '<>\'"& a';
	const escapedHtml = '&lt;&gt;&#039;&quot;&amp; a';
	const result = WvuiUtils.htmlEscape( htmlString );

	expect( result ).toEqual( escapedHtml );
} );
