import {NotificationStatus, type ReceivedNotification} from "@/types/Notification";
import {create} from "zustand";
import notificationApi from "@/apis/notification.api.ts";

type State = {
    notifications: ReceivedNotification[];
};

type Action = {
    addNotification: (notification: ReceivedNotification) => void;
    removeNotification: (id: string) => void;
    setNotifications: (notifications: ReceivedNotification[]) => void;
    clearNotifications: () => void;
    getUnreadNotificationsCount: () => number;
    readRecentsNotification: (count: number) => void;

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
    },
    readRecentsNotification: (count: number) =>
        set((state) => {
            notificationApi
                .readRecentsNotification(count)
                .then((response) => {
                    console.log("Marked recent notifications as read", response);
                    const data = response as unknown as string[]

                    const updatedNotifications = state.notifications.map((notification) => {
                        if (data.includes(notification.id)) {
                            return {...notification, status: NotificationStatus.READ};
                        }
                        return notification;
                    });

                    set({notifications: updatedNotifications});
                })
                .catch((error) => {
                    console.error("Failed to mark notifications as read:", error);
                });

            return state;
        }),

}));

export default useNotificationStore;
