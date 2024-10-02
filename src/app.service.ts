import { Injectable } from '@nestjs/common';
import { configLoader } from 'config-loader';
import { envSchema } from 'env-schema';


@Injectable()
export class AppService {
  getHello(): string {
    const lo=configLoader
    return `la configuracion ${lo} y schema ${envSchema}`;
  }
}
