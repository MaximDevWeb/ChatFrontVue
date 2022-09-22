<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useRecorderStore } from '@/stores/recorder';
import CIcon from '@/components/icons/cIcon.vue';

let recordStore = useRecorderStore();

let waveSurfer: WaveSurfer;
let played = ref(false);
let timer = ref('00:00');

onMounted(() => {
    waveSurfer = WaveSurfer.create({
        barWidth: 2,
        barMinHeight: 1,
        barRadius: 2,
        cursorWidth: 1,
        cursorColor: '#43a0ff',
        container: '#record-player',
        backend: 'WebAudio',
        height: 32,
        progressColor: '#43a0ff',
        responsive: true,
        waveColor: '#838383',
    });

    reloadRecord();
});

const reloadRecord = () => {
    waveSurfer.load(recordStore.getRecord);
};

const playRecord = () => {
    played.value = true;
    waveSurfer.play();
};

const stopRecord = () => {
    played.value = false;
    waveSurfer.pause();
};

const deleteRecord = () => {
    recordStore.setRecord('');
};

const renderTimer = () => {
    const time = Math.round(
        waveSurfer.getDuration() - waveSurfer.getCurrentTime()
    );

    let timerStr = padNullStart(Math.floor(time / 60));
    timerStr += ':';
    timerStr += padNullStart(time % 60);

    timer.value = timerStr;
};

/**
 * Функция добавления ведущего нуля
 *
 * @param value
 */
const padNullStart = (value: number): string => {
    const str: string = value.toString();
    return str.length < 2 ? '0' + str : str;
};

onMounted(() => {
    waveSurfer.on('audioprocess', () => {
        renderTimer();
    });

    waveSurfer.on('scroll', () => {
        renderTimer();
    });

    waveSurfer.on('finish', () => {
        waveSurfer.stop();
        played.value = false;
    });
});
</script>

<template>
    <div class="rec-player">
        <div id="record-player"></div>
        <div class="rec-player__timer ml-3 text-sm">{{ timer }}</div>
        <div class="rec-player__buttons ml-2">
            <c-icon
                name="record-play"
                class="mess-input__icon rec-player__play"
                :class="{ 'rec-player__btn_active': !played }"
                @click="playRecord"
            />
            <c-icon
                name="record-stop"
                class="mess-input__icon rec-player__pause"
                :class="{ 'rec-player__btn_active': played }"
                @click="stopRecord"
            />
            <c-icon
                name="delete"
                class="mess-input__icon"
                @click="deleteRecord"
            />
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.rec-player {
    display: flex;
    align-items: center;
}

.rec-player__timer {
    width: 40px;
    text-align: center;
}

.rec-player__buttons {
    position: relative;
    display: flex;
    overflow: hidden;
}

.rec-player__play,
.rec-player__pause {
    transition: transform 0.3s;
}

.rec-player__play {
    transform: translateY(-32px);
}

.rec-player__pause {
    position: absolute;
    transform: translateY(32px);
}

.rec-player__btn_active {
    transform: translateY(0);
}

#record-player {
    width: 70%;
}
</style>
