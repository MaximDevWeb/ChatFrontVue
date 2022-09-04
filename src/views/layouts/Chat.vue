<script setup lang="ts">
import CToastList from '@/components/ui/cToastList.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import CMenu from '@/components/ui/cMenu.vue';
import CUser from '@/components/ui/cUser.vue';
import { pusherInit } from '@/bootstrap/pusherInit';
import Http from '@/classes/Http';
import CConfirm from '@/components/ui/cConfirm.vue';
import CMessagesBox from '@/components/ui/cMessagesBox.vue';
import { useChatStore } from '@/stores/chats';
import CMessagesBoxEmpty from '@/components/ui/cMessagesBoxEmpty.vue';

const userStore = useUserStore();
const chatStore = useChatStore();
const router = useRouter();

const room = computed(() => {
    return chatStore.getRoom;
});

const authLoad = (): void => {
    if (userStore.isAuth()) {
        Http.inst
            .get('auth/user')
            .then((response) => {
                userStore.setUser(response.data.user);
                pusherInit(response.data.user);
            })
            .catch(() => {
                router.push('/auth');
            });
    } else {
        router.push('/auth');
    }
};

onMounted((): void => {
    authLoad();
});
</script>

<template>
    <c-toast-list />
    <c-confirm />

    <div class="chat container mx-auto h-screen p-4 relative">
        <c-menu />

        <div class="edits">
            <c-user />

            <router-view></router-view>
        </div>

        <div class="chats">
            <c-messages-box v-if="room" />
            <c-messages-box-empty v-else />
        </div>

        <div class="options"></div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.edits {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 1rem;
    bottom: 1rem;
    left: 5.5rem;
    width: 340px;
    padding-right: 2rem;
    border-right: 1px solid variable.$light-gray;
}

.chats {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: calc(340px + 5.5rem);
    right: 0;
    padding: 0 2rem;
}
</style>
