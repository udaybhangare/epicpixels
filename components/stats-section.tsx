"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface StatItemProps {
  value: string
  label: string
  delay: number
  color: string
}

function StatItem({ value, label, delay, color }: StatItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <h3 className="text-4xl md:text-5xl font-bold mb-2" style={{ color }}>
        {value}
      </h3>
      <p className="text-gray-400 text-center">{label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const stats = [
    {
      value: "200+",
      label: "Projects Completed",
      delay: 0,
      color: "hsl(195, 100%, 50%)",
    },
    {
      value: "50+",
      label: "Happy Clients",
      delay: 1,
      color: "hsl(325, 100%, 50%)",
    },
    {
      value: "10+",
      label: "Years Experience",
      delay: 2,
      color: "hsl(180, 100%, 50%)",
    },
    {
      value: "15+",
      label: "Industry Awards",
      delay: 3,
      color: "hsl(195, 100%, 50%)",
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-black/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <StatItem value={stat.value} label={stat.label} delay={stat.delay} color={stat.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-64 h-64 border-l-2 border-t-2 border-neon-blue/20 z-0"
      />

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-64 h-64 border-r-2 border-b-2 border-neon-magenta/20 z-0"
      />

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
    </section>
  )
}

