export enum NotificationType {}
export interface NotificationEntity {
  toUsers: string[];
  title: string;
  message: string;
  data: {
    notificationId: string;
  };
  createdAt: string;
  updatedAt: string;
  id: string;
  isRead: boolean;
  type: NotificationType;
}
export interface RemoteNotificationEntity {
  data: {
    notificationId: string;
    type: NotificationType;
    fromUserId?: string;
    trackingId?: string;
  };
  from: string;
  messageId: string;
  notification: {
    body: string;
    title: string;
  };
}
