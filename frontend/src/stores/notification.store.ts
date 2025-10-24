import type {ReceivedNotification} from "@/types/Notification";
import {create} from "zustand";

type State = {
    notifications: ReceivedNotification[];
};

type Action = {
    addNotification: (notification: ReceivedNotification) => void;
    removeNotification: (id: string) => void;
    setNotifications: (notifications: ReceivedNotification[]) => void;
    clearNotifications: () => void;
    getUnreadNotificationsCount: () => number;

};

const useNotificationStore = create<State & Action>((set) => ({
    notifications: [],
    addNotification: (notification: ReceivedNotification) =>
        set((state) => ({
            ...state,
            notifications: [...state.notifications, notification],
        })),
    removeNotification: (id) =>
        set((state) => ({
            ...state,
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
    setNotifications: (notifications: ReceivedNotification[]) =>
        set((state) => ({...state, notifications})),

    clearNotifications: () => set((state) => ({...state, notifications: []})),
    getUnreadNotificationsCount: () => {
        const state = useNotificationStore.getState() as State;
        return state.notifications.reduce((acc, notification) => {
            if (notification.status === 'unread') {
                acc++;
            }
            return acc;
        }, 0);
    }
}));

export default useNotificationStore;
