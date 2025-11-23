import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // VULNERABILITY: Unrestricted Upload
            filename: (req, file, cb) => {
                // VULNERABILITY: No file type validation, keeping original extension
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    uploadFile(@UploadedFile() file: any) {
        return {
            filename: file.filename,
            path: file.path,
        };
    }

    @Post('extract')
    extractZip(@Body('filename') filename: string) {
        // VULNERABILITY: Zip Slip (VULN-068)
        // Simulating extraction where filenames in the zip can traverse paths (e.g. ../../evil.sh)
        // No validation on entry names during extraction
        return { message: `Extracted ${filename} (simulated)` };
    }
}
