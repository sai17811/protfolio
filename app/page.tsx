import { Navbar } from "@/components/Navbar";
import { TechStack } from "@/components/TechStack";
import { Experience3D } from "@/components/Experience3D";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero").then((mod) => mod.Hero), { ssr: false });
const Background3D = dynamic(() => import("@/components/Background3D").then((mod) => mod.Background3D), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Navbar />
      <Hero />
      <TechStack />
      <Experience3D />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
