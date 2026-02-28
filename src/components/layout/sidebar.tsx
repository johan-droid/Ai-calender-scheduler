"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, Settings, LayoutDashboard, ChevronRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Scheduler AI", href: "/chat", icon: MessageSquare },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-background w-full">
            {/* Mobile Header with Hamburger */}
            <div className="md:hidden flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-50 glass border-b border-white/5 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-sm">
                        <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white leading-none mt-1">
                        Sync<span className="text-accent-foreground text-gradient">AI</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-[73px] left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-white/5 p-4 flex flex-col gap-4 overflow-y-auto"
                    >
                        <nav className="flex flex-col gap-2 w-full mt-4">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.name} href={item.href}>
                                        <div
                                            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? "bg-primary/20 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                                                }`}
                                        >
                                            <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                                            <span className="font-medium text-lg">
                                                {item.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Profile / Status at bottom on mobile */}
                        <div className="mt-auto pt-4 pb-8">
                            <div className="w-full flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                                    <span className="font-bold text-white text-sm">US</span>
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-semibold text-white">User Name</span>
                                    <span className="text-xs text-muted-foreground">Pro Plan</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ width: 80 }}
                animate={{ width: isHovered ? 260 : 80 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="hidden md:flex relative flex-col items-center py-8 z-50 glass border-r border-white/5 shadow-2xl transition-all duration-300 ease-in-out shrink-0"
            >
                <div className="flex items-center justify-center w-full mb-12">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute left-16 whitespace-nowrap font-bold text-xl tracking-tight text-white"
                        >
                            Sync<span className="text-accent-foreground text-gradient">AI</span>
                        </motion.div>
                    </div>
                </div>

                <nav className="flex flex-col gap-4 w-full px-4">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={`relative flex items-center p-3 rounded-2xl cursor-pointer group transition-all duration-300 ${isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute inset-0 rounded-2xl bg-primary/20 border border-primary/30"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="flex items-center gap-4 relative z-10 w-full">
                                        <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                                            className="whitespace-nowrap font-medium text-sm md:text-base pr-4"
                                        >
                                            {item.name}
                                        </motion.span>

                                        {isHovered && !isActive && (
                                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile / Status at bottom */}
                <div className="mt-auto px-4 w-full">
                    <div className="w-full flex items-center gap-4 p-3 rounded-2xl glass-card border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                            <span className="font-bold text-white text-sm">US</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="flex flex-col whitespace-nowrap overflow-hidden pr-4"
                        >
                            <span className="text-sm font-semibold text-white">User Name</span>
                            <span className="text-xs text-muted-foreground">Pro Plan</span>
                        </motion.div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative z-0 pt-[73px] md:pt-0">
                <div className="h-full w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
