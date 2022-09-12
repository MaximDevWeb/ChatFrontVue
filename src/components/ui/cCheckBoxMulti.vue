<script setup lang="ts">
/**
 * Компонент кастомного чекбокса
 * с выбором нескольких значений
 */

/**
 * Пареметры компонента
 * @param value {Message} - значение для чекбокса
 */
const props = defineProps({
    value: {
        required: true,
    },
});

/**
 * Регистрация обрабатываемых событий
 */
const emit = defineEmits(['change']);

/**
 * Функция генерирования события
 * выбора/сброса текущего чекбокса
 *
 * @param event {Event}
 */
const change = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    emit('change', {
        value: target.value,
        checked: target.checked,
    });
};
</script>

<template>
    <div class="checkbox-multi">
        <input
            :id="value"
            type="checkbox"
            :value="value"
            @change="change"
            class="input_hidden"
        />
        <label :for="value"></label>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.checkbox-multi {
    input {
        &:checked + label {
            &:after {
                opacity: 1;
            }
        }
    }

    label {
        position: relative;
        cursor: pointer;

        &:hover {
            &:before {
                border-color: variable.$blue;
            }
        }

        &:before,
        &:after {
            content: '';
            right: 0;
            top: calc(50% - 10px);
            position: absolute;
            border-radius: 0.5rem;
            height: 20px;
            width: 20px;
        }

        &:before {
            border: 1px solid variable.$black-white;
        }

        &:after {
            border: 1px solid variable.$blue;
            background-color: variable.$blue;
            background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 7L14.6093 13.4688C12.4732 16.0322 11.4051 17.3139 10 17.3139C8.59488 17.3139 7.52681 16.0322 5.39067 13.4688L4 11.8' stroke='%23fff' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A");
            background-size: contain;
            opacity: 0;
        }
    }
}
</style>
