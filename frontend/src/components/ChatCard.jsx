import { useNavigate } from "react-router-dom";

function ChatCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <div
      onClick={handleClick}
      className="card shadow-lg rounded-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Chat with Bot</h2>
      <p className="text-gray-600">Click here to start a conversation!</p>
    </div>
  );
}

export default ChatCard;
