"use client";

import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-8 border-t bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold">Sai</p>
                        <p className="text-xs text-muted-foreground">
                            Senior Frontend Developer
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/sai1781" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link href="https://leetcode.com/u/nagasaitac143" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Code2 className="w-4 h-4" />
                        </Link>
                        <Link href="mailto:nagasai.akula.dev@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Mail className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="text-xs text-muted-foreground text-center md:text-right">
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
