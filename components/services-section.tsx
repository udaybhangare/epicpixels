"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, Palette, TrendingUp, Layers, Cpu, Code } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
  color: string
}

function ServiceCard({ icon, title, description, delay, color }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glassmorphism neon-border rounded-lg p-6 transition-all duration-300 hover:translate-y-[-10px] group"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-black/50 border border-white/10 transition-colors duration-300"
        style={{ color: color }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors duration-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (headingRef.current) {
      gsap.from(headingRef.current.querySelectorAll(".gsap-reveal"), {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Website Development",
      description: "High-performance, scalable websites optimized for conversions and user engagement.",
      delay: 0,
      color: "hsl(var(--neon-blue))",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Creative Branding",
      description: "Memorable brand identity with distinctive logos and captivating advertisements.",
      delay: 1,
      color: "hsl(var(--neon-magenta))",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Marketing & Growth",
      description: "Data-driven strategies to increase your business visibility and customer acquisition.",
      delay: 2,
      color: "hsl(var(--neon-cyan))",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Seamless user experiences with intuitive interfaces that delight and convert.",
      delay: 3,
      color: "hsl(var(--neon-blue))",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Integration",
      description: "Cutting-edge automation and personalization solutions powered by artificial intelligence.",
      delay: 4,
      color: "hsl(var(--neon-magenta))",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Custom Development",
      description: "Tailored solutions for unique business challenges with scalable, maintainable code.",
      delay: 5,
      color: "hsl(var(--neon-cyan))",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span className="gsap-reveal inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-cyan text-neon-cyan mb-4">
            OUR SERVICES
          </motion.span>
          <h2 className="gsap-reveal text-3xl md:text-4xl font-bold mb-4">
            Elevate Your <span className="neon-text-magenta">Digital Presence</span>
          </h2>
          <p className="gsap-reveal text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive suite of digital marketing services to help your brand stand out in the digital
            landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              color={service.color}
            />
          ))}
        </div>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
    </section>
  )
}

