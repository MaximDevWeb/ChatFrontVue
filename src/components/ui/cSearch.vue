<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';

defineProps({
    modelValue: {
        type: String,
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="search mt-4 rounded-lg">
        <c-icon name="search" class="search__icon" />

        <input
            type="text"
            placeholder="Поиск"
            class="search__input"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.search {
    position: relative;
    background-color: variable.$gray;
    padding: 0.35rem 0.5rem 0.35rem 2.5rem;
}

.search__icon {
    position: absolute;
    left: 0.75rem;
    top: 8px;
    height: 18px;
    width: 18px;
    color: variable.$black-white;
}

.search__input {
    background-color: inherit;
    outline: none;
    width: 100%;
}
</style>
