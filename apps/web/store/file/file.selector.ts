import { RootState } from "../store";

export const selectorFile = (state: RootState) => {
    return state.files?.files;
};
