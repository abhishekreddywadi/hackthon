import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AiperesonalizedPage from "./pages/AiperesonalizedPage";
import SubtopicPage from "./components/SubtopicPage";
import Quiz from "./components/Quiz";
import ChatWithAi from "./pages/ChatWithAi";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ai-personalized" element={<AiperesonalizedPage />} />
          <Route path="/ai-personalized/:subtopic" element={<SubtopicPage />} />
          <Route path="/quiz/:subtopic" element={<Quiz />} />
          <Route path="/chat" element={<ChatWithAi />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
