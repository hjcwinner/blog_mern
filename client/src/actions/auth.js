import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, USER_LOADED, AUTH_ERROR } from './types'
import setAuthToken from '../utils/setAuthToken'


///Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      const body = JSON.stringify({ name, email, password });
      console.log("::::::::::::::::::::", body)
    try{
        const res = await axios.post('/user/register', body, config)

        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        })
        console.log("??????????????????",res.data)
    }
    catch(err){
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(alert(error.msg)));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({ email, password});
    console.log(":::::::::;;;;;;;;;;;",body)

    try{
        const res = await axios.post('/user/login', body, config)

        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        })
        console.log(",,,,,,,,,,,,,,,,,,,,,", res.data)
    }
    catch(err){
        const errors = err.response.data.errors

        if(errors) {
            errors.forEach(err => dispatch(alert(err.msg)))
        }

        dispatch({
            type : LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({ type : LOG_OUT })
}

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('user/current')

        dispatch({
            type : USER_LOADED,
            payload: res.data
        })
    }
    catch(err) {
        dispatch({
            type : AUTH_ERROR
        })
    }
}
