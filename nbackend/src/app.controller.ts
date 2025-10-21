import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
@AllowAnonymous()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
