import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserResetPassword(email: string, idReset: string) {
    const url = `${process.env.FRONTEND_URL}/auth/reset-password/${idReset}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password taskflow app',
      text: `Hello,\n\nYou have requested to reset your password. Please click on the following link to reset your password:\n\n${url}\n\nThis link will expire in 15 minutes.\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nYour App Team`,
    });
  }
}
