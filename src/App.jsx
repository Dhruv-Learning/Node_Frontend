// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
// import { BrowserRouter , Routes, Route } from 'react-router-dom'

// function App() {

//   return (
//     <>
//   <BrowserRouter>
//   <Routes>
//     <Route path='/signup' element={<Signup/>} />
//     <Route path='/login' element={<Login/>} />
//   </Routes>
//   </BrowserRouter>
//     </>
//   )
// }

// export default App


// ---------------------------------------------------------------
// chat app.jsx

//App.jsx


import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function App() {
  const [userId, setUserId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const joinChat = () => {
    if (!userId) return alert("Enter user ID");
    socket.emit("addUser", userId);
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!receiverId) return alert("Enter receiver ID");

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId,
      message,
    });

    setChat((prev) => [...prev, { senderId: userId, message }]);
    setMessage("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Private Chat</h2>

      {/* LOGIN */}
      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-2 w-full rounded"
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={joinChat}
        >
          Join
        </button>
      </div>

      {/* SEND TO */}
      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-2 w-full rounded"
          placeholder="Receiver User ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
      </div>

      {/* CHAT BOX */}
      <div className="border h-64 overflow-y-auto p-3 rounded bg-gray-50 mb-4">
        {chat.map((c, i) => (
          <p
            key={i}
            className={`my-2 p-2 rounded text-sm w-fit ${
              c.senderId === userId
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            <b>{c.senderId}: </b> {c.message}
          </p>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 w-full rounded"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}