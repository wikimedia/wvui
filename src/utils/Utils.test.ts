import WvuiUtils from './Utils';

it( 'should escape regexp', () => {
	const regexpString = '/s{5}omer\\egexp?-/i';
	const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
	const result = WvuiUtils.regexpEscape( regexpString );

	expect( result ).toEqual( escapedRegexp );
} );

it( 'should escape html', () => {
	const htmlString = '<>\'"&';
	const string = 's';
	const escapedHtml = '&lt;&gt;&#039;&quot;&amp;';
	const result = WvuiUtils.htmlEscape( htmlString );
	const resultUnescaped = WvuiUtils.htmlEscape( string );

	expect( result ).toEqual( escapedHtml );
	expect( resultUnescaped ).toEqual( string );
} );
