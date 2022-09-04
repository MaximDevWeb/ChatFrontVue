<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, onMounted, ref } from 'vue';
import CIcon from '@/components/icons/cIcon.vue';
import CSearch from '@/components/ui/cSearch.vue';
import { useChatStore } from '@/stores/chats';
import type { Room } from '@/interfaces/caht';
import RoomItem from '@/components/ui/RoomItem.vue';

const chatsStore = useChatStore();
const search: Ref<string> = ref('');

const chats = computed(() => {
    return chatsStore.getRooms as Array<Room>;
});

onMounted(() => {
    chatsStore.loadRooms();
});
</script>

<template>
    <div class="messages mt-6">
        <div class="block-head text-lg">
            <span class="block-head__text">Сообщения</span>

            <div class="block-head__bts">
                <router-link to="/chat/contacts/add">
                    <c-icon name="new-chat" class="block-head__btn" />
                </router-link>
            </div>
        </div>

        <div>
            <c-search v-model="search" />
        </div>

        <perfect-scrollbar class="contacts__result mt-4" v-if="chats.length">
            <div class="grid gap-4 grid-cols-1">
                <room-item :room="chat" v-for="chat in chats" :key="chat.id" />
            </div>
        </perfect-scrollbar>

        <div v-else class="text-center mt-4">
            У Вас нет чатов.
            <router-link to="">Создать</router-link>
        </div>
    </div>
</template>

<style lang="scss">
.messages {
    position: relative;
    height: 100%;
}
</style>
