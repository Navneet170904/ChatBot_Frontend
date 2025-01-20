import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [dbData, setDbData] = useState([]);
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/api/data", {
        text: query,
      });

      setAiResponse(result.data.aiResponse);
      setDbData(result.data.dbData);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error sending data to the backend:", error.message);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-6 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Chat with AI</h1>
        <input
          type="text"
          name="text"
          value={query}
          onChange={handleChanges}
          placeholder="Type your query here..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Submit
        </button>

        {error && (
          <div className="bg-red-100 p-4 rounded-md shadow-inner">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {aiResponse && (
          <div className="bg-gray-100 p-4 rounded-md shadow-inner">
            <h2 className="font-semibold text-lg text-gray-700">AI Response:</h2>
            <p className="text-gray-600">{aiResponse}</p>
          </div>
        )}

        {dbData.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md shadow-inner">
            <h2 className="font-semibold text-lg text-gray-700">Database Results:</h2>
            <ul className="list-disc list-inside">
              {dbData.map((item, index) => (
                <li key={index} className="text-gray-600">
                  {/* Adjust the fields based on your DB schema */}
                  <span><strong>ID:</strong> {item.id} | <strong>Message:</strong> {item.message_text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
