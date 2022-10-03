<script setup lang="ts">
/**
 * Компонент для отображения
 * голосового сообщения
 */

import type { Message } from '@/interfaces/caht';
import CIcon from '@/components/icons/cIcon.vue';
import WaveSurfer from 'wavesurfer.js';
import { onMounted, ref } from 'vue';
import Helper from '@/classes/Helper';

/**
 * Пареметры компонента
 * @param {Message} message - данные чата
 */
const props = defineProps<{
    message: Message;
    my: boolean;
}>();

/**
 * Перерменные для работы
 * проигрователя
 */
let waveSurfer: WaveSurfer;
const loaded = ref(false);
const translate = ref(0);
const timer = ref('00:00');

/**
 * Инициируем экземпляр плеера при загрузке
 */
onMounted(() => {
    waveSurfer = WaveSurfer.create({
        barWidth: 2,
        barMinHeight: 1,
        barRadius: 2,
        cursorWidth: 1,
        cursorColor: '#ffffff',
        container: `#message-player-${props.message.file.id}`,
        backend: 'WebAudio',
        height: 32,
        progressColor: '#ffde6b',
        responsive: true,
        waveColor: '#ffffff',
    });

    waveSurfer.on('finish', () => {
        waveSurfer.stop();
        translate.value = -60;
        renderTimer();
    });

    waveSurfer.on('ready', () => {
        loaded.value = true;
        translate.value = -60;
        renderTimer();
    });

    waveSurfer.on('audioprocess', () => {
        renderTimer();
    });
});

/**
 * Начало воспроизведения
 * голосового сообщения
 */
const play = () => {
    waveSurfer.play();
    translate.value = -90;
};

/**
 * Пауза воспроизведения
 * голосового сообщения
 */
const pause = () => {
    waveSurfer.pause();
    translate.value = -60;
};

/**
 * Загрузка голосового сообщения
 * перед воспроизведением
 */
const download = () => {
    waveSurfer.load(props.message.file.link);
    translate.value = -30;
};

const renderTimer = () => {
    const time = Math.round(
        waveSurfer.getDuration() - waveSurfer.getCurrentTime()
    );

    let timerStr = Helper.String.padNullStart(Math.floor(time / 60));
    timerStr += ':';
    timerStr += Helper.String.padNullStart(time % 60);

    timer.value = timerStr;
};
</script>

<template>
    <div class="message-player pr-2">
        <div class="message-player__buttons mr-3">
            <div
                class="message-player__stage"
                :style="{ transform: `translateY(${translate}px)` }"
            >
                <c-icon
                    name="down"
                    class="message-player__button"
                    @click="download"
                />

                <c-icon name="load" class="message-player__button rotate" />

                <c-icon
                    name="play"
                    class="message-player__button"
                    @click="play"
                />

                <c-icon
                    name="pause"
                    class="message-player__button"
                    @click="pause"
                />
            </div>
        </div>

        <div class="relative">
            <div
                :id="`message-player-${message.file.id}`"
                class="message-player__timeline"
                :class="{ invisible: !loaded }"
            ></div>

            <div class="message-player__preload" :class="{ invisible: loaded }">
                Голосовое сообщение
            </div>
        </div>

        <div
            class="message-player__timer text-sm ml-2"
            :class="{ invisible: !loaded }"
        >
            {{ timer }}
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.message-player {
    display: flex;
    align-items: center;
}

.message-player__buttons {
    cursor: pointer;
    overflow: hidden;
    height: 30px;
    width: 30px;
    position: relative;
}

.message-player__stage {
    transition: transform 0.3s;
}

.message-player__button {
    height: 30px;
    width: 30px;
    padding: 6px;
    border: 1px solid white;
    border-radius: 50%;
}

.message-player__timeline {
    width: 200px;
    transition: all 0.5s;
}

.message-player__preload {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
}

.message-player__timer {
    width: 40px;
    text-align: center;
    transition: all 0.5s;
}
</style>
