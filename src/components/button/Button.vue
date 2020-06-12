<template>
    <button @click="onClick">
        <slot/>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
    name: 'wvui-button',
    methods: {
        onClick( event: MouseEvent ) {
            this.$emit('click', event);
        }
    }
} );
</script>
