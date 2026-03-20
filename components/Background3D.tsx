"use client";

import { useEffect, useState, Suspense, useRef, memo, useMemo } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

const geometries = {
    sphere: new THREE.SphereGeometry(1, 16, 16),
    box: new THREE.BoxGeometry(1.5, 1.5, 1.5),
    torus: new THREE.TorusGeometry(0.8, 0.3, 12, 48),
    icosahedron: new THREE.IcosahedronGeometry(1, 0),
    octahedron: new THREE.OctahedronGeometry(1, 0),
    cone: new THREE.ConeGeometry(1, 2, 16)
};

const FloatingShape = memo(function FloatingShape({ position, geometry, color, speed = 1, size = 1, distort = 0.3 }: { position: [number, number, number], geometry: "sphere" | "box" | "torus" | "icosahedron" | "octahedron" | "cone", color: string, speed?: number, size?: number, distort?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPosition = useRef(position);
    
    // Memoize the material so we don't recreate it every frame or render
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.1,
        metalness: 0.2,
        emissive: color,
        emissiveIntensity: 0.2
    }), [color]);

    useFrame((state) => {
        if (meshRef.current) {
            // Rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 * speed;

            // Floating animation (wider movement)
            meshRef.current.position.y = initialPosition.current[1] + Math.sin(state.clock.getElapsedTime() * speed * 0.4) * 2.5;

            // Horizontal drift (wider movement)
            meshRef.current.position.x = initialPosition.current[0] + Math.cos(state.clock.getElapsedTime() * speed * 0.3) * 3.5;

            // Depth movement
            meshRef.current.position.z = initialPosition.current[2] + Math.sin(state.clock.getElapsedTime() * speed * 0.2) * 2.0;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={[size, size, size]} geometry={geometries[geometry]} material={material} />
    );
});

function Scene({ isDark }: { isDark: boolean }) {
    return (
        <>
            <ambientLight intensity={isDark ? 0.8 : 1.2} />
            <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 2} />
            <pointLight position={[-10, -10, -5]} intensity={1} color={isDark ? "#4f46e5" : "#3b82f6"} />
            <spotLight position={[0, 10, 0]} intensity={1} penumbra={1} color={isDark ? "#ffffff" : "#60a5fa"} />

            {/* Expanded Floating Shapes with variety in size and color */}
            <FloatingShape position={[-4, 2, -5]} geometry="icosahedron" color={isDark ? "#4338ca" : "#60a5fa"} speed={0.8} size={1.2} />
            <FloatingShape position={[4, -2, -4]} geometry="torus" color={isDark ? "#7c3aed" : "#a78bfa"} speed={1.2} size={0.8} />
            <FloatingShape position={[0, 4, -8]} geometry="sphere" color={isDark ? "#be185d" : "#f472b6"} speed={0.5} size={1.5} />
            <FloatingShape position={[-6, -3, -6]} geometry="box" color={isDark ? "#059669" : "#34d399"} speed={0.9} size={0.7} />
            <FloatingShape position={[6, 3, -7]} geometry="octahedron" color={isDark ? "#d97706" : "#fbbf24"} speed={1.1} size={1.1} />
            <FloatingShape position={[-5, 5, -9]} geometry="cone" color={isDark ? "#dc2626" : "#f87171"} speed={0.7} size={0.9} />
            <FloatingShape position={[7, 1, -6]} geometry="icosahedron" color={isDark ? "#0891b2" : "#67e8f9"} speed={1.3} size={0.6} />
            <FloatingShape position={[0, -5, -5]} geometry="torus" color={isDark ? "#8b5cf6" : "#c084fc"} speed={0.85} size={1.3} />

            {/* More Objects for Richer Background */}
            <FloatingShape position={[-8, 3, -10]} geometry="sphere" color={isDark ? "#1e40af" : "#93c5fd"} speed={0.6} size={0.5} />
            <FloatingShape position={[8, -4, -8]} geometry="box" color={isDark ? "#4c1d95" : "#c4b5fd"} speed={1.0} size={1.1} />
            <FloatingShape position={[-2, 6, -7]} geometry="octahedron" color={isDark ? "#be123c" : "#fda4af"} speed={0.9} size={0.4} />
            <FloatingShape position={[2, -6, -9]} geometry="cone" color={isDark ? "#047857" : "#6ee7b7"} speed={1.1} size={1.7} />

            {/* Additional layer of small objects */}
            <FloatingShape position={[-3, -1, -4]} geometry="icosahedron" color={isDark ? "#4f46e5" : "#3b82f6"} speed={1.5} size={0.3} />
            <FloatingShape position={[3, 5, -5]} geometry="sphere" color={isDark ? "#ec4899" : "#f472b6"} speed={1.8} size={0.4} />
            <FloatingShape position={[5, -5, -7]} geometry="box" color={isDark ? "#10b981" : "#34d399"} speed={1.4} size={0.2} />
            <FloatingShape position={[-5, 0, -8]} geometry="octahedron" color={isDark ? "#f59e0b" : "#fbbf24"} speed={1.2} size={0.5} />

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
                dpr={[1, 1.2]} // Optimization: Lower cap pixel ratio for better performance
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
