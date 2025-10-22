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

  async sendWorkspaceInvitation(
    email: string,
    workspaceName: string,
    inviteLink: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Invitation to join workspace ${workspaceName}`,
      text: `Hello,\n\nYou have been invited to join the workspace ${workspaceName}. Please click on the following link to accept the invitation:\n\n${inviteLink}\n\nIf you did not request an invitation, please ignore this email.\n\nBest regards,\nYour App Team`,
    });
  }
}
