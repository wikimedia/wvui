import { ButtonType, isButtonType } from './ButtonType';

describe( 'isButtonType()', () => {
	type Case = [msg: string, input: string, expected: boolean];

	const cases: Case[] = [
		...Object.values( ButtonType ).map(
			( action ) => [ action, action, true ]
		) as Case[],
		[ 'invalid', 'invalid', false ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, action, expected ) =>
			expect( isButtonType( action ) ).toStrictEqual( expected )
	);
} );
