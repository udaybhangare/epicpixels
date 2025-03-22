"use client"
import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"

function NeonGrid() {
  return (
    <>
      {/* Horizontal lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Float key={`h-${i}`} speed={0.5} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={[0, i - 5, -5]}>
            <boxGeometry args={[20, 0.02, 0.02]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "hsl(195, 100%, 50%)" : "hsl(325, 100%, 50%)"}
              opacity={0.3}
              transparent
            />
          </mesh>
        </Float>
      ))}

      {/* Vertical lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Float key={`v-${i}`} speed={0.5} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={[i - 5, 0, -5]}>
            <boxGeometry args={[0.02, 20, 0.02]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "hsl(180, 100%, 50%)" : "hsl(325, 100%, 50%)"}
              opacity={0.3}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export default function NeonGridBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <NeonGrid />
      </Canvas>
    </div>
  )
}

