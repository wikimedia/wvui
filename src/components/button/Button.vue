<template>
	<button class="wvui-button" :class="rootClasses" @click="onClick">
		<slot />
	</button>
</template>

<script lang="ts">
import { PrimaryAction, isPrimaryAction } from '../../actions/PrimaryAction';
import Vue, { PropType } from 'vue';

/**
 * A button wrapping slotted content.
 *
 * @fires {Event} click
 */
export default Vue.extend( {
	name: 'WvuiButton',
	props: {
		/** See PrimaryAction. */
		action: {
			type: String as PropType<PrimaryAction>,
			default: PrimaryAction.Default,
			validator: isPrimaryAction
		},
		/** True if button should be visually less prominent. */
		quiet: Boolean
	},
	computed: {
		rootClasses(): Record<string, boolean> {
			return {
				'wvui-button--default': this.action === PrimaryAction.Default,
				'wvui-button--progressive': this.action === PrimaryAction.Progressive,
				'wvui-button--destructive': this.action === PrimaryAction.Destructive,
				'wvui-button--framed': !this.quiet,
				'wvui-button--quiet': this.quiet
			};
		}
	},
	methods: {
		onClick( event: Event ): void {
			this.$emit( 'click', event );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@/themes/wikimedia-ui.less';

.wvui-button {
	box-sizing: border-box;
	// Interactive elements have a minimum touch area.
	min-width: @min-size-widget-base;
	min-height: @min-size-widget-base;
	max-width: @max-width-button;
	border-radius: @border-radius-base;
	padding-left: @padding-horizontal-base;
	padding-right: @padding-horizontal-base;
	// Initial value depends on user-agent.
	font-family: inherit;
	// Initial value is none.
	font-size: inherit;
	font-weight: bold;
	// Contents are single line.
	white-space: nowrap;
	transition: border-color @transition-base, background-color @transition-base, color @transition-base, box-shadow @transition-base;

	&::-moz-focus-inner {
		// [Firefox] hide the focus ring in all variations.
		border: 0;
	}

	&:focus {
		// Hide the standard focus outline. A border and box-shadow representation is added below.
		outline: 0; // stylelint-disable-line plugin/no-unsupported-browser-features
	}

	&[ disabled ] {
		// Hide the border but keep the sizing.
		border: @border-width-base @border-style-base #0000;
		background-color: @background-color-filled--disabled;
		// Show the default pointer cursor icongraphy to visually indicate the button is
		// unresponsive.
		cursor: @cursor-base--disabled;

		&.wvui-button--framed {
			color: @color-filled--disabled;
		}

		&.wvui-button--quiet {
			background-color: @color-filled--disabled;
		}
	}

	&:not( [ disabled ] ) {
		// Use hand cursor icongraphy. This is nonstandard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: pointer;

		&.wvui-button--framed {
			border: @border-base;
		}

		&.wvui-button--quiet {
			// Hide the border but keep the sizing.
			border: @border-width-base @border-style-base #0000;

			&:active {
				&:focus {
					border-color: #0000;
					box-shadow: none;
				}
			}
		}

		&.wvui-button--default {
			color: @color-base--emphasized;

			&.wvui-button--framed {
				background-color: @background-color-framed;
			}

			&.wvui-button--quiet {
				background-color: @background-color-quiet;
			}

			&:hover {
				&.wvui-button--framed {
					background-color: @background-color-framed--hover;
					color: @color-base--hover;
				}

				&.wvui-button--quiet {
					background-color: @background-color-quiet--hover;
				}
			}

			&:focus {
				box-shadow: @box-shadow-base--focus;
				border-color: @color-primary--focus;
			}

			&:active {
				&.wvui-button--framed {
					border-color: @border-color-base--active;
				}

				&:focus {
					box-shadow: none;
					background-color: @background-color-framed--active;
					color: @color-base--emphasized;
				}
			}
		}

		&.wvui-button--progressive {
			background-color: @color-primary;
			color: @color-base--inverted;

			&.wvui-button--framed {
				border-color: @wmui-color-accent30;
			}

			&:hover {
				background-color: @color-primary--hover;
				color: @color-base--inverted;

				&.wvui-button--framed {
					border-color: @wmui-color-accent30;
				}
			}

			&:focus {
				box-shadow: @box-shadow-primary--focus;
				color: @color-base--inverted;
			}

			&:active {
				&.wvui-button--framed {
					border-color: @wmui-color-accent30;
				}

				&:focus {
					box-shadow: none;
					background-color: @wmui-color-accent30;
				}
			}
		}

		&.wvui-button--destructive {
			background-color: @color-destructive;
			color: @color-base--inverted;

			&.wvui-button--framed {
				border-color: @wmui-color-red30;
			}

			&:hover {
				background-color: @color-destructive--hover;
				color: @color-base--inverted;

				&.wvui-button--framed {
					border-color: @wmui-color-red30;
				}
			}

			&:focus {
				box-shadow: @box-shadow-inset--inverted;
				color: @color-base--inverted;
			}

			&:active {
				&.wvui-button--framed {
					border-color: @border-color-destructive--active;
				}

				&:focus {
					box-shadow: none;
					background-color: @wmui-color-red30;
				}
			}
		}
	}
}
</style>
