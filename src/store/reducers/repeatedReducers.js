export const loadingHandler = (state, action) => {
    return {
        ...state,
        message: null,
        error: null,
        loading: true
    };
}

export const SuccessHandler = (state, action) => {
    return {
        ...state,
        message: action.message,
        error: null,
        loading: false
    };
}

export const FailerHandler = (state, action) => {
    return {
        ...state,
        error: action.error,
        message: null,
        loading: false
    };
}

export const handleData = (state, action) => {
    return {
        ...state,
        data: action.data,
    };
}