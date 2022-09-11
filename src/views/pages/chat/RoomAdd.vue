<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import personalImage from '@/assets/images/personal.svg';
import groupImage from '@/assets/images/group.svg';
</script>

<template>
    <div class="room-add mt-6">
        <div class="block-head text-lg">
            <span class="block-head__text">Выберите тип чата</span>

            <div class="block-head__bts">
                <router-link to="/chat">
                    <c-icon name="close" class="block-head__btn" />
                </router-link>
            </div>
        </div>

        <div class="mt-4">
            <router-link
                to="/chat/contacts"
                class="room-add__link mb-4 rounded-lg"
            >
                <img
                    :src="personalImage"
                    alt="Личный чат"
                    class="room-add__icon mr-3"
                />
                <p class="text-lg">Личный чат</p>
            </router-link>

            <router-link to="/chat/create" class="room-add__link rounded-lg">
                <img
                    :src="groupImage"
                    alt="Групповой чат"
                    class="room-add__icon mr-3"
                />
                <p class="text-lg">Групповой чат</p>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.room-add__link {
    display: flex;
    align-items: center;
    transition: all 0.3s;

    &:hover {
        background-color: variable.$gray;
    }
}

.room-add__icon {
    flex: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 8px solid variable.$gray;
}
</style>
