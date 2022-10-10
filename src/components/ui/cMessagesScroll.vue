<script setup lang="ts">
/**
 * Компонент для обратного скроллинга чата
 */

import { computed, onUpdated, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useChatStore } from '@/stores/chats';

/**
 * Пареметры компонента
 * @param {Number} offsetTop - смещение для начала загрузки сообщений в px
 */
const props = defineProps({
    offsetTop: {
        type: Number,
        default: 20,
    },
});

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();

/**
 * Реактивные переменные
 * @var load - статус загрузки сообщений
 * @var scrollContent - ссылка на прокручиваемый div
 */
const load: Ref<Boolean> = ref(false);
const scrollContent: Ref<HTMLDivElement | null> = ref(null);

/**
 * Функция получения текущего чата
 * @return {Room} room
 */
const room = computed(() => chatStore.getRoom);

/**
 * Регистрируем обработчики событий
 */
const emit = defineEmits(['scrolledTop']);

/**
 * Функция подгрузки сообщений при прокрутке
 * @param {Event} e
 */
const scrollList = (e: Event): void => {
    const target = e.target as HTMLDivElement;
    const height: number =
        target.scrollHeight - target.offsetHeight - props.offsetTop;
    const scroll = Math.round(Math.abs(target.scrollTop));

    if (scroll >= height && !load.value) {
        load.value = true;
        emit('scrolledTop');
    }
};

/**
 * Обновляем статус загрузки при
 * добавлении новых сообщений
 */
onUpdated(() => {
    load.value = false;
});

/**
 * Следим за комнатой и обновляем
 * статус загрузки и прокручиваем чат вниз
 * при ее смене
 */
watch(room, () => {
    load.value = false;

    if (scrollContent.value) {
        scrollContent.value.scrollTop = 10000;
    }
});
</script>

<template>
    <div class="scroll__bar" ref="scrollContent" @scroll="scrollList">
        <div class="scroll__content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.scroll__bar {
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
}
</style>
