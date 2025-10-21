import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './workspace.validator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkspaceService {
  constructor(private prismaService: PrismaService) {}

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

    console.log("Found workspaces:", workspaces);

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
}
