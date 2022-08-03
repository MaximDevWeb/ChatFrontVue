<script setup lang="ts">
import CToastList from '@/components/ui/cToastList.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import http from '@/bootstrap/http';

const userStore = useUserStore();
const router = useRouter();

const authLoad = (): void => {
    if (userStore.isAuth()) {
        http.get('auth/user')
            .then((response) => {
                userStore.setUser(response.data.user);
            })
            .catch(() => {
                router.push('/auth');
            });
    } else {
        router.push('/auth');
    }
};

onMounted((): void => {
    authLoad();
});

const logOut = (): void => {
    http.get('auth/logout').then(() => {
        userStore.setToken('');
        userStore.setUser(null);
        router.push('/auth');
    });
};
</script>

<template>
    <c-toast-list />

    <div>
        <a href="#" @click="logOut">Выйти</a>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';
</style>
