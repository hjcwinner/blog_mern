import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'


const Register = ({register}) => {

    const [ formData, setFormData ] = useState({
        name : "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = formData

    const onChange= e => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
        console.log(e.target.value)
    }

    const onSubmit= e => {
        e.preventDefault()
        if(password !== password2) {
            console.log('Password do not match')
        }
        else {
            register({ name, email, password })
             console.log(formData)
            // axios
            //     .post('/user/register', formData)
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err))
        }

    }

    return (
        <Fragment>
            
            <h1 className='large text-primary text-center'>Register</h1>
            <p className='lead text-center'><i className='fas fa-user' />Create Your Account</p>   
            <form className='form' onSubmit={e => onSubmit(e)} >
                <div className='form-group'>
                    <input 
                        type='text'
                        placeholder='Name'
                        required
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>  
                <div className='form-group'>
                    <input 
                        type='email'
                        placeholder='email'
                        required
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input 
                       type='password'
                       placeholder='password'
                       required
                       name='password'
                       value={password}
                       onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='password'
                        placeholder='password2'
                        required
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p>Already hare an account? <Link to='/login'>Login</Link></p>
        </Fragment>
    );
};

Register.propTypes = {
    register : PropTypes.func.isRequired
}

export default connect(
    null,
    { register }
)(Register);