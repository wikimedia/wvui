import { InputType, isInputType } from './InputType';

describe( 'isInputType()', () => {
	type Case = [msg: string, input: string, expected: boolean];

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
