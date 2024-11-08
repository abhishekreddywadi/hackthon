import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { subtopic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.post(
        "https://iiced-mixtral-46-7b-fastapi.hf.space/generate/",
        {
          prompt: subtopic,
          history: [],
          system_prompt:
            "`Generate a quiz for the topic given. Provide 10 questions and their correct answers in the format: 'Question 1: Question? Answer 1: Answer'`",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (typeof response.data.response === "string") {
        const rawResponse = response.data.response.trim();
        console.log("Raw Response:", rawResponse); // Log the raw response

        // Split the response into lines
        const lines = rawResponse
          .split("\n")
          .filter((line) => line.trim() !== "");

        const tempQuestions = [];
        const tempAnswers = [];

        // Iterate through the lines to extract questions and answers
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith("Question")) {
            const question = line.split(":")[1].trim(); // Get the question part
            tempQuestions.push(question);
          } else if (line.startsWith("Answer")) {
            const answer = line.split(":")[1].trim(); // Get the answer part
            tempAnswers.push(answer);
          }
        }

        console.log("Parsed Questions:", tempQuestions); // Log parsed questions
        console.log("Parsed Answers:", tempAnswers); // Log parsed answers

        setQuestions(tempQuestions);
        setCorrectAnswers(tempAnswers);
      } else {
        console.error("Expected a string but got:", response.data.response);
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [subtopic]);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (
        userAnswers[index] &&
        userAnswers[index].toLowerCase() === correctAnswers[index].toLowerCase()
      ) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Quiz: {subtopic}
      </h1>
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <label className="block text-lg font-semibold text-gray-800">
                {question}
              </label>
              <input
                type="text"
                placeholder="Your answer"
                value={userAnswers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="border border-gray-300 rounded-lg p-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg"
          >
            Submit Answers
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600">
          No questions available for this quiz.
        </p>
      )}
      {submitted && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Results:</h2>
          <p className="text-lg font-semibold">
            Score: {calculateScore()} / {questions.length}
          </p>
          {questions.map((question, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="font-semibold">{question}</p>
              <p>Your Answer: {userAnswers[index] || "No answer"}</p>
              <p className="text-green-600">
                Correct Answer: {correctAnswers[index] || "N/A"}
              </p>
              {userAnswers[index] &&
              userAnswers[index].toLowerCase() ===
                correctAnswers[index].toLowerCase() ? (
                <p className="text-green-500">Correct!</p>
              ) : (
                <p className="text-red-500">Incorrect!</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quiz;
