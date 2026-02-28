"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, CalendarPlus, Sparkles, Clock, Users } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative background blobs for extra premium feel, optimized for mobile */}
      <div className="absolute top-0 right-[-10%] md:right-0 w-[80vw] max-w-[500px] h-[80vw] max-h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] md:left-0 w-[60vw] max-w-[300px] h-[60vw] max-h-[300px] bg-accent/10 rounded-full blur-[60px] md:blur-[80px] -z-10 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto w-full pt-12 md:pt-20 px-4 sm:px-6 md:px-8 pb-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-card border border-primary/20 text-primary w-fit mx-auto md:mx-0 shadow-[0_0_20px_rgba(120,80,255,0.2)]">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">SyncAI v1.0 is live</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight lg:leading-[1.1]">
            Schedule Meetings <br className="hidden md:block" />
            <span className="text-gradient block mt-1 md:mt-0 md:inline">Without the Chaos.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mt-2 mx-auto md:mx-0 px-2 md:px-0">
            Let the AI handle the back-and-forth. Just say what you need, and we'll find the perfect time for everyone involved.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col w-full sm:flex-row gap-4 mt-6 md:mt-8 justify-center md:justify-start">
          <Link href="/chat" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-background px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] group">
              Start Auto-Scheduling
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/calendar" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 glass px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white/10 transition-colors duration-300 border border-white/10">
              <CalendarPlus className="w-4 h-4 md:w-5 md:h-5" />
              View Calendar
            </button>
          </Link>
        </motion.div>

        {/* Feature grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
          <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Smart NLP Engine</h3>
            <p className="text-sm md:text-base text-muted-foreground">Type naturally. "Book a 30m sync with Alex tomorrow afternoon" — we parse it all.</p>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-accent/30 transition-colors group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Conflict Resolution</h3>
            <p className="text-sm md:text-base text-muted-foreground">Instantly compares availability across all participants' calendars to find the magical overlap.</p>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-secondary/30 transition-colors group sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Team Integration</h3>
            <p className="text-sm md:text-base text-muted-foreground">Works seamlessly with Google Workspace & Outlook to see when your teammates are truly free.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
