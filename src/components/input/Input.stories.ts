import Vue from 'vue';
import { Args, StoryContext } from '@storybook/addons';
import WvuiInput from './Input.vue';
import WvuiButton from '../button/Button.vue';
import { InputType } from './InputType';
import { wvuiIconInfoFilled, wvuiIconSearch } from '../../themes/icons';
import { makeActionArgTypes, makeActionListeners } from '../../utils/StoryUtils';
import { makeOptionalIconArgType, lookupIcon } from '../icon/Icon.stories';
import './Input.stories.less';

export default {
	title: 'Components/Input',
	component: WvuiInput,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		value: {
			control: 'text'
		},
		type: {
			control: {
				type: 'inline-radio',
				// eslint-disable-next-line es/no-object-values
				options: Object.values( InputType )
			},
			defaultValue: InputType.Text
		},
		startIcon: makeOptionalIconArgType(),
		endIcon: makeOptionalIconArgType(),
		placeholder: {
			control: 'text',
			defaultValue: 'Type something',
			table: {
				category: 'Attributes'
			}
		},
		...makeActionArgTypes( [ 'input', 'focus', 'blur', 'change' ] )
	}
};

export const Configurable = ( args: Args, { argTypes } : StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: Object.keys( argTypes ),
		computed: {
			startIconData() {
				return lookupIcon( this.startIcon );
			},
			endIconData() {
				return lookupIcon( this.endIcon );
			},
			actionListeners() {
				return makeActionListeners( args, argTypes );
			}
		},
		template: `
			<div class="sb-input">
				<wvui-input
					:startIcon="startIconData"
					:endIcon="endIconData"
					v-bind="$props"
					v-on="actionListeners"
				/>
			</div>
		`
	} );

export const CommonUses = ( _args: Args, { argTypes } : StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: { WvuiInput },
		props: Object.keys( argTypes ),
		data: () => ( {
			searchIcon: wvuiIconSearch,
			infoFilledIcon: wvuiIconInfoFilled,
			InputType
		} ),
		template: `
			<div class="sb-input">
				<p>
					With start icon:
					<wvui-input
						:disabled="disabled"
						:type="InputType.Search"
						:start-icon="searchIcon"
						placeholder="Search…"
					/>
				</p>
				<p>
					With end icon:
					<wvui-input
						:disabled="disabled"
						:type="InputType.Search"
						:end-icon="infoFilledIcon"
						placeholder="Search…"
					/>
				</p>
				<p>
					With clear action:
					<wvui-input
						:disabled="disabled"
						:type="InputType.Search"
						placeholder="Type something…"
						clearable
						value="Some text"
					/>
				</p>
			</div>
		`
	} );

// Disable everything except "disabled"
// TODO there has to be a better way to do this
CommonUses.argTypes = {
	type: {
		table: {
			disable: true
		}
	},
	value: {
		table: {
			disable: true
		}
	},
	startIcon: {
		table: {
			disable: true
		}
	},
	endIcon: {
		table: {
			disable: true
		}
	},
	clearable: {
		table: {
			disable: true
		}
	},
	placeholder: {
		table: {
			disable: true
		}
	},
	input: {
		table: {
			disable: true
		}
	},
	focus: {
		table: {
			disable: true
		}
	},
	blur: {
		table: {
			disable: true
		}
	},
	change: {
		table: {
			disable: true
		}
	}
};

export const WithButton = ( args: Args, context: StoryContext ) : Vue.Component =>
	Vue.extend( {
		components: {
			StoryConfigurable: Configurable( args, context ),
			WvuiButton
		},
		props: Object.keys( context.argTypes ),
		template: `
			<div class="sb-input--has-button">
				<story-configurable v-bind="$props" />
				<wvui-button :disabled="disabled">Search</wvui-button>
			</div>
		`
	} );

WithButton.argTypes = {
	startIcon: {
		defaultValue: 'wvuiIconSearch'
	},
	clearable: {
		defaultValue: true
	},
	placeholder: {
		defaultValue: 'Search…'
	}
};
