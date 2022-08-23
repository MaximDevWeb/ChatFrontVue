<script setup lang="ts">
import type { Message } from '@/interfaces/caht';
import { computed } from 'vue';
import { DateTime } from 'luxon';
import { useUserStore } from '@/stores/user';
import CMessageItemInfo from '@/components/ui/cMessageItemInfo.vue';

const props = defineProps<{
    message: Message;
}>();

const userStore = useUserStore();

const timeMessage = computed((): string => {
    const date = DateTime.fromJSDate(new Date(props.message.created_at));
    return date.toLocaleString(DateTime.TIME_SIMPLE);
});

const messageClass = computed((): string => {
    return props.message.user.id === userStore.getUser?.id
        ? 'message__item_left'
        : 'message__item_right';
});
</script>

<template>
    <div class="message__item mb-2" :class="[messageClass]">
        <c-message-item-info :user="message.user" v-if="message.showUser" />

        <div class="message__time text-sm">
            {{ timeMessage }}
        </div>

        <div
            class="message__text py-2 px-4 rounded-3xl"
            :class="{ message__text_round: message.showUser }"
        >
            {{ message.text }}
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.message__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 0 calc(40px + 0.5rem);
}

.message__time {
    color: variable.$black-white;
}

.message__text {
    color: white;
}

.message__item_left {
    .message__time {
        margin-right: 0.5rem;
    }

    .message__text {
        background-color: variable.$blue;
    }

    .message__text_round {
        border-radius: 1.5rem 0 1.5rem 1.5rem;
    }
}

.message__item_right {
    flex-direction: row-reverse;

    .message__time {
        margin-left: 0.5rem;
    }

    .message__text {
        background-color: variable.$light-gray;
    }

    .message__text_round {
        border-radius: 0 1.5rem 1.5rem 1.5rem;
    }
}
</style>
