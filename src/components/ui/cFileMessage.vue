<script setup lang="ts">
/**
 * Компонент для отображения
 * сообщения с файлом
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
    <div class="message-file pr-2">
        <div class="message-file__extension mr-2">
            {{ message.file.extension }}
        </div>
        <div class="message-file__name">
            {{ message.file.original_name }}
        </div>
    </div>
</template>

<style lang="scss">
.message-file {
    display: flex;
    align-items: center;
    max-width: 300px;
}

.message-file__extension {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    width: 32px;
    height: 32px;
    border: 1px solid white;
    border-radius: 50%;
}

.message-file__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
