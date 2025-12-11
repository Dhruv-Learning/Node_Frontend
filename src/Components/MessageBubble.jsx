//Components/MessageBubble.jsx

export default function MessageBubble({ me, msg }) {
  const isMe = msg.sender === me.id || msg.senderId === me.id;

  return (
    <div className={`flex my-2 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs ${
          isMe ? "bg-green-500 text-white" : "bg-white border"
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
}