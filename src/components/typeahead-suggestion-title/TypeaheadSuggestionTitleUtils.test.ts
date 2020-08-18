import { splitStringAtMatch } from './TypeaheadSuggestionTitleUtils';

it( 'returns chunk with title only if query is not provided', () => {
	const query = '';
	const title = 'Title';
	const result = splitStringAtMatch( query, title );

	expect( result ).toStrictEqual( [ title, '', '' ] );
} );

it( 'returns chunk with title only if there are no matches', () => {
	const query = 'abc';
	const title = 'Title';
	const result = splitStringAtMatch( query, title );

	expect( result ).toStrictEqual( [ title, '', '' ] );
} );

it( 'returns string chunks if there are matches', () => {
	const query = 'tl';
	const title = 'Title';
	const result = splitStringAtMatch( query, title );

	expect( result ).toStrictEqual( [ 'Ti', 'tl', 'e' ] );
} );
