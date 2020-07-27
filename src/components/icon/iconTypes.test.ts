import {
	Icon,
	IconVariedByLang,
	IconVariedByDir,
	AnyIcon,
	getIconPath,
	shouldFlip
} from './iconTypes';

const iconString = 'path string';
const iconSinglePath: Icon = {
	path: 'path single'
};
const iconShouldFlip: Icon = {
	path: 'path should flip',
	shouldFlip: true
};
const iconShouldFlipWithExceptions: Icon = {
	path: 'path should flip',
	shouldFlip: true,
	shouldFlipExceptions: [ 'he' ]
};
const iconShouldFlipWithUndefinedExceptions: Icon = {
	path: 'path should flip',
	shouldFlip: true,
	shouldFlipExceptions: undefined
};
const iconDirLtr: Icon = { path: 'path ltr' };
const iconDirRtl: Icon = { path: 'path ltr' };
const iconDir: IconVariedByDir = {
	rtl: iconDirRtl,
	default: iconDirLtr
};
const iconLangA: Icon = { path: 'path a' };
const iconLangB: Icon = { path: 'path a' };
const iconLang: IconVariedByLang = {
	langCodeMap: {
		de: iconLangB
	},
	default: iconLangA
};

describe( 'computes proper icon path', () => {
	// [description, icon, langCode, dir, expectedPath]
	type Case = [string, AnyIcon, string, string, string];

	const cases: Case[] = [
		[ 'String', iconString, 'en', 'ltr', iconString ],
		[ 'Single path', iconSinglePath, 'en', 'ltr', iconSinglePath.path ],
		[ 'Dir-specific default', iconDir, 'en', 'ltr', iconDir.default.path ],
		[ 'RTL path', iconDir, 'en', 'rtl', iconDir.rtl.path ],
		[ 'Lang-specific default', iconLang, 'en', 'ltr', iconLang.default.path ],
		[ 'Lang-specific', iconLang, 'de', 'ltr', iconLang.langCodeMap.de.path ]
	];

	test.each( cases )( 'Case %# %s: (%p)', ( _, icon, langCode, dir, expectedPath ) => {
		expect( getIconPath( icon, langCode, dir ) ).toMatch( expectedPath );
	} );
} );

describe( 'sets shouldFlip to true', () => {
	// [description, icon, langCode]
	type Case = [string, AnyIcon, string ];

	const cases: Case[] = [
		[ 'with true shouldFlip property', iconShouldFlip, 'en' ],
		[ 'with undefined exceptions property', iconShouldFlipWithUndefinedExceptions, 'he' ]
	];

	test.each( cases )( 'Case %# %s: (%p)', ( _, icon, langCode ) => {
		expect( shouldFlip( icon, langCode ) ).toBeTruthy();
	} );
} );

describe( 'sets shouldFlip to false', () => {
	// [description, icon, langCode]
	type Case = [string, AnyIcon, string ];

	const cases: Case[] = [
		[ 'String', iconString, 'en' ],
		[ 'Single path', iconSinglePath, 'en' ],
		[ 'shouldFlip exception', iconShouldFlipWithExceptions, 'he' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, icon, langCode ) => {
		expect( shouldFlip( icon, langCode ) ).toBeFalsy();
	} );
} );
