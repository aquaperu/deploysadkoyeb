import { Injectable } from '@nestjs/common';

export const configLoader = ()=>{
  return {
      
      mongo:{
          uri:process.env.MONGO_URI
      },
      jwt:process.env.JWT_SECRET
  }
}
@Injectable()
export class AppService {
  getHello(): string {
    const lo=configLoader
    return `la configuracion ${lo}`;
  }
}
