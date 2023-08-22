import { AnyAction, Reducer } from 'redux';
import { FILE } from './file.constant';
import { FileState } from './file.interface';

const initialState: FileState = {
    files: []
};

const fileReducer: Reducer<FileState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case FILE:
            return {
                files: [
                    ...state.files,
                    ...(action.payload.files ?? []),
                ],
            };
        default:
            return state;
    }
};

export default fileReducer;
