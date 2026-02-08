"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function Earth() {
    const earthRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#4f86f7" emissive="#1a3563" emissiveIntensity={0.2} roughness={0.5} />
            <Html position={[0, 1.5, 0]} center>
                <div className="text-xs text-blue-300 bg-black/50 px-2 rounded">Earth</div>
            </Html>
        </mesh>
    );
}

function Asteroid({ position, size, hazard }: { position: [number, number, number], size: number, hazard: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Simple orbit logic
        const x = position[0] * Math.cos(t * 0.1) - position[2] * Math.sin(t * 0.1);
        const z = position[0] * Math.sin(t * 0.1) + position[2] * Math.cos(t * 0.1);
        meshRef.current.position.set(x, position[1], z);
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <dodecahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
                color={hazard ? "#ff4444" : "#888888"}
                roughness={0.8}
            />
            {hazard && (
                <Html position={[0, size + 0.5, 0]} center distanceFactor={10}>
                    <div className="text-[10px] text-red-500 font-bold whitespace-nowrap">⚠ PHA</div>
                </Html>
            )}
        </mesh>
    );
}

function Sun() {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} /> {/* Scaled down sun for viewability, assume earth is center for relative view */}
            <meshBasicMaterial color="#ffcc00" />
        </mesh>
    )
}

export default function SolarSystem() {
    // Generate some random asteroids
    const asteroids = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        position: [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 10
        ] as [number, number, number],
        size: Math.random() * 0.2 + 0.05,
        hazard: Math.random() > 0.7
    }));

    return (
        <div className="w-full h-full min-h-[400px] bg-black rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Earth />

                {asteroids.map(ast => (
                    <Asteroid key={ast.id} position={ast.position} size={ast.size} hazard={ast.hazard} />
                ))}

                <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
