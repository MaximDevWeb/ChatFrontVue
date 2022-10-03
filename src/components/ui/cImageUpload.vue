<script setup lang="ts">
/**
 * Компонент для отправки изображений
 */

import CIcon from '@/components/icons/cIcon.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';
import CImageFile from '@/classes/File/cImageFile';
import { useToastStore } from '@/stores/toast';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chats';
import type { dataMessage } from '@/interfaces/caht';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const chatStore = useChatStore();
const toastStore = useToastStore();

/**
 * Переменная с полем выбора изображения
 */
const input: Ref<null | HTMLInputElement> = ref(null);

/**
 * Переменная индикации загрузи
 */
const loaded: Ref<boolean> = ref(false);

/**
 * Метод вызова окна выбора файла
 */
const selectImage = () => {
    input.value?.click();
};

/**
 * Метод загрузки изображения
 * и его отправки
 */
const uploadImage = (event: Event): void => {
    if (!userStore.getUser || !chatStore.getRoom) return;

    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
        const recordImage = new CImageFile(files[0]);
        const validate = recordImage.validate();
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

        recordImage
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
    <div class="image-up__stage" :class="{ 'image-up__stage_active': loaded }">
        <div>
            <c-icon
                name="image"
                class="mess-input__icon"
                @click="selectImage"
            />
        </div>
        <div>
            <c-icon name="load" class="mess-input__icon rotate" />
        </div>
    </div>
    <input
        type="file"
        ref="input"
        class="input_hidden"
        accept="image/*"
        @change="uploadImage"
    />
</template>

<style lang="scss">
.image-up__stage {
    width: 32px;
    height: 32px;
    overflow: hidden;
}

.mess-input__icon {
    transition: transform 0.3s;
}

.image-up__stage_active {
    div {
        transform: translateY(-32px);
    }
}
</style>
