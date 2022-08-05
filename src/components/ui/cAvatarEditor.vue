<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import CIcon from '@/components/icons/cIcon.vue';
import CAvatar from '@/classes/files/cAvatar';
import { useToastStore } from '@/stores/toast';

const userStore = useUserStore();
const toastStore = useToastStore();
const avatarUpload = ref();

const userAvatar = computed(() => {
    return userStore.getUser?.avatar.link;
});

const avatarSelect = (): void => {
    avatarUpload.value.click();
};

const avatarChange = (event: Event): void => {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
        const file: File = files[0];
        const avatar = new CAvatar(file);

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
    <div v-if="userAvatar" class="avatar mt-6">
        <div
            class="avatar__user"
            @click="avatarSelect"
            :style="{ backgroundImage: `url(${userAvatar})` }"
        >
            <c-icon name="edit" class="avatar__edit" />
        </div>

        <input
            type="file"
            class="avatar__upload"
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

.avatar__upload {
    position: fixed;
    top: -1000px;
    opacity: 0;
}
</style>
