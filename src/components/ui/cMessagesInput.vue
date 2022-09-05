<script setup lang="ts">
/**
 * Компонент редактора сообщений
 */

import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import type { User } from '@/interfaces/auth';
import CIcon from '@/components/icons/cIcon.vue';
import { useChatStore } from '@/stores/chats';
import type { dataMessage } from '@/interfaces/caht';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const chatStore = useChatStore();

/**
 * Переменная с содержимым сообщения
 */
const message = ref<string>('');

/**
 * Пользователь текущей сессии
 */
const user = computed(() => {
    return userStore.getUser as User;
});

/**
 * Метод отправки сообщения
 */
const sendMessage = (): void => {
    if (userStore.getUser && chatStore.getRoom) {
        const data: dataMessage = {
            user_id: userStore.getUser.id,
            room_id: chatStore.getRoom.id,
            text: message.value,
        };

        chatStore.sendMessage(data)?.then(() => {
            message.value = '';
        });
    }
};
</script>

<template>
    <div class="mess-input p-3 rounded-2xl" v-if="user.id">
        <img
            :src="user.avatar.link"
            :alt="user.login"
            class="mess-input__avatar"
        />

        <input
            type="text"
            placeholder="Ваше сообщение..."
            class="mess-input__input mx-4"
            v-model="message"
            @keypress.enter="sendMessage"
        />

        <div class="flex mr-4">
            <c-icon name="microphone" class="mess-input__icon" />
            <c-icon name="add_file" class="mess-input__icon" />
        </div>

        <div class="mess-input_send" @click="sendMessage">
            <c-icon name="send" class="mess-input__icon" />
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.mess-input {
    display: flex;
    background-color: variable.$gray;
}

.mess-input__avatar {
    flex: none;
    height: 34px;
    width: 34px;
    border-radius: 50%;
}

.mess-input__input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
}

.mess-input__icon {
    height: 32px;
    width: 32px;
    padding: 6px;
    color: variable.$black-white;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        color: variable.$yellow;
    }
}
</style>
