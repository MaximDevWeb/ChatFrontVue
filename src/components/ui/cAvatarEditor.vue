<script setup lang="ts">
/**
 * Компонетнт для редактирования
 * аватара профиля
 */

import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import CIcon from '@/components/icons/cIcon.vue';
import CAvatar from '@/classes/files/cAvatar';
import { useToastStore } from '@/stores/toast';

/**
 * Загрузка состояний
 */
const userStore = useUserStore();
const toastStore = useToastStore();
const avatarUpload = ref();

/**
 * Получаем текущий аватар пользователя
 * в виде ссылки
 *
 * @return {String}
 */
const userAvatar = computed(() => {
    return userStore.getUser?.avatar.link as String;
});

/**
 * Функция обработки нажатия на
 * иконку аватара и вызов окна выбора файла
 */
const avatarSelect = (): void => {
    avatarUpload.value.click();
};

/**
 * Функция обработки события изменения
 * аватара, с сохранением чере класс CAvatar
 *
 * @param event {Event}
 */
const avatarChange = (event: Event): void => {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
        const avatar = new CAvatar(files[0]);
        const validate = avatar.validate();

        if (validate.result) {
            const result = avatar.upload();

            result.then((response) => {
                toastStore.addToast({
                    title: 'Успешно',
                    message: 'Аватар обновлен',
                });

                userStore.setAvatarLink(response.data.avatar_link);
            });

            result.catch(() => {
                toastStore.addToast({
                    title: 'Ошибка загрузки',
                    message: 'Что-то пошло не так, повторите попытку позже',
                    type: 'warning',
                });
            });
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
    <div v-if="userAvatar" class="avatar">
        <div
            class="avatar__user"
            @click="avatarSelect"
            :style="{ backgroundImage: `url(${userAvatar})` }"
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

.avatar {
    position: relative;
}

.avatar__user {
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
    border: 6px solid variable.$gray;
    border-radius: 50%;
    background-color: variable.$gray;
    color: variable.$blue;
}
</style>
