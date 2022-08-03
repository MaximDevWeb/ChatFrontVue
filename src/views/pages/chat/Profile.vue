<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => {
    return userStore.getUser;
});
</script>

<template>
    <div v-if="user">
        <p>{{ user.login }}</p>
        <p>{{ user.email }}</p>
    </div>
</template>

<style lang="scss"></style>
