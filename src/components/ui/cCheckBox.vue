<script setup lang="ts">
defineProps({
    id: {
        type: String,
        require: true,
    },
    modelValue: {
        type: Boolean,
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <input
        class="checkbox"
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />

    <label class="checkbox__label leading-5" :for="id">
        <slot></slot>
    </label>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.checkbox__label {
    display: block;
    color: white;
    cursor: pointer;
    position: relative;
    padding-left: 2rem;

    &:before {
        content: '';
        position: absolute;
        top: -1px;
        left: 0;
        width: 20px;
        height: 20px;
        background-color: variable.$black-white;
        border-radius: 0.25rem;
    }

    &:after {
        content: '';
        position: absolute;
        top: 3px;
        left: 4px;
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 0.125rem;
        opacity: 0;
    }
}

.checkbox {
    position: fixed;
    top: -1000px;
    opacity: 0;
}

.checkbox:checked {
    & ~ .checkbox__label:after {
        opacity: 1;
    }
}
</style>
