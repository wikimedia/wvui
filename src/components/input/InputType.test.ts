import { InputType, isInputType } from './InputType';

describe( 'isTextInputType()', () => {
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
		( _, action, expected ) =>
			expect( isInputType( action ) ).toStrictEqual( expected )
	);
} );
