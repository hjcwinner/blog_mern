import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { register } from '../../actions/auth'

const Register = ({setAlert, register}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            console.log('Password do not match')
            setAlert('Password do not match', 'danger')
        }
        else{
            console.log(formData)
            // axios
            //     .post("/user/register", formData)
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err))
            register({ name, email, password })
        }

    }


    return (
       <Fragment>
                   <h1 className='large text-primary text-center'>
                        Sign up
                    </h1>
                    <p className='lead text-center'>
                        <i className='fas fa-user' /> Create Your Account
                    </p>
                    <form className='form' onSubmit={e => onSubmit(e)} >
                        <div className='form-group'>
                            <input 
                                type='text'
                                placeholder='Name'
                                
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input 
                                type='email'
                                placeholder='Email'
                                
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                            />
                            <small className='form data'>
                                This site uses Gravatar so if you want a profile image, use a Gravatar email
                            </small>
                        </div>
                        <div className='form-group'>
                            <input 
                                type='password'
                                placeholder='Password'
                                required
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                
                            />
                        </div>
                        <div className='form-group'>
                            <input 
                                type='password'
                                placeholder='Confirm Password'
                                required
                                name='password2'
                                value={password2}
                                onChange={e => onChange(e)}
    
                            />
                        </div>
                        <input type='submit' className='btn btn-primary' value='Register' />
                    </form>
                    <p className='my-1'>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
       </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register : PropTypes.func.isRequired
  };
  
  export default connect(
    null,
    { setAlert, register }
  )(Register);