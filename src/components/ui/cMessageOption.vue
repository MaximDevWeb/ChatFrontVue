<script setup lang="ts">
/**
 * Компонент для манипуляции с сообщениями
 */

import type { Message } from '@/interfaces/caht';
import CIcon from '@/components/icons/cIcon.vue';
import { FileType } from '@/interfaces/file';
import CMessageDownload from '@/components/ui/cMessageDownload.vue';
import { useChatStore } from '@/stores/chats';
import { useConfirmStore } from '@/stores/confirm';

/**
 * Пареметры компонента
 * @param {Message} message - данные чата
 */
const props = defineProps<{
    message: Message;
    my: boolean;
}>();

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();
const confirmStore = useConfirmStore();

/**
 * Метод копирования текста сообщения
 */
const copyMessage = (): void => {
    navigator.clipboard.writeText(props.message.text);
};

/**
 * Метод редактирования сообщения
 */
const editMessage = () => {
    chatStore.setMessageInput(props.message);
};

/**
 * Метод удаления сообщения
 */
const deleteMessage = () => {
    confirmStore.setConfirm({
        title: 'Подтвердите удаление',
        message: 'Подтвердите удаление данного сообщения',
        callback: () => {
            chatStore.deleteMessage(props.message.id);
        },
    });
};
</script>

<template>
    <div class="message__option">
        <template v-if="my">
            <c-icon name="delete" class="option__item" @click="deleteMessage" />

            <c-icon
                name="edit"
                class="option__item"
                v-if="message.type === FileType.Text"
                @click="editMessage"
            />
        </template>

        <c-message-download
            :file="message.file"
            v-if="message.type !== FileType.Text"
        />

        <c-icon
            name="copy"
            class="option__item"
            v-if="message.type === FileType.Text"
            @click="copyMessage"
        />
    </div>
</template>

<style lang="scss">
.message__option {
    display: flex;
    align-items: center;
    opacity: 0;
    transition: 0.3s opacity;
}

.option__item {
    flex: none;
    padding: 0.25rem;
    height: 28px;
    width: 28px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s opacity;

    &:hover {
        opacity: 1;
    }
}
</style>
