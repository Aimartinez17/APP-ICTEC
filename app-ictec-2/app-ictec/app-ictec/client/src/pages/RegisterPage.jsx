import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { registerRequest } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../css/logo.png';
import '../css/RegisterPage.css';

function RegisterPage(){

    const {
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return(
        <div className='container_signup'>
            <div className='form-container-signup'>
            {
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="logo" id="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <input type="text" {...register("username", {required:true})}
                placeholder='username'
                className='form-control-signup'
                />
                {errors.username && (
                <p className='text-red-500'> Username is required</p>
                )}
                <input type="email" {...register("email", {required:true})}
                placeholder='email'
                className='form-control-signup'
                />
                {errors.email && (
                <p className='text-red-500'> Email is required</p>
                )}
                <input type="password" {...register("password", {required:true})}
                placeholder='password'
                className='form-control-signup'
                />
                {errors.password && (
                <p className='text-red-500'> Password is required</p>
                )}
                <button
                        type='submit'>Register
                    </button>
            </form>
            <p>
                    Already have  an account? 
                    <Link to='/'>
                        Log in
                    </Link>
                </p>
        </div>
    </div>
    )
}
export default RegisterPage