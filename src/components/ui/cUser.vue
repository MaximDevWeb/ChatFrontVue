<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();

const user = computed(() => {
    return userStore.getUser;
});

const title = computed(() => {
    return route.meta.title;
});

const name = computed(() => {
    if (user.value?.profile.first_name) {
        return `${user.value.profile.first_name}  ${user.value.profile.last_name}`;
    } else {
        return user.value?.login;
    }
});
</script>

<template>
    <div class="user" v-if="user">
        <div class="user__avatar">
            <img :src="user.avatar.link" />
        </div>

        <div class="text-right">
            <p class="uppercase">{{ title }}</p>
            <p class="text-sm user__name">{{ name }}</p>
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

.user__name {
    color: variable.$yellow;
}
</style>
