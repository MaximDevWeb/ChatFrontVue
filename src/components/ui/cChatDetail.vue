<script setup lang="ts">
/**
 * Компонент для вывода
 * информации о чате
 */

import CIcon from '@/components/icons/cIcon.vue';
import { useChatStore } from '@/stores/chats';
import { computed } from 'vue';
import CChatDetailParticipants from '@/components/ui/cChatDetailParticipants.vue';

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();

/**
 * Получаем состояние открытия
 * окна информации о чате
 */
const detailShow = computed((): boolean => {
    return chatStore.getDetailShow;
});

/**
 * Функция скрытия окна
 * информации о чате
 */
const detailHide = (): void => {
    chatStore.setRoomDetail(false);
};
</script>

<template>
    <div class="details rounded-2xl" :class="{ details__show: detailShow }">
        <div class="detail__wrap py-4 px-6">
            <div class="details__header">
                <p class="uppercase">Информация о чате</p>

                <c-icon
                    name="close"
                    class="details__icon"
                    @click="detailHide"
                />
            </div>

            <div class="details__body">
                <c-chat-detail-participants />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

$width: 320px;

.details {
    overflow: hidden;
    flex: none;
    max-width: $width;
    width: 0;
    background-color: variable.$gray;
    transition: all 0.3s;
}

.details__show {
    width: $width;
}

.detail__wrap {
    height: 100%;
    width: $width;
    display: flex;
    flex-direction: column;
}

.details__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.details__body {
    height: 100%;
}

.details__icon {
    height: 26px;
    width: 26px;
    cursor: pointer;
    opacity: 0.4;
    transition: all 0.3s;

    &:hover {
        opacity: 1;
        color: variable.$yellow;
    }
}
</style>
