import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto, InviteUserDto } from './workspace.validator';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: string,
  ) {
    return this.prismaService.workspace.create({
      data: {
        name: createWorkspaceDto.name,
        description: createWorkspaceDto.description,
        owner_id: userId,
      },
    });
  }

  async findAll(userId: string) {
    console.log('Finding workspaces for user:', userId);

    const workspaces = await this.prismaService.workspace.findMany({
      where: {
        owner_id: userId,
      },
    });

    console.log('Found workspaces:', workspaces);

    return workspaces;
  }

  async findById(userId: string, workspaceId: string) {
    return this.prismaService.workspace.findFirst({
      where: {
        id: workspaceId,
        owner_id: userId,
      },
    });
  }

  async canGenerateInviteLink(userId: string, workspaceId: string) {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new HttpException(
        'inviteMembersCard.errors.not_found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (workspace.owner_id !== userId) {
      throw new HttpException(
        'inviteMembersCard.errors.not_owner',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }

  async generateWorkspaceInviteLink(workspaceId: string, senderId: string) {
    const inviteWorkspace = await this.prismaService.workspaceInvite.create({
      data: {
        workspaceId: workspaceId,
        userId: senderId,
      },
    });
    return `${process.env.FRONTEND_URL}/workspace/invite/${inviteWorkspace.id}`;
  }

  async inviteUserToWorkspace(
    inviteUserDto: InviteUserDto,
    senderId: string,
    workspaceId: string,
  ) {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        owner: true,
      },
    });

    if (workspace?.owner_id !== senderId) {
      throw new HttpException(
        'inviteMembersCard.errors.not_owner',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const invitedUser = await this.userService.getUserByEmail(
      inviteUserDto.email,
    );

    if (!invitedUser) {
      throw new HttpException(
        'inviteMembersCard.errors.user_not_found',
        HttpStatus.NOT_FOUND,
      );
    }

    const inviteLink = await this.generateWorkspaceInviteLink(
      workspaceId,
      senderId,
    );

    await this.notificationService.sendInviteWorkspaceInvite(
      workspace.owner,
      workspace.name,
      invitedUser,
      inviteLink,
    );

    return {
      message: 'success',
    };
  }
}
