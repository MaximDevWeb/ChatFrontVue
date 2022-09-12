<script setup lang="ts">
/**
 * Компонент для создания аватара
 * группового чата
 */

import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import CIcon from '@/components/icons/cIcon.vue';
import plusBg from '@/assets/images/plus.svg';
import cAvatarGroup from '@/classes/files/cAvatarGroup';
import { useToastStore } from '@/stores/toast';

/**
 * Загрузка состояний
 */
const toastStore = useToastStore();

/**
 * Регистрация обрабатываемых событий
 */
const emit = defineEmits(['change']);

/**
 * Создание реактивных переменных
 */
const avatarUpload: Ref<HTMLInputElement | undefined> = ref();
const file: Ref<File | null> = ref(null);

/**
 * Получаем текущий файл для аватара
 */
const avatarBg = computed<string>(() => {
    return file.value ? URL.createObjectURL(file.value) : plusBg;
});

/**
 * Функция обработки нажатия на
 * иконку аватара и вызов окна выбора файла
 */
const avatarSelect = (): void => {
    avatarUpload.value?.click();
};

/**
 * Функция обработки события изменения автара
 *
 * @param event {Event}
 */
const avatarChange = (event: Event): void => {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
        const avatar = new cAvatarGroup(files[0]);
        const validate = avatar.validate();

        if (validate.result) {
            file.value = avatar.getFile();
            emit('change', file.value);
        } else {
            toastStore.addToast({
                title: 'Ошибка загрузки',
                message: validate.message,
                type: 'warning',
            });
        }
    }
};
</script>

<template>
    <div class="avatar-group">
        <div
            class="avatar-group__field"
            :style="{ backgroundImage: `url(${avatarBg})` }"
            @click="avatarSelect"
        >
            <c-icon name="edit" class="avatar__edit" />
        </div>

        <input
            type="file"
            class="input_hidden"
            ref="avatarUpload"
            @change="avatarChange"
        />
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.avatar-group__field {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border: 10px solid variable.$light-gray;
    background-color: variable.$light-gray;
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    cursor: pointer;
}

.avatar__edit {
    position: absolute;
    bottom: -8px;
    right: -8px;
    height: 30px;
    width: 30px;
    border: 6px solid #28292d;
    border-radius: 50%;
    background-color: #28292d;
    color: #43a0ff;
}
</style>
