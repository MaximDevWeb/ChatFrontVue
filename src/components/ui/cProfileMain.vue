<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { User, Profile } from '@/interfaces/auth';
import CEditable from '@/components/ui/cEditable.vue';
import CButton from '@/components/ui/cButton.vue';
import http from '@/bootstrap/http';
import { useToastStore } from '@/stores/toast';

const userStore = useUserStore();
const toastStore = useToastStore();

let loading: Ref<boolean> = ref(false);

const user = computed(() => {
    return userStore.getUser as User;
});

const form = computed(() => {
    return {
        first_name: user.value ? user.value.profile.first_name : '',
        last_name: user.value ? user.value.profile.last_name : '',
        birthdate: user.value ? user.value.profile.birthdate : '',
        city: user.value ? user.value.profile.city : '',
    } as Profile;
});

const updateProfile = (): void => {
    loading.value = true;

    http.post('user/profile', form.value)
        .then(() => {
            toastStore.addToast({
                title: 'Успешно',
                message: 'Профиль обновлен',
            });

            userStore.setProfile(form.value);
            loading.value = false;
        })
        .catch(() => {
            toastStore.addToast({
                title: 'Ошибка обновления',
                message: 'Что-то пошло не так, повторите попытку позже',
                type: 'warning',
            });

            loading.value = false;
        });
};
</script>

<template>
    <div class="profile-main mt-6">
        <div>
            <div class="profile-main__label">Логин</div>
            <div class="profile-main__value">{{ user?.login }}</div>
        </div>

        <div>
            <div class="profile-main__label mt-2">Почта</div>
            <div class="profile-main__value">{{ user?.email }}</div>
        </div>

        <div>
            <p class="profile-main__label mt-2">Имя</p>
            <c-editable v-model="form.first_name" />
        </div>

        <div>
            <p class="profile-main__label mt-2">Фамилия</p>
            <c-editable v-model="form.last_name" />
        </div>

        <div>
            <p class="profile-main__label mt-2">Дата рождения</p>
            <c-editable v-model="form.birthdate" placeholder="00.00.0000" />
        </div>

        <div>
            <p class="profile-main__label mt-2">Город</p>
            <c-editable v-model="form.city" />
        </div>

        <div class="mt-6">
            <c-button type="primary" @click="updateProfile" :loading="loading">
                Обновить
            </c-button>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.profile-main__label {
    font-size: 0.75rem;
    padding-left: 0.5rem;
    color: variable.$yellow;
    transform: translateY(4px);
}

.profile-main__value {
    padding: 0.25rem 0.5rem;
}
</style>
