<script setup lang="ts"></script>

<template>
    <div class="empty-box">
        <p class="mt-2 uppercase">Выберите чат</p>
        <p class="opacity-60">Выберите нужный чат, чтобы увидеть сообщения</p>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.empty-box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        height: 150px;
        width: auto;
        border: 16px solid variable.$light-gray;
        border-radius: 50%;
    }
}
</style>
