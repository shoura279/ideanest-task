import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/model/user/user.repository';
import { AuthFactoryService } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/model/user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFactoryService, UserRepository, JwtService],
})
export class AuthModule {}
