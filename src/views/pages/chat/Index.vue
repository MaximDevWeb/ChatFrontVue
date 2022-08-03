<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => {
    return userStore.getUser;
});
</script>

<template>
    <h1>Hello {{ user?.login }}</h1>
</template>

<style lang="scss"></style>
