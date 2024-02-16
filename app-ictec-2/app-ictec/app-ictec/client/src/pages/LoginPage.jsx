import{useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../css/logo.png';
import '../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage(){
    const navigate = useNavigate();
    const [tokenAdded, setTokenAdded]= useState(false)
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();


    
    const {signin, isAuthenticated, errors: signinErrors} = useAuth();

    const onSubmit = handleSubmit(async data => {
        signin(data);
        console.log("entra aqui");
        setTokenAdded(true);
        
    });
      if (tokenAdded ) {
        navigate('/tasks');
      }

    return(
        <div className='container_login'>
            <div className='form-container'>
                {signinErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                        {error}
                    </div>
                ))}
                <form onSubmit={onSubmit}>
                <h1>Log In</h1>
                    <div className="logo" id="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <input 
                    type="email" 
                    {...register("email", {required:true})}
                    placeholder='email'
                    className='form-control-login'
                    />
                    {errors.email && (
                    <p className='text-red-500'> Email is required</p>
                    )}
                    <input type="password" {...register("password", {required:true})}
                    placeholder='password'
                    className='form-control-login'
                    />
                    {errors.password && (
                    <p className='text-red-500'> Password is required</p>
                    )}
                   <button className='login_btn'
                        type='submit'>
                            Login
                    </button>
                </form>
                <p>
                    Don't have an account? 
                    <Link to='/register'>
                    Sign up</Link>
                </p>
            </div>
        </div>
    )
}
export default LoginPage