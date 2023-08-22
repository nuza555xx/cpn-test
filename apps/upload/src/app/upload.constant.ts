import { diskStorage } from "multer";
import { extname, join } from "path";

export const MAX_SIZE_FILE = 1024 * 1024 * 20;

export const customStorage = diskStorage({
    destination: join(__dirname, `/uploads`),
    filename: (_, file, callback) => {
        callback(null, `${file.originalname}${extname(file.originalname)}`);
    },
});

export const MAILER_SERVICE_PROVIDER = 'MAILER_SERVICE_PROVIDER'