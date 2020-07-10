import { TextInputType, isTextInputType } from './TextInputType';

describe( 'isTextInputType()', () => {
	// [description, input, expected]
	type Case = [string, string, boolean];

	const cases: Case[] = [
		...Object.values( TextInputType ).map(
			( type ) => [ type, type, true ]
		) as Case[],
		[ 'invalid', 'invalid', false ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, action, expected ) =>
			expect( isTextInputType( action ) ).toStrictEqual( expected )
	);
} );
