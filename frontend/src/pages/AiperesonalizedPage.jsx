import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AiperesonalizedPage() {
  const [weaknesses, setWeaknesses] = useState([]);
  const [path, setPath] = useState([]);
  const [scores, setScores] = useState({});
  const [finishedSubtopics, setFinishedSubtopics] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `http://localhost:5000/api/students/sendWeaknessStrengthLearningPreference/${userId}`
      );
      console.log("Weaknesses response:", response.data);
      setWeaknesses(response.data.weaknesses);
    };
    fetchData();
  }, []);

  const handleClick = async () => {
    const joined = weaknesses.join(",");
    try {
      const response = await axios.post(
        "https://iiced-mixtral-46-7b-fastapi.hf.space/generate/",
        {
          prompt: joined,
          history: [],
          system_prompt:
            "`Generate a learning path for the Prompt Given. Provide 6 main subtopics skills to learn just say sub topics headings and don't say anything else",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Learning path response:", response.data);

      if (typeof response.data.response === "string") {
        const subtopicsArray = response.data.response
          .split("\n")
          .map((item) => decodeURIComponent(item.trim()))
          .filter((item) => item);
        setPath(subtopicsArray);
      } else {
        console.error("Expected a string but got:", response.data.response);
        setPath([]);
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  const handleSubtopicClick = (subtopic) => {
    console.log("Clicked on subtopic:", subtopic);
    navigate(`/ai-personalized/${subtopic}`);
  };

  const handleFinished = (subtopic) => {
    console.log(`Finished subtopic: ${subtopic}`);
    setFinishedSubtopics((prev) => ({
      ...prev,
      [subtopic]: true,
    }));
  };

  const handleQuiz = (subtopic) => {
    console.log(`Going to quiz for: ${subtopic}`);
    navigate(`/quiz/${encodeURIComponent(subtopic)}`);
  };

  const handleScoreChange = (subtopic, newScore) => {
    setScores((prevScores) => ({
      ...prevScores,
      [subtopic]: newScore,
    }));
  };

  // Calculate progress
  const totalSubtopics = path.length;
  const finishedCount = Object.keys(finishedSubtopics).filter(
    (key) => finishedSubtopics[key]
  ).length;
  const progressPercentage =
    totalSubtopics > 0 ? (finishedCount / totalSubtopics) * 100 : 0;

  return (
    <div>
      <button onClick={handleClick}>Generate Learning Path</button>
      {/* Progress Bar */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">
          Progress: {Math.round(progressPercentage)}%
        </h2>
        <div className="bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="mt-4">
        {path.length > 0 && (
          <ul className="list-disc pl-5">
            {path.map((subtopic, index) => (
              <li key={index} className="mb-4">
                <div
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleSubtopicClick(subtopic)}
                >
                  {subtopic}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => handleFinished(subtopic)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Finished
                  </button>
                  <button
                    onClick={() => handleQuiz(subtopic)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Go for Quiz
                  </button>
                  {finishedSubtopics[subtopic] && (
                    <button className="bg-blue-300 text-white px-4 py-2 rounded ml-2">
                      Finished!
                    </button>
                  )}
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter score"
                    onChange={(e) =>
                      handleScoreChange(subtopic, Number(e.target.value))
                    }
                    className="border rounded p-1 mt-1"
                  />
                  <p className="text-sm text-gray-500">
                    Score: {scores[subtopic] || 0}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AiperesonalizedPage;
