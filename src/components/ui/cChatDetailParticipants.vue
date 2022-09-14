<script setup lang="ts">
/**
 * Компонент вывода списка
 * участников чата
 */

import { useChatStore } from '@/stores/chats';
import { computed } from 'vue';
import type { Room } from '@/interfaces/caht';
import CIcon from '@/components/icons/cIcon.vue';
import { useUserStore } from '@/stores/user';
import type { User } from '@/interfaces/auth';
import { useRouter } from 'vue-router';

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();
const userStore = useUserStore();
const router = useRouter();

/**
 * Получаем текущий чат
 */
const room = computed(() => {
    return chatStore.getRoom as Room;
});

/**
 * Получаем текущего авторизованного пользователя
 */
const user = computed(() => {
    return userStore.getUser as User;
});

/**
 * Переключаемся на личный
 * чат выбранного участника
 *
 * @param id
 */
const chatCreate = (id: number): void => {
    chatStore.createPersonalRoom(id).then(() => router.push('/chat'));
};
</script>

<template>
    <div class="detail__participants mt-6">
        <div class="detail__subheader">
            <span class="opacity-60 mr-1">Участники</span>
            {{ room?.participants.length }}
        </div>

        <perfect-scrollbar
            class="participants__list mt-4 grid gap-2 grid-cols-1"
            v-if="room"
        >
            <div
                class="participants__item"
                v-for="item in room.participants"
                :key="item.id"
            >
                <img
                    :src="item.avatar"
                    alt="item.full_name"
                    class="mr-3 participants__avatar"
                />
                <p class="participants__name">
                    {{ item.full_name ? item.full_name : item.login }}
                </p>

                <c-icon
                    name="add-message"
                    class="participants__icon"
                    v-if="item.id !== user.id"
                    @click="chatCreate(user.id)"
                />
            </div>
        </perfect-scrollbar>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.detail__participants {
    max-height: 35%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.participants__item {
    display: flex;
    align-items: center;

    &:hover {
        .participants__icon {
            opacity: 1;
        }
    }
}

.participants__avatar {
    flex: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
}

.participants__name {
    width: 100%;
}

.participants__icon {
    flex: none;
    height: 32px;
    width: 32px;
    padding: 6px;
    color: variable.$black-white;
    opacity: 0;
    cursor: pointer;
    transition: all 0.3s;
}
</style>
