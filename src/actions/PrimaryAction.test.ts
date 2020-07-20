import { PrimaryAction, isPrimaryAction } from './PrimaryAction';

describe( 'isPrimaryAction()', () => {
	// [description, input, expected]
	type Case = [string, string, boolean];

	const cases: Case[] = [
		...Object.values( PrimaryAction ).map(
			( action ) => [ action, action, true ]
		) as Case[],
		[ 'invalid', 'invalid', false ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, action, expected ) =>
			expect( isPrimaryAction( action ) ).toStrictEqual( expected )
	);
} );
