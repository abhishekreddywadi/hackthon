import { useNavigate } from "react-router-dom";

function AiPoweredPath() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/ai-personalized")} className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Cars with Preferences</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
          <img
            className="w-full h-48 object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Red_dot.svg"
            alt="AI Car 1"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Tesla Model S</div>
            <p className="text-gray-700 text-base">Preferences: Self Reading</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiPoweredPath;
