"use client"

import { useEffect, useState, useRef } from "react"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function CursorEffects() {
  const mousePosition = useMousePosition()
  const [isClicking, setIsClicking] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripples = useRef<
    Array<{ x: number; y: number; radius: number; alpha: number; maxRadius: number; speed: number }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Handle mouse events
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Animation loop
    let animationFrameId: number

    const render = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new ripple on click
      if (isClicking && mousePosition.x && mousePosition.y) {
        const maxRadius = Math.random() * 80 + 40
        ripples.current.push({
          x: mousePosition.x,
          y: mousePosition.y,
          radius: 5,
          alpha: 1,
          maxRadius,
          speed: Math.random() * 2 + 1,
        })
      }

      // Draw and update ripples
      ripples.current.forEach((ripple, index) => {
        // Update ripple
        ripple.radius += ripple.speed
        ripple.alpha = 1 - ripple.radius / ripple.maxRadius

        // Draw ripple
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(180, 100%, 50%, ${ripple.alpha})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw second ripple with different color
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.8, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(325, 100%, 50%, ${ripple.alpha * 0.7})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Remove ripple if it's too big
        if (ripple.radius >= ripple.maxRadius) {
          ripples.current.splice(index, 1)
        }
      })

      // Draw glow at cursor position
      if (mousePosition.x && mousePosition.y) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          100,
        )

        gradient.addColorStop(0, "hsla(180, 100%, 50%, 0.2)")
        gradient.addColorStop(0.5, "hsla(180, 100%, 50%, 0.05)")
        gradient.addColorStop(1, "hsla(180, 100%, 50%, 0)")

        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, isClicking])

  return (
    <div className="fixed inset-0 pointer-events-none z-40" style={{ pointerEvents: "none" }}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" style={{ mixBlendMode: "screen" }} />
    </div>
  )
}

