<script setup lang="ts">
import CToastList from '@/components/ui/cToastList.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import http from '@/bootstrap/http';
import CMenu from '@/components/ui/cMenu.vue';
import CUser from '@/components/ui/cUser.vue';

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
</script>

<template>
    <c-toast-list />

    <div class="chat container mx-auto h-screen p-4 relative">
        <c-menu />

        <div class="edits">
            <c-user />

            <router-view></router-view>
        </div>

        <div class="chats"></div>

        <div class="options"></div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.edits {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 5.5rem;
    width: 340px;
    padding-right: 2rem;
    border-right: 1px solid variable.$light-gray;
}
</style>
