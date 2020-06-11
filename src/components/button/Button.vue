<template>
    <button
        :class="classes"
        @click="onClick"
    >
    </button>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';

export default Vue.extend( {
    name: 'Button',
    methods: {
        onClick( event: MouseEvent ) {
            this.onBtnClick( event );
        }
    },
    props: {
        onBtnClick: {
            type: Function as PropType<(event: MouseEvent)=>void>,
        }
    },
    computed: {
        classes() {
            return {
                'mw-ui-button': true
            };
        }
    },
} );
</script>

<style lang="less">

</style>
