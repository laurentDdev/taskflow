import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto, InviteUserDto } from './workspace.validator';
import { AuthGuard, AuthService } from '@thallesp/nestjs-better-auth';

@Controller('workspace')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private authService: AuthService,
  ) {
  }

  @Post('')
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Req() req: Request,
  ) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });
    return this.workspaceService.createWorkspace(
      createWorkspaceDto,
      session!.user.id,
    );
  }

  @Post(':inviteId/join')
  async joinWorkspaceByInviteLink(
    @Param('inviteId') inviteId: string,
    @Req() req: Request,
  ) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });
    return await this.workspaceService.joinWorkspaceByInviteLink(
      inviteId,
      session!.user.id,
    );
  }


  @Post(':id/invite')
  async inviteUserToWorkspace(
    @Body() inviteUserDto: InviteUserDto,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });
    return await this.workspaceService.inviteUserToWorkspace(
      inviteUserDto,
      session!.user.id,
      id,
    );
  }

  @Get(':id/generate-link')
  async generateWorkspaceInviteLink(
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });

    await this.workspaceService.canGenerateInviteLink(session!.user.id, id);

    return await this.workspaceService.generateWorkspaceInviteLink(
      id,
      session!.user.id,
    );
  }

  @Get('')
  async getWorkspace(@Req() req: Request) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });
    return this.workspaceService.findAll(session!.user.id);
  }

  @Get(':id')
  async getWorkspaceById(@Req() req: Request, @Param('id') id: string) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });
    return this.workspaceService.findById(session!.user.id, id);
  }
}
