import { Dispatch } from 'redux';
import axios, { AxiosRequestConfig } from 'axios';
import { requestAPI } from '@crashboy/utils';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

interface FetchDataRequestAction {
    type: typeof FETCH_DATA_REQUEST;
}

interface FetchDataSuccessAction {
    type: typeof FETCH_DATA_SUCCESS;
    payload: any; // Replace 'any' with the actual type of the API response
}

interface FetchDataFailureAction {
    type: typeof FETCH_DATA_FAILURE;
    error: string;
}

export type ApiActionTypes =
    | FetchDataRequestAction
    | FetchDataSuccessAction
    | FetchDataFailureAction;

export function fetchData<T>(configs: AxiosRequestConfig<any>) {
    return (dispatch: Dispatch<ApiActionTypes>) => {
        dispatch({ type: FETCH_DATA_REQUEST });
        requestAPI<T>(configs)
            .then((response) => {
                dispatch({ type: FETCH_DATA_SUCCESS, payload: response });
            })
            .catch((error) => {
                dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
            });
    };
}
