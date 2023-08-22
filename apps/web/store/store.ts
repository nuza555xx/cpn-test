import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FileState } from './file/file.interface';
import fileReducer from './file/file.reducer';

export interface RootState {
    files: FileState;
}

const rootReducer = combineReducers({
    files: fileReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
