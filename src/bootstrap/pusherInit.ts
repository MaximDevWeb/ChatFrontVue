import PusherSocket from '@/classes/PusherSocket';
import { useToastStore } from '@/stores/toast';
import type { User } from '@/interfaces/auth';
import Http from '@/classes/Http';

export const pusherInit = (user: User) => {
    const pusher = PusherSocket.inst;
    const toastStore = useToastStore();

    pusher.connection.bind('connected', () => {
        Http.inst.defaults.headers.common['X-Socket-ID'] =
            pusher.connection.socket_id;
    });

    /**
     * Обработка общих для всех
     * страниц событий
     */

    // Обработка событий для контактов
    const channel = pusher.subscribe('contacts');

    channel.bind('contacts.created.' + user.id, function (data: any) {
        toastStore.addToast({
            title: 'Событие контакты',
            message: data.message,
        });
    });
};
