import { useState } from "react";
import axios from "axios";

function ChatWithAi() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://iiced-mixtral-46-7b-fastapi.hf.space/generate/",
        {
          prompt: userInput,
          history: [],
          system_prompt:
            "`Generate a response for the question given. Provide a concise answer and don't say anything else`",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        text: "Sorry, I could not fetch a response.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100 md:px-6 lg:px-8">
      <div className="flex-1 overflow-y-auto p-4 bg-black rounded-lg shadow-md md:rounded-xl lg:rounded-2xl">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-500">Bot is typing...</div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="flex mt-4 md:mt-6 lg:mt-8">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:mr-4 lg:mr-6"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:ml-4 lg:ml-6"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWithAi;
