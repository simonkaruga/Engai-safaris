"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  safariSlugs?: string[];
}

const STORAGE_KEY = "engai-chat-messages";
const SESSION_KEY = "engai-chat-id";

const INITIAL: Message = {
  role: "assistant",
  content: "Jambo! I'm **Engai** — your personal Kenya safari planner.\n\nI'll help you build the perfect safari in a few questions.\n\n**When are you thinking of visiting Kenya, and roughly how many days do you have?**",
};

// Context-aware quick reply chips
const QUICK_REPLIES: Record<number, string[]> = {
  1: ["2–3 days", "5–7 days", "10–14 days", "Just a day trip"],
  2: ["Masai Mara (Big Five)", "Amboseli + Kilimanjaro", "Beach + Safari combo", "Family with kids", "Honeymoon"],
  3: ["Budget — under $400/pp", "Mid-range $400–800/pp", "Luxury $800+/pp"],
};

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? Math.random().toString(36).substring(2);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function formatMessage(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const paragraphs = text.split(/\n\n/);
  paragraphs.forEach((para, pi) => {
    if (pi > 0) nodes.push(<span key={`br-${pi}`} className="block mt-2" />);
    const parts = para.split(/(\*\*.*?\*\*|\*.*?\*|\n)/);
    parts.forEach((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        nodes.push(<strong key={`${pi}-${i}`}>{part.slice(2, -2)}</strong>);
      } else if (part.startsWith("*") && part.endsWith("*")) {
        nodes.push(<em key={`${pi}-${i}`}>{part.slice(1, -1)}</em>);
      } else if (part === "\n") {
        nodes.push(<br key={`${pi}-${i}`} />);
      } else {
        nodes.push(part);
      }
    });
  });
  return nodes;
}

function SafariPill({ slug, index }: { slug: string; index: number }) {
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return (
    <div
      className="flex items-center gap-2 mt-1 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >
      <Link
        href={`/safaris/${slug}`}
        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 hover:border-teal-DEFAULT hover:text-teal-DEFAULT px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      >
        View details
      </Link>
      <Link
        href={`/book?safari=${slug}&pax=2`}
        className="inline-flex items-center gap-1.5 bg-teal-DEFAULT hover:bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        Book {name}
      </Link>
    </div>
  );
}

