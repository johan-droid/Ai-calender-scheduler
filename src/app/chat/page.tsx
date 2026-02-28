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
        <div className="flex flex-col h-[calc(100dvh-100px)] md:h-[calc(100dvh-6rem)] w-full max-w-4xl mx-auto md:glass-card rounded-2xl md:rounded-3xl overflow-hidden md:border border-white/10 md:shadow-2xl relative">
            {/* Background ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] md:w-[80%] h-[100%] md:h-[80%] bg-primary/5 blur-[100px] md:blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 border-b border-white/5 glass z-10 shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shrink-0">
                    <Bot className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        SyncAI Assistant <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                    </h2>
                    <p className="text-xs md:text-sm text-green-400 font-medium">Online & ready to schedule</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 md:gap-6 z-10 scrollbar-hide">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`flex gap-3 md:gap-4 max-w-[95%] sm:max-w-[85%] md:max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                }`}
                        >
                            <div
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user"
                                    ? "bg-white text-background"
                                    : "bg-primary/20 text-primary border border-primary/30"
                                    }`}
                            >
                                {msg.role === "user" ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5" />}
                            </div>
                            <div className="flex flex-col gap-2 md:gap-3 w-full">
                                <div
                                    className={`p-3 md:p-4 rounded-2xl text-sm md:text-base ${msg.role === "user"
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
                                        className="glass-card p-4 md:p-5 rounded-2xl border border-primary/20 w-full sm:w-80 shadow-lg"
                                    >
                                        <div className="flex items-center justify-between mb-3 md:mb-4">
                                            <span className="text-xs md:text-sm font-bold text-primary tracking-widest uppercase">Proposed Time</span>
                                            <button className="text-[10px] md:text-xs glass px-3 py-1 rounded-full text-white hover:bg-white/10 transition-colors">Edit</button>
                                        </div>
                                        <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
                                            <div className="flex items-center gap-2 md:gap-3 text-white">
                                                <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground shrink-0" />
                                                <span className="font-semibold text-base md:text-lg">Tomorrow, Oct 24</span>
                                            </div>
                                            <div className="flex items-center gap-2 md:gap-3 text-white">
                                                <Clock className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground shrink-0" />
                                                <span className="font-semibold text-base md:text-lg">2:00 PM - 2:30 PM <span className="text-xs md:text-sm text-muted-foreground font-normal">EST</span></span>
                                            </div>
                                        </div>
                                        <button className="w-full py-2.5 md:py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm md:text-base rounded-xl transition-colors shadow-[0_0_15px_rgba(120,80,255,0.4)]">
                                            Confirm & Send
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
                        className="flex gap-3 md:gap-4 max-w-[95%] sm:max-w-[85%] md:max-w-[80%]"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="glass p-3 md:p-4 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-1.5 md:gap-2 h-fit mt-1">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 glass border-t border-white/5 z-10 shrink-0">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="E.g., Find 45 mins next week..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 md:py-4 pl-4 md:pl-6 pr-14 md:pr-16 text-sm md:text-base text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-1.5 md:right-2 p-2 md:p-3 bg-primary text-primary-foreground rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-[0_0_15px_rgba(120,80,255,0.4)] flex items-center justify-center"
                    >
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
