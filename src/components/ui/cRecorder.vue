<script setup lang="ts">
/**
 * Компонент для воспроизведения
 * записи голосового сообщения перед
 * отправкой
 */

import { useRecorderStore } from '@/stores/recorder';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import CIcon from '@/components/icons/cIcon.vue';
import CRecorderPlayer from '@/components/ui/cRecorderPlayer.vue';
import CRecorderTimer from '@/components/ui/cRecorderTimer.vue';
import { useToastStore } from '@/stores/toast';

/**
 * Загрузка состояний
 */
const recorderStore = useRecorderStore();
const toastStore = useToastStore();

/**
 * Переменная статуса записи сообщения
 */
const recording: Ref<boolean> = ref(false);

/**
 * Переменная с записью
 * голосового сообщения
 */
const record = computed((): string => {
    return recorderStore.getRecordURL;
});

/**
 * Переменная для записи
 * медиа объекта
 */
const media: Ref<null | MediaRecorder> = ref(null);

/**
 * Функция начала записи
 */
const startRecord = () => {
    let blobArray: Array<Blob> = [];

    navigator.mediaDevices
        .getUserMedia({
            audio: true,
        })
        .then((stream) => {
            media.value = new MediaRecorder(stream);
            media.value.start();

            media.value.ondataavailable = (e) => {
                blobArray.push(e.data);
            };

            media.value.onstop = () => {
                const blob = new File(blobArray, 'record.webm', {
                    type: 'audio/mpeg',
                });
                blobArray = [];

                recorderStore.setRecord(blob);
            };

            recording.value = true;
        })
        .catch(() => {
            toastStore.addToast({
                title: 'Ошибка записи',
                message: 'Разрешите доступ приложению к микрофону',
                type: 'danger',
            });
        });
};

/**
 * Функция остановки записи
 */
const stopRecord = () => {
    media.value?.stop();
    recording.value = false;
};
</script>

<template>
    <div class="recorder">
        <div class="recorder__result">
            <c-recorder-player v-if="record" />
            <div class="recorder_empty" v-else>
                Нет записи. Нажмите
                <c-icon name="record" class="mess-input__icon" />
                для начала записи.
            </div>
        </div>

        <div class="recorder__option">
            <c-recorder-timer :recording="recording" />

            <div
                :class="{
                    recorder__icon_active: recording,
                    flicker: recording,
                }"
                class="recorder__icon mx-2"
            ></div>

            <div class="recorder__buttons">
                <c-icon
                    name="record"
                    class="mess-input__icon recorder__start"
                    :class="{ recorder__button_active: !recording }"
                    @click="startRecord"
                />
                <c-icon
                    name="record-stop"
                    class="mess-input__icon recorder__stop"
                    :class="{ recorder__button_active: recording }"
                    @click="stopRecord"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.recorder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.recorder__result {
    width: 100%;
}

.recorder__icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(white, 0.5);
}

.recorder__option {
    display: flex;
    align-items: center;
}

.recorder__icon_active {
    background-color: variable.$red;
}

.recorder_empty {
    display: flex;
    align-items: center;
}

.recorder__buttons {
    position: relative;
    overflow: hidden;
}

.recorder__stop,
.recorder__start {
    transition: transform 0.3s;
}

.recorder__stop {
    position: absolute;
    top: 0;
    transform: translateY(32px);
}

.recorder__start {
    transform: translateY(-32px);
}

.recorder__button_active {
    transform: translateY(0);
}
</style>
