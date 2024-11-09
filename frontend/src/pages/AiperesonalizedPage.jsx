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
      console.log("Weaknesses response:", response.data.weaknesses);
      setWeaknesses(response.data.weaknesses);
    };
    fetchData();
    fetchScore();
  }, []);
  useEffect(() => {
    handleClick();
  }, [weaknesses]);

  const handleClick = async () => {
    const joined = weaknesses.join(",");
    console.log(joined);

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

  const handleFinished = async (subtopic) => {
    console.log(`Finished subtopic: ${subtopic}`);
    setFinishedSubtopics((prev) => {
      const updated = { ...prev, [subtopic]: true };
      localStorage.setItem("finishedSubtopics", JSON.stringify(updated)); // Store in local storage
      return updated;
    });

    const response = await axios.patch(
      `http://localhost:5000/api/students/score/${userId}`,
      {
        score: 10,
      }
    );
    console.log("Score response:", response.data);
  };

  const handleQuiz = (subtopic) => {
    console.log(`Going to quiz for: ${subtopic}`);
    navigate(`/quiz/${encodeURIComponent(subtopic)}`);
  };

  const handleDocument = (subtopic) => {
    console.log(`Viewing document for: ${subtopic}`);
    navigate(`/documents/${encodeURIComponent(subtopic)}`);
  };

  const fetchScore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/score/${userId}`
      );
      console.log("Fetched score:", response.data.score);
      setScores((prevScores) => ({
        ...prevScores,
        totalScore: response.data.score,
      }));
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  };

  // Calculate progress based on scores
  const totalSubtopics = path.length;
  const totalScore = Object.values(scores).reduce(
    (acc, score) => acc + (score || 0),
    0
  );
  const progressPercentage =
    totalSubtopics > 0 ? (totalScore / (totalSubtopics * 100)) * 100 : 0;

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Learning Path
        </button>
      </div>
      {/* Progress Card */}
      <div className="absolute top-0 left-0 m-4 w-[400px] h-[100px] bg-white rounded-lg shadow-lg p-4 text-center md:w-[300px] sm:w-full">
        <h2 className="text-lg font-bold">
          Progress: {Math.round(progressPercentage)}%
        </h2>
        <div className="bg-white rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        {path.length > 0 && (
          <div className="w-1/2 md:w-full sm:w-full">
            <ul className="list-none pl-5">
              {path.map((subtopic, index) => (
                <li
                  key={index}
                  className="mb-6 p-4 bg-slate-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <div
                    className="cursor-pointer text-blue-500 hover:underline text-xl font-semibold"
                    onClick={() => handleSubtopicClick(subtopic)}
                  >
                    {subtopic}
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleFinished(subtopic)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 transition duration-200 hover:bg-green-600"
                    >
                      Finished
                    </button>
                    <button
                      onClick={() => handleQuiz(subtopic)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-600"
                    >
                      Go for Quiz
                    </button>
                    <button
                      onClick={() => handleDocument(subtopic)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-2 transition duration-200 hover:bg-yellow-600"
                    >
                      View Document
                    </button>
                    {finishedSubtopics[subtopic] && (
                      <button className="bg-blue-300 text-white px-4 py-2 rounded-lg ml-2">
                        Finished!
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiperesonalizedPage;
