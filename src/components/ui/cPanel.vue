<template>
    <div class="panel rounded-xl p-8">
        <slot />
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.panel {
    background-color: variable.$light-gray;
}
</style>
