"use client";

import { motion } from "framer-motion";
import { Plug, Calendar as CalendarIcon, Mail, Shield, AlertCircle, Phone, Video } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Settings & Integrations</h1>
                <p className="text-muted-foreground mt-2 text-lg">Connect your accounts and configure your scheduling preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 rounded-3xl border border-white/5"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Plug className="w-6 h-6 text-primary" /> Connected Integrations
                        </h2>

                        <div className="flex flex-col gap-4">
                            {/* Google Calendar */}
                            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center">
                                        {/* SVG Icon for Google Calendar (simulated) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px"><path fill="#fbc02d" d="M43,30v12c0,2.2-1.8,4-4,4H9c-2.2,0-4-1.8-4-4V30H43z" /><path fill="#1976d2" d="M43,18v12H5V18H43z" /><path fill="#4caf50" d="M43,6v12H5V6H43z" /><path fill="#1565c0" d="M43,6v12h-8V6H43z" /><path fill="#1976d2" d="M35,6v12h-8V6H35z" /><path fill="#fbc02d" d="M35,30v12h-8V30H35z" /><path fill="#f57f17" d="M43,30v12h-8V30H43z" /><path fill="#388e3c" d="M42,6h1c0.6,0,1,0.4,1,1v11H35V6H42z" /><path fill="#f57f17" d="M44,46h-1c-2.2,0-4-1.8-4-4v-8h9v8C44,44.2,42.2,46,44,46z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Google Calendar</h3>
                                        <p className="text-sm text-green-400 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" /> Connected as user@organization.com
                                        </p>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold px-4 py-2 glass rounded-full text-white hover:bg-destructive hover:text-white transition-all">
                                    Disconnect
                                </button>
                            </div>

                            {/* Microsoft Outlook */}
                            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#0078D4] p-2 flex items-center justify-center text-white">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Microsoft Outlook</h3>
                                        <p className="text-sm text-muted-foreground">Not connected</p>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold px-4 py-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-all shadow-[0_0_15px_rgba(120,80,255,0.4)]">
                                    Connect
                                </button>
                            </div>

                            {/* Zoom */}
                            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#2D8CFF] p-2 flex items-center justify-center text-white">
                                        <Video className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Zoom</h3>
                                        <p className="text-sm text-muted-foreground">Not connected</p>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold px-4 py-2 bg-white text-background rounded-full hover:scale-105 transition-all">
                                    Connect
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-3xl border border-white/5"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-accent" /> Privacy & Advanced
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-white">Auto-Schedule Approval</h4>
                                    <p className="text-sm text-muted-foreground">Require your approval before AI sends invites.</p>
                                </div>
                                <div className="w-14 h-8 rounded-full bg-primary relative cursor-pointer shadow-[0_0_15px_rgba(120,80,255,0.4)]">
                                    <div className="absolute right-1 top-1 w-6 h-6 rounded-full bg-white transition-all shadow-sm" />
                                </div>
                            </div>
                            <div className="h-[1px] w-full bg-white/10 my-2" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-white">AI Data Access</h4>
                                    <p className="text-sm text-muted-foreground">Allow AI to read meeting descriptions for context.</p>
                                </div>
                                <div className="w-14 h-8 rounded-full bg-white/10 border border-white/20 relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-muted-foreground transition-all" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Settings */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col gap-4"
                    >
                        <h3 className="font-bold text-lg text-white mb-2">Working Hours</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                <span className="font-medium text-white">Mon - Fri</span>
                                <span className="text-sm font-bold text-primary">9:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 opacity-50">
                                <span className="font-medium text-white">Sat - Sun</span>
                                <span className="text-sm">Off</span>
                            </div>
                            <button className="w-full mt-2 py-3 glass rounded-xl text-white font-bold hover:bg-white/10 transition-colors">
                                Edit Hours
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-3xl border border-accent/30 bg-accent/5 flex flex-col gap-4 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-colors" />
                        <div className="flex items-center gap-3 text-accent z-10">
                            <AlertCircle className="w-6 h-6" />
                            <h3 className="font-bold text-lg text-white">SyncAI Pro</h3>
                        </div>
                        <p className="text-sm text-muted-foreground z-10 leading-relaxed">
                            Upgrade to Pro to unlock unlimited scheduling, group voting, and deep integration with your CRM.
                        </p>
                        <button className="mt-2 w-full py-3 bg-white text-background rounded-xl font-bold hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all z-10">
                            Upgrade Now
                        </button>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
