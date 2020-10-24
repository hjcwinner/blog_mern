import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types'

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : false,
    loading: true,
    user :null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
           return{
               ...state,
               ...payload,
               isAuthenticated : false,
               loading : false
           }
        case REGISTER_FAIL:
            return{
                ...state,
                token: null,
                isAuthenticated : false,
                loading : false
            }
        default:
            return state
    }
}

