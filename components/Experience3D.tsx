"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, TrendingUp } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        period: "Sep 2024 – Present",
        description: [
            "Led development of production-grade MERN applications serving 150K+ daily active users, maintaining 99.9% uptime.",
            "Architected a reusable component library using React, TypeScript, and Storybook, reducing dev time by 45%.",
            "Optimized application performance using code splitting and lazy loading, achieving a 35% improvement in load times.",
            "Designed optimized MongoDB schemas and indexing strategies, improving API response times by 30%."
        ],
        skills: ["React", "TypeScript", "Node.js", "MongoDB", "Redux Toolkit"]
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Suthra Technologies",
        period: "Feb 2024 – Aug 2024",
        description: [
            "Developed end-to-end features for a fintech banking platform including loan workflows and account dashboards.",
            "Integrated complex REST APIs for transactions and loan tracking with real-time UI updates.",
            "Improved UI maintainability by optimizing rendering and implementing highly reusable Material-UI components."
        ],
        skills: ["React.js", "Material UI", "Express.js", "REST APIs", "Fintech"]
    },
    {
        id: 3,
        role: "Full Stack Developer",
        company: "Digital Innovations Inc.",
        period: "May 2022 – Jan 2024",
        description: [
            "Developed and integrated full-stack modules using React.js, Node.js, Express.js and MongoDB.",
            "Achieved 100% mobile compatibility and 25% mobile engagement growth via CSS Grid and Flexbox layouts.",
            "Wrote comprehensive unit tests using Jest and RTL, achieving 85% coverage and reducing production bugs by 50%."
        ],
        skills: ["React.js", "Node.js", "Jest", "Unit Testing", "Responsive Design"]
    }
];

function TimelineItem({ data, index }: { data: typeof experiences[0], index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className="relative"
        >
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />

            {/* Timeline Dot */}
            <motion.div
                style={{ opacity }}
                className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"
            />

            {/* Content */}
            <motion.div
                style={{ x }}
                className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}
            >
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-primary/30">
                    {/* Header */}
                    <div className="mb-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {data.role}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">{data.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{data.period}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                        {data.description.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Experience3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="experience" className="py-16 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background border-t border-border/40">
            {/* Section Separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-foreground/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

            <div ref={containerRef} className="container px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-3">
                        <TrendingUp className="w-3 h-3" />
                        Career Path
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                        Professional <span className="text-primary italic">Journey</span>
                    </h2>
                    <div className="h-0.5 w-10 bg-primary/30 rounded-full mx-auto mt-3" />
                    <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
                        A timeline of my professional growth and key contributions
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
                    {experiences.map((exp, index) => (
                        <TimelineItem key={exp.id} data={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
