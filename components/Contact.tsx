"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Send, Code2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                e.currentTarget.reset();

                // Reset after 5 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 5000);
            } else {
                // Handle non-200 responses
                setError('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background -z-20" />

            <div className="container px-4 md:px-6 max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Let's work <span className="text-primary">together.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Interested in new opportunities? Feel free to reach out.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="space-y-2 md:space-y-3">
                            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                                Let's work <span className="text-primary">together.</span>
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm">
                                Interested in new opportunities? Feel free to reach out.
                            </p>
                        </div>

                        <div className="space-y-3 md:space-y-4">
                            <a href="mailto:nagasai.akula.dev@gmail.com" className="flex items-center gap-2 md:gap-3 group p-2.5 md:p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
                                <div className="p-1.5 md:p-2 rounded-lg bg-background shadow-sm group-hover:scale-105 transition-transform">
                                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground font-medium">Email</p>
                                    <p className="text-xs md:text-sm font-semibold truncate">nagasai.akula.dev@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+917995877013" className="flex items-center gap-2 md:gap-3 group p-2.5 md:p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
                                <div className="p-1.5 md:p-2 rounded-lg bg-background shadow-sm group-hover:scale-105 transition-transform">
                                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">Mobile</p>
                                    <p className="text-xs md:text-sm font-semibold">+91 7995877013</p>
                                </div>
                            </a>
                        </div>

                        <div className="flex gap-2 md:gap-3 pt-2">
                            <Link href="https://github.com/sai1781" target="_blank" className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all border border-border/50 hover:border-primary text-xs md:text-sm">
                                <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span className="font-medium">GitHub</span>
                            </Link>
                            <Link href="https://leetcode.com/u/nagasaitac143" target="_blank" className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500 hover:text-white transition-all border border-yellow-500/30 hover:border-yellow-500 text-xs md:text-sm">
                                <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span className="font-medium">LeetCode</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-3 md:space-y-4"
                    >
                        <div className="p-3 md:p-4 rounded-xl bg-primary/5 border border-primary/20">
                            <p className="text-xs md:text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">Response Time:</span> I typically respond within 12-24 hours during business days.
                            </p>
                        </div>

                        <div className="p-4 md:p-6 rounded-2xl bg-card border shadow-sm relative overflow-hidden min-h-[350px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-3 md:space-y-4 w-full"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label htmlFor="name" className="text-xs font-medium">Name</label>
                                                <Input id="name" name="name" placeholder="John Doe" required className="h-9 md:h-10 rounded-lg bg-secondary/20 border-border/50 focus:bg-background transition-colors text-sm px-3" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="email" className="text-xs font-medium">Email</label>
                                                <Input id="email" name="email" type="email" placeholder="john@example.com" required className="h-9 md:h-10 rounded-lg bg-secondary/20 border-border/50 focus:bg-background transition-colors text-sm px-3" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="subject" className="text-xs font-medium">Subject</label>
                                            <Input id="subject" name="subject" placeholder="Project Inquiry" required className="h-9 md:h-10 rounded-lg bg-secondary/20 border-border/50 focus:bg-background transition-colors text-sm px-3" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="message" className="text-xs font-medium">Message</label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="Tell me about your project..."
                                                required
                                                className="min-h-[100px] rounded-lg bg-secondary/20 border-border/50 focus:bg-background resize-none transition-colors text-sm p-3"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        <AnimatePresence>
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2"
                                                >
                                                    <span className="text-lg">⚠️</span>
                                                    <span>{error}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <Button type="submit" disabled={isLoading} size="sm" className="w-full h-9 md:h-10 rounded-lg font-semibold shadow-sm text-sm relative overflow-hidden">
                                            {isLoading ? (
                                                <>
                                                    <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <Send className="ml-2 w-3 h-3" />
                                                </>
                                            )}
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="flex flex-col items-center justify-center space-y-4 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        >
                                            <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="space-y-2"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold">Thank You!</h3>
                                            <p className="text-sm md:text-base text-muted-foreground">
                                                I'll get back to you soon.
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
