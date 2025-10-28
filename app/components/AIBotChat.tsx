"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AIBotChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Array<{ q: string; a: string }>>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (res.ok) {
        const aiAnswer = data.answer || "No answer generated.";
        setHistory(prev => [...prev, { q: question, a: aiAnswer }]);
        setAnswer(aiAnswer);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[80vh] flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold text-center text-teal-600 dark:text-teal-400">
          Ask Ayush’s AI Bot
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Ask anything about Ayush’s skills, projects, or experience.
        </p>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {history.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            Start the conversation by asking a question!
          </p>
        )}
        {history.map((item, idx) => (
          <div key={idx} className="space-y-2">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-teal-500 text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-[75%] shadow">
                {item.q}
              </div>
            </div>
            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%] shadow">
                {item.a}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 text-red-500 text-sm text-center border-t border-gray-200 dark:border-gray-800 py-1">
          {error}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2"
      >
        <input
          type="text"
          placeholder="Ask about Ayush’s resume..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-full font-medium text-white transition ${
            loading
              ? "bg-teal-400 cursor-wait"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
    </div>
  );
}
