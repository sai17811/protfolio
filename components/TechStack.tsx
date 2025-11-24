"use client";

import * as React from "react";
import { motion } from "framer-motion";
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

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { name: "React.js", icon: FaReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
            { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Material-UI", icon: SiMui, color: "#007FFF" },
            { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
            { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
            { name: "SASS", icon: FaSass, color: "#CC6699" },
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "Java", icon: FaJava, color: "#007396" },
        ]
    },
    {
        title: "Tools & DevOps",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "#181717" },
            { name: "GitLab", icon: FaGitlab, color: "#FC6D26" },
            { name: "Jira", icon: FaJira, color: "#0052CC" },
            { name: "Figma", icon: FaFigma, color: "#F24E1E" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
            { name: "Vercel", icon: SiVercel, color: "#000000" },
        ]
    },
    {
        title: "Testing",
        skills: [
            { name: "Jest", icon: SiJest, color: "#C21325" },
            { name: "RTL", icon: SiTestinglibrary, color: "#E33332" },
        ]
    }
];

export function TechStack() {
    return (
        <section id="skills" className="py-20 relative overflow-hidden">
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
                        A comprehensive toolkit for building modern web applications
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full" />
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary transition-colors group"
                                    >
                                        <skill.icon
                                            className="w-5 h-5 transition-colors group-hover:text-primary"
                                            style={{ color: skill.color }}
                                        />
                                        <span className="text-sm font-medium">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
