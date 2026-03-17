"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs,
    FaGitAlt, FaJava, FaGithub, FaJira, FaFigma,
} from "react-icons/fa";
import {
    SiNextdotjs, SiTypescript, SiTailwindcss, SiRedux,
    SiMongodb, SiMui, SiNetlify, SiVercel, SiJest,
    SiTestinglibrary, SiPostman, SiExpress,
} from "react-icons/si";

const skillCategories = [
    {
        title: "Frontend",
        accent: "from-blue-500/20 to-cyan-500/10",
        dot: "bg-blue-500",
        skills: [
            { name: "React.js", icon: FaReact, color: "#61DAFB" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
            { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
            { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Material-UI", icon: SiMui, color: "#007FFF" },
            { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
            { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        ],
    },
    {
        title: "Backend & DB",
        accent: "from-green-500/20 to-emerald-500/10",
        dot: "bg-green-500",
        skills: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Express.js", icon: SiExpress, color: "currentColor" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "REST APIs", icon: FaNodeJs, color: "#61DAFB" },
            { name: "JWT / RBAC", icon: SiNextdotjs, color: "#F59E0B" },
            { name: "Java", icon: FaJava, color: "#007396" },
        ],
    },
    {
        title: "Tools & Testing",
        accent: "from-orange-500/20 to-yellow-500/10",
        dot: "bg-orange-500",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "currentColor" },
            { name: "Jira", icon: FaJira, color: "#0052CC" },
            { name: "Figma", icon: FaFigma, color: "#F24E1E" },
            { name: "Jest", icon: SiJest, color: "#C21325" },
            { name: "RTL", icon: SiTestinglibrary, color: "#E33332" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
            { name: "Vercel", icon: SiVercel, color: "currentColor" },
        ],
    },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const chipVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function TechStack() {
    return (
        <section id="skills" className="py-16 relative overflow-hidden border-t border-border/40">
            {/* Section Separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Subtle background orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-3">
                        <Layers className="w-3 h-3" />
                        The Arsenal
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                        Technical <span className="text-primary italic">Skills</span>
                    </h2>
                    <div className="h-0.5 w-10 bg-primary/30 rounded-full mx-auto mt-3" />
                    <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
                        A full-stack toolkit for building modern, scalable applications
                    </p>
                </motion.div>

                {/* Skill Category Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariants}
                            className="relative rounded-2xl border border-border/50 bg-secondary/5 overflow-hidden hover:border-primary/25 transition-all duration-300 group"
                        >
                            {/* Card top accent gradient */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.accent}`} />

                            {/* Card header */}
                            <div className="px-5 pt-5 pb-4 flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full ${category.dot} flex-shrink-0`} />
                                <h3 className="text-sm font-bold text-foreground tracking-wide">{category.title}</h3>
                            </div>

                            <div className="h-px bg-border/30 mx-5" />

                            {/* Skill chips */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="p-5 flex flex-wrap gap-2"
                            >
                                {category.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={chipVariants}
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background/60 border border-border/40 hover:border-primary/30 hover:bg-background/90 transition-all duration-200 cursor-default group/chip"
                                    >
                                        <skill.icon
                                            className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover/chip:scale-110"
                                            style={{ color: skill.color }}
                                        />
                                        <span className="text-[11px] font-semibold text-foreground/80 group-hover/chip:text-foreground transition-colors whitespace-nowrap">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
