"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import OptimizedParticleSystem from "@/components/optimized-particle-system"

export default function EnhancedHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax effect values
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (textRef.current) {
      const elements = textRef.current.querySelectorAll(".gsap-hero-text")

      gsap.fromTo(
        elements,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5, // Delay to allow loading screen to finish
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Text flicker animation variants
  const flickerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.85, 1, 0.9, 1],
      transition: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 1],
      },
    },
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <OptimizedParticleSystem />

      <motion.div style={{ opacity }} className="container mx-auto px-4 z-10 relative">
        <div ref={textRef} className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-4"
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-blue text-neon-blue animate-pulse-glow">
              DIGITAL MARKETING AGENCY
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <motion.span
              className="gsap-hero-text block"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              We Create
            </motion.span>

            <motion.span
              className="gsap-hero-text neon-text-magenta"
              variants={flickerVariants}
              initial="initial"
              animate="animate"
            >
              Epic Digital
            </motion.span>

            <motion.span
              className="gsap-hero-text block"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Experiences
            </motion.span>
          </h1>

          <motion.p
            className="gsap-hero-text text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Cutting-edge digital marketing agency that helps brands stand out with stunning visuals, innovative
            strategies, and high-performance campaigns.
          </motion.p>

          <motion.div
            className="gsap-hero-text flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Button className="bg-neon-magenta hover:bg-neon-magenta/80 text-black font-medium px-8 py-6 rounded-md group relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

              {/* Button hover effect */}
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0.3 }}
                whileHover={{ x: "100%", opacity: 0.2 }}
                transition={{ duration: 0.5 }}
              />
            </Button>

            <Button
              variant="outline"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 px-8 py-6 rounded-md relative overflow-hidden group"
            >
              <span className="relative z-10">View Our Work</span>

              {/* Button hover effect */}
              <motion.span
                className="absolute inset-0 bg-neon-cyan"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.1 }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div style={{ opacity, y: y1 }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </motion.div>

      {/* Cyberpunk grid overlay with parallax */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 cyberpunk-grid opacity-20 z-0" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-40 h-40 border-l-2 border-t-2 border-neon-blue/30 z-0" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 border-r-2 border-b-2 border-neon-magenta/30 z-0" />
    </section>
  )
}

