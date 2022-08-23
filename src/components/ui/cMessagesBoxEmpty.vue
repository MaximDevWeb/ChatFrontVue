<script setup lang="ts">
import emptyImage from '@/assets/images/empty-chat.svg';
</script>

<template>
    <div class="empty-box">
        <img :src="emptyImage" alt="Выберите чат" />
        <p class="mt-2 uppercase">Выберите чат</p>
    </div>
</template>

<style lang="scss">
.empty-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        height: 100px;
        width: auto;
    }
}
</style>
