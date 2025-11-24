"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, PresentationControls, Html, useProgress } from "@react-three/drei";
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

function AbstractNetwork() {
    const points = useMemo(() => {
        const p = new Float32Array(300 * 3);
        for (let i = 0; i < 300; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            p[i * 3] = 2 * Math.sin(theta) * Math.cos(phi);
            p[i * 3 + 1] = 2 * Math.sin(theta) * Math.sin(phi);
            p[i * 3 + 2] = 2 * Math.cos(theta);
        }
        return p;
    }, []);

    return (
        <group>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                {/* Core Sphere */}
                <Sphere args={[1.5, 64, 64]}>
                    <meshStandardMaterial
                        color="#2563eb"
                        roughness={0.12}
                        metalness={0.7}
                        transparent
                        opacity={0.6}
                        wireframe
                    />
                </Sphere>

                {/* Floating Particles */}
                <points>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={points.length / 3}
                            array={points}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.05}
                        color="#2563eb"
                        sizeAttenuation
                        transparent
                        opacity={0.5}
                    />
                </points>
            </Float>
            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

export function ModelShowcase() {
    return (
        <div className="w-full h-[400px] md:h-[600px] relative cursor-grab active:cursor-grabbing">
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 0, 6] }}>
                <Suspense fallback={<Loader />}>
                    <PresentationControls
                        speed={1.5}
                        global
                        zoom={0.5}
                        polar={[-0.1, Math.PI / 4]}
                    >
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <AbstractNetwork />
                    </PresentationControls>
                </Suspense>
            </Canvas>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border">
                Drag to rotate • Scroll to zoom
            </div>
        </div>
    );
}
