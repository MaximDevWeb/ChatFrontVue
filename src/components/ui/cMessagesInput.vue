<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import type { User } from '@/interfaces/auth';
import CIcon from '@/components/icons/cIcon.vue';
import { useChatStore } from '@/stores/chats';
import Http from '@/classes/Http';

const userStore = useUserStore();
const chatStore = useChatStore();

const message = ref<String>('');

const user = computed(() => {
    return userStore.getUser as User;
});

const sendMessage = (): void => {
    const data = {
        subject: chatStore.currentChat?.subject.contact_id,
        type: chatStore.currentChat?.type,
        text: message.value,
    };

    Http.inst.post('chat/manager', data).then(() => {
        console.log('Hello');
    });

    message.value = '';
};
</script>

<template>
    <div class="mess-input p-3 rounded-2xl" v-if="user.id">
        <img
            :src="user.avatar.link"
            :alt="user.login"
            class="mess-input__avatar"
        />

        <input
            type="text"
            placeholder="Ваше сообщение..."
            class="mess-input__input mx-4"
            v-model="message"
            @keypress.enter="sendMessage"
        />

        <div class="flex mr-4">
            <c-icon name="microphone" class="mess-input__icon" />
            <c-icon name="add_file" class="mess-input__icon" />
        </div>

        <div class="mess-input_send" @click="sendMessage">
            <c-icon name="send" class="mess-input__icon" />
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.mess-input {
    display: flex;
    background-color: variable.$gray;
}

.mess-input__avatar {
    flex: none;
    height: 34px;
    width: 34px;
    border-radius: 50%;
}

.mess-input__input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
}

.mess-input__icon {
    height: 32px;
    width: 32px;
    padding: 6px;
    color: variable.$black-white;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        color: variable.$yellow;
    }
}
</style>
