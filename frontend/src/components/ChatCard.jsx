import { useNavigate } from "react-router-dom";

function ChatCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <div
      onClick={handleClick}
      className="card shadow-lg rounded-lg p-4 bg-white"
    >
      <h2 className="text-lg font-semibold text-gray-800">Chat with Bot</h2>
    </div>
  );
}

export default ChatCard;
