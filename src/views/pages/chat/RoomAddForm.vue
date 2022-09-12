<script setup lang="ts">
/**
 * Компонент формы для создания
 * группового чата
 */

import CIcon from '@/components/icons/cIcon.vue';
import CAvatarGroupEditor from '@/components/ui/cAvatarGroupEditor.vue';
import CEditable from '@/components/ui/cEditable.vue';
import { reactive } from 'vue';
import type { FormChatGroup } from '@/interfaces/form';
import CButton from '@/components/ui/cButton.vue';
import CContactGroup from '@/components/ui/cContactGroup.vue';
import { useChatStore } from '@/stores/chats';
import { useRouter } from 'vue-router';

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();
const router = useRouter();

/**
 * Реактивная переменная со
 * значениями формы
 */
const form: FormChatGroup = reactive({
    avatar: null,
    name: '',
    participants: [],
});

/**
 * Функция обработки события
 * изменения аватара. Записываем новый файл
 * в переменную формы
 *
 * @param file {File}
 */
const changeAvatar = (file: File): void => {
    form.avatar = file;
};

/**
 * Функция обработки события изменения
 * списка участников чата
 *
 * @param participants {Array<number>}
 */
const changeParticipants = (participants: Array<number>): void => {
    form.participants = participants;
};

/**
 * Функция создания нового
 * группового чата
 */
const createRoom = (): void => {
    chatStore.createGroupRoom(form).then(() => {
        router.push('/chat');
    });
};
</script>

<template>
    <div class="room-form mt-4">
        <div class="block-head text-lg">
            <span class="block-head__text">Создание группового чата</span>

            <div class="block-head__bts">
                <router-link to="/chat">
                    <c-icon name="close" class="block-head__btn" />
                </router-link>
            </div>
        </div>

        <div class="mt-6 room-form__wrap">
            <c-avatar-group-editor @change="changeAvatar" />

            <div>
                <p class="room-form__label mt-2">Название группы</p>
                <c-editable v-model="form.name" />
            </div>

            <perfect-scrollbar class="contact-group__wrap mt-4">
                <c-contact-group @change="changeParticipants" />
            </perfect-scrollbar>

            <div class="mt-4">
                <c-button type="primary" @click="createRoom">Создать</c-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.room-form__label {
    font-size: 0.75rem;
    padding-left: 0.5rem;
    color: variable.$yellow;
    transform: translateY(4px);
}

.room-form {
    position: relative;
    height: 100%;
}

.room-form__wrap {
    position: absolute;
    left: 0;
    top: 80px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
}

.contact-group__wrap {
    height: 100%;
}
</style>
