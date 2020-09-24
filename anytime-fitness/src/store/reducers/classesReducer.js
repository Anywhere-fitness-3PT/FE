import { 
    GET_CLASSES_START, 
    GET_CLASSES_SUCCESS,
    GET_CLASSES_FAILURE,
    LOGOUT,
} from '../actions'

const initialState = {
    classes: [],
    isFetching: false,
    error: ''
};

export const classesReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_CLASSES_START:
            return {
                ...state,
                isFetching: true
            };
        case GET_CLASSES_SUCCESS:
            // console.log('setting classes',action.payload)
            return {
                ...state,
                classes: action.payload,
                isFetching: false,
                error: '',
            };
        case GET_CLASSES_FAILURE:
            // console.log(action.payload)
            return {
                ...state,
                classes: [],
                isFetching: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                classes: []
            }
        default:
            return state;
    }
};