// import React from 'react'
// import { loginUser } from '../api/AuthApi';
// import { ToastContainer,toast } from 'react-toastify';
// import { useState } from 'react'

// const Login = () => {
//  const [form,setForm]=useState({
//     username:'',
//     password:''
//   });

//   const formSubmit = async (e) => {
//     e.preventDefault();
//     try{
//       const res = await loginUser(form);
//       console.log(res);
      
//       if(res.status === 200){
//         toast.success("Login Successful");
//         const data = res.data;
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("userId", data.userId);
//         console.log("Token and UserId stored in localStorage");
//       }
//       else{
//         toast.error("Login Failed");
//       }
//     }
//     catch(error){
//       if(error.status === 404){
//         toast.error("User not found");
//       }
//       else if(error.status === 401){
//         toast.error("Invalid password");
//       }
//       else
//       toast.error("Login Failed");
//     }
    
//   }
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   }
//   return (
//  <>
//     <div>
//       <h1 className='text-2xl'>Login Page</h1>
//       <form onSubmit={formSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password"  onChange={handleChange}/>
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//     <ToastContainer/>
//  </>
//   )
// }

// export default Login


//pages/Login.jsx

import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("me", JSON.stringify(res.data.user));

      navigate("/chat");
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-6 rounded-md w-80"
      >
        <h2 className="text-xl mb-4 font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-3 p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}