"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero").then((mod) => mod.Hero), { ssr: false });
const About = dynamic(() => import("@/components/About").then((mod) => mod.About), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack").then((mod) => mod.TechStack), { ssr: false });
const ActivityStats = dynamic(() => import("@/components/ActivityStats").then((mod) => mod.ActivityStats), { ssr: false });
const Experience3D = dynamic(() => import("@/components/Experience3D").then((mod) => mod.Experience3D), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects").then((mod) => mod.Projects), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact").then((mod) => mod.Contact), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer").then((mod) => mod.Footer), { ssr: false });
const Background3D = dynamic(() => import("@/components/Background3D").then((mod) => mod.Background3D), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const minLoadTime = 1200; // Enforce minimal display time for the premium animation to play out
    const startTime = Date.now();

    const hideLoader = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadTime - elapsed);
        setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader);
        // Fallback for hydration Edge Cases where event might not fire normally
        const fallback = setTimeout(hideLoader, 4000);
        return () => {
            window.removeEventListener("load", hideLoader);
            clearTimeout(fallback);
        };
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <ActivityStats />
      <Experience3D />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
