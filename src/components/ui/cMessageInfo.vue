<script setup lang="ts">
/**
 * Компонент с информацией
 * об авторе сообщения
 */

import type { Contact } from '@/interfaces/contacts';

/**
 * Пареметры компонента
 * @param {Contact} user - данные чата
 */
const props = defineProps<{
    user: Contact;
    my: boolean;
}>();
</script>

<template>
    <div
        class="message__info"
        :class="[my ? 'message__info_right' : 'message__info_left']"
    >
        <div class="message__avatar">
            <img :src="user.avatar" :alt="user.login" />
            <p>{{ my ? 'Вы' : user.full_name }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.message__info {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        position: absolute;
        top: 0;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
}

.message__info_right {
    justify-content: flex-end;

    img {
        right: -48px;
    }
}

.message__info_left {
    img {
        left: -48px;
    }
}
</style>
