import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleDriveService } from './googledrivecasa/services/googledrive.service';
import { GooglespreadsheetxlsService } from './googledrivecasa/services/googlespreadsheetxls.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
}
