"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import OptimizedParticleSystem from "@/components/optimized-particle-system"
import ParticleSystem from "./particle-system"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (textRef.current) {
      gsap.from(textRef.current.querySelectorAll(".gsap-hero-text"), {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
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

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleSystem />

    {/* <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <OptimizedParticleSystem /> */}

      <div className="container mx-auto px-4 z-10 relative">
        <div ref={textRef} className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-blue text-neon-blue animate-pulse-glow">
              DIGITAL MARKETING AGENCY
            </span>
          </motion.div>

          <h1 className="gsap-hero-text text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">We Create</span>
            <span className="neon-text-magenta animate-text-flicker">Epic Digital</span>
            <span className="block">Experiences</span>
          </h1>

          <p className="gsap-hero-text text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Cutting-edge digital marketing agency that helps brands stand out with stunning visuals, innovative
            strategies, and high-performance campaigns.
          </p>

          <div className="gsap-hero-text flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-neon-magenta hover:bg-neon-magenta/80 text-black font-medium px-8 py-6 rounded-md"
              asChild
            >
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 px-8 py-6 rounded-md"
              asChild
            >
              <Link href="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
    </section>
  )
}

