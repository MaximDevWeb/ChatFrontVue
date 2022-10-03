<script setup lang="ts">
/**
 * Компонент для отображения
 * текстового сообщения
 */

import type { Message } from '@/interfaces/caht';

/**
 * Пареметры компонента
 * @param {Message} message - данные чата
 */
const props = defineProps<{
    message: Message;
    my: boolean;
}>();
</script>

<template>
    <div class="px-2">
        {{ message.text }}
    </div>
</template>

<style lang="scss"></style>
