export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

function fetchDatasPending() {
    return {
        type: FETCH_DATA_PENDING
    }
}

function fetchDatasSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS
        data: data
    }
}
function fetchDatasError(error) {
    return {
        type: FETCH_DATA_ERROR
        error: error
    }
}
