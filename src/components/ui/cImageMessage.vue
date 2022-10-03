<script setup lang="ts">
/**
 * Компонент для отображения
 * сообщения с изображением
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
    <div class="message-image">
        <a :href="message.file.link" data-fancybox="gallery">
            <img
                :src="message.file.preview"
                :alt="message.user"
                class="rounded-2xl"
            />
        </a>
    </div>
</template>

<style lang="scss">
.message-image {
    max-width: 300px;
}
</style>
