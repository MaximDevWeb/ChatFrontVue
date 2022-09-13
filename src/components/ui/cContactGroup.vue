<script setup lang="ts">
/**
 * Компонент для вывода контактов
 * с возможность выбора для создания
 * группового чата
 */

import { useContactsStore } from '@/stores/contacts';
import { computed, onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { Contact } from '@/interfaces/contacts';
import CCheckBoxMulti from '@/components/ui/cCheckBoxMulti.vue';
import type { FormCheckBoxMulti } from '@/interfaces/form';
import _ from 'lodash';

/**
 * Загрузка состояний
 */
const contactsStore = useContactsStore();

/**
 * Регистрация обрабатываемых событий
 */
const emit = defineEmits(['change']);

/**
 * Создание реактивных переменных
 */
const participants: Ref<number[]> = ref([]);

/**
 * Получаем текущий список контактов пользователя
 */
const contacts = computed(() => {
    return contactsStore.getContacts as Array<Contact>;
});

/**
 * Функция обработки события изменения
 * в выборе контактов для группового чата
 * и генерация события изменения этого списка
 *
 * @param data {FormCheckBoxMulti}
 */
const change = (data: FormCheckBoxMulti): void => {
    if (data.checked) {
        participants.value.push(data.value);
    } else {
        _.remove(participants.value, (o) => o === data.value);
    }

    emit('change', participants.value);
};

/**
 * ВЫзываем загрузку контактов при отрисовке
 */
onMounted(() => {
    contactsStore.loadContacts();
});
</script>

<template>
    <div class="grid gap-2 grid-cols-1">
        <div
            class="contact-group__item rounded-lg"
            v-for="contact in contacts"
            :key="contact.id"
        >
            <div class="contact-group__avatar mr-3">
                <img :src="contact.avatar" :alt="contact.full_name" />
            </div>

            <div class="contact-group__info">
                <p class="text-lg">{{ contact.login }}</p>
                <p class="text-sm opacity-60">{{ contact.full_name }}</p>
            </div>

            <div class="mr-3">
                <c-check-box-multi
                    :value="contact.contact_id"
                    @change="change"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.contact-group__item {
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0.25rem;

    &:hover {
        background-color: variable.$light-gray;
    }
}

.contact-group__avatar {
    flex: none;
    width: 50px;
    height: 50px;
    border: 8px solid variable.$light-gray;
    background-color: variable.$light-gray;
    border-radius: 50%;
    overflow: hidden;
}

.contact-group__info {
    width: 100%;
}

.contact-group__checkbox {
}
</style>
