export interface Toast {
    title: string;
    message: string;
    type?: 'success' | 'danger' | 'warning';
    key?: string;
}
