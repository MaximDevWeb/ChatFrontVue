<script setup lang="ts">
import CMessagesHeader from '@/components/ui/cMessagesHeader.vue';
import CMessagesInput from '@/components/ui/cMessagesInput.vue';
import CMessagesList from '@/components/ui/cMessagesList.vue';
</script>

<template>
    <div class="messages">
        <c-messages-header />
    </div>
</template>

<style lang="scss">
.messages {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
