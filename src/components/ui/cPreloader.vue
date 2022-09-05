<script setup lang="ts">
/**
 * Компонент отображения анимации
 * загрузки данных
 */

import preloaderImg from '@/assets/images/preloader.svg';
</script>

<template>
    <div class="preloader">
        <img :src="preloaderImg" />
    </div>
</template>

<style lang="scss">
.preloader {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 50px;
        height: 50px;
    }
}
</style>
