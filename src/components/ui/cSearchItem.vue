<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import { useToastStore } from '@/stores/toast';
import Http from '@/classes/Http';
import { ref } from 'vue';

const toastStore = useToastStore();

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const addBtn = ref<HTMLBaseElement | null>(null);
const added = ref<boolean>(false);

const addContact = () => {
    addBtn.value?.classList.add('flicker');

    Http.inst
        .post('chat/contacts', { contact_id: props.item.user_id })
        .then(() => {
            addBtn.value?.classList.remove('flicker');
            added.value = true;

            toastStore.addToast({
                title: 'Контакт добавлен',
                message: props.item.full_name + ' добавлен в контакты',
            });
        });
};
</script>

<template>
    <div class="contacts-add__item rounded-lg">
        <div class="contacts-add__avatar mr-3">
            <img :src="item.avatar.link" />
        </div>

        <div class="contacts-add__user">
            <p class="text-lg">{{ item.login }}</p>
            <p class="text-sm opacity-60">{{ item.full_name }}</p>
        </div>

        <div class="contacts-add__actions">
            <a v-if="added" href="#">
                <c-icon name="check" class="contacts-add__check" />
            </a>

            <a v-else href="#" @click.prevent="addContact" ref="addBtn">
                <c-icon name="add" class="contacts-add__btn" />
            </a>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.contacts-add__item {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    transition: all 0.3s;

    &:hover {
        background-color: variable.$gray;

        .contacts-add__actions {
            opacity: 1;
        }
    }
}

.contacts-add__avatar {
    flex: none;
    width: 60px;
    height: 60px;
    border: 8px solid variable.$gray;
    background-color: variable.$gray;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
}

.contacts-add__user {
    width: 100%;
}

.contacts-add__actions {
    flex: none;
    opacity: 0;
    transition: all 0.3s;
}

.contacts-add__btn {
    padding: 8px;
    width: 40px;
    height: 40px;
    color: variable.$black-white;
    transition: all 0.3s;

    &:hover {
        color: white;
    }
}

.contacts-add__check {
    pointer-events: none;
    padding: 8px;
    width: 40px;
    height: 40px;
    color: variable.$black-white;
}
</style>
