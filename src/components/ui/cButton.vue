<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    href: {
        type: String,
        default: '#',
    },
    type: {
        type: String,
        default: 'primary',
        validator: function (value: string) {
            return ['primary', 'success', 'danger', 'light'].includes(value);
        },
    },
});

const typeClass = computed<string>(() => {
    return 'button_' + props.type;
});
</script>

<template>
    <a :href="href" class="button rounded-md" :class="typeClass">
        <slot></slot>
    </a>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.button {
    display: block;
    border: 2px solid white;
    padding: 0.375rem 0.75rem;
    width: 100%;
    text-align: center;
    transition: all 0.3s;
}

.button_primary {
    background-color: variable.$blue;
    border: 2px solid variable.$blue;
    color: white;

    &:hover {
        background-color: variable.$hover-blue;
        border: 2px solid variable.$hover-blue;
    }
}
</style>
