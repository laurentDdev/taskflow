import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../generated/prisma';
import { MailService } from './mail/mail.service';
import { IncomingHttpHeaders } from 'http';

const prisma = new PrismaClient();
export const getBetterAuthOptions = (mailService: MailService) =>
  betterAuth({
    user: {
      modelName: 'User',
      fields: {
        name: 'username',
        image: 'avatar',
      },
    },
    trustedOrigins: ['http://localhost:5173'],
    database: prismaAdapter(prisma, {
      provider: 'mysql',
    }),
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url, token }) => {
        await mailService.sendUserResetPassword(user.email, token);
      },
    },

    hooks: {},
    basePath: '/api/auth',
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        redirectURI: process.env.GITHUB_REDIRECT_URI as string,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirectURI: process.env.GOOGLE_REDIRECT_URI as string,
      },
    },
  });

export const convertHeaders = (headersReceived: IncomingHttpHeaders): any => {
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(headersReceived)) {
    if (value) {
      headers[key] = Array.isArray(value) ? value.join(',') : value;
    }
  }
};
