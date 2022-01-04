type NotificationType = {
  [params: string]: string;
};
export const NotificationTitle: NotificationType = {
  pwdNotify: '账户密码',
  systemNotify: '系统消息',
  taskNotify: '待办任务',
};
export const Notificationdescription: NotificationType = {
  pwdNotify: '其他用户的消息将以站内信的形式通知',
  systemNotify: '系统消息将以站内信的形式通知',
  taskNotify: '待办任务将以站内信的形式通知',
};
