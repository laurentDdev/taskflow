import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthService } from '@thallesp/nestjs-better-auth';
import { NotificationService } from './notification.service';

@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {}

  @Get('')
  async findAll(@Req() req: Request) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });

    return this.notificationService.findAll(session!.user.id);
  }
}
