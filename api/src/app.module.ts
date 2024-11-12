import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'ormconfig';
import { setEnv } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/Auth.module';
import { CoreModule } from './core/core.module';

setEnv();

@Module({
  imports: [
    AuthModule,
    CoreModule,
    TypeOrmModule?.forRoot({ ...typeOrmConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
