import { useNavigate } from "react-router-dom";

function ChatCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <div
      onClick={handleClick}
      className="p-4 cursor-pointer  transition duration-300 h-[500px]"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        AI learning chat
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition-transform transform hover:scale-105">
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2 text-gray-800">
              Ai powered personalized chat{" "}
            </div>
            <p className="text-gray-600 text-base">
              Preferences: chat with bot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
