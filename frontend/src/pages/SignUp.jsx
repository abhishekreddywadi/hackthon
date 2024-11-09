// frontend/src/components/SignUp.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [preferences, setPreferences] = useState("visual");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/signup",
        {
          name,
          email,
          password,
          strengths: strengths.split(",").map((s) => s.trim()),
          weaknesses: weaknesses.split(",").map((w) => w.trim()),
          preferences,
        }
        // { withCredentials: true }
      );
      localStorage.setItem("userId", response.data.userId);
      navigate("/");
      setSuccess("Sign up successful!"); // Handle successful sign-up
      console.log(response.data);
    } catch (err) {
      setError("Error signing up. Please try again.", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 bg-white shadow-white shadow-lg rounded-2xl"
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Strengths (comma separated)"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Weaknesses (comma separated)"
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            className="border p-2 mb-4 w-full"
          />

          <select
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="border p-2 mb-4 w-full"
          >
            <option value="visual">Visual</option>
            <option value="auditory">Auditory</option>
            <option value="self reading">Self Reading</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
