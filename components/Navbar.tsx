"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, Download, Mail, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { toast } from "sonner";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    const handleDownloadResume = () => {
        toast.success("Resume downloaded successfully!");
        const link = document.createElement('a');
        link.href = "/resume.pdf";
        link.download = "Akula_Naga_Sai_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 h-20 md:h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl md:text-xl group-hover:scale-110 transition-transform">
                        S
                    </div>
                    <span className="font-bold text-xl md:text-lg tracking-tight group-hover:text-primary transition-colors">
                        sai<span className="text-primary">.dev</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}

                    <div className="flex items-center gap-4 pl-4 border-l border-border/50">
                        <ModeToggle />
                        <Button size="sm" variant="ghost" onClick={handleDownloadResume}>
                            Resume
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="#contact">
                                Contact Me
                            </Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Nav */}
                <div className="flex md:hidden items-center gap-4">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-secondary/50 relative group">
                                <Menu className="h-6 w-6 transition-transform group-hover:scale-110" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85vw] sm:w-[400px] border-l border-border/50 bg-background/80 backdrop-blur-xl p-0 [&>button]:hidden">
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-purple-500/5 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shrink-0">
                                            S
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h2 className="font-bold text-lg tracking-tight leading-none mb-1">
                                                sai<span className="text-primary">.dev</span>
                                            </h2>
                                            <p className="text-xs text-muted-foreground font-medium">Frontend Developer</p>
                                        </div>
                                    </div>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon">
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </SheetClose>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
                                    {navItems.map((item, index) => (
                                        <SheetClose asChild key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="group flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border/50 hover:border-primary hover:shadow-lg hover:scale-[1.02] animate-in slide-in-from-right-8 fade-in fill-mode-forwards"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    animationDuration: '500ms'
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center text-sm font-bold group-hover:bg-primary-foreground/10 transition-colors">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-base font-semibold">{item.name}</span>
                                                </div>
                                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>

                                {/* Footer with CTA */}
                                <div className="p-6 border-t border-border/50 bg-gradient-to-r from-primary/5 to-purple-500/5 space-y-3">
                                    <SheetClose asChild>
                                        <Button className="w-full rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all" size="lg" onClick={handleDownloadResume}>
                                            <Download className="mr-2 w-5 h-5" />
                                            Download Resume
                                        </Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button variant="default" className="w-full rounded-xl font-semibold" size="lg" asChild>
                                            <Link href="#contact">
                                                Contact Me
                                                <Mail className="ml-2 w-5 h-5" />
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}
