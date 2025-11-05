// Utility to generate or retrieve a session ID for chat history
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  const SESSION_KEY = "chat_session_id";
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

// Clear session ID (useful for clearing history)
export function clearSessionId(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("chat_session_id");
  }
}
