"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function HeroEarth() {
    const earthRef = useRef<THREE.Mesh>(null!);

    useFrame((state: any) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001;
            // Gentle floating
            earthRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <mesh ref={earthRef} position={[0, 0, 0]}>
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshStandardMaterial
                color="#1a4b8c"
                emissive="#0a1a3a"
                emissiveIntensity={0.5}
                roughness={0.4}
                metalness={0.6}
            />
        </mesh>
    );
}

function HeroAsteroids() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state: any) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
    })

    return (
        <group ref={groupRef}>
            {Array.from({ length: 50 }).map((_, i) => {
                const radius = 6 + Math.random() * 4;
                const angle = Math.random() * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = (Math.random() - 0.5) * 2;
                return (
                    <mesh key={i} position={[x, y, z]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <dodecahedronGeometry args={[Math.random() * 0.15, 0]} />
                        <meshStandardMaterial color="#888888" />
                    </mesh>
                )
            })}
        </group>
    )

}

export default function HeroOrbit() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f86f7" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff4444" />

                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
                <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#4f86f7" />

                <HeroEarth />
                <HeroAsteroids />
            </Canvas>
        </div>
    );
}
