<script setup lang="ts">
/**
 * Компонент для отправки файлов
 */

import CIcon from '@/components/icons/cIcon.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chats';
import { useToastStore } from '@/stores/toast';
import type { dataMessage } from '@/interfaces/caht';
import CFileFile from '@/classes/File/cFileFile';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const chatStore = useChatStore();
const toastStore = useToastStore();

/**
 * Переменная с полем выбора файла
 */
const input: Ref<null | HTMLInputElement> = ref(null);

/**
 * Переменная индикации загрузи
 */
const loaded: Ref<boolean> = ref(false);

/**
 * Метод вызова окна выбора файла
 */
const selectFile = () => {
    input.value?.click();
};

/**
 * Метод загрузки файла
 * и его отправки
 */
const uploadFile = (event: Event): void => {
    if (!userStore.getUser || !chatStore.getRoom) return;

    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
        const recordFile = new CFileFile(files[0]);
        const validate = recordFile.validate();
        const data: dataMessage = {
            id: 0,
            user_id: userStore.getUser.id,
            room_id: chatStore.getRoom.id,
        };

        if (!validate.result) {
            toastStore.addToast({
                title: 'Ошибка валидации файла',
                message: validate.errors ?? 'Невозможно загрузить изображение',
                type: 'danger',
            });
            return;
        }

        loaded.value = true;

        recordFile
            .upload()
            .then((response) => {
                data.type = response.data.type;
                data.file_id = response.data.id;

                chatStore.sendMessage(data);
            })
            .catch((error) => {
                console.log(error);
                toastStore.addToast({
                    title: 'Сообщение не отправлено',
                    message: 'Ошибка отправки сообщения',
                    type: 'danger',
                });
            })
            .then(() => {
                loaded.value = false;
            });
    }
};
</script>

<template>
    <div class="file-up__stage" :class="{ 'file-up__stage_active': loaded }">
        <div>
            <c-icon
                name="upload"
                class="mess-input__icon"
                @click="selectFile"
            />
        </div>
        <div>
            <c-icon name="load" class="mess-input__icon rotate" />
        </div>
    </div>
    <input type="file" ref="input" class="input_hidden" @change="uploadFile" />
</template>

<style lang="scss">
.file-up__stage {
    width: 32px;
    height: 32px;
    overflow: hidden;
}

.mess-input__icon {
    transition: transform 0.3s;
}

.file-up__stage_active {
    div {
        transform: translateY(-32px);
    }
}
</style>
