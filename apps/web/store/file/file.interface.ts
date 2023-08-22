import { Action } from 'redux';
import { FILE } from './file.constant';

export interface FileUpload {
    name: string;
    type: string;
    size: number;
}
export interface FileAction extends Action<typeof FILE> {
    payload: FileState;
}

export type FileState = {
    files: FileUpload[];
};
