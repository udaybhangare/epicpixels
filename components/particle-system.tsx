"use client"

import { useRef } from "react"
import type * as THREE from "three"
import { useFrame, useThree, Canvas } from "@react-three/fiber"
import { useMousePosition } from "@/hooks/use-mouse-position"

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null!)
  const mousePosition = useMousePosition()
  const { viewport } = useThree()

  // Create particles
  const particlesPosition = new Float32Array(count * 3)
  const particlesColor = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particlesPosition[i3] = (Math.random() - 0.5) * 10
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 10
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 10

    // Random colors between neon blue, magenta, and cyan
    const colorChoice = Math.random()
    if (colorChoice < 0.33) {
      // Neon blue
      particlesColor[i3] = 0
      particlesColor[i3 + 1] = 0.8
      particlesColor[i3 + 2] = 1
    } else if (colorChoice < 0.66) {
      // Neon magenta
      particlesColor[i3] = 1
      particlesColor[i3 + 1] = 0
      particlesColor[i3 + 2] = 0.8
    } else {
      // Neon cyan
      particlesColor[i3] = 0
      particlesColor[i3 + 1] = 1
      particlesColor[i3 + 2] = 1
    }
  }

  useFrame((state) => {
    if (!mesh.current) return

    // Rotate particles
    mesh.current.rotation.x += 0.001
    mesh.current.rotation.y += 0.001

    // Mouse interaction
    if (mousePosition.x && mousePosition.y) {
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1

      mesh.current.rotation.x += mouseY * 0.001
      mesh.current.rotation.y += mouseX * 0.001
    }

    // Update particles
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Add subtle movement
      positions[i3] += Math.sin(time + i * 0.1) * 0.002
      positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.002
      positions[i3 + 2] += Math.sin(time + i * 0.1) * 0.002
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particlesPosition} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particlesColor} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function ParticleSystem() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  )
}

