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
        title: notification.title,
        message: notification.message,
        directLink: notification.directLink,
        inviteUserName: userInvited.username,
        workspaceName: workspaceName,
      });
    }

    await this.mailService.sendWorkspaceInvitation(
      userInvited.email,
      workspaceName,
      inviteLink,
    );
  }
}
