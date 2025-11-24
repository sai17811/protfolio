"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    className?: string;
}

export function SocialLink({ href, icon, label, className }: SocialLinkProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
        >
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                    "relative flex items-center justify-center p-3 rounded-full",
                    "bg-secondary/50 hover:bg-primary hover:text-primary-foreground",
                    "border-2 border-transparent hover:border-primary",
                    "transition-all duration-300",
                    "shadow-md hover:shadow-xl hover:shadow-primary/20",
                    "before:absolute before:inset-0 before:rounded-full",
                    "before:bg-gradient-to-r before:from-primary/20 before:to-purple-500/20",
                    "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
                    "before:-z-10 before:blur-md",
                    className
                )}
            >
                <span className="relative z-10 transition-transform group-hover:rotate-12 duration-300">
                    {icon}
                </span>
            </Link>
        </motion.div>
    );
}
