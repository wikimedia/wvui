import Vue from 'vue';
import { Args, ArgType, StoryContext } from '@storybook/addons';
import WvuiIcon from './Icon.vue';
import { AnyIcon } from './iconTypes';
import * as icons from '../../themes/icons';
import { filterKeys, makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';

// Utilities

/**
 * ArgType options for an icon dropdown.
 *
 * @example
 *     argTypes: {
 *         icon: {
 *             ...makeIconArgType(),
 *             defaultValue: 'wvuiIconAdd'
 *         }
 *     }
 * @return Object that can be spread into an ArgType object
 */
export function makeIconArgType() : ArgType {
	return {
		control: {
			type: 'select'
		},
		options: Object.keys( icons )
		// TODO use mapping here once https://github.com/storybookjs/storybook/issues/14420 is fixed
	};
}

/**
 * Like makeIconArgType(), but with a '(none)' option.
 *
 * @return Object that can be spread into an ArgType object
 */
export function makeOptionalIconArgType() : ArgType {
	return {
		control: {
			type: 'select'
		},
		options: [ '(none)' ].concat( Object.keys( icons ) ),
		defaultValue: '(none)'
		// TODO use mapping here once https://github.com/storybookjs/storybook/issues/14420 is fixed
	};
}

/**
 * Map an icon name to its icon object.
 *
 * This is typically used to map the value of an icon argtype to an actual icon.
 *
 * @example
 *    computed: {
 *         iconData() {
 *             return lookupIcon( this.icon );
 *         }
 *    },
 *    template: `
 *        <wvui-some-component :icon="iconData" v-bind="$props" />
 *    `
 * @param iconName Name of an icon
 * @return The icon object for that icon name, or an empty string if there is no such icon
 */
export function lookupIcon( iconName: string ) : AnyIcon {
	// TODO remove this as obsolete once https://github.com/storybookjs/storybook/issues/14420 is fixed
	return icons[ iconName as keyof typeof icons ] || '';
}

export default {
	title: 'Components/Icon',
	component: WvuiIcon,
	argTypes: {
		icon: {
			...makeIconArgType(),
			defaultValue: 'wvuiIconBook'
		},
		iconTitle: {
			control: 'text'
		},
		langCode: {
			control: 'select',
			options: Object.values( icons )
				// Gather all language codes that appear in a langCodeMap or shouldFlipExceptions
				.map( ( icon ) =>
					typeof icon !== 'string' && (
						( 'langCodeMap' in icon && Object.keys( icon.langCodeMap ) ) ||
						( 'shouldFlipExceptions' in icon && icon.shouldFlipExceptions )
					) || []
				)
				// Flatten this array and add 'en'
				.reduce( ( a, b ) => a.concat( b ), [ 'en' ] )
				// Remove duplicates
				.sort()
				.reduce( ( a, b ) => b === a[ a.length - 1 ] ? a : a.concat( [ b ] ),
					[] as string[] ),
			defaultValue: 'en'
		},
		dir: {
			options: [ 'ltr', 'rtl' ],
			control: {
				type: 'inline-radio',
				labels: {
					ltr: 'Left to right (ltr)',
					rtl: 'Right to left (rtl)'
				}
			},
			defaultValue: 'ltr',
			description: 'Direction (HTML dir attribute)'
		},
		...makeActionArgTypes( [ 'click' ] )
	},
	parameters: {
		layout: 'centered'
	},
	// Prevent the utility functions above from being seen as stories
	includeStories: /^[A-Z]/
};

export const Configurable = ( args: Args, { argTypes } : StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: { WvuiIcon },
		props: Object.keys( argTypes ),
		computed: {
			iconData() : AnyIcon {
				return lookupIcon( this.icon as string );
			},
			actionListeners() {
				return makeActionListeners( args, argTypes );
			},
			filteredProps() {
				return filterKeys( this.$props, [ 'dir' ] );
			}
		},
		// HACK: the Icon component computes its dir at mount time, so changing the dir value
		// later doesn't cause it to react, breaking flipping for IconVariedByDir icons (although
		// flipping does work for IconFlipForRTL icons, since that's CSS-based).
		// To work around this, change the "key" attribute when changing dir, which causes Vue
		// to rerender the component and rerun the mounted() lifecycle hook.
		template: `
			<div :dir="dir">
				<wvui-icon
					:key="dir"
					:icon="iconData"
					v-bind="filteredProps"
					v-on="actionListeners"
				/>
			</div>
		`
	} );

export const AllIcons = ( _args: Args, { argTypes } : StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: { WvuiIcon },
		props: Object.keys( argTypes ),
		computed: {
			flattenedIcons() {
				const filteredProps = filterKeys( this.$props, [ 'dir' ] );
				const flattened = [];
				for ( const iconName in icons ) {
					const icon = lookupIcon( iconName );
					if (
						typeof icon !== 'string' &&
						( 'langCodeMap' in icon || 'shouldFlipExceptions' in icon )
					) {
						const langCodes = 'langCodeMap' in icon ? Object.keys( icon.langCodeMap ) :
							icon.shouldFlipExceptions || [];
						for ( const langCode of langCodes ) {
							flattened.push( {
								label: `${iconName} (${langCode})`,
								props: { ...filteredProps, icon, langCode }
							} );
						}
						flattened.push( {
							label: `${iconName} (other languages)`,
							props: { ...filteredProps, icon, langCode: '' }
						} );
					} else {
						flattened.push( {
							label: iconName,
							props: { ...filteredProps, icon }
						} );
					}
				}
				return flattened;
			}
		},
		template: `
			<table>
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">LTR</th>
						<th scope="col">RTL</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="icon in flattenedIcons">
						<td>{{ icon.label }}</td>
						<td dir="ltr"><wvui-icon v-bind="icon.props" /></td>
						<td dir="rtl"><wvui-icon v-bind="icon.props" /></td>
					</tr>
				</tbody>
			</table>
		`
	} );

AllIcons.argTypes = {
	icon: {
		table: {
			disable: true
		}
	},
	langCode: {
		table: {
			disable: true
		}
	},
	dir: {
		table: {
			disable: true
		}
	}
};

AllIcons.parameters = {
	docs: {
		source: {
			type: 'code'
		}
	}
};
