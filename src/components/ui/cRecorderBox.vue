<script setup lang="ts">
/**
 * Компонент обертка для
 * записи голосового сообщения
 */

import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chats';
import { useRecorderStore } from '@/stores/recorder';
import { computed, onMounted, ref, watch } from 'vue';
import type { User } from '@/interfaces/auth';
import CIcon from '@/components/icons/cIcon.vue';
import CRecorder from '@/components/ui/cRecorder.vue';
import CRecordFile from '@/classes/File/cRecordFile';
import { useToastStore } from '@/stores/toast';
import type { AxiosResponse } from 'axios';
import { dataMessage } from '@/interfaces/caht';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const chatStore = useChatStore();
const toastStore = useToastStore();
const recorderStore = useRecorderStore();

/**
 * Пользователь текущей сессии
 */
const user = computed(() => {
    return userStore.getUser as User;
});

const sending = ref(false);

/**
 * Переменная с записью
 * голосового сообщения
 */
const record = computed((): File | null => {
    return recorderStore.getRecord;
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
 * Функция изменения отоброжения
 * записи голосового сообщения
 */
const hideRecorder = () => {
    recorderStore.setHide(true);
};

/**
 * Функция отправки
 * голосового сообщения
 */
const sendRecord = () => {
    if (!userStore.getUser || !chatStore.getRoom || !record.value) return;

    sending.value = true;

    const recordFile = new CRecordFile(record.value);
    const validate = recordFile.validate();
    const data: dataMessage = {
        id: input.value.id,
        user_id: userStore.getUser.id,
        room_id: chatStore.getRoom.id,
    };

    if (!validate.result) {
        toastStore.addToast({
            title: 'Ошибка валидации файла',
            message: validate.errors ?? 'Невозможно загрузить файл',
            type: 'danger',
        });
    }

    recordFile
        .upload()
        .then((response) => {
            sending.value = false;
            recorderStore.setRecord(null);

            data.type = response.data.type;
            data.file_id = response.data.file_id;

            chatStore.sendMessage(data);
        })
        .catch(() => {
            toastStore.addToast({
                title: 'Сообщение не отправлено',
                message: 'Ошибка отправки сообщения',
                type: 'danger',
            });
        });
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

        <div class="mess-input_send" @click="sendRecord">
            <c-icon v-if="!sending" name="send" class="mess-input__icon" />
            <c-icon v-else name="load" class="mess-input__icon rotate" />
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
