<script setup lang="ts">
import CIcon from '@/components/icons/cIcon.vue';
import http from '@/bootstrap/http';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import CLogo from '@/components/ui/cLogo.vue';

const userStore = useUserStore();
const router = useRouter();

const logOut = (): void => {
    http.get('auth/logout').then(() => {
        userStore.setToken('');
        userStore.setUser(null);
        router.push('/auth');
    });
};
</script>

<template>
    <div class="menu rounded-xl">
        <c-logo size="sm" class="menu__logo" />

        <div class="menu__list">
            <router-link to="/chat/contacts" class="menu__item">
                <c-icon name="contacts" />
            </router-link>

            <router-link to="/chat" class="menu__item">
                <c-icon name="messages" />
            </router-link>

            <router-link to="/chat/profile" class="menu__item">
                <c-icon name="profile" />
            </router-link>

            <router-link to="/chat/settings" class="menu__item">
                <c-icon name="setting" />
            </router-link>
        </div>

        <a href="#" class="menu__item" @click.prevent="logOut">
            <c-icon name="logout" />
        </a>
    </div>
</template>

<style lang="scss">
@use '../../assets/styles/variable';

.menu {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 1rem;
    width: 50px;
    background-color: variable.$dark-grey;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.menu__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.menu__logo {
    padding: 0.75rem;
}

.menu__item {
    padding: 0.75rem;
    opacity: 0.5;
    transition: all 0.3s;

    &:hover {
        opacity: 1;
    }

    svg {
        width: 22px;
        height: 22px;
    }
}

.router-link-exact-active {
    color: variable.$yellow;
    opacity: 1;
}
</style>
