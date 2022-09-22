<script setup lang="ts">
/**
 * Компонент обертка для чата
 */

import CMessagesHeader from '@/components/ui/cMessagesHeader.vue';
import CMessagesInput from '@/components/ui/cMessagesInput.vue';
import CMessagesList from '@/components/ui/cMessagesList.vue';
import CRecorderBox from '@/components/ui/cRecorderBox.vue';
</script>

<template>
    <div class="messages">
        <c-messages-header />

        <c-messages-list />

        <div class="messages__inputs">
            <c-messages-input />
            <c-recorder-box />
        </div>
    </div>
</template>

<style lang="scss">
.messages {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.messages__inputs {
    position: relative;
    overflow: hidden;
    flex: none;
    height: 60px;
}
</style>
