<template>
	<button :class="classes" @click="onClick">
		<slot />
	</button>
</template>

<script lang="ts">
import { PrimaryAction, isPrimaryAction } from './PrimaryAction';
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
		classes(): Record<string, boolean> {
			return {
				'wvui-button': true,
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
@import ( reference ) '~wikimedia-ui-base/wikimedia-ui-base.less';

.wvui-button {
	background: @wmui-color-base20;
}
</style>
