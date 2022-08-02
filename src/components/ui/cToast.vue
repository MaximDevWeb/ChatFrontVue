<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import { useToastStore } from '@/stores/toast';
import { onMounted } from 'vue';

const toastStore = useToastStore();

const props = defineProps({
    toast: {
        type: Object,
        require: true,
    },
});

onMounted(() => {
    setTimeout(() => {
        toastStore.removeToast(props.toast?.key);
    }, 5000);
});
</script>

<template>
    <div class="toast__item rounded-2xl" :class="'toast__item_' + toast.type">
        <div class="toast__header text-xl">
            {{ toast.title }}

            <a
                href="#"
                class="toast__close"
                @click="toastStore.removeToast(toast.key)"
            >
                <c-icon name="close" />
            </a>
        </div>
        <div class="toast__body text-sm mt-1">
            {{ toast.message }}
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.toast__item {
    margin-bottom: 1rem;
    padding: 0.75rem 1.5rem;
    width: 300px;
    overflow: hidden;
}

.toast__header {
    position: relative;
}

.toast__close {
    position: absolute;
    right: -0.5rem;
    top: 0;

    svg {
        height: 20px;
        width: 20px;
    }
}

.toast__body {
    color: variable.$black;
}

.toast__item_success {
    background-color: variable.$blue;
}

.toast__item_danger {
    background-color: variable.$red;
}

.toast__item_warning {
    background-color: variable.$orange;
}
</style>
