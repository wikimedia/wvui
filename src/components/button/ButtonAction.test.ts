import { ButtonAction, isButtonAction } from './ButtonAction';

describe( 'isButtonAction()', () => {
	type Case = [msg: string, input: string, expected: boolean];

	const cases: Case[] = [
		...Object.values( ButtonAction ).map(
			( action ) => [ action, action, true ]
		) as Case[],
		[ 'invalid', 'invalid', false ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, action, expected ) =>
			expect( isButtonAction( action ) ).toStrictEqual( expected )
	);
} );
