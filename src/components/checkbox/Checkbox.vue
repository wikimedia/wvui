<template>
	<label
		ref="label"
		class="wvui-checkbox"
		:aria-disabled="disabled"
		@click="focusInput"
		@keydown.prevent.enter="clickLabel"
	>
		<input
			ref="input"
			v-model="wrappedModel"
			class="wvui-checkbox__input"
			type="checkbox"
			:value="inputValue"
			:disabled="disabled"
			:indeterminate.prop="indeterminate"
		>
		<span class="wvui-checkbox__icon" />
		<span class="wvui-checkbox__label-content">
			<!-- @slot Input label content -->
			<slot />
		</span>
	</label>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, ref, toRef } from '@vue/composition-api';
import useModelWrapper, { modelValueProp } from '../../composables/useModelWrapper';

Vue.use( VueCompositionAPI );

/**
 * A binary input that can exist by itself or in a group. When in a group, any
 * number of checkboxes can be checked at a time.
 *
 * Typical use will involve using v-for to loop through an array of items and
 * output a Checkbox component for each one. Each Checkbox will have the same
 * v-model prop, but different inputValue props and label content.
 *
 * For a single checkbox, the v-model value will be a boolean true when the box
 * is checked and false when unchecked.
 *
 * For multiple checkboxes, the v-model value will be an array of the
 * inputValues of any current checked boxes (or an empty array if no boxes are
 * checked).
 *
 * @fires {Event} input
 */
export default defineComponent( {
	name: 'WvuiCheckbox',
	model: {
		prop: 'modelValue',
		event: 'input'
	},
	props: {
		/**
		 * Value provided by v-model in a parent component.
		 *
		 * Rather than directly binding a value prop to this component, use
		 * v-model on this component in the parent component.
		 */
		modelValue: modelValueProp,
		/**
		 * HTML "value" attribute to assign to the input.
		 *
		 * A unique inputValue is required when using the same v-model for
		 * multiple inputs. If this is a standalone checkbox, the inputValue
		 * prop can be ommitted and will default to false.
		 */
		inputValue: {
			type: [ String, Number, Boolean ],
			default: false
		},
		/**
		 * Whether the disabled attribute should be added to the input.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the indeterminate visual state should be displayed.
		 *
		 * The indeterminate state indicates that a checkbox is neither on nor
		 * off. Within this component, this state is purely visual. The parent
		 * component must house the logic to set a checkbox to the indeterminate
		 * state via this prop (e.g. in the case of a set of nested checkboxes
		 * where some boxes are checked and some are not, making the parent
		 * checkbox neither fully on nor fully off).
		 *
		 * This prop is independent of the value provided by v-model. If
		 * indeterminate is set to true, the indeterminate visual state will
		 * display, but the value will not be affected. Nor will the value
		 * affect the visual state: indeterminate overrides the checked and
		 * unchecked visual states. If indeterminate changes to false, the
		 * visual state will reflect the current v-model value.
		 */
		indeterminate: {
			type: Boolean,
			default: false
		}
	},
	setup( props, { emit } ) {
		// Declare template refs.
		const input = ref<HTMLInputElement | undefined>();
		const label = ref<HTMLLabelElement | undefined>();

		/**
		 * When the label is clicked, focus on the input.
		 *
		 * This doesn't happen automatically in Firefox or Safari.
		 */
		const focusInput = (): void => {
			( input.value as HTMLInputElement ).focus();
		};

		/**
		 * On enter keydown, click the label to toggle the input.
		 */
		const clickLabel = (): void => {
			( label.value as HTMLLabelElement ).click();
		};

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const modelValueRef = toRef( props, 'modelValue' );
		const wrappedModel = useModelWrapper( modelValueRef, emit );

		return {
			input,
			label,
			wrappedModel,
			focusInput,
			clickLabel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';
@import ( reference ) '@/themes/mixins/binary-input.less';

.wvui-checkbox {
	.wvui-mixin-binary-input();

	// Custom-styled checkbox that's visible to the user.
	&__icon {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		background-size: 0 0;
		border-radius: @border-radius-base;
		transition: background-color @transition-base, border-color @transition-base, box-shadow @transition-base;
	}

	// HTML `<input type="checkbox">`.
	// Based on the HTML attributes of the checkbox input, we can change the
	// style of the adjacent span, which will look like a custom-styled
	// checkbox.
	&__input {
		&:focus + .wvui-checkbox__icon {
			border-color: @border-color-input-binary--focus;
			box-shadow: @box-shadow-input-binary--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: 1px solid transparent;
		}

		&:hover + .wvui-checkbox__icon {
			border-color: @border-color-input-binary--hover;
		}

		&:indeterminate + .wvui-checkbox__icon {
			&:before {
				content: ' ';
				background-color: @color-base--inverted;
				position: absolute;
				top: 50%;
				right: @start-input-binary-icon;
				left: @start-input-binary-icon;
				height: @border-width-base * 2;
				margin-top: -@border-width-base;
			}
		}

		// Styles for the checked checkbox that apply whether or not the input
		// is enabled or disabled.
		&:checked + .wvui-checkbox__icon {
			// TODO: temporary workaround for check icon SVG. This should be
			// updated once we have a more permanent location and format for
			// icon SVGs (see https://phabricator.wikimedia.org/T282625).
			// stylelint-disable-next-line function-url-quotes
			background-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>check</title><g fill="%23fff"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42z"/></g></svg>' );
			background-position: center;
			background-repeat: no-repeat;
			// This must have two values to match `background-size: 0 0` above,
			// otherwise the transition does not work (at least in Chrome).
			// stylelint-disable-next-line plugin/no-unsupported-browser-features
			background-size: @size-icon-small @size-icon-small;
		}

		&:disabled {
			& + .wvui-checkbox__icon {
				background-color: @background-color-filled--disabled;
				border-color: @border-color-base--disabled;
				box-shadow: none;
			}

			& ~ .wvui-checkbox__label-content {
				color: @color-base--disabled;
			}
		}

		&:checked:enabled,
		&:indeterminate:enabled {
			& + .wvui-checkbox__icon {
				background-color: @background-color-input-binary--checked;
				border-color: @border-color-input-binary--checked;
			}

			&:focus + .wvui-checkbox__icon {
				background-color: @background-color-input-binary--checked;
				border-color: @border-color-input-binary--checked;
				box-shadow: @box-shadow-input-checkbox--focus-checked;
			}

			&:hover + .wvui-checkbox__icon {
				background-color: @color-primary--hover;
				border-color: @border-color-input-binary--hover;
			}
		}
	}

	// Styles for when `label` is active (being pressed).
	&:active .wvui-checkbox__input:enabled {
		& + .wvui-checkbox__icon {
			background-color: @background-color-input-binary--active;
			border-color: @border-color-input-binary--active;
			box-shadow: @box-shadow-input-binary--active;
		}

		&:checked + .wvui-checkbox__icon {
			background-color: @background-color-input-binary--active;
			border-color: @border-color-input-binary--active;
			box-shadow: @box-shadow-input-binary--active;
		}
	}
}
</style>
