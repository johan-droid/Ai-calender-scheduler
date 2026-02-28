"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, Settings, LayoutDashboard, ChevronRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Agent Runner", href: "/chat", icon: MessageSquare },
    { name: "Schedules", href: "/calendar", icon: Calendar },
    { name: "Configuration", href: "/settings", icon: Settings },
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
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-50 bg-background border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-foreground">
                        <Calendar className="w-4 h-4 text-background" />
                    </div>
                    <span className="font-semibold tracking-tight text-foreground">
                        SyncAI
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden absolute top-[65px] left-0 right-0 bottom-0 z-40 bg-background border-t border-border p-4 flex flex-col gap-4 overflow-y-auto"
                    >
                        <nav className="flex flex-col gap-1 w-full mt-4">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.name} href={item.href}>
                                        <div
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm">
                                                {item.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-4 pb-8">
                            <div className="w-full flex items-center gap-3 p-3 rounded-md bg-card border border-border">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                                    <span className="font-medium text-foreground text-xs">US</span>
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-medium text-foreground">User Name</span>
                                    <span className="text-xs text-muted-foreground">Engineering</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ width: 72 }}
                animate={{ width: isHovered ? 240 : 72 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="hidden md:flex relative flex-col items-center py-6 z-50 bg-card border-r border-border transition-all duration-300 ease-in-out shrink-0"
            >
                <div className="flex items-center justify-center w-full mb-8">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-md bg-foreground shadow-sm">
                        <Calendar className="w-5 h-5 text-background" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute left-14 whitespace-nowrap font-semibold tracking-tight text-foreground"
                        >
                            SyncAI
                        </motion.div>
                    </div>
                </div>

                <nav className="flex flex-col gap-1 w-full px-3">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={`relative flex items-center px-3 py-2.5 rounded-md cursor-pointer group transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 relative z-10 w-full">
                                        <item.icon className="w-5 h-5 flex-shrink-0" />
                                        <motion.span
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
                                            className={`whitespace-nowrap text-sm ${isActive ? "font-medium" : ""}`}
                                        >
                                            {item.name}
                                        </motion.span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-3 w-full">
                    <div className="w-full flex items-center gap-3 p-2 rounded-md border border-transparent hover:bg-muted transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                            <span className="font-medium text-foreground text-xs">US</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="flex flex-col whitespace-nowrap overflow-hidden pr-2"
                        >
                            <span className="text-sm font-medium text-foreground">User Name</span>
                            <span className="text-xs text-muted-foreground">Engineering</span>
                        </motion.div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative z-0 pt-[65px] md:pt-0 bg-background">
                <div className="h-full w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
