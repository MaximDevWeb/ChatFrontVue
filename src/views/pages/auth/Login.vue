<script setup lang="ts">
import CPanel from '../../../../src/components/ui/cPanel.vue';
import CLogo from '../../../../src/components/ui/cLogo.vue';
import CInput from '../../../../src/components/ui/cInput.vue';
import CCheckBox from '../../../../src/components/ui/cCheckBox.vue';
import CButton from '../../../../src/components/ui/cButton.vue';
</script>

<template>
    <c-panel class="max-w-sm mx-2">
        <c-logo :label="true" />

        <p class="mt-4 text-center leading-5 auth__desc">
            Для продолжения необходима авторизация
        </p>

        <div class="mt-4">
            <c-input id="login" label="Логин" placeholder="master_yoda" />
        </div>

        <div class="mt-3">
            <c-input
                id="password"
                type="password"
                label="Пароль"
                placeholder="master_yoda_pass"
            />
        </div>

        <div class="mt-4">
            <c-check-box id="remember">Запомнить меня</c-check-box>
        </div>

        <div class="mt-4">
            <c-button>Войти</c-button>
        </div>

        <div class="mt-8 leading-5 auth__desc">
            Нет аккаунта.
            <router-link to="/auth/register" class="link">
                Создайте новый
            </router-link>
        </div>
    </c-panel>
</template>
