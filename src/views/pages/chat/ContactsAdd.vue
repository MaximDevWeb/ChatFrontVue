<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import CSearch from '@/components/ui/cSearch.vue';
import _ from 'lodash';
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { ContactSearch } from '@/interfaces/contacts';
import http from '@/bootstrap/http';
import { useToastStore } from '@/stores/toast';
import CSearchItem from '@/components/ui/cSearchItem.vue';

const toastStore = useToastStore();

const search: Ref<string> = ref('');
const contacts: Ref<Array<ContactSearch>> = ref([]);

const searchText = computed(() => {
    let result: string = '';

    if (search.value.length >= 3 && !contacts.value.length) {
        result = 'Кантакты не найдены';
    } else if (search.value.length < 3) {
        result = 'Начните ввод для поиска';
    }

    return result;
});

watch(search, async (value) => {
    if (value.length >= 3) {
        await searchFunc(value);
    }
});

const searchFunc = _.debounce((value: string) => {
    http.post('users/search', { search: value })
        .then((response) => {
            contacts.value = response.data.contacts;
        })
        .catch(() => {
            toastStore.addToast({
                title: 'Ошибка поиска',
                message: 'Что-то пошло не так, повторите попытку позже',
                type: 'warning',
            });
        });
}, 700);
</script>

<template>
    <div class="contacts-add mt-6">
        <div class="block-head text-lg">
            <span class="block-head__text">Поиск контактов</span>

            <div class="block-head__bts">
                <router-link to="/chat/contacts">
                    <c-icon name="close" class="block-head__btn" />
                </router-link>
            </div>
        </div>

        <div>
            <c-search v-model="search" />
        </div>

        <perfect-scrollbar class="contacts-add__result mt-4">
            <div
                v-if="contacts.length && search.length >= 3"
                class="grid gap-4 grid-cols-1"
            >
                <c-search-item
                    v-for="contact in contacts"
                    :key="contact.user_id"
                    :item="contact"
                />
            </div>

            <div v-else class="text-center">
                {{ searchText }}
            </div>
        </perfect-scrollbar>
    </div>
</template>

<style lang="scss">
.contacts-add {
    position: relative;
    height: 100%;
}
.contacts-add__result {
    position: absolute;
    bottom: 0;
    top: 80px;
    left: 0;
    right: 0;
}
</style>
