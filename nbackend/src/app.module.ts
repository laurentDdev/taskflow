import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { getBetterAuthOptions } from './auth';
import { PrismaService } from './prisma/prisma.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { WorkspaceController } from './workspace/workspace.controller';
import { WorkspaceService } from './workspace/workspace.service';

@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [MailModule],
      useFactory: (mailService: MailService) => ({
        auth: getBetterAuthOptions(mailService),
        disableGlobalAuthGuard: true,
      }),
      inject: [MailService],
    }),
    MailModule,
  ],
  controllers: [AppController, WorkspaceController],
  providers: [AppService, PrismaService, WorkspaceService],
})
export class AppModule {}
