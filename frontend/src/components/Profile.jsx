import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [student, setStudent] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [learningPace, setLearningPace] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/user-details/${userId}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      // Example update data, you can modify this as needed
      const updatedData = {
        ...student,
        name: "New Name",
        difficultyLevel,
        learningPace,
        rating,
      }; // Update with new data
      await axios.put(
        `http://localhost:5000/api/students/user-details/${userId}`,
        updatedData
      );
      alert("Profile updated successfully!");
      // Optionally, refetch the student data to reflect changes
      const response = await axios.get(
        `http://localhost:5000/api/students/user-details/${userId}`
      );
      setStudent(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <>
      <div className="h-screen bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center p-4">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out p-4">
          <div className="h-32 overflow-hidden">
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt=""
            />
          </div>

          <div className="text-center px-4 py-2">
            <h2 className="text-gray-800 text-3xl font-bold">{student.name}</h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/immohitdhiman/"
              target="BLANK()"
            >
              {student.email}
            </a>
            <p className="mt-2 text-gray-500 text-sm">
              `Profile Score ={student.score}`
            </p>
          </div>
          <hr className="mt-6 mb-6" />
          <div className="flex bg-gray-50 p-4">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">Strengths are </span>{" "}
                {student.strengths}
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">Weaknesses are </span>{" "}
                {student.weaknesses}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="difficultyLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Difficulty Level
            </label>
            <select
              id="difficultyLevel"
              name="difficultyLevel"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select difficulty level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <label
              htmlFor="learningPace"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Learning Pace
            </label>
            <select
              id="learningPace"
              name="learningPace"
              value={learningPace}
              onChange={(e) => setLearningPace(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select learning pace</option>
              <option value="fast">Fast</option>
              <option value="medium">Medium</option>
              <option value="slow">Slow</option>
            </select>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Rating (out of 5)
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
