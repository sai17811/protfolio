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
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x, rotateX, perspective: 1000 } as any}
            className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-16 md:mb-24 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
        >
            {/* Timeline Dot & Line */}
            <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 h-full">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                <div className="w-0.5 h-full bg-border/50 -mt-2" />
            </div>

            {/* Content Card */}
            <div className="flex-1 w-full md:w-1/2 max-w-md md:max-w-none mx-auto">
                <div className="bg-card p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-border hover:-translate-y-1">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 text-primary">
                        <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                        <h3 className="text-lg md:text-xl font-bold">{data.role}</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                        <span className="font-medium text-foreground">{data.company}</span>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {data.period}
                        </div>
                    </div>

                    <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                        {data.description.map((item, i) => (
                            <li key={i} className="text-muted-foreground text-xs md:text-sm leading-relaxed flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {data.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-2 md:px-3 py-0.5 md:py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border/50"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Empty space for the other side of the timeline */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
}

export function Experience3D() {
    return (
        <section id="experience" className="py-20 relative">
            <div className="container px-4 md:px-6">
                {/* Sticky Header */}
                <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm pb-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Professional Journey
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Building exceptional digital experiences through innovation and expertise
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-5xl mx-auto px-2 md:px-0">
                    {experiences.map((exp, index) => (
                        <TimelineItem key={exp.id} data={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
