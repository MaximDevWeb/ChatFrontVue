<script setup lang="ts">
import CToastList from '@/components/ui/cToastList.vue';
</script>

<template>
    <c-toast-list />

    <div class="flex items-center justify-center h-screen">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.auth__desc {
    color: variable.$black-white;
}
</style>
