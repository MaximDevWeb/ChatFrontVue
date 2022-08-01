<script setup lang="ts">
import CPanel from '@/components/ui/cPanel.vue';
import CLogo from '@/components/ui/cLogo.vue';
import CInput from '@/components/ui/cInput.vue';
import CCheckBox from '@/components/ui/cCheckBox.vue';
import CButton from '@/components/ui/cButton.vue';
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { http } from '@/bootstrap/http';

interface Form {
    login: string;
    email: string;
    password: string;
    password_confirmation: string;
    submit: boolean;
}

interface Errors {
    login?: Array<string>;
    email?: Array<string>;
    password?: Array<string>;
    password_confirmation?: Array<string>;
    submit?: Array<string>;
}

const form: Form = reactive({
    login: '',
    email: '',
    password: '',
    password_confirmation: '',
    submit: true,
});

let errors: Ref<Errors> = ref({});

function submitForm() {
    http.post('auth/create', form)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            errors.value = error.response.data.errors ?? {};
        });
}
</script>

<template>
    <c-panel class="max-w-sm mx-2">
        <c-logo :label="true" />

        <p class="mt-4 text-center leading-5 auth__desc">
            Создайте свой аккаунт, и используйте все возможности сервиса
        </p>

        <div class="mt-4">
            <c-input
                id="login"
                label="Логин"
                placeholder="master_yoda"
                v-model="form.login"
                :error="errors.login?.shift()"
            />
        </div>

        <div class="mt-4">
            <c-input
                id="email"
                label="E-mail"
                placeholder="master_yoda@jedi.com"
                v-model="form.email"
                :error="errors.email?.shift()"
            />
        </div>

        <div class="mt-3">
            <c-input
                id="password"
                type="password"
                label="Пароль"
                placeholder="master_yoda_pass"
                v-model="form.password"
                :error="errors.password?.shift()"
            />
        </div>

        <div class="mt-3">
            <c-input
                id="password_confirm"
                type="password"
                label="Повторите пароль"
                placeholder="master_yoda_pass"
                v-model="form.password_confirmation"
                :error="errors.password_confirmation?.shift()"
            />
        </div>

        <div class="mt-4">
            <c-check-box
                id="submit"
                v-model="form.submit"
                :error="errors.submit?.shift()"
            >
                Я принимаю условия
                <router-link to="/contract" class="link">
                    пользовательского соглашения
                </router-link>
            </c-check-box>
        </div>

        <div class="mt-4">
            <c-button @click="submitForm">Зарегистрироваться</c-button>
        </div>

        <div class="mt-8 leading-5 auth__desc text-center">
            Есть аккаунт.
            <router-link to="/auth" class="link"> Страница входа </router-link>
        </div>
    </c-panel>
</template>
