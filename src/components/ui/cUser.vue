<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import type { User } from '@/interfaces/auth';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();

const user = computed<User | null>(() => {
    return userStore.getUser;
});

const title = computed<any>(() => {
    return route.meta.title;
});
</script>

<template>
    <div class="user" v-if="user">
        <div class="user__avatar">
            <img :src="user.avatar.link" />
        </div>

        <div class="text-lg">
            {{ title }}
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.user {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.user__avatar {
    width: 60px;
    height: 60px;
    border: 10px solid variable.$light-gray;
    background-color: variable.$light-gray;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
}
</style>
