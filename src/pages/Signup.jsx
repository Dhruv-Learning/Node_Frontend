import React from 'react'
import { useState } from 'react'
import { signupUser } from '../api/AuthApi';
import { ToastContainer , toast} from 'react-toastify';

const Signup = () => {
  const [form,setForm]=useState({
    username:'',
    password:'',
    email:''
  });

  const submitForm = async (e) => {
    e.preventDefault();

  
    try{
      console.log("heloo");
      
      const res =  await signupUser(form);
      console.log(res);
      if(res.status === 201){
        toast.success(`Signup Successful`);
      }
     
      else {
        toast.error("Signup Failed");
      }
    }
    catch(error)
    {

      if(error.status === 409){
        toast.error("Username already exists");
      }
      else if(error.status === 400){
        toast.error("Username is required");
      } 
      else {
        toast.error("Signup Failed");
      }
      console.log("Error in signup ", error);
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
      <h1 className='mb-5'>Signup Page</h1>

      <form  onSubmit={submitForm} className='flex flex-col gap-5' >
        <input type="text" name="username" placeholder="Enter Username" required className='w-full p-3 shadow-lg shadow-gray-200 rounded-lg ' onChange={handleChange}/>

        <input type="password" name="password" placeholder="Enter Password" required className='w-full p-3 shadow-lg shadow-gray-200 rounded-lg' onChange={handleChange}/>

        
        <input type="email" name="email" placeholder="Enter Email" required className='w-full p-3 shadow-lg shadow-gray-200 rounded-lg' onChange={handleChange}/>
        <button type="submit">Signup</button>
      </form>
    </div>
    
    <ToastContainer />
  </>
  )
}

export default Signup