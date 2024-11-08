import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { subtopic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.post(
          "https://iiced-mixtral-46-7b-fastapi.hf.space/generate/",
          {
            prompt: subtopic,
            history: [],
            system_prompt:
              "`Generate a quiz for the topic given. Provide 10 questions and don't say anything else`",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Quiz response:", response.data);

        if (typeof response.data.response === "string") {
          const questionsArray = response.data.response
            .split("\n")
            .map((item) => decodeURIComponent(item.trim()))
            .filter((item) => item);
          setQuestions(questionsArray);
          setCorrectAnswers(questionsArray); // Assuming correct answers are the same as questions for now
        } else {
          console.error("Expected a string but got:", response.data.response);
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error making request:", error);
      }
    };

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
    console.log("User Answers:", userAnswers);
    setSubmitted(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz for: {subtopic}</h1>
      {questions.length > 0 ? (
        <div>
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block text-lg font-semibold">
                  {question}
                </label>
                <input
                  type="text"
                  placeholder="Your answer"
                  value={userAnswers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="border rounded p-2 mt-1 w-full"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Answers
            </button>
          </form>
          {submitted && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Results:</h2>
              {questions.map((question, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{question}</p>
                  <p>Your Answer: {userAnswers[index] || "No answer"}</p>
                  <p className="text-green-600">
                    Correct Answer: {correctAnswers[index] || "N/A"}
                  </p>
                  {userAnswers[index] &&
                  userAnswers[index] === correctAnswers[index] ? (
                    <p className="text-green-500">Correct!</p>
                  ) : (
                    <p className="text-red-500">Incorrect!</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
}

export default Quiz;
