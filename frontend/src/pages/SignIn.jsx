// frontend/src/components/SignIn.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/signin",
        { email, password }
      );
      localStorage.setItem("userId", response.data.userId);
      navigate("/");
      console.log(response.data); // Handle successful sign-in
    } catch (err) {
      setError("Invalid email or password");
      console.log(err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-white shadow-lg w-96 flex flex-col items-center "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 p-3 mb-4  w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
