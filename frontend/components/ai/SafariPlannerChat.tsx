"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL: Message = {
  role: "assistant",
  content: "Jambo! I'm **Engai** — your personal Kenya safari planner. 🌍\n\nI'll help you build the perfect safari in just a few questions.\n\nTo get started — **when are you thinking of visiting Kenya, and roughly how many days do you have?**",
};

function getSessionId(): string {
  let id = sessionStorage.getItem("engai-chat-id");
  if (!id) {
    id = Math.random().toString(36).substring(2);
    sessionStorage.setItem("engai-chat-id", id);
  }
  return id;
}

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export default function SafariPlannerChat() {
  const [messages,   setMessages]   = useState<Message[]>([INITIAL]);
  const [input,      setInput]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [phone,      setPhone]      = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Show submit form after tourist has had 2+ AI responses
  useEffect(() => {
    const count = messages.filter((m) => m.role === "assistant").length;
    if (count >= 2) setShowSubmit(true);
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/ai-planner/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ conversation: updated, session_id: getSessionId() }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having a moment! Please try again or WhatsApp us directly." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitEnquiry() {
    if (!name || !email || loading) return;
    setLoading(true);
    await fetch("/api/ai-planner/submit-enquiry", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ conversation: messages, customer_name: name, customer_email: email, customer_phone: phone }),
    });
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-200 rounded-2xl bg-white">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-semibold mb-2">Enquiry Sent!</h2>
        <p className="text-gray-500 max-w-sm text-sm">
          Our team will review your conversation with Engai and send you a personalised quote within 4 hours.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
        >
          💬 Chat on WhatsApp Instead
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">

      {/* Header */}
      <div className="bg-teal-700 text-white px-5 py-4 flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center font-bold text-lg">
          E
        </div>
        <div>
          <p className="font-semibold text-sm">Engai — AI Safari Planner</p>
          <p className="text-xs text-teal-200">Powered by Claude AI · Responds instantly</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-teal-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
              }`}
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Submit-to-team form */}
      {showSubmit && (
        <div className="border-t border-gray-100 bg-teal-50 px-4 py-3 flex-shrink-0">
          <p className="text-xs font-semibold text-teal-700 mb-2">
            Ready for a personalised quote? Leave your details:
          </p>
          <div className="flex gap-2 flex-wrap">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              className="flex-1 min-w-[110px] text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address *"
              className="flex-1 min-w-[140px] text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp (optional)"
              className="flex-1 min-w-[120px] text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <button
              onClick={submitEnquiry}
              disabled={!name || !email || loading}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-4 py-2 rounded-lg font-semibold disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              Send to Engai Team →
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 flex gap-2 flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Tell Engai about your dream safari..."
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-60"
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
