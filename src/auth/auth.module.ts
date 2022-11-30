import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { VKStrategy } from './vk.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'sadsadJKJFDSJJjkdsjkfjkds',
      signOptions: { expiresIn: '31d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, VKStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
