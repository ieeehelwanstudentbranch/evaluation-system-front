export const loadingHandler = (state, action) => {
    return {
        ...state,
        error: null,
        message: null,
        loading: true
    };
}

export const serverErrorHandler = (state, action) => {
    return {
        ...state,
        error: action.error,
        message: action.message,
        loading: false
    };
}