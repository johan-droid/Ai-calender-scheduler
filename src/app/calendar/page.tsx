"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarPage() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dates = Array.from({ length: 35 }, (_, i) => i - 2); // Mock month grid

    // Mock events
    const events = [
        { date: 4, title: "Design Sync", time: "10:00 AM", color: "bg-primary text-primary-foreground" },
        { date: 12, title: "Marketing Review", time: "2:30 PM", color: "bg-accent text-accent-foreground" },
        { date: 15, title: "1:1 with Alex", time: "11:00 AM", color: "bg-secondary text-secondary-foreground" },
        { date: 22, title: "Board Meeting", time: "1:00 PM", color: "bg-white text-background" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Manage your schedule and AI-booked meetings.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center glass rounded-full border border-white/10 p-1">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="px-4 font-bold text-white min-w-[140px] text-center">October 2026</span>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="glass-card border border-white/10 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card rounded-3xl border border-white/5 overflow-hidden flex-1 flex flex-col min-h-[600px] shadow-2xl relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-white/10 bg-black/20 z-10">
                    {days.map((day) => (
                        <div key={day} className="py-4 text-center font-bold text-muted-foreground uppercase tracking-widest text-sm">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 flex-1 z-10">
                    {dates.map((date, i) => {
                        const isCurrentMonth = date > 0 && date <= 31;
                        const isToday = date === 15; // mock today
                        const dayEvents = events.filter(e => e.date === date);

                        return (
                            <div
                                key={i}
                                className={`min-h-[120px] border-r border-b border-white/5 p-2 transition-colors hover:bg-white/5 group ${!isCurrentMonth ? "opacity-30" : ""
                                    }`}
                            >
                                <div className="flex flex-col h-full gap-2">
                                    <div className={`w-8 h-8 flex items-center justify-center font-semibold text-sm rounded-full ${isToday ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(120,80,255,0.6)]" : "text-white/70"
                                        }`}>
                                        {isCurrentMonth ? date : (date <= 0 ? 30 + date : date - 31)}
                                    </div>

                                    <div className="flex flex-col gap-1 w-full flex-1">
                                        {dayEvents.map((event, j) => (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + (j * 0.1) }}
                                                key={j}
                                                className={`text-xs p-2 rounded-lg font-medium truncate cursor-pointer hover:opacity-80 transition-opacity shadow-sm ${event.color}`}
                                            >
                                                <span className="opacity-80 font-normal mr-1">{event.time}</span>
                                                {event.title}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
