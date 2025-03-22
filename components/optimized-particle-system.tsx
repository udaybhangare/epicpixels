"use client"

import { useRef, useEffect, useState } from "react"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export default function OptimizedParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  const isInitializedRef = useRef(false)

  // Increased number of particles
  const particleCount = 150

  // Colors for particles
  const colors = [
    "hsl(195, 100%, 50%)", // Neon Blue
    "hsl(325, 100%, 50%)", // Neon Magenta
    "hsl(180, 100%, 50%)", // Neon Cyan
  ]

  const initializeParticles = () => {
    if (!canvasRef.current) return

    const { width, height } = canvasRef.current
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(i % colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    particlesRef.current = particles
  }

  const updateParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)

    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Boundary check
      if (particle.x > width) particle.x = 0
      else if (particle.x < 0) particle.x = width
      if (particle.y > height) particle.y = 0
      else if (particle.y < 0) particle.y = height

      // Mouse interaction
      if (mousePosition.x && mousePosition.y) {
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.speedX += dx * force * 0.01
          particle.speedY += dy * force * 0.01
        }
      }

      // Speed limit
      const maxSpeed = 1.5
      const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
      if (speed > maxSpeed) {
        particle.speedX = (particle.speedX / speed) * maxSpeed
        particle.speedY = (particle.speedY / speed) * maxSpeed
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()
      ctx.globalAlpha = 1

      // Connect particles
      for (let j = index + 1; j < particlesRef.current.length; j++) {
        const otherParticle = particlesRef.current[j]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = particle.color
          ctx.globalAlpha = (100 - distance) / 1000
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
    })

    animationFrameRef.current = requestAnimationFrame(updateParticles)
  }

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height

        if (isInitializedRef.current) {
          initializeParticles()
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    if (!isInitializedRef.current) {
      initializeParticles()
      isInitializedRef.current = true
    }

    updateParticles()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [dimensions.width, dimensions.height])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: "none" }} />
}

