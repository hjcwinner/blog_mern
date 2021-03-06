import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'



const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData

    const onChange = e => {
        setFormData({...formData, [e.
            target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        axios
            .post("/user/login", formData)
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data.message))
    }

    return (
        <Fragment>
            <div className='container'>
                <div className='row'>
                   <div className='col-md-8 m-auto'>
                        <h1 className='large text-primary text-center'>
                           Login
                        </h1>
                        <p className='lead text-center'>
                         <i className='fas fa-user' /> Login
                        </p>
                         <form className='form' onSubmit={e => onSubmit(e)} >
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
                            <input type='submit' className='btn btn-primary' value='Login' />
                         </form>
                         <p className='my-1'>
                         no account? <Link to="/register">Register</Link>
                    </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;