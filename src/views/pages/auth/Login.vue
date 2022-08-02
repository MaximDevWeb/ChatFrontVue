<script setup lang="ts">
import CPanel from '@/components/ui/cPanel.vue';
import CLogo from '@/components/ui/cLogo.vue';
import CInput from '@/components/ui/cInput.vue';
import CCheckBox from '@/components/ui/cCheckBox.vue';
import CButton from '@/components/ui/cButton.vue';
import { reactive } from 'vue';
import type { FormLogin, Errors } from '@/interfaces/auth';

const form: FormLogin = reactive({
    login: '',
    password: '',
    remember: true,
});

function submitForm() {
    console.log(form);
}
</script>

<template>
    <c-panel class="max-w-sm mx-2">
        <c-logo :label="true" />

        <p class="mt-4 text-center leading-5 auth__desc">
            Для продолжения необходима авторизация
        </p>

        <div class="mt-4">
            <c-input
                id="login"
                label="Логин"
                placeholder="master_yoda"
                v-model="form.login"
            />
        </div>

        <div class="mt-3">
            <c-input
                id="password"
                type="password"
                label="Пароль"
                placeholder="master_yoda_pass"
                v-model="form.password"
            />
        </div>

        <div class="mt-4">
            <c-check-box id="remember" v-model="form.remember">
                Запомнить меня
            </c-check-box>
        </div>

        <div class="mt-4">
            <c-button @click="submitForm">Войти</c-button>
        </div>

        <div class="mt-8 leading-5 text-center auth__desc">
            Нет аккаунта.
            <router-link to="/auth/register" class="link">
                Создайте новый
            </router-link>
        </div>
    </c-panel>
</template>