function SafariPillSkeleton() {
  return (
    <div className="flex items-center gap-2 mt-1 animate-pulse">
      <div className="h-7 bg-gray-200 rounded-lg w-24" />
      <div className="h-7 bg-teal-100 rounded-lg w-32" />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

export default function SafariPlannerChat() {
  const [messages, setMessages]     = useState<Message[]>(() => {
    if (typeof window === "undefined") return [INITIAL];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [INITIAL];
    } catch {
      return [INITIAL];
    }
  });
  const [input,     setInput]       = useState("");
  const [loading,   setLoading]     = useState(false);
  const [showForm,  setShowForm]    = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [name,      setName]        = useState("");
  const [email,     setEmail]       = useState("");
  const [phone,     setPhone]       = useState("");
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const abortRef   = useRef<AbortController | null>(null);

  // Persist conversation
  useEffect(() => {
    if (messages.some((m) => !m.streaming)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Show enquiry form after 2 AI turns
  useEffect(() => {
    const aiCount = messages.filter((m) => m.role === "assistant").length;
    if (aiCount >= 2) setShowForm(true);
  }, [messages]);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([INITIAL]);
    setShowForm(false);
    setSubmitted(false);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    // Add streaming placeholder
    setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-planner/chat-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: updated, session_id: getSessionId() }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? `Server error ${res.status}`);
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = "";
      let slugs: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));

          if (data.chunk !== undefined) {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.streaming) {
                return [
                  ...prev.slice(0, -1),
                  { ...last, content: last.content + data.chunk },
                ];
              }
              return prev;
            });
          }

          if (data.done) {
            slugs = data.safari_slugs ?? [];
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.streaming) {
                return [
                  ...prev.slice(0, -1),
                  { ...last, streaming: false, safariSlugs: slugs },
                ];
              }
              return prev;
            });
          }

          if (data.error) throw new Error(data.error);
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      const errMsg = `Sorry, something went wrong: ${err instanceof Error ? err.message : "unknown error"}. Please try again or WhatsApp us.`;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.streaming) {
          return [...prev.slice(0, -1), { role: "assistant", content: errMsg }];
        }
        return [...prev, { role: "assistant", content: errMsg }];
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  async function submitEnquiry() {
    if (!name || !email || loading) return;
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-planner/submit-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: messages, customer_name: name, customer_email: email, customer_phone: phone }),
      });
      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }

  const aiTurnCount = messages.filter((m) => m.role === "assistant").length;
  const chips = QUICK_REPLIES[aiTurnCount] ?? [];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-card">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Enquiry Sent!</h2>
        <p className="text-gray-500 max-w-sm text-sm leading-relaxed mb-8">
          Our team will review your conversation with Engai and send you a personalised quote within 4 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20B957] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Chat on WhatsApp
          </a>
          <button
            onClick={resetChat}
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Start a new chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[640px] bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">

      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-950 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-teal-DEFAULT flex items-center justify-center font-display font-bold text-white text-base">
              E
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Engai · AI Safari Planner</p>
            <p className="text-xs text-gray-400">Powered by Claude · Responds instantly</p>
          </div>
        </div>
        <button
          onClick={resetChat}
          title="Start a new conversation"
          aria-label="Start a new conversation"
          className="text-gray-500 hover:text-gray-300 transition-colors p-1.5 rounded-lg hover:bg-white/10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-stone-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2.5`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-teal-DEFAULT flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                E
              </div>
            )}
            <div className="max-w-[82%] space-y-2">
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-teal-DEFAULT text-white rounded-tr-sm"
                    : "bg-white text-gray-800 shadow-sm rounded-tl-sm border border-gray-100"
                } ${msg.streaming ? "border-teal-100" : ""}`}
              >
                {msg.streaming && msg.content === "" ? (
                  <TypingDots />
                ) : (
                  <p>{formatMessage(msg.content)}</p>
                )}
                {msg.streaming && msg.content !== "" && (
                  <span className="inline-block w-0.5 h-4 bg-teal-DEFAULT ml-0.5 animate-pulse align-middle" />
                )}
              </div>

              {/* Safari recommendation pills — animate in staggered */}
              {msg.safariSlugs && msg.safariSlugs.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {msg.safariSlugs.map((slug, pi) => (
                    <SafariPill key={slug} slug={slug} index={pi} />
                  ))}
                </div>
              )}

              {/* Skeleton pills while streaming on turn 3+ (AI may be recommending safaris) */}
              {msg.streaming && msg.content.length > 60 && aiTurnCount >= 3 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <SafariPillSkeleton />
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Quick-reply chips */}
      {chips.length > 0 && !loading && (
        <div className="flex gap-2 flex-wrap px-4 pb-3 pt-1 bg-stone-50 border-t border-stone-100 flex-shrink-0">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => send(chip)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT hover:bg-teal-50 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Book Now CTA — appears after AI has made a recommendation */}
      {showForm && !submitted && (
        <div className="border-t border-gray-100 bg-teal-DEFAULT/5 px-4 py-3 flex-shrink-0">
          <p className="text-xs font-semibold text-teal-700 mb-2.5">Ready to book?</p>
          <div className="flex gap-2 flex-wrap items-center">
            <Link
              href="/safaris"
              className="text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT bg-white font-semibold transition-colors"
            >
              Browse all safaris
            </Link>
            <Link
              href="/book"
              className="text-xs px-4 py-2 rounded-lg bg-teal-DEFAULT hover:bg-teal-600 text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              Book now — instant confirmation
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <span className="text-gray-300 text-xs hidden sm:block">or</span>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              keep chatting
            </button>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 flex gap-2 flex-shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Tell Engai about your dream safari…"
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-60 bg-gray-50 focus:bg-white transition-colors"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="bg-teal-DEFAULT hover:bg-teal-600 text-white w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-50 transition-all hover:-translate-y-0.5 flex-shrink-0"
          aria-label="Send message"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
