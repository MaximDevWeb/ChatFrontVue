<script setup lang="ts">
/**
 * Компонент для скачивания файлов
 */

import CIcon from '@/components/icons/cIcon.vue';
import type { FileMessage } from '@/interfaces/file';
import { ref } from 'vue';
import type { Ref } from 'vue';

/**
 * Пареметры компонента
 * @param {FileMessage} file - данные чата
 */
const props = defineProps<{
    file: FileMessage;
}>();

/**
 * Переменная процесса загрузки
 */
const progress: Ref<number> = ref(0);

/**
 * Метод скачивания файла
 */
const download = () => {
    const request = new XMLHttpRequest();

    request.responseType = 'blob';
    request.open('get', props.file.link, true);
    request.send();

    request.onreadystatechange = (): void => {
        if (request.readyState == 4 && request.status == 200) {
            const file = window.URL.createObjectURL(request.response);

            const anchor = document.createElement('a');
            anchor.href = file;
            anchor.download = props.file.original_name;
            document.body.appendChild(anchor);

            anchor.click();

            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(file);

            setTimeout(() => (progress.value = 0), 2000);
        }
    };

    request.onprogress = (e) => {
        if (e.total) {
            progress.value = Math.floor((e.loaded / e.total) * 100);
        } else {
            progress.value = 100;
        }
    };
};
</script>

<template>
    <div class="download" :class="{ download_active: progress }">
        <div class="download__button">
            <c-icon name="download" class="option__item" @click="download" />
        </div>
        <div class="download__progress">{{ progress }}%</div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.download {
    width: 32px;
    height: 28px;
    overflow: hidden;

    & > div {
        transition: transform 0.3s;
    }
}

.download_active {
    & > div {
        transform: translateY(-28px);
    }
}

.download__progress {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 28px;
    font-size: 0.875rem;
    color: variable.$yellow;
}
</style>
