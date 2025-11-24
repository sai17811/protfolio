"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured online store with cart, checkout, and admin dashboard.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
        metrics: {
            performance: "100%",
            seo: "100%",
        },
        github: "https://github.com/sai1781",
        link: "https://saidevv.com",
        longDescription: "This e-commerce platform was built to provide a seamless shopping experience. It features real-time inventory management, secure payment processing with Stripe, and a comprehensive admin dashboard for managing products and orders.",
        problem: "Users needed a fast, secure, and intuitive shopping experience, while administrators required a robust tool to manage inventory and orders efficiently without technical overhead.",
        solution: "Built a scalable Next.js application with server-side rendering for performance. Integrated Stripe for secure payments and created a custom admin dashboard using Shadcn UI for intuitive management.",
        impact: "Reduced page load times by 40% compared to the previous solution, resulting in a 25% increase in conversion rates. The streamlined admin dashboard cut inventory management time by half.",
        features: [
            "Real-time inventory updates",
            "Secure Stripe integration",
            "Admin dashboard with analytics",
            "Responsive design for mobile and desktop"
        ],
        techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"]
    },
    {
        title: "Task Management App",
        description: "A collaborative task manager with real-time updates and team features.",
        image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
        metrics: {
            users: "10k+",
            uptime: "99.9%",
        },
        github: "https://github.com/sai1781",
        link: "https://saidevv.com",
        longDescription: "A powerful task management tool designed for remote teams. It supports Kanban boards, list views, and real-time collaboration using Socket.io.",
        problem: "Remote teams struggled with staying synchronized on tasks, leading to miscommunication and missed deadlines. Existing tools were either too complex or lacked real-time updates.",
        solution: "Developed a real-time collaboration platform using Socket.io and React. Implemented drag-and-drop Kanban boards and instant notifications to keep everyone on the same page.",
        impact: "Adoption by 50+ remote teams within the first month. User feedback highlighted a significant reduction in email back-and-forth and improved project delivery times.",
        features: [
            "Real-time collaboration",
            "Kanban and List views",
            "Team permission management",
            "Dark mode support"
        ],
        techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"]
    },
    {
        title: "AI Content Generator",
        description: "Generate blog posts, social media captions, and more using AI.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        tags: ["Next.js", "OpenAI API", "Vercel AI SDK"],
        metrics: {
            generated: "1M+",
            speed: "<2s",
        },
        github: "https://github.com/sai1781",
        link: "https://saidevv.com",
        longDescription: "Leveraging the power of OpenAI, this application helps content creators generate high-quality text for various purposes. It includes templates for blogs, ads, and social media.",
        problem: "Content creators faced writer's block and spent excessive time drafting initial content for various platforms, slowing down their production pipeline.",
        solution: "Created an AI-powered writing assistant using the OpenAI API and Vercel AI SDK. Designed specialized templates for different content types to provide structured and relevant output.",
        impact: "Empowered creators to produce content 5x faster. The tool generated over 1 million words in its first quarter, with users reporting higher engagement rates on their published content.",
        features: [
            "Multiple content templates",
            "SEO optimization suggestions",
            "History and favorites",
            "Export to Markdown/HTML"
        ],
        techStack: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel AI SDK"]
    }
];

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="py-20 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Some of the impactful solutions I've built
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
                        >
                            <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 group bg-card border-border/50">
                                <div
                                    className="relative h-48 overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                                            View Details
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
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
                                                target="_blank"
                                            >
                                                <Github className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={project.link}
                                                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                                title="Live Demo"
                                                target="_blank"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
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

            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                                <DialogDescription>{selectedProject.description}</DialogDescription>
                            </DialogHeader>

                            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden my-4">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-semibold mb-2 text-lg">Overview</h4>
                                    <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-secondary/20 p-4 rounded-lg">
                                        <h5 className="font-semibold mb-2 text-primary">The Problem</h5>
                                        <p className="text-sm text-muted-foreground">{selectedProject.problem}</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded-lg">
                                        <h5 className="font-semibold mb-2 text-primary">The Solution</h5>
                                        <p className="text-sm text-muted-foreground">{selectedProject.solution}</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded-lg">
                                        <h5 className="font-semibold mb-2 text-primary">The Impact</h5>
                                        <p className="text-sm text-muted-foreground">{selectedProject.impact}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2 text-lg">Key Features</h4>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {selectedProject.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2 text-lg">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map((tech) => (
                                            <Badge key={tech} variant="outline" className="px-3 py-1">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t">
                                    <Button asChild size="lg" className="flex-1 sm:flex-none">
                                        <Link href={selectedProject.link} target="_blank">
                                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild className="flex-1 sm:flex-none">
                                        <Link href={selectedProject.github} target="_blank">
                                            <Github className="mr-2 h-4 w-4" /> View Code
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
