import React from 'react'
import { loginUser } from '../api/AuthApi';
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react'

const Login = () => {
 const [form,setForm]=useState({
    username:'',
    password:''
  });

  const formSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await loginUser(form);
      console.log(res);
      
      if(res.status === 200){
        toast.success("Login Successful");
        const data = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        console.log("Token and UserId stored in localStorage");
      }
      else{
        toast.error("Login Failed");
      }
    }
    catch(error){
      if(error.status === 404){
        toast.error("User not found");
      }
      else if(error.status === 401){
        toast.error("Invalid password");
      }
      else
      toast.error("Login Failed");
    }
    
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  return (
 <>
    <div>
      <h1 className='text-2xl'>Login Page</h1>
      <form onSubmit={formSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password"  onChange={handleChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <ToastContainer/>
 </>
  )
}

export default Login