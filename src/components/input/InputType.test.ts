import { InputType, isInputType } from './InputType';

describe( 'isInputType()', () => {
	// [description, input, expected]
	type Case = [string, string, boolean];

	const cases: Case[] = [
		...Object.values( InputType ).map(
			( type ) => [ type, type, true ]
		) as Case[],
		[ 'invalid', 'invalid', false ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, type, expected ) =>
			expect( isInputType( type ) ).toStrictEqual( expected )
	);
} );
