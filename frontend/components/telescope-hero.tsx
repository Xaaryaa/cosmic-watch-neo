"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Text } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { RootState } from '@react-three/fiber';

function TargetAsteroid() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state: RootState) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x += 0.002;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <dodecahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial
                    color="#444"
                    wireframe={true}
                    emissive="#00ff00"
                    emissiveIntensity={0.5}
                />
            </mesh>
            <mesh position={[0, 0, 0]} scale={[0.9, 0.9, 0.9]}>
                <dodecahedronGeometry args={[1.5, 0]} />
                <meshBasicMaterial color="black" />
            </mesh>
        </Float>
    );
}

function ScanningRing({ radius, speed, axis = 'z' }: { radius: number, speed: number, axis?: 'x' | 'y' | 'z' }) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        if (ref.current) {
            if (axis === 'z') ref.current.rotation.z += speed;
            if (axis === 'y') ref.current.rotation.y += speed;
        }
    });

    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color="#00ff9d" transparent opacity={0.3} />
        </mesh>
    )
}

function HUD() {
    return (
        <group>
            {/* Central Target Rings */}
            <ScanningRing radius={2.5} speed={0.01} axis="z" />
            <ScanningRing radius={2.8} speed={-0.005} axis="z" />

            {/* Data Points */}
            <Text position={[-3.5, 2, 0]} fontSize={0.15} color="#00ff9d" anchorX="left">
                TARGET: NEO-2026-X
            </Text>
            <Text position={[-3.5, 1.7, 0]} fontSize={0.15} color="#00ff9d" anchorX="left">
                DIST: 124,000 KM
            </Text>
            <Text position={[-3.5, 1.4, 0]} fontSize={0.15} color="#00ff9d" anchorX="left">
                VEL: 18,500 KM/H
            </Text>

            <Text position={[3.5, -2, 0]} fontSize={0.15} color="#ef4444" anchorX="right">
                THREAT LEVEL: HIGH
            </Text>
        </group>
    )
}

function Scene() {
    return (
        <>
            <color attach="background" args={['#050810']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ff00" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
            <TargetAsteroid />
            <HUD />
        </>
    );
}

export default function TelescopeHero() {
    return (
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#0a0e1a_90%)] z-10 pointer-events-none" />
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.05)_1px,transparent_1px)] bg-[size:100px_100px] z-10 pointer-events-none opacity-20" />

            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false,
                    preserveDrawingBuffer: false,
                    stencil: false,
                    depth: true
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#050810', 1);
                    // Handle context loss
                    gl.domElement.addEventListener('webglcontextlost', (event) => {
                        event.preventDefault();
                        console.log('WebGL context lost, attempting to restore...');
                    });
                    gl.domElement.addEventListener('webglcontextrestored', () => {
                        console.log('WebGL context restored');
                    });
                }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
