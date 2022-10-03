<script setup lang="ts">
/**
 * Компонент для отображения
 * времени записи сообщения
 */
import { reactive, watch } from 'vue';
import { DateTime, Interval } from 'luxon';
import type { Timer } from '@/interfaces/caht';
import Helper from '@/classes/Helper';

/**
 * Пареметры компонента
 * @param recording {boolean} - состояние записи
 */
const props = defineProps({
    recording: {
        type: Boolean,
        default: false,
    },
});

/**
 * Переменная для вывода показаний счетчика
 */
const timer: Timer = reactive({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
});

/**
 * Переменная для сброса интервала
 */
let intervalId: number = 0;

/**
 * Следим за изменением параметра
 * и запускаем/останавливаем счетчик
 */
watch(props, (): void => {
    if (props.recording) {
        startTimer();
    } else {
        stopTimer();
    }
});

/**
 * Функция для запуска счетчика
 */
const startTimer = (): void => {
    const startTime = DateTime.now();

    intervalId = setInterval(() => {
        const currentTime = DateTime.now();

        const dur = Interval.fromDateTimes(startTime, currentTime).toDuration([
            'minute',
            'second',
            'millisecond',
        ]);

        timer.minutes = dur.minutes;
        timer.seconds = dur.seconds;
        timer.milliseconds = Math.floor(dur.milliseconds / 10);
    }, 10);
};

/**
 * Функция для остановки счетчика
 */
const stopTimer = (): void => {
    clearInterval(intervalId);

    timer.minutes = 0;
    timer.seconds = 0;
    timer.milliseconds = 0;
};
</script>

<template>
    <div class="rec-timer text-sm mr-2">
        <div class="rec-timer__item">
            {{ Helper.String.padNullStart(timer.minutes) }}
        </div>
        :
        <div class="rec-timer__item">
            {{ Helper.String.padNullStart(timer.seconds) }}
        </div>
        :
        <div class="rec-timer__item">
            {{ Helper.String.padNullStart(timer.milliseconds) }}
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.rec-timer {
    display: flex;
    align-items: center;
    background-color: variable.$black;
    padding: 0.25rem 0.75rem;
    color: white;
    border-radius: 32px;
}

.rec-timer__item {
    width: 24px;
    text-align: center;
}
</style>
