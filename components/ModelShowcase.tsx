"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Html, useProgress, Sphere, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2 text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
            </div>
        </Html>
    );
}

function CleanSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += delta * 0.1;
            sphereRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group>
            {/* Central Wireframe Sphere */}
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <Sphere ref={sphereRef} args={[1.8, 64, 64]}>
                    <meshStandardMaterial
                        color="#1e293b"
                        wireframe
                        wireframeLinewidth={0.5}
                        transparent
                        opacity={0.6}
                        roughness={0.5}
                    />
                </Sphere>

                {/* Inner Core Sphere (Subtle fill) */}
                <Sphere args={[1.7, 64, 64]}>
                    <meshStandardMaterial
                        color="#f1f5f9"
                        transparent
                        opacity={0.1}
                        roughness={0}
                    />
                </Sphere>
            </Float>

            {/* Particles */}
            <ParticleCloud />
        </group>
    );
}

function ParticleCloud() {
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Sparkles
                count={200}
                scale={5}
                size={6}
                speed={0.4}
                opacity={0.8}
                color="#3b82f6"
                noise={0.5}
            />
        </group>
    );
}

export function ModelShowcase() {
    return (
        <div className="hidden md:block w-full h-[400px] md:h-[600px] relative cursor-grab active:cursor-grabbing">
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 0, 7] }}>
                <Suspense fallback={<Loader />}>
                    <PresentationControls
                        speed={1.5}
                        global
                        zoom={0.5}
                        polar={[-0.1, Math.PI / 4]}
                    >
                        <ambientLight intensity={0.8} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <CleanSphere />
                    </PresentationControls>
                </Suspense>
            </Canvas>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border">
                Drag to rotate • Scroll to zoom
            </div>
        </div>
    );
}
