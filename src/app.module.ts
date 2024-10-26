import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './src/config/.env' }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    AuthModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
