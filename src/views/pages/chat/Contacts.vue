<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
</script>

<template>
    <div class="contacts mt-6">
        <div class="block-head text-lg">
            <span class="block-head__text">Контакты</span>

            <div class="block-head__bts">
                <router-link to="/chat/contacts/add">
                    <c-icon name="user-add" class="block-head__btn" />
                </router-link>

                <a href="#">
                    <c-icon name="star" class="block-head__btn" />
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';
</style>
