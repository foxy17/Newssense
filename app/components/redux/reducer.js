import {FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR} from './action';

const initialState = {
    pending: false,
    data: [],
    error: null
}

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_DATA_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.payload
            }
        case FETCH_DATA_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export const getData = state => state.products;
export const getDataPending = state => state.pending;
export const getDataError = state => state.error;
