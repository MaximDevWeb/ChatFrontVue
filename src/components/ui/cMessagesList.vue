<script setup lang="ts">
import { useChatStore } from '@/stores/chats';
import { computed, onMounted } from 'vue';
import type { Message } from '@/interfaces/caht';
import CMessageItem from '@/components/ui/cMessageItem.vue';

const chatStore = useChatStore();

const messages = computed(() => {
    let mess = chatStore.getMessages as Array<Message>;
    let currentId: number = -1;

    return mess.map((mes) => {
        mes.showUser = mes.user.id !== currentId;
        currentId = mes.user.id;

        return mes;
    });
});

onMounted(() => {
    chatStore.loadMessages();
});
</script>

<template>
    <perfect-scrollbar class="messages__list my-4 pr-4 scroll-inversion">
        <div v-for="message in messages" class="scroll-inversion">
            <c-message-item :message="message" />
        </div>
    </perfect-scrollbar>
</template>

<style lang="scss">
.messages__list {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.scroll-inversion {
    transform: scaleY(-1);
}
</style>
