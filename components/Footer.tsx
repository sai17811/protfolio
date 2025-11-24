"use client";

import { Github, Mail, Code2 } from "lucide-react";
import { SocialLink } from "@/components/SocialLink";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-8 border-t bg-background/50 backdrop-blur-sm">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                                S
                            </div>
                            <span className="font-bold text-lg tracking-tight">
                                sai<span className="text-primary">.dev</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Building digital experiences that matter.
                        </p>
                    </div>

                    <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
                        <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
                        <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <SocialLink href="https://github.com/sai1781" icon={<Github className="w-4 h-4" />} label="GitHub" className="p-2" />
                        <SocialLink href="https://leetcode.com/u/nagasaitac143" icon={<Code2 className="w-4 h-4" />} label="LeetCode" className="p-2" />
                        <Link href="mailto:nagasai.akula.dev@gmail.com" className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Email">
                            <Mail className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Saidevv. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
