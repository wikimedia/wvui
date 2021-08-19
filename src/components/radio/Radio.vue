<template>
	<label
		class="wvui-radio"
		:class="rootClasses"
		:aria-disabled="disabled"
		@click="focusInput"
	>
		<input
			ref="input"
			v-model="wrappedModel"
			class="wvui-radio__input"
			type="radio"
			:name="name"
			:value="inputValue"
			:disabled="disabled"
		>
		<span class="wvui-radio__icon" />
		<span class="wvui-radio__label-content">
			<!-- @slot Input label content -->
			<slot />
		</span>
	</label>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, ref, toRef, computed } from '@vue/composition-api';
import useModelWrapper, { modelValueProp } from '../../composables/useModelWrapper';

Vue.use( VueCompositionAPI );

/**
 * A binary input that always exists in a group, in which only one input can be
 * on at a time.
 *
 * Typical use will involve using v-for to loop through an array of items and
 * output a Radio component for each one. Each Radio will have the same v-model
 * and name props, but different inputValue props and label content.
 *
 * The v-model value is the inputValue of the Radio that is currently on.
 *
 * @fires {Event} input
 */
export default defineComponent( {
	name: 'WvuiRadio',
	model: {
		prop: 'modelValue',
		event: 'input'
	},
	props: {
		/**
		 * Value provided by v-model in a parent component.
		 *
		 * Rather than directly binding a value prop to this component, use
		 * v-model to bind a string, number, or boolean value. This value
		 * represents the value of the radio input that is currently on.
		 */
		modelValue: modelValueProp,
		/**
		 * HTML "value" attribute to assign to the input.
		 *
		 * Required for input groups.
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
		 * HTML "name" attribute to assign to the input.
		 *
		 * Required for input groups
		 */
		name: {
			type: String,
			default: ''
		},
		/**
		 * Whether the component should display inline.
		 *
		 * By default, `display: block` is set and a margin exists between
		 * sibling components, for a stacked layout.
		 */
		inline: {
			type: Boolean,
			default: false
		}
	},
	setup( props, { emit } ) {
		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'wvui-radio--inline': !!props.inline
			};
		} );

		// Declare template ref.
		const input = ref<HTMLInputElement>();

		/**
		 * When the label is clicked, focus on the input.
		 *
		 * This doesn't happen automatically in Firefox or Safari.
		 */
		const focusInput = (): void => {
			( input.value as HTMLInputElement ).focus();
		};

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const modelValueRef = toRef( props, 'modelValue' );
		const wrappedModel = useModelWrapper( modelValueRef, emit );

		return {
			rootClasses,
			input,
			focusInput,
			wrappedModel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';
@import ( reference ) '@/themes/mixins/binary-input.less';

// Wrapper `label`.
.wvui-radio {
	// Common binary input styles.
	.wvui-mixin-binary-input();

	// Custom-styled radio that's visible to the user.
	&__icon {
		border-radius: @border-radius-input-radio;
		transition-property: background-color, border-color, border-width;
		transition-duration: @transition-base;

		// Add `:focus` state's inner circle.
		&:before {
			content: ' ';
			position: absolute;
			// `px` unit due to pixel rounding error when using
			// `@size-input-binary / 4`
			top: @position-offset-input-radio-focus;
			right: @position-offset-input-radio-focus;
			bottom: @position-offset-input-radio-focus;
			left: @position-offset-input-radio-focus;
			border: @border-width-base @border-style-base transparent;
			border-radius: @border-radius-input-radio;
		}
	}

	// HTML `<input type="radio">`.
	// Based on the HTML attributes of the radio input, we can change the style
	// of the adjacent `span`, which will look like a custom-styled radio.
	/* stylelint-disable no-descending-specificity */
	&__input {
		&:enabled {
			// Note: there is no focus behavior for the input in its unchecked
			// state because you can't focus on it without selecting it.
			&:hover + .wvui-radio__icon,
			&:checked:hover + .wvui-radio__icon {
				border-color: @border-color-input-binary--hover;
			}

			&:checked + .wvui-radio__icon {
				border-width: @border-width-input-radio--checked;
				border-color: @border-color-input-binary--checked;
			}

			&:checked:focus + .wvui-radio__icon {
				&:before {
					border-color: @border-color-inset--focus;
				}
			}
		}

		&:disabled {
			& ~ .wvui-radio__label-content {
				color: @color-base--disabled;
			}

			& + .wvui-radio__icon {
				background-color: @background-color-filled--disabled;
				border-color: @border-color-base--disabled;
			}

			&:checked + .wvui-radio__icon {
				background-color: @background-color-base;
				border-width: @border-width-input-radio--checked;
			}
		}
	}
	/* stylelint-enable no-descending-specificity */

	// Styles for when `label` is active (being pressed).
	&:active &__input:enabled {
		& + .wvui-radio__icon {
			background-color: @background-color-input-binary--active;
			border-color: @border-color-input-binary--active;
		}

		&:checked + .wvui-radio__icon {
			background-color: @background-color-base;
			border-color: @border-color-input-binary--active;

			&:before {
				border-color: @border-color-input-binary--active;
			}
		}
	}
}
</style>
