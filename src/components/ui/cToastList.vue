<script setup lang="ts">
import { useToastStore } from '@/stores/toast';
import CToast from '@/components/ui/cToast.vue';

const toastStore = useToastStore();
</script>

<template>
    <div class="toast">
        <div class="toast__list">
            <TransitionGroup name="toast-animate">
                <c-toast
                    v-for="toast in toastStore.getToasts"
                    :key="toast.key"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
    </div>
</template>

<style lang="scss">
.toast {
    position: fixed;
    width: 300px;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
}

.toast-animate-move,
.toast-animate-enter-active,
.toast-animate-leave-active {
    transition: all 0.5s ease;
}
.toast-animate-enter-from,
.toast-animate-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.toast-animate-leave-active {
    position: absolute;
}
</style>
