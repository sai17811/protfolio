"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        period: "Sep 2024 – Present",
        description: [
            "Architecting high-performance React applications serving 150K+ daily users with 99.9% uptime.",
            "Established a modern Design System using Storybook, reducing development cycles by 45%.",
            "Leading technical initiatives for performance optimization, achieving a 35% boost in load times."
        ],
        skills: ["React", "TypeScript", "Redux Toolkit", "Storybook"]
    },
    {
        id: 2,
        role: "Frontend Developer",
        company: "Suthra Technologies",
        period: "Feb 2024 – Aug 2024",
        description: [
            "Engineered secure NBFC banking platforms handling complex loan workflows and real-time transactions.",
            "Implemented bank-grade security features including role-based access control and secure session management.",
            "Optimized critical financial dashboards for seamless data visualization and user experience."
        ],
        skills: ["React.js", "Material UI", "Fintech", "Security"]
    },
    {
        id: 3,
        role: "Frontend Developer",
        company: "Digital Innovations Inc.",
        period: "May 2022 – Jan 2024",
        description: [
            "Delivered pixel-perfect, responsive web solutions ensuring 100% mobile compatibility.",
            "Spearheaded unit testing initiatives achieving 85% coverage and significantly reducing production bugs.",
            "Collaborated with cross-functional teams to translate complex requirements into intuitive UIs."
        ],
        skills: ["React.js", "Jest", "Responsive Design", "Performance"]
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
        <section id="experience" className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

            <div ref={containerRef} className="container px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Professional <span className="text-primary">Journey</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        A timeline of my professional growth and key contributions
                    </motion.p>
                </div>

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
