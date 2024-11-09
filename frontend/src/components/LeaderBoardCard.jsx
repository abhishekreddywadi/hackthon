import { useNavigate } from "react-router-dom";

function LeaderBoardCard() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/leaderboard")}
      className="p-4 cursor-pointer transition duration-300 h-auto md:h-[500px] w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-blue-600">
        Leaderboard
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-2 md:m-4 transition-transform transform hover:scale-105">
          <div className="px-6 py-4">
            <div className="font-bold text-xl md:text-2xl mb-2 text-gray-800">
              Leaderboard
            </div>
            <p className="text-gray-600 text-base">Preferences: Self Reading</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardCard;
