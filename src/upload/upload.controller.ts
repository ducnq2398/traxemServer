import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";

@Controller('api/v2/cdn/')
export class UploadImageController {
    constructor(private readonly uploadService: UploadService) { }

    @HttpCode(200)
    @Post("uploadImages")
    @UseInterceptors(
        FileInterceptor("files")
    )
    async uploadImage(@UploadedFile() file) {
        return this.uploadService.uploadImage(file)
    }
}