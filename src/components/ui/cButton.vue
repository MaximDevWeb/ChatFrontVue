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
    loading: {
        type: Boolean,
        default: false,
    },
});

const typeClass = computed<string>(() => {
    return 'button_' + props.type;
});
</script>

<template>
    <a
        :href="href"
        class="button rounded-md"
        :class="[{ button_inactive: loading }, typeClass]"
    >
        <template v-if="loading">
            Обработка

            <span class="button__loading">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </span>
        </template>

        <template v-else>
            <slot></slot>
        </template>
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

.button_inactive {
    opacity: 0.85;
    pointer-events: none;
}

.button__loading {
    span {
        display: inline-block;
        margin-right: 1px;
    }

    span:nth-child(1) {
        animation: load 1s infinite;
    }

    span:nth-child(2) {
        animation: load 1s 0.25s infinite;
    }

    span:nth-child(3) {
        animation: load 1s 0.5s infinite;
    }
}

@keyframes load {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
