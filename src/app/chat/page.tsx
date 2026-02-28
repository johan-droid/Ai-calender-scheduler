"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Calendar as CalendarIcon, Clock, ChevronRight } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
    actionCard?: "scheduling" | "confirmed";
};

// Custom Aesthetic SVG for the AI Avatar
const AIAvatar = () => (
    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-[#E2F0CB] to-[#B5EAD7] flex items-center justify-center flex-shrink-0 shadow-sm border border-white/20 overflow-hidden group">
        <svg className="w-5 h-5 text-[#4D8C57] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" opacity="0.4" />
            <path d="M16 13h-2v-2h2v2zm-4 0h-2v-2h2v2zm0-4h-2V7h2v2zm4 0h-2V7h2v2z" />
        </svg>
    </div>
);

// Custom Aesthetic Avatar for the User
const UserAvatar = () => (
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center flex-shrink-0 shadow-inner border border-white/10">
        <span className="text-sm md:text-base font-medium text-zinc-300">ME</span>
    </div>
);

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hey there! ✨ I can help you find time with anyone. Just tell me who you'd like to meet with and roughly when!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Mock AI response for UI demonstration
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: "I took a look at both calendars. How does this slot work for you both?",
                    actionCard: "scheduling",
                },
            ]);
        }, 1800);
    };

    return (
        <div className="flex flex-col h-[calc(100dvh-100px)] md:h-[calc(100dvh-6rem)] w-full max-w-4xl mx-auto md:bg-zinc-950/40 rounded-2xl md:rounded-[2rem] overflow-hidden md:border border-white/5 md:shadow-2xl relative">
            {/* Subtle background gradient */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none opacity-50" />

            {/* Header */}
            <div className="flex items-center gap-3 p-4 md:p-6 z-10 shrink-0 border-b border-white/5 bg-background/40 backdrop-blur-md">
                <div className="relative">
                    <AIAvatar />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-base md:text-lg font-semibold text-zinc-100 tracking-tight">
                        Assistant
                    </h2>
                    <p className="text-[11px] md:text-xs text-zinc-400 font-medium">Normally replies instantly</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 md:gap-8 z-10 scroll-smooth">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className={`flex gap-3 md:gap-4 w-full ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            {msg.role === "user" ? <UserAvatar /> : <AIAvatar />}

                            <div className={`flex flex-col gap-3 max-w-[85%] md:max-w-[70%] mt-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                <div
                                    className={`px-4 py-3 md:px-5 md:py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === "user"
                                        ? "bg-zinc-100 text-zinc-900 rounded-tr-sm font-medium"
                                        : "bg-zinc-900/80 text-zinc-200 rounded-tl-sm border border-white/10 backdrop-blur-md"
                                        }`}
                                >
                                    {msg.content}
                                </div>

                                {/* Custom Widget-Style Action Card */}
                                {msg.actionCard === "scheduling" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                                        className="w-full sm:w-[320px] bg-zinc-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl backdrop-blur-xl mt-1"
                                    >
                                        <div className="bg-primary/10 px-4 py-3 border-b border-primary/20 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-primary">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span className="text-xs font-semibold tracking-wide uppercase">Proposed Slot</span>
                                            </div>
                                            <button className="text-[11px] text-zinc-400 hover:text-white transition-colors font-medium px-2 py-1 rounded hover:bg-white/5">Modify</button>
                                        </div>

                                        <div className="p-5 flex flex-col gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-semibold text-zinc-100 tracking-tight">Oct 24</span>
                                                <span className="text-sm text-zinc-400 font-medium">Tomorrow afternoon</span>
                                            </div>

                                            <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                                                    <Clock className="w-4 h-4 text-zinc-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-zinc-200">2:00 PM – 2:30 PM</span>
                                                    <span className="text-[11px] text-zinc-500 font-medium">Eastern Time (ET)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border-t border-white/5 bg-black/20">
                                            <button className="w-full py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-sm rounded-xl transition-all shadow-[0_2px_10px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group">
                                                Send Invites
                                                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 md:gap-4 w-full"
                    >
                        <AIAvatar />
                        <div className="bg-zinc-900/80 p-4 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-1.5 h-fit mt-1 backdrop-blur-md shadow-sm">
                            <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                            <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                            <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        </div>
                    </motion.div>
                )}
                {/* Invisible element to auto-scroll to */}
                <div ref={messagesEndRef} className="h-1 pb-4 md:pb-8" />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-6 z-10 shrink-0 bg-background/60 backdrop-blur-xl border-t border-white/5">
                <div className="relative flex items-center group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Message assistant..."
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-3.5 md:py-4 pl-5 md:pl-6 pr-14 md:pr-16 text-[15px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all font-medium shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-1.5 md:right-2 p-2 md:p-2.5 bg-zinc-100 text-zinc-900 rounded-full hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-md flex items-center justify-center"
                    >
                        <Send className="w-4 h-4 md:w-5 md:h-5 ml-[2px]" />
                    </button>
                </div>
                <div className="text-center mt-3 hidden md:block">
                    <span className="text-[10px] text-zinc-600 font-medium">SyncAI can make mistakes. Consider verifying important meeting slots.</span>
                </div>
            </div>
        </div>
    );
}
