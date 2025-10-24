import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class NotificationService {
  constructor(
    private socketService: SocketService,
    private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async markRecentAsRead(userId: string, count: number) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        receiverId: userId,
        status: 'unread',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: count,
    });
    const notificationIds = notifications.map((n) => n.id);

    await this.prismaService.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        status: 'read',
      },
    });
    return notificationIds;
  }

  async findAll(userId: string) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications.map((notifications) => ({
      id: notifications.id,
      title: notifications.title,
      message: notifications.message,
      directLink: notifications.directLink,
      inviteUserName: notifications.sender.username,
      createdAt: notifications.createdAt,
      status: notifications.status,
    }));
  }

  async sendInviteWorkspaceInvite(
    workspaceUser: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      username: string;
      avatar: string | null;
    },
    workspaceName: string,
    userInvited: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      username: string;
      avatar: string | null;
    },
    inviteLink: string,
  ) {
    const notification = await this.prismaService.notification.create({
      data: {
        title: 'workspace.invite.title',
        message: 'workspace.invite.message',
        senderId: workspaceUser.id,
        receiverId: userInvited.id,
        directLink: inviteLink,
      },
    });

    const onlineUser = this.socketService.getClient(userInvited.id);
    if (onlineUser) {
      onlineUser.emit('receivedNotification', {
        id: notification.id,
        title: notification.title,
        message: notification.message,
        directLink: notification.directLink,
        inviteUserName: userInvited.username,
        createdAt: notification.createdAt,
        status: 'unread',
      });
    }

    await this.mailService.sendWorkspaceInvitation(
      userInvited.email,
      workspaceName,
      inviteLink,
    );
  }
}
