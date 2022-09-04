<script setup lang="ts">
/**
 * Компонент для отображения одного чата
 * в списке чатов
 */

import type { Room } from '@/interfaces/caht';
import CIcon from '@/components/icons/cIcon.vue';
import { useChatStore } from '@/stores/chats';

/**
 * Пареметры компонента
 * @param {Room} room - данные чата
 */
const props = defineProps<{
    room: Room;
}>();

/**
 * Загрузка состояний
 */
const chatsStore = useChatStore();

/**
 * Задаем текущую чат
 */
const setRoom = (): void => {
    chatsStore.setRoom(props.room);
};
</script>

<template>
    <a href="#" class="room-item rounded-lg" @click.prevent="setRoom">
        <div class="room-item__avatar mr-3">
            <img :src="room.avatar" :alt="room.name" />
        </div>

        <div class="room-item__info">
            <p class="text-lg">{{ room.name }}</p>
            <p class="text-sm opacity-60">28.05.2022 14:48</p>
        </div>

        <div class="room-item__option">
            <c-icon name="delete" class="room-item__icon" />
        </div>
    </a>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.room-item {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    transition: all 0.3s;

    &:hover {
        background-color: variable.$gray;

        .room-item__option {
            opacity: 1;
        }
    }
}

.room-item__avatar {
    flex: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 8px solid variable.$gray;

    img {
        width: 100%;
        height: auto;
    }
}

.room-item__info {
    width: 100%;
}

.room-item__option {
    flex: none;
    opacity: 0;
}

.room-item__icon {
    padding: 6px;
    width: 32px;
    height: 32px;
    color: variable.$black-white;
    transition: all 0.3s;

    &:hover {
        color: white;
    }
}
</style>
