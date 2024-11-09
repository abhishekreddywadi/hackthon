import { useEffect, useState } from "react";
import axios from "axios";
function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/students/all-users"
        );
        setLeaderboard(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);
  return (
    <div className="leaderboard text-center">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="leaderboard-list mx-auto max-w-2xl">
        {leaderboard
          .sort((a, b) => b.score - a.score)
          .map((user, index) => (
            <div
              key={index}
              className="leaderboard-item flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4"
            >
              <span className="leaderboard-rank text-xl font-semibold">
                {index + 1}
                {index === 0 && (
                  <span className="badge bg-gold text-white rounded-full px-2 ml-2">
                    🥇
                  </span>
                )}
                {index === 1 && (
                  <span className="badge bg-silver text-white rounded-full px-2 ml-2">
                    🥈
                  </span>
                )}
                {index === 2 && (
                  <span className="badge bg-bronze text-white rounded-full px-2 ml-2">
                    🥉
                  </span>
                )}
              </span>
              <span className="leaderboard-name text-lg">{user.name}</span>
              <span className="leaderboard-email text-sm text-gray-600">
                {user.email}
              </span>
              <span className="leaderboard-score text-lg font-bold">
                {user.score}
              </span>
            </div>
          ))}
      </div>
      {/* Add more leaderboard items dynamically */}
    </div>
  );
}

export default LeaderBoard;
