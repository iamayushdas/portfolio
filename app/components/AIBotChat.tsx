"use client";

import React, { useState, useRef, useEffect } from "react";
import { getSessionId, clearSessionId } from "../lib/sessionUtils";

interface AIBotChatProps {
  onClose?: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Suggested questions
const SUGGESTED_QUESTIONS = [
  "What are your technical skills?",
  "Tell me about your projects",
  "What's your experience?",
  "How can I contact you?",
  "What technologies do you use?",
];

export default function AIBotChat({ onClose }: AIBotChatProps = {}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Array<{ q: string; a: string }>>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [conversationMode, setConversationMode] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize session and load history
  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);
    loadChatHistory(sid);
    
    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      
      // Load and select Rishi voice
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find "Rishi" voice specifically
        const rishiVoice = 
          // Look for exact "Rishi" match
          voices.find(v => v.name.toLowerCase().includes('rishi')) ||
          // Fallback to Google voices (natural-sounding)
          voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
          voices.find(v => v.name.includes('Microsoft') && v.name.includes('Natural') && v.lang.startsWith('en')) ||
          // Try Samantha (Mac) or Zira (Windows) - good quality
          voices.find(v => (v.name.includes('Samantha') || v.name.includes('Zira')) && v.lang.startsWith('en')) ||
          // Fallback to any English voice
          voices.find(v => v.lang.startsWith('en')) ||
          voices[0];
        
