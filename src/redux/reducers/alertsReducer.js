const initialState = {
    loading: false
};

export const alertsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};