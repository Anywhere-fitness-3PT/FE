import { 
    CREATE_START, 
    CREATE_SUCCESS,
    CREATE_FAILURE
} from '../actions'

const initialState = {
    success: '',
    isFetching: false,
    error: ''
};

export const createReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case CREATE_START:
            return {
                ...state,
                isFetching: true
            };
        case CREATE_SUCCESS:
            // console.log('setting classes',action.payload)
            return {
                ...state,
                success: action.payload,
                isFetching: false,
                error: '',
            };
        case CREATE_FAILURE:
            // console.log(action.payload)
            return {
                ...state,
                success: '',
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};