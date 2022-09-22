<script setup lang="ts">
/**
 * Компонент обертка для
 * записи голосового сообщения
 */

import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chats';
import { useRecorderStore } from '@/stores/recorder';
import { computed, onMounted, watch } from 'vue';
import type { User } from '@/interfaces/auth';
import CIcon from '@/components/icons/cIcon.vue';
import CRecorder from '@/components/ui/cRecorder.vue';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const chatStore = useChatStore();
const recorderStore = useRecorderStore();

/**
 * Пользователь текущей сессии
 */
const user = computed(() => {
    return userStore.getUser as User;
});

/**
 * Переменная с сотстоянием
 * отоброжения записи голосового сообщения
 */
const recorderHide = computed((): boolean => {
    return recorderStore.isHide;
});

/**
 * Функция изменения отоброжения
 * записи голосового сообщения
 */
const hideRecorder = () => {
    recorderStore.setHide(true);
};
</script>

<template>
    <div
        class="record-box p-3 rounded-2xl"
        v-if="user.id"
        :class="{ 'record-box__hide': recorderHide }"
    >
        <img
            :src="user.avatar.link"
            :alt="user.login"
            class="record-box__avatar"
        />

        <div class="record-box__list mx-4">
            <c-recorder />
        </div>

        <div class="flex mr-4">
            <c-icon
                name="messages"
                class="mess-input__icon"
                @click="hideRecorder"
            />
        </div>

        <div class="mess-input_send" @click="sendMessage">
            <c-icon name="send" class="mess-input__icon" />
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.record-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    background-color: variable.$gray;
    transition: transform 0.3s;
}

.record-box__avatar {
    flex: none;
    height: 34px;
    width: 34px;
    border-radius: 50%;
}

.record-box__list {
    display: flex;
    width: 100%;
    align-items: center;
    color: rgba(white, 0.5);
}

.record-box__hide {
    transform: translateY(60px);
}
</style>
