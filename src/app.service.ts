import { Injectable } from '@nestjs/common';
import { configLoader } from 'config-loader';

@Injectable()
export class AppService {
  getHello(): string {
    const lo=configLoader
    return `la configuracion ${lo}`;
  }
}
