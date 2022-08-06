<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

defineProps({
    modelValue: {
        type: String,
    },
    placeholder: {
        type: String,
        default: 'Не задано',
    },
});

const editor = ref() as Ref<HTMLBaseElement>;

const focusEditor = (): void => {
    editor.value.focus();

    const sel = window.getSelection();
    sel?.selectAllChildren(editor.value);
    sel?.collapseToEnd();
};

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="editable">
        <div
            class="editable__field rounded"
            contenteditable="true"
            ref="editor"
            @input="$emit('update:modelValue', $event.target.innerText)"
        >
            {{ modelValue ? modelValue : placeholder }}
        </div>

        <c-icon name="edit" class="editable__btn" @click="focusEditor" />
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.editable {
    position: relative;
}

.editable__btn {
    position: absolute;
    top: 1px;
    right: 1px;
    height: 30px;
    width: 30px;
    border: 6px solid #28292d;
    border-radius: 50%;
    background-color: #28292d;
    color: #43a0ff;
    cursor: pointer;
}

.editable__field {
    padding: 0.25rem 0.5rem;

    &:focus,
    &:active {
        outline: none;
        background-color: variable.$light-gray;
    }
}
</style>
