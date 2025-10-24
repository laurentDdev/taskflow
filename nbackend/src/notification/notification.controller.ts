import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthService } from '@thallesp/nestjs-better-auth';
import { NotificationService } from './notification.service';
import { ReadRecentsNotificationDto } from './notification.validator';

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

  @Post('read-recent')
  async readRecentNotifications(
    @Req() req: Request,
    @Body() readRecentsNotification: ReadRecentsNotificationDto,
  ) {
    const session = await this.authService.api.getSession({
      headers: req.headers,
    });
    return this.notificationService.markRecentAsRead(
      session!.user.id,
      readRecentsNotification.count,
    );
  }
}
