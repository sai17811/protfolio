"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, geometry, color, speed = 1, distort = 0.3 }: { position: [number, number, number], geometry: "sphere" | "box" | "torus" | "icosahedron" | "octahedron" | "cone", color: string, speed?: number, distort?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPosition = useRef(position);

    useFrame((state) => {
        if (meshRef.current) {
            // Rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 * speed;

            // Floating animation (up and down movement)
            meshRef.current.position.y = initialPosition.current[1] + Math.sin(state.clock.getElapsedTime() * speed * 0.5) * 0.5;

            // Horizontal drift
            meshRef.current.position.x = initialPosition.current[0] + Math.cos(state.clock.getElapsedTime() * speed * 0.3) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            {geometry === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
            {geometry === "box" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
            {geometry === "torus" && <torusGeometry args={[0.8, 0.3, 16, 100]} />}
            {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
            {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
            {geometry === "cone" && <coneGeometry args={[1, 2, 32]} />}
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        </mesh>
    );
}

function Scene({ isDark }: { isDark: boolean }) {
    return (
        <>
            <ambientLight intensity={isDark ? 0.2 : 0.5} />
            <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color={isDark ? "#4f46e5" : "#3b82f6"} />

            {/* Main Floating Shapes - More variety */}
            {/* Main Floating Shapes - More variety */}
            <FloatingShape position={[-4, 2, -5]} geometry="icosahedron" color={isDark ? "#4338ca" : "#60a5fa"} speed={0.8} />
            <FloatingShape position={[4, -2, -4]} geometry="torus" color={isDark ? "#7c3aed" : "#a78bfa"} speed={1.2} />
            <FloatingShape position={[0, 1, -8]} geometry="sphere" color={isDark ? "#be185d" : "#f472b6"} distort={0.5} />
            <FloatingShape position={[-3, -3, -6]} geometry="box" color={isDark ? "#059669" : "#34d399"} speed={0.9} />
            <FloatingShape position={[3, 3, -7]} geometry="octahedron" color={isDark ? "#d97706" : "#fbbf24"} speed={1.1} />
            <FloatingShape position={[-5, 0, -9]} geometry="cone" color={isDark ? "#dc2626" : "#f87171"} speed={0.7} />
            <FloatingShape position={[5, 1, -6]} geometry="icosahedron" color={isDark ? "#0891b2" : "#67e8f9"} speed={1.3} />
            <FloatingShape position={[0, -2, -5]} geometry="torus" color={isDark ? "#8b5cf6" : "#c084fc"} speed={0.85} />

            {/* Additional Objects for Richer Background */}
            <FloatingShape position={[-6, 3, -10]} geometry="sphere" color={isDark ? "#1e40af" : "#93c5fd"} speed={0.6} />
            <FloatingShape position={[6, -3, -8]} geometry="box" color={isDark ? "#4c1d95" : "#c4b5fd"} speed={1.0} />
            <FloatingShape position={[-2, 4, -7]} geometry="octahedron" color={isDark ? "#be123c" : "#fda4af"} speed={0.9} />
            <FloatingShape position={[2, -4, -9]} geometry="cone" color={isDark ? "#047857" : "#6ee7b7"} speed={1.1} />

            {/* Background Fill */}
            {/* <Environment preset={isDark ? "city" : "studio"} blur={0.8} /> */}

            <ContactShadows
                position={[0, -4.5, 0]}
                opacity={0.4}
                scale={20}
                blur={2}
                far={4.5}
                color={isDark ? "#000000" : "#a1a1aa"}
            />


        </>
    );
}

export function Background3D() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 ease-in-out">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]} // Optimization: Cap pixel ratio
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Suspense fallback={null}>
                    <Scene isDark={isDark} />
                </Suspense>
            </Canvas>

            {/* Gradient Overlay for depth and text readability */}
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-background/0 via-background/50 to-background' : 'bg-gradient-to-b from-background/0 via-background/30 to-background'} pointer-events-none`} />
        </div>
    );
}
