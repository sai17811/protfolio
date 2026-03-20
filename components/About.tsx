"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

const stats = [
    { value: "4+", label: "Years Exp." },
    { value: "150K+", label: "Daily Users" },
    { value: "99.9%", label: "Uptime" },
];

export function About() {
    return (
        <section id="about" className="py-16 relative overflow-hidden bg-secondary/5 border-t border-border/40">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container px-4 md:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-3"
                        >
                            <User className="w-3 h-3" />
                            The Builder's Story
                        </motion.div>
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                            About <span className="text-primary italic">Me</span>
                        </h2>
                        <div className="h-0.5 w-10 bg-primary/30 rounded-full mx-auto mt-3" />
                    </div>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-[220px,1fr] gap-8 lg:gap-12 items-start">

                        {/* Left — Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-4"
                        >
                            {/* Image card */}
                            <div className="relative w-[180px] mx-auto group">
                                {/* Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-green-500/10 to-transparent rounded-2xl rotate-3 scale-105 blur-2xl opacity-60 group-hover:rotate-6 transition-all duration-700 -z-10" />

                                <div className="relative w-[180px] h-[220px] rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-secondary/20">
                                    <Image
                                        src="/images/profile.png"
                                        alt="Sai — Senior MERN Developer"
                                        width={180}
                                        height={220}
                                        quality={90}
                                        priority
                                        className="object-cover object-top w-full h-full grayscale-[0.15] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Bottom overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Availability text — subtle, no badge */}
                            <p className="text-[11px] text-green-500 font-semibold tracking-wider flex items-center gap-1.5">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                                </span>
                                Available for roles
                            </p>
                        </motion.div>

                        {/* Right — Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 text-center lg:text-left"
                        >
                            {/* Headline */}
                            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-tight">
                                Architecting{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500 italic">
                                    Scalability
                                </span>{" "}
                                with Precision.
                            </h3>

                            {/* Paragraphs */}
                            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
                                <p>
                                    I specialize in building scalable, production-grade MERN applications. Deep expertise in React, Node.js, and MongoDB — focused on performance and secure architecture.
                                </p>
                                <p className="opacity-80">
                                    Managed mission-critical systems serving 150K+ daily active users with 99.9% uptime, bringing a senior-level perspective to every line of code.
                                </p>
                            </div>

                            {/* Stat cards */}
                            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-3 rounded-xl bg-secondary/10 border border-border/40 hover:border-primary/30 hover:bg-secondary/20 transition-all duration-300 text-center group"
                                    >
                                        <p className="text-lg font-black text-primary leading-none mb-1 group-hover:scale-105 transition-transform duration-200">
                                            {stat.value}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground font-medium leading-tight">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Expertise + Track record */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
                                <div className="p-4 rounded-xl bg-secondary/10 border border-border/40 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300 group">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-primary mb-1 font-black">Expertise</p>
                                    <p className="text-sm font-bold text-foreground leading-snug">Performance Engineering & MERN Stack</p>
                                </div>
                                <div className="p-4 rounded-xl bg-secondary/10 border border-border/40 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300 group">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-primary mb-1 font-black">Track Record</p>
                                    <p className="text-sm font-bold text-foreground leading-snug">4+ Years of Professional Leadership</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