        setSelectedVoice(rishiVoice);
        console.log('Selected voice:', rishiVoice?.name || 'Default');
      };
      
      // Load voices immediately
      loadVoices();
      
      // Some browsers need to wait for voices to load
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Save chat history after each update
  useEffect(() => {
    const saveChatHistory = async () => {
      const messages: Message[] = [];
      history.forEach((item) => {
        messages.push({
          role: "user",
          content: item.q,
          timestamp: new Date().toISOString(),
        });
        messages.push({
          role: "assistant",
          content: item.a,
          timestamp: new Date().toISOString(),
        });
      });

      try {
        await fetch("/api/chat-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, messages }),
        });
      } catch (err) {
        console.error("Failed to save chat history:", err);
      }
    };

    if (history.length > 0 && sessionId) {
      saveChatHistory();
    }
  }, [history, sessionId]);

  // Load chat history from server
  const loadChatHistory = async (sid: string) => {
    try {
      const res = await fetch(`/api/chat-history?sessionId=${sid}`);
      const data = await res.json();
      
      if (data.messages && Array.isArray(data.messages)) {
        const formattedHistory = [];
        for (let i = 0; i < data.messages.length; i += 2) {
          const userMsg = data.messages[i];
          const assistantMsg = data.messages[i + 1];
          if (userMsg && assistantMsg) {
            formattedHistory.push({
              q: userMsg.content,
              a: assistantMsg.content,
            });
          }
        }
        setHistory(formattedHistory);
        setShowSuggestions(formattedHistory.length === 0);
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  };

  // Save chat history to server
  const saveChatHistory = async () => {
    const messages: Message[] = [];
    history.forEach((item) => {
      messages.push({
        role: "user",
        content: item.q,
        timestamp: new Date().toISOString(),
      });
      messages.push({
        role: "assistant",
        content: item.a,
        timestamp: new Date().toISOString(),
      });
    });

    try {
      await fetch("/api/chat-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages }),
      });
    } catch (err) {
      console.error("Failed to save chat history:", err);
    }
  };

  // Clear chat history
  const clearHistory = async () => {
    if (!confirm("Are you sure you want to clear your chat history?")) return;
    
    try {
      await fetch(`/api/chat-history?sessionId=${sessionId}`, {
        method: "DELETE",
      });
      setHistory([]);
      setShowSuggestions(true);
      clearSessionId();
      const newSessionId = getSessionId();
      setSessionId(newSessionId);
    } catch (err) {
      console.error("Failed to clear chat history:", err);
    }
  };

  // Initialize voice recognition
  const initVoiceRecognition = () => {
    if (typeof window === "undefined") return;
    
    // If already listening, don't start again
    if (isListening) {
      console.log('Already listening, skipping...');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    // Clean up existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors when stopping
      }
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      console.log('Voice recognition started');
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript received:', transcript);
      setQuestion(transcript);
      setIsListening(false);
      
      // Auto-submit the question after voice input
      if (transcript.trim()) {
        // Small delay to allow state to update and show the question
        setTimeout(() => {
          submitQuestion(transcript);
        }, 100);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      // If error is 'aborted' or 'no-speech', try again in conversation mode
      if (conversationMode && (event.error === 'aborted' || event.error === 'no-speech')) {
        console.log('Retrying recognition in 1 second...');
        setTimeout(() => {
          if (conversationMode && !isListening && !isSpeaking) {
            initVoiceRecognition();
          }
        }, 1000);
      }
    };

    recognitionRef.current.onend = () => {
      console.log('Voice recognition ended');
      setIsListening(false);
    };

    try {
      console.log('Starting voice recognition...');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  };

  // Stop voice recognition
  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Speak text using text-to-speech with human-like voice
  const speakText = (text: string) => {
    if (!synthRef.current || !voiceEnabled) {
      console.log('Voice not enabled or synth not available');
      return;
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use selected voice for more natural sound
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log('Using voice:', selectedVoice.name);
    }
    
    // Adjust settings for more human-like speech
    utterance.rate = 0.95;  // Slightly slower for clarity (0.9-1.0 is natural)
    utterance.pitch = 1.0;  // Normal pitch (0.8-1.2 range)
    utterance.volume = 0.9; // Slightly quieter feels more natural

    utterance.onstart = () => {
      console.log('Started speaking');
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log('Finished speaking');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
    };

    console.log('Speaking text:', text.substring(0, 50) + '...');
    synthRef.current.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitQuestion(question);
  };

  const submitQuestion = async (q: string) => {
    if (!q.trim()) return;
    
    setLoading(true);
    setError("");
    setShowSuggestions(false);
    
    try {
      const res = await fetch("/api/ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      
      if (res.ok) {
        const aiAnswer = data.answer || "No answer generated.";
        setHistory(prev => [...prev, { q, a: aiAnswer }]);
        setAnswer(aiAnswer);
        
        // Speak the answer if voice is enabled
        if (voiceEnabled) {
          speakText(aiAnswer);
        }
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

  const handleSuggestedQuestion = (suggestedQ: string) => {
    setQuestion(suggestedQ);
    submitQuestion(suggestedQ);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6 pb-8">
        <div className="flex items-center gap-3">
          {/* Bot Avatar */}
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-2 ring-white/30">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white">
              <path d="M12 2a2 2 0 012 2v1h3a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2z" fill="currentColor" opacity="0.3"/>
              <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="11" r="1.5" fill="currentColor"/>
              <path d="M9 15c.5.5 1.5 1 3 1s2.5-.5 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white drop-shadow-sm">
              Ayush&apos;s AI Assistant
            </h2>
            <p className="text-white/90 text-sm font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
              Online & ready to help
            </p>
          </div>
          
          {/* Control Buttons */}
          <div className="flex gap-2">
            {/* Voice Toggle Button */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
                voiceEnabled 
                  ? "bg-green-500/90 hover:bg-green-600/90 shadow-lg shadow-green-500/30" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label={voiceEnabled ? "Disable voice replies" : "Enable voice replies"}
              title={voiceEnabled ? "Voice replies ON" : "Voice replies OFF"}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                {voiceEnabled ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm14.5-6l-4 4m0-4l4 4" />
                )}
              </svg>
            </button>
            
            {/* Clear History Button */}
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            
            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Close chatbot"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 20" className="w-full h-4 text-white dark:text-gray-900">
            <path fill="currentColor" d="M0,10 C150,0 350,20 600,10 C850,0 1050,20 1200,10 L1200,20 L0,20 Z"></path>
          </svg>
        </div>
      </div>

      {/* Chat History with custom scrollbar */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-teal-600 dark:text-teal-400">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-lg mb-1">
                Let&apos;s get started!
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Ask me anything about Ayush&apos;s skills, projects, or experience
              </p>
            </div>
          </div>
        )}
        
        {/* Suggested Questions */}
        {showSuggestions && history.length === 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1">
              Suggested Questions
            </p>
            <div className="grid gap-2">
              {SUGGESTED_QUESTIONS.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(sq)}
                  className="text-left px-4 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900/30 dark:hover:to-cyan-900/30 border border-teal-200/50 dark:border-teal-700/50 text-sm text-gray-700 dark:text-gray-300 transition-all hover:scale-[1.02] hover:shadow-md group"
                >
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform">
                      <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{sq}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {history.map((item, idx) => (
          <div key={idx} className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            {/* User Message */}
            <div className="flex justify-end gap-2 items-end">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-3 rounded-2xl rounded-br-md max-w-[80%] shadow-lg shadow-teal-500/20">
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{item.q}</p>
              </div>
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-600 dark:text-gray-300">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="flex justify-start gap-2 items-end">
              {/* Bot Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white">
                  <circle cx="9" cy="11" r="1" fill="currentColor"/>
                  <circle cx="15" cy="11" r="1" fill="currentColor"/>
                  <path d="M9 15c.5.5 1.5 1 3 1s2.5-.5 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-5 py-3 rounded-2xl rounded-bl-md max-w-[80%] shadow-lg border border-gray-100 dark:border-gray-700">
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start gap-2 items-end animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white">
                <circle cx="9" cy="11" r="1" fill="currentColor"/>
                <circle cx="15" cy="11" r="1" fill="currentColor"/>
                <path d="M9 15c.5.5 1.5 1 3 1s2.5-.5 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl rounded-bl-md shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-900/30 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50"
      >
        {/* Voice Status Indicator */}
        {(isListening || isSpeaking) && (
          <div className="mb-3 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200/50 dark:border-teal-700/50 flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex gap-1">
              {isListening ? (
                <>
                  <span className="w-1 h-4 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1 h-4 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1 h-4 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></span>
                </>
              ) : (
                <>
                  <span className="w-1 h-4 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1 h-4 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1 h-4 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </>
              )}
            </div>
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
              {isListening ? "Listening..." : "Speaking..."}
            </span>
            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="ml-auto text-xs px-2 py-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-700 dark:text-cyan-300"
              >
                Stop
              </button>
            )}
          </div>
        )}
        
        <div className="flex gap-2 items-end">
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={isListening ? stopVoiceRecognition : initVoiceRecognition}
            className={`px-3.5 py-3.5 rounded-2xl font-semibold transition-all shadow-lg flex items-center gap-2 flex-shrink-0 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700"
            }`}
            title={isListening ? "Stop recording" : "Voice input"}
            disabled={loading}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isListening ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              )}
            </svg>
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Ask me anything..."}
              className="w-full px-5 py-3.5 pr-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all shadow-sm"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              disabled={loading || isListening}
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || isListening}
            className={`px-6 py-3.5 rounded-2xl font-semibold text-white transition-all shadow-lg flex items-center gap-2 ${
              loading || isListening
                ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-wait"
                : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Thinking</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
