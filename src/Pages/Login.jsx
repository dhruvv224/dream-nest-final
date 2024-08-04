import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/Slice';
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
    // const  notify=()=>{
    //     toast.success('Registration successful', {
    //         position: 'top-center',
    //     });
    // }
    const[email,setEmail]=useState('');
    console.log(email)
    const[password,setPassword]=useState('')
    const loginStyle={
      backgroundImage: "url('/assets/login.jpg')",
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
try {
  const response=await axios.post('http://localhost:8000/api/auth/login',{email,password})
  
  const loggedIn=await response.data
  console.log(loggedIn)
  if(loggedIn)
    {
      dispatch(
        setUser({
          user:loggedIn.user,
          token:loggedIn.token
        })
      )
    }
  // toast.success('login succesful',{
  //   position:'top-center'
  // })
  localStorage.setItem('token', loggedIn.token);
            toast.success('Login successful', {
                position: 'top-center',
            });
 
            console.log('login successful', loggedIn);
            navigate('/')
} catch (error) {
  console.log("login failed",error.message)
  toast.error('Login failed',error.message,{
    position:'top-center'

  })
  
}
    }
  return (
    <div className='mx-auto'>
      <Toaster/>
      <div className='login-container flex content-center items-center h-[100vh]' style={loginStyle}>
        <div className='md:max-w-[1200px] max-w-[400px] mx-auto'> 
            <div className='p-8 rounded-3xl bg-black bg-opacity-50'>
            <h2 className="text-white text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='email'  onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Passsword" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='email'  onChange={(e)=>setPassword(e.target.value)} />
            <button className='bg-red-500 hover:bg-red-600 duration-200 text-white text-[18px] rounded-lg px-4 py-2 block w-full'>Login</button>


            </form>
            <p className='text-white text-xl text-center font-semibold mx-1 my-1'> Don't Have An Account ?<Link to='/register'>Sign In Here</Link></p>

            </div>
        </div>
        
        </div>
      </div>
   
  )
}

export default Login