<script setup lang="ts">
defineProps({
    id: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        default: 'text',
        validator: function (value: string) {
            return ['text', 'password', 'email'].includes(value);
        },
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    error: {
        type: String,
    },
    modelValue: {
        type: String,
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex justify-between">
        <label :for="id" class="input__label ml-3">{{ label }}</label>

        <span v-if="error" class="text-sm input__error">{{ error }}</span>
    </div>

    <input
        :type="type"
        :id="id"
        class="input rounded-md"
        :class="{ input_error: error }"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.input__label {
    color: white;
}

.input__error {
    color: variable.$red;
}

.input {
    background-color: variable.$black-white;
    padding: 0.375rem 0.75rem;
    width: 100%;
    border: 1px solid variable.$black-white;
    color: white;

    &::placeholder {
        color: variable.$dark-grey;
        opacity: 0.7;
    }

    &:focus {
        border: 1px solid white;
        outline: none;
    }
}

.input_error {
    border: 1px solid variable.$red;
}
</style>
