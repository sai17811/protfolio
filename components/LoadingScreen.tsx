"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ isLoading }: { isLoading: boolean }) {
    const [mounted, setMounted] = useState(false);
    
    // Animate loading percentage for visual effect
    const [progress, setProgress] = useState(0);

    useEffect(() => { 
        setMounted(true); 
        
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    // Easing progress bump
                    return p + Math.floor(Math.random() * 15) + 5;
                });
            }, 100); 
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    if (!mounted) return null;
    
    // Clamping to 100
    const displayProgress = Math.min(progress, 100);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
                >
                    {/* Subtle performance-friendly background glow (3D atmospheric visualization) */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.8, 1.1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-14 flex items-center justify-center">
                            {/* Central White Rounded Square with "S" - Static for maximum performance */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-xl flex items-center justify-center"
                            >
                                <span className="text-5xl sm:text-6xl font-black text-[#0a0a0a]">
                                    S
                                </span>
                            </motion.div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-56 sm:w-64 h-1 bg-white/[0.07] rounded-full overflow-hidden mb-8 relative">
                            {/* Progress Fill */}
                            <motion.div 
                                className="absolute top-0 left-0 bottom-0 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${displayProgress}%` }}
                                transition={{ ease: "easeOut", duration: 0.2 }}
                            />
                        </div>

                        {/* Texts */}
                        <div className="flex flex-col items-center gap-2.5">
                            <h2 className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/90">
                                Architecting Excellence
                            </h2>
                            <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/30">
                                Loading Experience...
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
