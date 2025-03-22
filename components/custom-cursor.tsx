"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 rounded-full mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", // Explicitly set pointer-events to none
        }}
      >
        <div
          className={`rounded-full bg-neon-cyan transition-all duration-200 ${
            isClicking ? "w-6 h-6 opacity-50" : "w-4 h-4 opacity-70"
          }`}
          style={{
            boxShadow: `0 0 10px hsl(var(--neon-cyan)), 0 0 20px hsl(var(--neon-cyan) / 0.5)`,
            pointerEvents: "none", // Explicitly set pointer-events to none
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none z-50 rounded-full border border-neon-magenta mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isClicking ? "30px" : "40px",
          height: isClicking ? "30px" : "40px",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
          boxShadow: `0 0 10px hsl(var(--neon-magenta) / 0.3), 0 0 20px hsl(var(--neon-magenta) / 0.2)`,
          pointerEvents: "none", // Explicitly set pointer-events to none
        }}
      />
    </>
  )
}

