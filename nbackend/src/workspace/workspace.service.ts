import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto, InviteUserDto } from './workspace.validator';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';
import { WorkspaceRole } from 'src/common/enums/workspace-role';

@Injectable()
export class WorkspaceService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  async joinWorkspaceByInviteLink(inviteId: string, userId: string) {
    const invite = await this.prismaService.workspaceInvite.findUnique({
      where: {
        id: inviteId,
      },
    });

    if (!invite) {
      throw new HttpException(
        'workspace.invite.errors.invalid_link',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlreadyMember = await this.prismaService.workspaceMember.findFirst({
      where: { userId: userId, workspaceId: invite.workspaceId },
    });

    if (isAlreadyMember) {
      throw new HttpException(
        'workspace.invite.errors.already_member',
        HttpStatus.CONFLICT,
      );
    }

    const workspaceMember = await this.prismaService.workspaceMember.create({
      data: {
        userId: userId,
        workspaceId: invite.workspaceId,
      },
      include: {
        workspace: true,
        user: true,
      },
    });

    await this.prismaService.workspaceInvite.delete({
      where: {
        id: inviteId,
      },
    });

    return this.prismaService.workspace.findUnique({
      where: {
        id: workspaceMember.workspaceId,
      },
      include: {
        WorkspaceMember: true,
      },
    });
  }

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: string,
  ) {
    return this.prismaService.workspace.create({
      data: {
        name: createWorkspaceDto.name,
        description: createWorkspaceDto.description,
        WorkspaceMember: {
          create: {
            userId: userId,
            role: 'OWNER',
          },
        },
      },
      include: {
        WorkspaceMember: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prismaService.workspace.findMany({
      where: {
        WorkspaceMember: {
          some: { userId },
        },
      },
      include: {
        WorkspaceMember: true,
      },
    });
  }

  async findById(userId: string, workspaceId: string) {
    const userWithWorkspace = await this.prismaService.workspace.findUnique({
      where: {
        id: workspaceId,
        WorkspaceMember: {
          some: { userId },
        },
      },
      include: {
        WorkspaceMember: true,
      },
    });

    if (!userWithWorkspace) {
      throw new HttpException(
        'workspace.not_in_workspace',
        HttpStatus.BAD_REQUEST,
      );
    }

    return userWithWorkspace;
  }

  async canGenerateInviteLink(userId: string, workspaceId: string) {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        WorkspaceMember: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!workspace) {
      throw new HttpException(
        'inviteMembersCard.errors.not_found',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log(workspace);

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
    senderId: string, // L'utilisateur authentifié qui envoie l'invitation
    workspaceId: string,
  ) {
    const invitedEmail = inviteUserDto.email;

    const senderMembership = await this.prismaService.workspaceMember.findFirst(
      {
        where: {
          userId: senderId,
          workspaceId: workspaceId,
        },
        include: {
          user: true,
        },
      },
    );

    if (
      !senderMembership ||
      (senderMembership.role !== WorkspaceRole.OWNER &&
        senderMembership.role !== WorkspaceRole.ADMIN)
    ) {
      throw new HttpException(
        'inviteMembersCard.errors.not_owner',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 2. Vérification de l'Existence de l'Invité (et si déjà membre)
    const invitedUser = await this.userService.getUserByEmail(invitedEmail);

    if (!invitedUser) {
      throw new HttpException(
        'inviteMembersCard.errors.user_not_found',
        HttpStatus.NOT_FOUND,
      );
    }

    // Vérifie si l'utilisateur est déjà membre du workspace (Évite la duplication)
    const isAlreadyMember = await this.prismaService.workspaceMember.findFirst({
      where: { userId: invitedUser.id, workspaceId: workspaceId },
    });

    if (isAlreadyMember) {
      throw new HttpException(
        'inviteMembersCard.errors.already_member',
        HttpStatus.CONFLICT,
      );
    }

    // C'est l'étape essentielle pour que l'invitation soit valide.
    const invitation = await this.generateWorkspaceInviteLink(
      workspaceId,
      senderId,
    );

    // Récupère les données du workspace et de l'expéditeur pour l'email
    const workspaceDetails = await this.prismaService.workspace.findUnique({
      where: { id: workspaceId },
      select: { name: true },
    });

    if (!workspaceDetails) {
      throw new HttpException(
        'inviteMembersCard.errors.workspace_not_found',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.notificationService.sendInviteWorkspaceInvite(
      senderMembership!.user,
      workspaceDetails.name,
      invitedUser,
      invitation,
    );

    // 5. Réponse
    return {
      message: 'success',
    };
  }
}
