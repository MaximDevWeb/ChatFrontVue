<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import { useConfirmStore } from '@/stores/confirm';
import { useContactsStore } from '@/stores/contacts';
import type { Contact } from '@/interfaces/contacts';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/stores/chats';

const confirmStore = useConfirmStore();
const contactStore = useContactsStore();
const chatStore = useChatStore();
const router = useRouter();

const props = defineProps<{
    item: Contact;
}>();

const deleteContact = () => {
    confirmStore.setConfirm({
        title: `Удалить ${props.item.login}?`,
        message: 'Подтвердите удаление контакта ',
        callback: deleteCallback,
    });
};

const deleteCallback = (): void => {
    contactStore.deleteContact(props.item);
};

const chatCreate = (): void => {
    chatStore.setCurrentChat({
        subject: props.item,
        type: 'personal',
    });
};
</script>

<template>
    <div class="contacts__item rounded-lg">
        <div class="contacts__avatar mr-3">
            <img :src="item.avatar" />
        </div>

        <div class="contacts__user">
            <p class="text-lg">{{ item.login }}</p>
            <p class="text-sm opacity-60">{{ item.full_name }}</p>
        </div>

        <div class="contacts__actions">
            <a href="#" @click.prevent="deleteContact">
                <c-icon
                    name="delete"
                    class="contacts__btn contacts__btn_delete"
                />
            </a>

            <a href="#" @click.prevent="chatCreate">
                <c-icon name="add-message" class="contacts__btn" />
            </a>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.contacts__item {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    transition: all 0.3s;

    &:hover {
        background-color: variable.$gray;

        .contacts__btn {
            opacity: 1;
        }
    }
}

.contacts__avatar {
    flex: none;
    width: 50px;
    height: 50px;
    border: 8px solid variable.$gray;
    background-color: variable.$gray;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
}

.contacts__user {
    width: 100%;
}

.contacts__actions {
    flex: none;
    display: flex;
    transition: all 0.3s;
}

.contacts__btn {
    padding: 6px;
    width: 32px;
    height: 32px;
    color: variable.$black-white;
    transition: all 0.3s;

    &:hover {
        color: white;
    }
}

.contacts__btn_delete {
    opacity: 0;
}
</style>
