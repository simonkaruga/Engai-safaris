"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface SafariResult {
  slug: string;
  name: string;
  tagline: string | null;
  category: string | null;
  duration_days: number;
  price_usd_2pax: number | null;
  cover_image: string | null;
  highlights: string[];
}

interface ToolEvent {
  tool_start?: string;
  tool_result?: string;
  data?: Record<string, unknown>;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  toolEvent?: ToolEvent;
  safariResults?: SafariResult[];
  enquiryRef?: string;
}

const STORAGE_KEY = "engai-agent-messages";
const SESSION_KEY = "engai-agent-id";

const INITIAL: Message = {
  role: "assistant",
  content: "Jambo! I'm **Engai**, your AI safari agent.\n\nI can search our safaris, check availability, and book for you — all right here in this chat.\n\n**When are you thinking of visiting Kenya, and how many days do you have?**",
};

const QUICK_REPLIES: Record<number, string[]> = {
  1: ["2–3 days", "5–7 days", "10+ days", "Just a day trip"],
  2: ["Masai Mara (Big Five)", "Amboseli + Kilimanjaro", "Beach + Safari", "Family with kids", "Honeymoon"],
  3: ["Budget under $400/pp", "Mid-range $400–800/pp", "Luxury $800+/pp"],
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
  text.split(/\n\n/).forEach((para, pi) => {
    if (pi > 0) nodes.push(<span key={`br-${pi}`} className="block mt-2" />);
    para.split(/(\*\*.*?\*\*|\*.*?\*|\n)/).forEach((part, i) => {
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

function ToolIndicator({ event }: { event: ToolEvent }) {
  const labels: Record<string, string> = {
    search_safaris: "🔍 Searching safaris...",
    get_safari_details: "📋 Getting details...",
    check_availability: "📅 Checking availability...",
    create_enquiry: "✅ Creating your booking...",
  };
  if (event.tool_start) {
    return (
      <div className="flex items-center gap-2 text-xs text-teal-600 bg-teal-50 border border-teal-100 rounded-lg px-3 py-2 animate-pulse">
        <span>{labels[event.tool_start] ?? `Running ${event.tool_start}...`}</span>
      </div>
    );
  }
  return null;
}

function SafariCard({ safari, index }: { safari: SafariResult; index: number }) {
  const pricePerPerson = safari.price_usd_2pax ? safari.price_usd_2pax / 2 : null;
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {safari.cover_image && (
        <div className="relative h-32 bg-gray-100">
          <Image src={safari.cover_image} alt={safari.name} fill className="object-cover" sizes="300px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {safari.category && (
            <span className="absolute top-2 left-2 bg-teal-DEFAULT text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {safari.category}
            </span>
          )}
          <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {safari.duration_days}d
          </span>
        </div>
      )}
      <div className="p-3">
        <p className="font-semibold text-gray-900 text-sm leading-tight mb-1">{safari.name}</p>
        {safari.tagline && <p className="text-gray-500 text-xs mb-2 line-clamp-2">{safari.tagline}</p>}
        {safari.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {safari.highlights.slice(0, 2).map((h) => (
              <span key={h} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{h}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          {pricePerPerson && (
            <p className="text-teal-DEFAULT font-bold text-sm">${Math.round(pricePerPerson)}<span className="text-gray-400 font-normal text-xs">/pp</span></p>
          )}
          <div className="flex gap-1.5 ml-auto">
            <Link href={`/safaris/${safari.slug}`} className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT font-semibold transition-colors">
              Details
            </Link>
            <Link href={`/book?safari=${safari.slug}&pax=2`} className="text-xs px-2.5 py-1.5 bg-teal-DEFAULT hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors">
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiryConfirmation({ ref: enquiryRef }: { ref: string }) {
  return (
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-semibold text-teal-800 text-sm">Booking Enquiry Created!</p>
      </div>
      <p className="text-teal-700 text-xs mb-1">Reference: <span className="font-bold">{enquiryRef}</span></p>
      <p className="text-teal-600 text-xs">Our team will contact you within 4 hours with a confirmed quote and payment link.</p>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0, 150, 300].map((delay) => (
        <span key={delay} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  );
}

export default function SafariPlannerChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [INITIAL];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [INITIAL];
    } catch { return [INITIAL]; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (messages.some((m) => !m.streaming)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([INITIAL]);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const conversation = messages
      .filter((m) => !m.toolEvent)
      .map((m) => ({ role: m.role, content: m.content }))
      .concat({ role: "user", content: msg });

    setMessages((prev) => [...prev, { role: "user", content: msg }, { role: "assistant", content: "", streaming: true }]);
    setInput("");
    setLoading(true);
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-planner/agent-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation, session_id: getSessionId() }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error(`Server error ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));

          if (data.type === "chunk") {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.streaming) return [...prev.slice(0, -1), { ...last, content: last.content + data.chunk }];
              return prev;
            });
          }

          if (data.type === "tool") {
            if (data.tool_start) {
              // Insert tool indicator before the streaming message
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.streaming) {
                  return [...prev.slice(0, -1), { role: "assistant", content: "", toolEvent: { tool_start: data.tool_start } }, last];
                }
                return prev;
              });
            }
            if (data.tool_result === "search_safaris" && data.data?.safaris) {
              const safaris = data.data.safaris as SafariResult[];
              setMessages((prev) => {
                // Remove tool indicator
                const withoutIndicator = prev.filter((m) => !m.toolEvent?.tool_start);
                const last = withoutIndicator[withoutIndicator.length - 1];
                if (last?.streaming) {
                  return [...withoutIndicator.slice(0, -1), { ...last, safariResults: safaris }];
                }
                return withoutIndicator;
              });
            }
            if (data.tool_result === "create_enquiry" && data.data?.reference) {
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.streaming) return [...prev.slice(0, -1), { ...last, enquiryRef: data.data.reference as string }];
                return prev;
              });
            }
          }

          if (data.type === "done") {
            setMessages((prev) => {
              const filtered = prev.filter((m) => !m.toolEvent?.tool_start);
              const last = filtered[filtered.length - 1];
              if (last?.streaming) return [...filtered.slice(0, -1), { ...last, streaming: false }];
              return filtered;
            });
          }

          if (data.type === "error") throw new Error(data.message);
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const errMsg = `Sorry, something went wrong. Please try again or WhatsApp us.`;
        if (last?.streaming) return [...prev.slice(0, -1), { role: "assistant", content: errMsg }];
        return [...prev, { role: "assistant", content: errMsg }];
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const aiTurnCount = messages.filter((m) => m.role === "assistant").length;
  const chips = QUICK_REPLIES[aiTurnCount] ?? [];

  return (
    <div className="flex flex-col h-[680px] bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-950 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-teal-DEFAULT flex items-center justify-center font-display font-bold text-white text-base">E</div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Engai · AI Safari Agent</p>
            <p className="text-xs text-gray-400">Searches · Books · Confirms — all in chat</p>
          </div>
        </div>
        <button onClick={resetChat} title="New conversation" className="text-gray-500 hover:text-gray-300 transition-colors p-1.5 rounded-lg hover:bg-white/10">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-stone-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2.5`}>
            {msg.role === "assistant" && !msg.toolEvent && (
              <div className="w-7 h-7 rounded-full bg-teal-DEFAULT flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">E</div>
            )}
            <div className={`max-w-[85%] space-y-2 ${msg.toolEvent ? "w-full" : ""}`}>
              {msg.toolEvent ? (
                <ToolIndicator event={msg.toolEvent} />
              ) : (
                <>
                  {(msg.content || msg.streaming) && (
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-teal-DEFAULT text-white rounded-tr-sm"
                        : "bg-white text-gray-800 shadow-sm rounded-tl-sm border border-gray-100"
                    }`}>
                      {msg.streaming && msg.content === "" ? <TypingDots /> : <p>{formatMessage(msg.content)}</p>}
                      {msg.streaming && msg.content !== "" && (
                        <span className="inline-block w-0.5 h-4 bg-teal-DEFAULT ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>
                  )}
                  {msg.safariResults && msg.safariResults.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {msg.safariResults.map((safari, si) => (
                        <SafariCard key={safari.slug} safari={safari} index={si} />
                      ))}
                    </div>
                  )}
                  {msg.enquiryRef && <EnquiryConfirmation ref={msg.enquiryRef} />}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick reply chips */}
      {chips.length > 0 && !loading && (
        <div className="flex gap-2 flex-wrap px-4 pb-3 pt-1 bg-stone-50 border-t border-stone-100 flex-shrink-0">
          {chips.map((chip) => (
            <button key={chip} onClick={() => send(chip)} className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT hover:bg-teal-50 transition-colors">
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
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
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
