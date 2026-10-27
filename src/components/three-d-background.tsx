"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

const FloatingOrb = ({ position, color, size, speed }: { position: [number, number, number]; color: string; size: number; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position])
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.position.x = initialPosition.x + Math.sin(time) * 0.5
      meshRef.current.position.y = initialPosition.y + Math.cos(time * 0.7) * 0.5
      meshRef.current.position.z = initialPosition.z + Math.sin(time * 0.5) * 0.3
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.15}
        transmission={0.3}
        roughness={0.1}
        metalness={0.2}
        clearcoat={0.5}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

const GridFloor = () => {
  const gridRef = useRef<THREE.GridHelper>(null!)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = -3 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <gridHelper ref={gridRef} args={[20, 20, 0x00ff88, 0x1a1a2e]} />
  )
}

export function ThreeDBackground() {
  return (
    <Canvas
      className="fixed inset-0 -z-10 pointer-events-none"
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 5, 25]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} color="#00ff88" intensity={0.5} />
      <pointLight position={[5, -5, 5]} color="#0088ff" intensity={0.3} />
      
      <GridFloor />
      
      <FloatingOrb position={[-4, 2, -5]} color="#00ff88" size={1.2} speed={0.5} />
      <FloatingOrb position={[4, -1, -3]} color="#0088ff" size={0.8} speed={0.7} />
      <FloatingOrb position={[-2, -3, -4]} color="#ff0066" size={1} speed={0.4} />
      <FloatingOrb position={[3, 3, -2]} color="#ffaa00" size={0.6} speed={0.6} />
      <FloatingOrb position={[0, 4, -6]} color="#aa00ff" size={0.9} speed={0.3} />
      
      <Stars radius={50} depth={100} count={2000} factor={4} saturation={0} />
    </Canvas>
  )
}

export function HeroCanvas() {
  return (
    <Canvas
      className="absolute inset-0 -z-10 pointer-events-none"
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 3, 20]} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1} />
      <pointLight position={[-3, 3, -3]} color="#00ff88" intensity={0.8} />
      <pointLight position={[3, -3, 3]} color="#0088ff" intensity={0.5} />
      
      <HeroShapes />
      <Stars radius={30} depth={50} count={1000} factor={3} saturation={0} />
    </Canvas>
  )
}

const HeroShapes = () => {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      groupRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <TorusKnot position={[-2, 1, 0]} color="#00ff88" size={1.2} />
      <TorusKnot position={[2, -1, 0]} color="#0088ff" size={1} speed={-1} />
      <Icosahedron position={[0, 0, -2]} color="#ff0066" size={0.8} />
    </group>
  )
}

const TorusKnot = ({ position, color, size, speed = 1 }: { position: [number, number, number]; color: string; size: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusKnotGeometry args={[size, size * 0.3, 100, 16]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.2}
        transmission={0.5}
        roughness={0}
        metalness={0.3}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  )
}

const Icosahedron = ({ position, color, size }: { position: [number, number, number]; color: string; size: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = position[1] + Math.cos(time) * 0.15
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.15}
        transmission={0.3}
        roughness={0.1}
        metalness={0.2}
        wireframe={true}
      />
    </mesh>
  )
}
