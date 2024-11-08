import { useNavigate } from "react-router-dom";

function AiPoweredPath() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/ai-personalized")}
      className="p-4 cursor-pointer hover:bg-gray-100 transition duration-300"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        AI Cars with Preferences
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition-transform transform hover:scale-105">
          <img
            className="w-full h-48 object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Red_dot.svg"
            alt="AI Car 1"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2 text-gray-800">
              Tesla Model S
            </div>
            <p className="text-gray-600 text-base">Preferences: Self Reading</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiPoweredPath;
