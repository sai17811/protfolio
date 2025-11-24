"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Send, Code2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, we'll show success
            setIsSubmitted(true);
            e.currentTarget.reset();
            toast.success("Message sent successfully! I'll get back to you soon.");

            // Reset after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4"
                    >
                        Let's <span className="text-primary">Connect</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-sm md:text-base"
                    >
                        Have a project in mind or want to collaborate? Drop me a message!
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start max-w-5xl mx-auto">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Get in Touch</h3>
                            <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <a href="mailto:sai@example.com" className="text-sm md:text-base font-medium hover:text-primary transition-colors">
                                        sai@example.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Mobile</p>
                                    <a href="tel:+1234567890" className="text-sm md:text-base font-medium hover:text-primary transition-colors">
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="text-sm font-medium mb-3">Connect with me</p>
                            <div className="flex gap-3">
                                <Link
                                    href="https://github.com/saidevv"
                                    target="_blank"
                                    className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                                >
                                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link
                                    href="https://leetcode.com/saidevv"
                                    target="_blank"
                                    className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                                >
                                    <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Link>
                            </div>
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
