import { apiURL } from "../../utils/constants";

export const GET_ARTICLES_REQUEST = 'ARTICLES::GET_ARTICLES_REQUEST';
export const GET_ARTICLES_SUCCESS = 'ARTICLES::GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILURE = 'ARTICLES::GET_ARTICLES_FAILURE';

export const getArticlesRequest = () => ({
    type: GET_ARTICLES_REQUEST,
});

export const getArticlesSuccess = (data) => ({
    type: GET_ARTICLES_SUCCESS,
    payload: data,
});

export const getArticlesError = (error) => ({
    type: GET_ARTICLES_FAILURE,
    payload: error,
});

export const getArticles = () => async dispatch => {
    try {
        dispatch(getArticlesRequest());
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new  Error (`Response failed with status ${response.status}`);
        }
        const result = await response.json();
        dispatch(getArticlesSuccess(result))
    } catch (err) {
        dispatch(getArticlesError(err.message))
    }
};
