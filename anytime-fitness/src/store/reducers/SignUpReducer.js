import { 
    FETCH_START, 
    FETCH_SUCCESS,
    FETCH_FAILURE
} from '../actions'

const initialState = {
  success: '',
  isFetching: false,
  error: ''
};

export const signUpReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                isFetching: false,
                success: action.payload,
                error: ''
            };
        case FETCH_FAILURE:
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