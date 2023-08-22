import { FileUpload } from "./upload.interface";

export abstract class UploadService {
    abstract uploadFile(file: FileUpload): Promise<void>;
}