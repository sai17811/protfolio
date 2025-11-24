"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "NBFC Banking Platform",
        description: "A comprehensive banking application handling loan workflows, dashboards, and secure user authentication for thousands of customers.",
        tags: ["React", "Material UI", "REST API", "Authentication"],
        link: "#",
        github: "#",
        metrics: { users: "10K+", uptime: "99.9%" },
        image: "/project_banking_platform_1763965334439.png"
    },
    {
        title: "Enterprise Component Library",
        description: "A scalable, reusable component library built with React and Storybook, reducing development time by 45% across 8+ internal projects.",
        tags: ["React", "TypeScript", "Storybook", "NPM"],
        link: "#",
        github: "#",
        metrics: { projects: "8+", efficiency: "45%" },
        image: "/project_component_library_1763965350917.png"
    },
    {
        title: "E-Commerce Dashboard",
        description: "High-performance admin dashboard for managing inventory, orders, and analytics with real-time data visualization.",
        tags: ["Next.js", "Tailwind CSS", "Recharts", "Redux"],
        link: "#",
        github: "#",
        metrics: { performance: "A+", features: "20+" },
        image: "/project_ecommerce_dashboard_1763965366448.png"
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background -z-10" />

            <div className="container px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Building scalable applications with modern technologies
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-full w-full"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
                            <div className="relative h-full bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
                                {/* Realistic Window Header */}
                                <div className="h-8 bg-muted/50 border-b border-border flex items-center px-4 gap-2 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>

                                {/* Project Image */}
                                <div className="h-48 md:h-52 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 shrink-0">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                <div className="p-5 md:p-6 flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground border border-border/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                        <div className="flex gap-4 text-xs">
                                            {Object.entries(project.metrics).map(([key, value]) => (
                                                <div key={key} className="flex flex-col">
                                                    <span className="text-primary font-bold">{value}</span>
                                                    <span className="text-muted-foreground capitalize text-[10px]">{key}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={project.github}
                                                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                                title="View Code"
                                            >
                                                <Github className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={project.link}
                                                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                                title="Live Demo"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full group text-sm md:text-base" asChild>
                        <Link href="https://github.com/sai1781" target="_blank">
                            View All Projects
                            <Github className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section >
    );
}
