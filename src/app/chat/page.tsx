"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Clock, Calendar as CalendarIcon } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
    actionCard?: "scheduling" | "confirmed";
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hello! I'm your AI scheduling assistant. Need to book a meeting? Just tell me who, when, and the duration.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

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
                    content: "I found a perfect time for you and Alex.",
                    actionCard: "scheduling",
                },
            ]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] w-full max-w-4xl mx-auto glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Background ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-white/5 glass z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg">
                    <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        SyncAI Assistant <Sparkles className="w-4 h-4 text-accent" />
                    </h2>
                    <p className="text-sm text-green-400 font-medium">Online & ready to schedule</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 z-10 scrollbar-hide">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user"
                                        ? "bg-white text-background"
                                        : "bg-primary/20 text-primary border border-primary/30"
                                    }`}
                            >
                                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className="flex flex-col gap-3">
                                <div
                                    className={`p-4 rounded-2xl ${msg.role === "user"
                                            ? "bg-white text-background rounded-tr-sm font-medium"
                                            : "glass text-foreground rounded-tl-sm border border-white/10"
                                        }`}
                                >
                                    {msg.content}
                                </div>

                                {/* Mock Action Cards */}
                                {msg.actionCard === "scheduling" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="glass-card p-5 rounded-2xl border border-primary/20 w-80 shadow-lg"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-bold text-primary tracking-widest uppercase">Proposed Time</span>
                                            <button className="text-xs glass px-3 py-1 rounded-full text-white hover:bg-white/10 transition-colors">Edit</button>
                                        </div>
                                        <div className="flex flex-col gap-3 mb-4">
                                            <div className="flex items-center gap-3 text-white">
                                                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                                <span className="font-semibold text-lg">Tomorrow, Oct 24</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-white">
                                                <Clock className="w-5 h-5 text-muted-foreground" />
                                                <span className="font-semibold text-lg">2:00 PM - 2:30 PM <span className="text-sm text-muted-foreground font-normal">EST</span></span>
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(120,80,255,0.4)]">
                                            Confirm & Send Invites
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4 max-w-[80%]"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="glass p-4 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 glass border-t border-white/5 z-10">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="E.g., Find 45 mins with team marketing next week..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-2 p-3 bg-primary text-primary-foreground rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-[0_0_15px_rgba(120,80,255,0.4)]"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
