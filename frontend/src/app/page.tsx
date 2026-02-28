"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, CalendarPlus, Search, Clock, Users } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto w-full pt-12 md:pt-24 px-4 sm:px-6 md:px-8 pb-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-muted-foreground w-fit mx-auto md:mx-0 shadow-sm">
            <span className="flex w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium tracking-wide uppercase">System Operational</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Schedule meetings with <br className="hidden md:block" />
            <span className="text-muted-foreground">engineering precision.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mt-4 mx-auto md:mx-0">
            A fast, deterministic scheduling agent. Input your constraints in plain text, and it orchestrates calendar overlaps instantly. Built for teams that value velocity.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col w-full sm:flex-row gap-4 mt-6 md:mt-8 justify-center md:justify-start">
          <Link href="/chat" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium text-sm transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-primary/90">
              Run Scheduler Agent
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
          <Link href="/calendar" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-md font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-all">
              <CalendarPlus className="w-4 h-4 mr-1" />
              View Calendar Interface
            </button>
          </Link>
        </motion.div>

        {/* Feature grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24 pt-8 border-t border-border">
          <div className="flex flex-col gap-3 group">
            <div className="w-10 h-10 bg-card border border-border rounded-md flex items-center justify-center mb-2 shadow-sm">
              <Search className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Semantic Parsing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Instantly translates natural language queries into exact time-range constraints. Fast, local NLP.</p>
          </div>

          <div className="flex flex-col gap-3 group">
            <div className="w-10 h-10 bg-card border border-border rounded-md flex items-center justify-center mb-2 shadow-sm">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Conflict Resolution Algorithm</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">O(N log N) interval overlap detection across multiple participant calendars, finding the optimal slot.</p>
          </div>

          <div className="flex flex-col gap-3 group">
            <div className="w-10 h-10 bg-card border border-border rounded-md flex items-center justify-center mb-2 shadow-sm">
              <Users className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">OAuth Native Integration</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Direct API hooks into Google Workspace & Microsoft Graph. No middlemen, exact availability data.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
