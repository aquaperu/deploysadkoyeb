import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { configLoader } from 'config-loader';
import { envSchema } from 'env-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GoogledrivecasaModule } from './googledrivecasa/googledrivecasa.module';
import { GoogleDriveConfig } from './googledrivecasa/types/googledriveconfig';
import { DocsModule } from './docs/docs.module';
import { DocsConfig } from './docs/types/docs.config';
//import { ObraModule } from './obra/obra.module';
//import { PresupuestoModule } from './presupuesto/presupuesto.module';
//import { ValorizacionModule } from './valorizacion/valorizacion.module';
//import { ObraModule } from './obra/obra.module';
//import { ValorizacionModule } from './valorizacion/valorizacion.module';
//import { PresupuestoModule } from './presupuesto/presupuesto.module';
import { fixPathAssets } from './shared/toolbox/fixPath';


@Module({
  imports: [
    ConfigModule.forRoot({
    load:[configLoader],
    validationSchema:envSchema
  }),
  //modulo de configuracion de la base de datos mongo con mongoose
  MongooseModule.forRootAsync({
    imports:[ConfigModule],
    inject: [ConfigService],

    useFactory:(configService:ConfigService)=> {
      const mongoConfig = configService.get("mongo")
      return {
          uri: mongoConfig.uri
        }
      }, 
    }),
  HttpModule,
  GoogledrivecasaModule.register({//el accouint es como servicio de google
    
    "type": process.env.TYPE,// configService.get<string>(""),// "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url":process.env.AUTH_PROVIDER_X509_CERT_URL ,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
    "universe_domain": process.env.UNIVERSE_DOMAIN
     
  }as GoogleDriveConfig,
  '1VDf6sK9Whc3SMwRgPMP9jl8KQ1b5lf7t',//carpeta base SAD
  ),
  DocsModule.register({
    //configuracion por defecto
    fontFile:fixPathAssets('AmoeraRegular.otf'),
    backgroundSeparatorFile:fixPathAssets('separadorv4.png'),
    headerIndexImageFileLeft:fixPathAssets('escudofermin.png'),
    headerIndexImageFileRight: fixPathAssets('escudo_pira.png'),
    
    headerIndexLineImageFile:fixPathAssets('linea.png'),
    footerIndexLineImageFile:fixPathAssets('footer.png'),

    headerFloatingPositionImageLeft:{horizontalPosition:{offset:950000},verticalPosition:{offset:275000},wrap:{side:"right",type:1}},
    
    headerFloatingPositionImageRight: {horizontalPosition:{offset:5900000},verticalPosition:{offset:275000},wrap:{side:"left",type:1}},
    
    headerFloatingPositionLineImageFile:{horizontalPosition:{offset:3700000},verticalPosition:{offset:-1900000},wrap:{side:"bothSides",type:2}},

    footerFloatingPositionLineImageFile:{horizontalPosition:{offset:3500},verticalPosition:{offset:3500},wrap:{side:"bothSides",type:2}}
  
  }as DocsConfig,

),
ConfigModule.forRoot(),
AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
