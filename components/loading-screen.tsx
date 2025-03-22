"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Reset loading state when route changes
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-4xl font-bold neon-text-cyan">
                Epic<span className="neon-text-magenta">Pixels</span>
              </span>
            </motion.div>

            <div className="w-48 h-1 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "linear",
                }}
                className="w-24 h-full bg-gradient-to-r from-neon-blue via-neon-magenta to-neon-cyan"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-sm text-gray-400"
            >
              Loading digital experience...
            </motion.div>

            {/* Cyberpunk decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-cyan animate-pulse-glow" />
              <div className="absolute top-0 left-0 h-full w-0.5 bg-neon-cyan animate-pulse-glow" />
            </div>

            <div className="absolute -bottom-20 -right-20 w-40 h-40">
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-neon-magenta animate-pulse-glow" />
              <div className="absolute bottom-0 right-0 h-full w-0.5 bg-neon-magenta animate-pulse-glow" />
            </div>
          </div>

          {/* Background grid */}
          <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

