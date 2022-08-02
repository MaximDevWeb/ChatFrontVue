<script setup>
import sprite from '@/components/icons/sprite/icons.svg';

defineProps({
    name: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <svg>
        <use :xlink:href="sprite + '#' + name"></use>
    </svg>
</template>
