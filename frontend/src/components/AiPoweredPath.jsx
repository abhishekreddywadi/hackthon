import { useNavigate } from "react-router-dom";

function AiPoweredPath() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/ai-personalized")}
      className="p-4 cursor-pointer  transition duration-300 h-[500px] md:w-2/6"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        AI learning path
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition-transform transform hover:scale-105">
          <div className="px-6 py-1">
            <div className="font-bold text-xl mb-2 text-gray-800">
              Ai powered personalized learning path{" "}
            </div>
            <p className="text-gray-600 text-base">Preferences: Self Reading</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiPoweredPath;
