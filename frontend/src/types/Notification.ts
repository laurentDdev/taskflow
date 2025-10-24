export enum NotificationStatus {
  UNREAD = "unread",
  READ = "read",
}

export type ReceivedNotification = {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  directLink?: string;
  inviteUserName: string;
  createdAt: Date;
};
