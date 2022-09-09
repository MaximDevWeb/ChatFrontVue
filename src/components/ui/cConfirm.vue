<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm';
import { computed } from 'vue';
import CButton from '@/components/ui/cButton.vue';
import type { Confirm } from '@/interfaces/confirm';

const confirmStore = useConfirmStore();

const confirm = computed(() => {
    return confirmStore.getConfirm as Confirm;
});

const confirmSubmit = (): void => {
    confirm.value?.callback();
};

const confirmCancel = (): void => {
    confirmStore.cleanConfirm();
};
</script>

<template>
    <transition name="fade">
        <div class="confirm" v-if="confirm">
            <div class="confirm__modal rounded-lg">
                <div class="confirm__title text-xl">
                    {{ confirm.title }}
                </div>

                <div class="confirm__message mt-2 mb-3 text-sm">
                    {{ confirm.message }}
                </div>

                <div class="confirm__buttons">
                    <c-button href="#" @click.prevent="confirmSubmit">
                        Подтвердить
                    </c-button>

                    <c-button
                        href="#"
                        class="ml-2"
                        type="danger"
                        @click.prevent="confirmCancel"
                    >
                        Отменить
                    </c-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.confirm {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirm__modal {
    width: 350px;
    padding: 0.75rem 1.5rem;
    background-color: variable.$gray;
}

.confirm__buttons {
    display: flex;
    justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
