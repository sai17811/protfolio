"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Mail, Code2 } from "lucide-react";
import dynamic from "next/dynamic";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { toast } from "sonner";

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
        <section className="min-h-screen flex items-center justify-center pt-20 md:pt-16 pb-8 md:pb-10 px-4 overflow-hidden">
            <Background3D />
            <div className="container md:px-6 flex flex-col lg:flex-row items-center gap-6 md:gap-12">

                {/* Text Content */}
                <div className="flex-1 space-y-4 md:space-y-8 text-center lg:text-left z-10 relative w-full">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}

                        className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6"
                    >
                        <div className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] md:text-sm font-medium bg-secondary/50 backdrop-blur-sm whitespace-nowrap">
                            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 mr-1.5 md:mr-2 animate-pulse"></span>
                            Available for work
                        </div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] md:text-sm font-medium bg-green-500/10 text-green-500 border-green-500/20 backdrop-blur-sm whitespace-nowrap">
                            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 mr-1.5 md:mr-2 animate-pulse"></span>
                            Freelancing Work
                        </div>
                    </motion.div>

                    <motion.h1
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight min-h-[80px] md:min-h-[auto]"
                    >
                        Hi,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400 block md:inline">
                            <TypingAnimation
                                phrases={[
                                    "I am Sai",
                                    "Frontend Developer",
                                    "React Specialist",
                                    "UI/UX Engineer"
                                ]}
                                typingSpeed={80}
                                deletingSpeed={40}
                                pauseDuration={2000}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed"
                    >
                        Senior Frontend Developer specializing in React, TypeScript, and modern web technologies. Building scalable applications with clean code and pixel-perfect design.
                    </motion.p>

                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4"
                    >
                        <Button size="lg" className="rounded-full group w-full sm:w-auto" asChild>
                            <a href="#projects">
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto" onClick={() => {
                            toast.success("Resume downloaded successfully!");
                            const link = document.createElement('a');
                            link.href = "/resume.pdf";
                            link.download = "Akula_Naga_Sai_Resume.pdf";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}>
                            <Download className="mr-2 h-4 w-4" />
                            Resume
                        </Button>
                    </motion.div>

                    <motion.div
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4"
                    >
                        <a
                            href="https://www.github.com/sai1781"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all group border border-border/50 hover:border-primary text-sm"
                        >
                            <Github className="h-4 md:h-5 w-4 md:w-5" />
                            <span className="text-xs md:text-sm font-medium">GitHub</span>
                        </a>
                        <a
                            href="https://leetcode.com/u/nagasaitac143"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500 hover:text-white transition-all group border border-yellow-500/30 hover:border-yellow-500 text-sm"
                        >
                            <Code2 className="h-4 md:h-5 w-4 md:w-5" />
                            <span className="text-xs md:text-sm font-medium">LeetCode</span>
                        </a>
                        <a
                            href="mailto:nagasai.akula.dev@gmail.com"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all group border border-border/50 hover:border-primary"
                        >
                            <Mail className="h-5 md:h-6 w-5 md:w-6" />
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
