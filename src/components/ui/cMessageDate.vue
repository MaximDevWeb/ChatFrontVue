<script setup lang="ts">
/**
 * Компонент вывода даты первого
 * сообщения этой даты
 */

import { computed } from 'vue';
import { DateTime } from 'luxon';

/**
 * Пареметры компонента
 * @param {string} time - время сообщения
 */
const props = defineProps({
    date: {
        type: String,
        required: true,
    },
});

const messageDate = computed((): string => {
    const currentDate = DateTime.fromISO(props.date);
    return currentDate.toLocaleString({
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
});
</script>

<template>
    <div class="message__date my-6">
        {{ messageDate }}
    </div>
</template>

<style lang="scss">
.message__date {
    opacity: 0.5;
    text-align: center;
    font-size: 0.875rem;
}
</style>
