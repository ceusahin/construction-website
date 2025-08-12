const MessageList = ({ messages }) => {
  return (
    <div className="rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">📥 Gelen Mesajlar</h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <li
            key={index}
            className="border border-gray-300 dark:border-gray-500 p-3  rounded-xl cursor-pointer"
          >
            <p className="font-bold">
              {msg.name} ({msg.email})
            </p>
            <p className="text-sm truncate">{msg.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
