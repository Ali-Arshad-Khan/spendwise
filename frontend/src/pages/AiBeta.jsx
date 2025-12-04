import { useState, useEffect, useContext, useRef } from "react";
import { DashboardContext } from "../components/DashboardProvider";
import api from "../../api";

export default function AiBeta() {
  const { transactions, pp, flag } = useContext(DashboardContext);

  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("aiChatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestedQuestions = [
    "What is my total expense this month?",
    "How much did I spend on food this week?",
    "How much did I spend on transport this week?",
    "How much did I spend on shopping this week?",
    "Which category did I spend the most on?",
    "Show me my top 3 biggest expenses",
    "How much did I save this month?",
    "Do I have a positive cash flow this month?",
    "Compare my income vs expenses for this month",
  ];

  const suggestedQuestions2 = [
    "What is my total expense this month?",
    "How much did I spend on food this week?",
  ];

  useEffect(() => {
    localStorage.setItem("aiChatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleAskAI = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const response = await api.post("/api/ask-ai", {
        question,
        userData: { transactions },
      });

      setChatHistory((prev) => [
        ...prev,
        { type: "user", text: question },
        { type: "ai", text: response.data.answer },
      ]);

      setQuestion("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (q) => {
    setQuestion(q); // just fill textarea
    // Wait for React to update the textarea value
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // reset
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 12 + "px"; // add 12px extra
      }
    }, 0);
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("aiChatHistory");
  };

  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;

    const handleInput = () => {
      textarea.style.height = "auto"; // reset height
      textarea.style.height = textarea.scrollHeight + "px"; // resize based on content
    };

    textarea.addEventListener("input", handleInput);

    // initial resize if textarea has content
    handleInput();

    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div
      className="h-full flex w-full min-h-[100vh] bg-cover bg-center bg-mainbg bg-no-repeat"
      style={pp}
    >
      <div className="main h-full lg:ml-[280px] w-full flex-1 text-white py-[30px] px-[20px] md:px-[20px] lg:px-[30px]">
        {/* Title */}
        <div className="dashboard-title mb-[20px] flex items-center gap-5">
          <h2 className="text-[clamp(16px,2.5vw,32px)] font-bold">AI Beta</h2>
        </div>

        {/* Suggested Questions */}
        {chatHistory.length > 0 ? null : (
          <div className="flex flex-wrap gap-3 mb-6 ">
            <h2 className="block">
              Some of questions you can ask by clicking on it.
            </h2>
            <span className="hidden flex-wrap gap-3 mb-5 md:flex">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(q)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all cursor-pointer
                ${
                  flag
                    ? "bg-white/10 backdrop-blur-lg border border-white/10 text-gray-200 shadow hover:bg-white/20"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                }
              `}
                >
                  {q}
                </button>
              ))}
            </span>

            <span className="flex flex-wrap gap-3 mb-0 md:hidden">
              {suggestedQuestions2.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(q)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all cursor-pointer 
                ${
                  flag
                    ? "bg-white/10 backdrop-blur-lg border border-white/10 text-gray-200 shadow hover:bg-white/20"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                }
              `}
                >
                  {q}
                </button>
              ))}
            </span>
          </div>
        )}

        {/* Clear History Button */}
        {chatHistory.length > 0 && (
          <div className="mb-4">
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 cursor-pointer"
            >
              Clear Chat History
            </button>
          </div>
        )}

        {/* Chat Container */}
        <div
          className={`flex flex-col gap-6 p-8 relative ${
            chatHistory.length > 0 ? "h-[70vh]" : "h-[50vh]"
          } mt-15 sm:h-[calc(100%-200px)]
            border border-white/10 rounded-2xl backdrop-blur-xl
            bg-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.2)]`}
        >
          <div className="chat-box flex flex-col gap-5 overflow-y-auto mb-24">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                  msg.type === "user"
                    ? "self-end bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                    : "self-start bg-white/10 backdrop-blur-md border border-white/10 text-gray-200 shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {!chatHistory.length && (
              <p className="text-gray-500 italic">What can I help with?</p>
            )}
          </div>

          {/* Input Section */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-3 p-4 bg-white/5 backdrop-blur-xl border-t border-white/10">
            <textarea
              ref={textareaRef}
              value={question} // controlled
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask AI..."
              className="
              w-full
              px-4 py-2
              rounded-xl
              bg-white/10
              backdrop-blur-lg
              text-white
              placeholder-gray-400
              border border-white/10
              focus:outline-none focus:ring-2 focus:ring-blue-500/30
              resize-none
              overflow-hidden 
              text-sm sm:text-base md:text-lg
              md:px-6 md:py-3
            "
              rows={1} // initial height
            />

            <button
              onClick={handleAskAI}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-40 cursor-pointer"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>

          {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
