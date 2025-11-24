"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScroll(
    options: {
        trigger?: string | Element | null;
        start?: string;
        end?: string;
        animation?: gsap.TweenVars;
        stagger?: number;
    } = {}
) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 50,
                    ...options.animation?.from,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: options.start || "top 80%",
                        end: options.end || "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                    ...options.animation?.to,
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [options]);

    return ref;
}
