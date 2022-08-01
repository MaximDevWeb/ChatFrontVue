<script setup lang="ts">
import logo from '@/assets/images/logo.svg';
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'md',
        validator: function (value: string) {
            return ['lg', 'md', 'sm'].includes(value);
        },
    },
});

const sizeClass = computed<string>(() => {
    return 'logo_' + props.size;
});
</script>

<template>
    <div class="flex items-center justify-center logo" :class="sizeClass">
        <img :src="logo" class="logo__img" alt="HashChat" />

        <div v-if="label" class="ml-4 logo__label">
            <span class="font-extrabold">Hash</span>Chat
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.logo_md {
    .logo__img {
        height: 40px;
        width: 40px;
    }

    .logo__label {
        font-size: 1.5rem;
    }
}

.logo_lg {
    .logo__img {
        height: 50px;
        width: 50px;
    }

    .logo__label {
        font-size: 1.75rem;
    }
}

.logo_sm {
    .logo__img {
        height: 30px;
        width: 30px;
    }

    .logo__label {
        font-size: 1.25rem;
    }
}

.logo__label {
    color: variable.$blue;

    span {
        color: white;
    }
}
</style>
