import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './identity/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.17.0.7:27017/identity', { useNewUrlParser: true }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
