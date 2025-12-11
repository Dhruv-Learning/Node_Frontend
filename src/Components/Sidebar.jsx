//Components/Sidebar.jsx


export default function Sidebar({ users, openChat, currentChat }) {
  return (
    <div className="w-1/3 bg-white border-r">
      <h2 className="p-4 text-xl font-bold border-b">Chats</h2>

      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {users.map((user) => (
          <div
            key={user._id}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
              currentChat?._id === user._id ? "bg-gray-200" : ""
            }`}
            onClick={() => openChat(user)}
          >
            <p className="font-semibold">{user.name}</p>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}