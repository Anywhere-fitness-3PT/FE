import { 
    LOGIN_START, 
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../actions'

const initialState = {
    role: '',
    token: '',
    user: {},
    success: '',
    isFetching: false,
    error: ''
};

export const loginReducer = ( state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                isFetching: true
            };
        case LOGIN_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                isFetching: false,
                success: 'Login Success!',
                error: '',
                token: action.payload.token,
                role: action.payload.role,
                user: action.payload.user
            };
        case LOGIN_FAILURE:
            // console.log(action.payload)
            return {
                ...state,
                success: '',
                isFetching: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                success: '',
                error: '',
                role: '',
                token: '',
                user: {}
            };
        default:
            return state;
    }
};