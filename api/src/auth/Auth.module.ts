import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthServiceImpl } from './infra/services/Auth.service';
import { CoreModule } from 'src/core/core.module';
import { JwtModule } from '@nestjs/jwt';
import { setEnv } from 'config';

setEnv();

@Module({
  imports: [
    CoreModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
