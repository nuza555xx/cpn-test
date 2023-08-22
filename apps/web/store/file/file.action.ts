import { FILE } from "./file.constant";
import { FileAction, FileState } from "./file.interface";

export const setFile = (file: FileState): FileAction => {
    return {
        type: FILE,
        payload: file,
    }

};

