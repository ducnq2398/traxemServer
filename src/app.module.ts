import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ducnq:quangduc0203@mern-learning.iixiu.mongodb.net/traxem?retryWrites=true&w=majority'), UserModule, AuthModule, UploadModule],
  providers: [UploadService],
})
export class AppModule { }
