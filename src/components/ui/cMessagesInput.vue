<script setup lang="ts">
/**
 * Компонент редактора сообщений
 */

import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import type { User } from '@/interfaces/auth';
import CIcon from '@/components/icons/cIcon.vue';
import { useChatStore } from '@/stores/chats';
import { useRecorderStore } from '@/stores/recorder';
import CImageUpload from '@/components/ui/cImageUpload.vue';
import CFileUpload from '@/components/ui/cFileUpload.vue';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const chatStore = useChatStore();
const recorderStore = useRecorderStore();

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
 * Переменная с текущим вводом
 */
const input = computed(() => {
    return chatStore.getMessageInput;
});

/**
 * Переменная с сотстоянием
 * отоброжения записи голосового сообщения
 */
const recorderHide = computed((): boolean => {
    return recorderStore.isHide;
});

/**
 * Функция отправки сообщения
 */
const sendMessage = (): void => {
    if (!userStore.getUser || !chatStore.getRoom) return;

    const data = {
        id: input.value.id,
        user_id: userStore.getUser.id,
        room_id: chatStore.getRoom.id,
        text: input.value.text,
    };

    chatStore.sendMessage(data);
};

/**
 * Функция очистки сообщения
 */
const cleanInput = () => {
    chatStore.cleanMessageInput();
};

/**
 * Функция изменения отоброжения
 * записи голосового сообщения
 */
const showRecorder = () => {
    recorderStore.setHide(false);
};
</script>

<template>
    <div
        class="mess-input p-3 rounded-2xl"
        v-if="user.id"
        :class="{ 'mess-input_hide': !recorderHide }"
    >
        <img
            :src="user.avatar.link"
            :alt="user.login"
            class="mess-input__avatar"
        />

        <input
            type="text"
            placeholder="Ваше сообщение..."
            class="mess-input__input mx-4"
            v-model="input.text"
            @keypress.enter="sendMessage"
        />

        <div class="flex mr-2" v-if="input.id">
            <c-icon name="close" class="mess-input__icon" @click="cleanInput" />
        </div>

        <div class="flex mr-4">
            <c-image-upload />
            <c-file-upload />
            <c-icon
                name="microphone"
                class="mess-input__icon"
                @click="showRecorder"
            />
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
    transition: transform 0.3s;
}

.mess-input_hide {
    transform: translateY(-60px);
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
