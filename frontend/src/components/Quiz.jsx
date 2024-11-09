import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { subtopic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    // Default quiz questions and answers
    const defaultQuiz = {
      questions: [
        "What is the most popular front-end framework for building user interfaces?",
        "Which web technology allows for dynamic content on web pages?",
        "What is the primary language used for backend development in Node.js?",
        "What is the purpose of the 'this' keyword in JavaScript?",
        "What is the difference between null and undefined in JavaScript?",
        "How do you handle errors in JavaScript?",
        "What is the concept of 'closure' in JavaScript?",
        "What is the difference between '==' and '===' in JavaScript?",
        "How do you optimize the performance of a slow web page?",
        "What is the role of a Content Delivery Network (CDN) in web development?",
      ],
      answers: [
        "React",
        "JavaScript",
        "JavaScript",
        "To refer to the current object",
        "Null represents the intentional absence of any object value, while undefined represents an uninitialized variable.",
        "Using try-catch blocks",
        "A closure is a function that has access to its own scope and the scope of its parent functions.",
        "The '==' operator checks for value equality, while the '===' operator checks for both value and type equality.",
        "Optimizing images, minifying code, and using caching.",
        "A CDN reduces the latency of content delivery by distributing it across multiple servers.",
      ],
    };

    setQuestions(defaultQuiz.questions);
    setCorrectAnswers(defaultQuiz.answers);
  }, []);

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
    <div className="flex justify-center items-center bg-black">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg transition-transform transform">
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
    </div>
  );
}

export default Quiz;
