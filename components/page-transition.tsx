"use client"

import type React from "react"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {children}

      {/* Cyberpunk transition overlay */}
      <motion.div
        initial={{ scaleY: 1, y: "100%" }}
        animate={{ scaleY: 1, y: "-100%" }}
        transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1.0] }}
        className="fixed inset-0 z-[100] bg-gradient-to-b from-neon-blue/20 via-black to-neon-magenta/20 pointer-events-none"
      />
    </motion.div>
  )
}

