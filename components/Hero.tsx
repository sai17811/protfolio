"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Mail, Code2, Linkedin } from "lucide-react";
import dynamic from "next/dynamic";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { toast } from "sonner";
import Link from "next/link";

const ModelShowcase = dynamic(() => import("@/components/ModelShowcase").then((mod) => mod.ModelShowcase), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-secondary/20 animate-pulse rounded-xl" />
});

const Background3D = dynamic(() => import("@/components/Background3D").then((mod) => mod.Background3D), {
    ssr: false,
});

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    }),
};

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 md:pt-16 pb-8 md:pb-10 px-4 overflow-hidden relative">
            <Background3D />
            <div className="container md:px-6 flex flex-col lg:flex-row items-center gap-8 md:gap-12">

                {/* Text Content */}
                <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left z-10 relative w-full max-w-3xl lg:max-w-none mx-auto">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3"
                    >
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm font-medium bg-secondary/50 backdrop-blur-sm whitespace-nowrap">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Available for work
                        </div>
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm font-medium bg-green-500/10 text-green-500 border-green-500/20 backdrop-blur-sm whitespace-nowrap">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Freelancing
                        </div>
                    </motion.div>

                    <motion.h1
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] min-h-[120px] md:min-h-[auto]"
                    >
                        Hi, I’m Saidevv <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400">
                            Full-Stack Developer.
                        </span>
                    </motion.h1>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed"
                    >
                        I build accessible, pixel-perfect, and performant web experiences.
                        Passionate about crafting software that solves real-world problems and delights users.
                    </motion.p>

                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                    >
                        <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" asChild>
                            <Link href="#projects">
                                See My Work
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base font-semibold w-full sm:w-auto" asChild>
                            <Link href="#contact">
                                Contact Me
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="flex items-center justify-center lg:justify-start gap-4 pt-4"
                    >
                        <a
                            href="https://www.github.com/sai1781"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2"
                            aria-label="GitHub"
                        >
                            <Github className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sai-akula-b0a91616b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a
                            href="https://leetcode.com/u/nagasaitac143"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2"
                            aria-label="LeetCode"
                        >
                            <Code2 className="h-6 w-6" />
                        </a>
                        <a
                            href="mailto:nagasai.akula.dev@gmail.com"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2"
                            aria-label="Email"
                        >
                            <Mail className="h-6 w-6" />
                        </a>
                    </motion.div>
                </div>

                {/* 3D Visual Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:block flex-1 w-full max-w-[600px] aspect-square relative"
                >
                    {/* Glass Card Background for Model */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
                    <ModelShowcase />
                </motion.div>
            </div>
        </section>
    );
}
