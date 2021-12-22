import { Module } from '@nestjs/common';
import { UploadImageController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
    imports: [MulterModule.register({
        storage: memoryStorage(), // use memory storage for having the buffer
    })],
    controllers: [UploadImageController],
    providers: [UploadService]
})
export class UploadModule { }
