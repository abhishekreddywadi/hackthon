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
        // { withCredentials: true }
      );
      localStorage.setItem("userId", response.data.userId);

      navigate("/");
      console.log(response.data); // Handle successful sign-in (e.g., store token, redirect)
    } catch (err) {
      setError("Invalid email or password");
      console.log(err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
