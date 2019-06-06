export const loadingHandler = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
}

export const serverErrorHandler = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
}