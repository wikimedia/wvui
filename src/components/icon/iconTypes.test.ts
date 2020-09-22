import {
	Icon,
	IconFlipForRtl,
	IconVariedByLang,
	IconVariedByDir,
	AnyIcon,
	getIconPath,
	shouldFlip
} from './iconTypes';

const iconString: Icon = 'path string';
const iconShouldFlip: IconFlipForRtl = {
	path: 'path should flip',
	shouldFlip: true
};
const iconShouldFlipWithExceptions: IconFlipForRtl = {
	path: 'path should flip',
	shouldFlip: true,
	shouldFlipExceptions: [ 'he' ]
};
const iconDirLtr: Icon = 'path ltr';
const iconDirRtl: Icon = 'path ltr';
const iconDir: IconVariedByDir = {
	rtl: iconDirRtl,
	default: iconDirLtr
};
const iconLangA: Icon = 'path a';
const iconLangB: Icon = 'path b';
const iconLang: IconVariedByLang = {
	langCodeMap: {
		de: iconLangB
	},
	default: iconLangA
};
const iconLangWithFlip: IconVariedByLang = {
	langCodeMap: {
		de: iconShouldFlip
	},
	default: iconShouldFlipWithExceptions
};

describe( 'computes proper icon path', () => {
	type Case = [
		description: string, icon: AnyIcon, langCode: string, dir: string, expectedPath: string
	];

	const iconLangDefault = typeof iconLang.default === 'string' ?
		iconLang.default :
		iconLang.default.path;
	const iconLangDe = typeof iconLang.langCodeMap.de === 'string' ?
		iconLang.langCodeMap.de :
		iconLang.langCodeMap.de.path;
	const iconLangWithFlipDefault = typeof iconLangWithFlip.default === 'string' ?
		iconLangWithFlip.default :
		iconLangWithFlip.default.path;
	const iconLangWithFlipDe = typeof iconLangWithFlip.langCodeMap.de === 'string' ?
		iconLangWithFlip.langCodeMap.de :
		iconLangWithFlip.langCodeMap.de.path;

	const cases: Case[] = [
		[ 'String', iconString, 'en', 'ltr', iconString ],
		[ 'Dir-specific default', iconDir, 'en', 'ltr', iconDir.default ],
		[ 'RTL path', iconDir, 'en', 'rtl', iconDir.rtl ],
		[ 'Lang-specific default', iconLang, 'en', 'ltr', iconLangDefault ],
		[ 'Lang-specific', iconLang, 'de', 'ltr', iconLangDe ],
		[ 'Lang-specific default w/ flip', iconLangWithFlip, 'en', 'ltr', iconLangWithFlipDefault ],
		[ 'Lang-specific w/ flip', iconLangWithFlip, 'en', 'ltr', iconLangWithFlipDe ]
	];

	test.each( cases )( 'Case %# %s: (%p)', ( _, icon, langCode, dir, expectedPath ) => {
		expect( getIconPath( icon, langCode, dir ) ).toMatch( expectedPath );
	} );
} );

describe( 'sets shouldFlip to true', () => {
	type Case = [msg: string, icon: AnyIcon, langCode: string ];

	const cases: Case[] = [
		[ 'with true shouldFlip property', iconShouldFlip, 'en' ]
	];

	test.each( cases )( 'Case %# %s: (%p)', ( _, icon, langCode ) => {
		expect( shouldFlip( icon, langCode ) ).toBeTruthy();
	} );
} );

describe( 'sets shouldFlip to false', () => {
	type Case = [msg: string, icon: AnyIcon, langCode: string ];

	const cases: Case[] = [
		[ 'String', iconString, 'en' ],
		[ 'shouldFlip exception', iconShouldFlipWithExceptions, 'he' ],
		[ 'Text-direction-specific icon', iconDir, 'en' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, icon, langCode ) => {
		expect( shouldFlip( icon, langCode ) ).toBeFalsy();
	} );
} );
