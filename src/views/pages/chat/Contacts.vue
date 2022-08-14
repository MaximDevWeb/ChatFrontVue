<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import { computed, onMounted, ref } from 'vue';
import { useContactsStore } from '@/stores/contacts';
import CSearch from '@/components/ui/cSearch.vue';
import CContactItem from '@/components/ui/cContactItem.vue';
import type { Ref } from 'vue';
import type { Contact } from '@/interfaces/contacts';

const contactsStore = useContactsStore();

const search: Ref<string> = ref('');

const contacts = computed(() => {
    return contactsStore.getContacts as Array<Contact>;
});

onMounted(() => {
    contactsStore.loadContacts();
});
</script>

<template>
    <div class="contacts mt-6">
        <div class="block-head text-lg">
            <span class="block-head__text">Контакты</span>

            <div class="block-head__bts">
                <router-link to="/chat/contacts/add">
                    <c-icon name="user-add" class="block-head__btn" />
                </router-link>
            </div>
        </div>

        <div>
            <c-search v-model="search" />
        </div>

        <perfect-scrollbar class="contacts__result mt-4">
            <div class="grid gap-4 grid-cols-1" v-if="contacts.length">
                <c-contact-item
                    v-for="contact in contacts"
                    :key="contact.id"
                    :item="contact"
                />
            </div>

            <div v-else class="text-center">У Вас нет кантактов</div>
        </perfect-scrollbar>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.contacts {
    position: relative;
    height: 100%;
}
.contacts__result {
    position: absolute;
    bottom: 0;
    top: 80px;
    left: 0;
    right: 0;
}
</style>
