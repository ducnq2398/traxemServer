import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { Readable } from 'stream';


@Injectable()
export class UploadService {
    constructor() {
        v2.config({
            cloud_name: 'ducnq4',
            api_key: '735792829633541',
            api_secret: 'hn_2ZrNHMTBsEuBIBdq4mgXwGSM'
        })
    }

    async uploadImage(
        file: FileUpload,
    ) {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve({ result: 1, data: result });
            });
            Readable.from(file.buffer).pipe(upload); // covert buffer to readable stream and pass to upload
        });
    }
}
