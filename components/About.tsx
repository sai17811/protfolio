"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export function About() {
    return (
        <section id="about" className="py-20 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
                    </div>

                    <div className="grid md:grid-cols-[1.5fr,1fr] gap-12 items-start">
                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p className="text-lg font-medium text-foreground">
                                I'm a passionate Full-Stack Developer with over 3.6 years of experience building web applications that are not just functional, but exceptional.
                            </p>
                            <p>
                                My journey in software development started with a curiosity for how things work on the web. Today, I specialize in the React ecosystem, crafting scalable front-end architectures and robust back-end solutions. I thrive on solving complex problems and turning ideas into reality through clean, maintainable code.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to open-source, or optimizing my workflow to be 1% better every day.
                            </p>
                        </div>

                        <div className="bg-background p-6 rounded-2xl border border-border/50 shadow-sm">
                            <h3 className="font-semibold mb-4">Quick Facts</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Experience</span>
                                    <span className="font-medium">3.6+ Years</span>
                                </li>
                                <li className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Location</span>
                                    <span className="font-medium">Remote / Hybrid</span>
                                </li>
                                <li className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Focus</span>
                                    <span className="font-medium">React, Next.js, TS</span>
                                </li>
                                <li className="flex justify-between py-2 pt-2">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="font-medium text-green-500">Available</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
