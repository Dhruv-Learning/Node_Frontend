//Components/ChatWindow.jsx


import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ me, user, messages, typingUser, sendMessage }) {
  const [text, setText] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  if (!user)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging.
      </div>
    );

  return (
    <div className="flex-1 flex flex-col">
      {/* HEADER */}
      <div className="p-4 border-b bg-white font-semibold">
        {user.name}
        {typingUser === user._id && (
          <span className="ml-2 text-sm text-green-600">typing...</span>
        )}
      </div>

      {/* CHAT MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} me={me} msg={msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded-full"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={() => {
            sendMessage(text);
            setText("");
          }}
          className="bg-green-600 text-white px-5 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}