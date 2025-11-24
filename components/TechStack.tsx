"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaGitAlt,
    FaJava,
    FaBootstrap,
    FaSass,
    FaGithub,
    FaGitlab,
    FaJira,
    FaFigma,
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiRedux,
    SiMongodb,
    SiMui,
    SiPostman,
    SiNetlify,
    SiVercel,
    SiJest,
    SiTestinglibrary,
} from "react-icons/si";

const skills = [
    // Languages
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E", category: "Languages" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26", category: "Languages" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6", category: "Languages" },
    { name: "Java", icon: FaJava, color: "#007396", category: "Languages" },

    // Frontend
    { name: "React.js", icon: FaReact, color: "#61DAFB", category: "Frontend" },
    { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC", category: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Frontend" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4", category: "Frontend" },
    { name: "Material-UI", icon: SiMui, color: "#007FFF", category: "Frontend" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3", category: "Frontend" },
    { name: "SCSS", icon: FaSass, color: "#CC6699", category: "Frontend" },

    // Backend & API
    { name: "Node.js", icon: FaNodeJs, color: "#339933", category: "Backend" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Backend" },

    // Tools & Platform
    { name: "Git", icon: FaGitAlt, color: "#F05032", category: "Tools" },
    { name: "GitHub", icon: FaGithub, color: "#181717", category: "Tools" },
    { name: "GitLab", icon: FaGitlab, color: "#FC6D26", category: "Tools" },
    { name: "Jira", icon: FaJira, color: "#0052CC", category: "Tools" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E", category: "Tools" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37", category: "Tools" },
    { name: "VS Code", icon: FaReact, color: "#007ACC", category: "Tools" },
    { name: "Netlify", icon: SiNetlify, color: "#00C7B7", category: "Tools" },
    { name: "Vercel", icon: SiVercel, color: "#000000", category: "Tools" },

    // Testing
    { name: "Jest", icon: SiJest, color: "#C21325", category: "Testing" },
    { name: "React Testing Library", icon: SiTestinglibrary, color: "#E33332", category: "Testing" },
];

export function TechStack() {
    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background -z-10" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Technical Skills
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Technologies and tools I work with
                    </p>
                </motion.div>


                <div className="flex flex-wrap justify-center gap-6 md:gap-8 perspective-1000">
                    <TooltipProvider>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.03,
                                    ease: [0.2, 0.65, 0.3, 0.9]
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    y: -8,
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.3 }
                                }}
                                className="relative group"
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/20">
                                            <skill.icon
                                                className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300"
                                                style={{ color: skill.color }}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-semibold">{skill.name}</p>
                                        <p className="text-xs text-muted-foreground">{skill.category}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </motion.div>
                        ))}
                    </TooltipProvider>
                </div>
            </div>
        </section >
    );
}
