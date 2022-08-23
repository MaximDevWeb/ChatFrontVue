<script setup lang="ts">
import type { Contact } from '@/interfaces/contacts';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
    user: Contact;
}>();

const userStore = useUserStore();

const isMy = computed((): boolean => {
    return props.user.id === userStore.getUser?.id;
});

const userName = computed((): string => {
    if (isMy.value) {
        return 'Вы';
    } else {
        return props.user.full_name ? props.user.full_name : props.user.login;
    }
});
</script>

<template>
    <div
        class="message__info mb-1"
        :class="[isMy ? 'message__info_right' : 'message__info_left']"
    >
        <img :src="user.avatar" :alt="user.login" />
        {{ userName }}
    </div>
</template>

<style lang="scss">
.message__info {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        position: absolute;
        top: 0;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
}

.message__info_right {
    flex-direction: row-reverse;

    img {
        right: calc(-40px - 0.5rem);
    }
}

.message__info_left {
    img {
        left: calc(-40px - 0.5rem);
    }
}
</style>
