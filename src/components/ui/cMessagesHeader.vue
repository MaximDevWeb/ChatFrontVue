<script setup lang="ts">
/**
 * Компонент отображение шатки
 * текущего сайта
 */

import { useChatStore } from '@/stores/chats';
import { computed } from 'vue';
import CIcon from '@/components/icons/cIcon.vue';
import type { Room } from '@/interfaces/caht';
import { typeChat } from '@/interfaces/caht';

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();

/**
 * Функция получения текущего чата
 * @return {Room} room
 */
const room = computed(() => {
    return chatStore.getRoom as Room;
});

/**
 * Функция раскрытия окна
 * информации о чате
 */
const detailShow = (): void => {
    chatStore.setRoomDetail(true);
};
</script>

<template>
    <div class="messages__header">
        <div class="messages__subject">
            <img
                :src="room.avatar"
                :alt="room.name"
                class="messages__avatar mr-4"
            />
            <div>
                <p class="uppercase">
                    {{ room.name }}
                </p>
                <p class="text-sm messages__type">
                    {{
                        room.type === typeChat.GROUP
                            ? 'Групповой чат'
                            : 'Личный чат'
                    }}
                </p>
            </div>
        </div>

        <div class="messages__attachments flex">
            <c-icon name="image" class="messages__icon" />
            <c-icon name="document" class="messages__icon" />
        </div>

        <div>
            <c-icon
                name="category"
                class="messages__icon"
                @click="detailShow"
            />
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.messages__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.messages__subject {
    width: 50%;
    flex: none;
    display: flex;
    align-items: center;
}

.messages__avatar {
    width: 60px;
    height: 60px;
    border: 10px solid variable.$light-gray;
    background-color: variable.$light-gray;
    border-radius: 50%;
    overflow: hidden;
}

.messages__type {
    color: variable.$yellow;
}

.messages__icon {
    height: 38px;
    width: 38px;
    padding: 6px;
    color: variable.$black-white;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        color: white;
    }
}
</style>
