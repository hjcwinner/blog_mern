import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, USER_LOADED, AUTH_ERROR } from '../actions/types'

const initialState = {
    isAuthenticated : false,
    loading : false,
    user : null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated : false,
                loading : false
            }
        case LOGIN_SUCCESS :
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false
            }
        case USER_LOADED :
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user: payload
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated : false,
                loading : false
            }
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated : false,
                loading : false
            }
        
        default : 
            return state
    }
}