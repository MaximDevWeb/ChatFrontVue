<script setup lang="ts">
/**
 * Компонент вывода времени сообщения
 */

import { computed } from 'vue';
import { DateTime } from 'luxon';
import Helper from '@/classes/Helper';

/**
 * Пареметры компонента
 * @param {string} time - время сообщения
 */
const props = defineProps({
    time: {
        type: String,
        required: true,
    },
});

/**
 * Переменная с отформатированным времнем
 */
const date = computed(() => {
    const date = DateTime.fromISO(props.time).toObject();

    const hour = Helper.String.padNullStart(date.hour);
    const minute = Helper.String.padNullStart(date.hour);

    return `${hour}:${minute}`;
});
</script>

<template>
    <div class="mx-4 message__time">
        {{ date }}
    </div>
</template>

<style lang="scss">
.message__time {
    opacity: 0.5;
    font-size: 0.875rem;
}
</style>
