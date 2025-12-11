//pages/Chats.jsx


import { useEffect, useState } from "react";
import API from "../api/api";
import socket from "../Socket";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const navigate = useNavigate();

  // ---------------- LOAD CURRENT USER ----------------
  useEffect(() => {
    const saved = localStorage.getItem("me");
    if (!saved) {
      navigate("/"); // redirect to login
      return;
    }

    const userObj = JSON.parse(saved);
    setMe(userObj);

    socket.emit("addUser", userObj.id);

    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.filter((u) => u._id !== me?.id));
    } catch (err) {
      console.error("Load users error:", err);
    }
  };

  const openChat = async (user) => {
    setCurrentChat(user);

    try {
      const res = await API.get(`/chat/${user._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Load messages error:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        currentChat &&
        (currentChat._id === msg.senderId || currentChat._id === msg.receiverId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("typing", ({ senderId }) => {
      if (currentChat?._id === senderId) {
        setTypingUser(senderId);
        setTimeout(() => setTypingUser(""), 1500);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, [currentChat]);

  const sendMessage = async (text) => {
    if (!text || !currentChat) return;

    try {
      const res = await API.post("/messages", {
        receiverId: currentChat._id,
        message: text,
      });

      setMessages((prev) => [...prev, res.data]);

      socket.emit("sendMessage", {
        senderId: me.id,
        receiverId: currentChat._id,
        message: text,
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (!me) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar users={users} openChat={openChat} currentChat={currentChat} />

      <ChatWindow
        me={me}
        user={currentChat}
        messages={messages}
        typingUser={typingUser}
        sendMessage={sendMessage}
      />
    </div>
  );
}