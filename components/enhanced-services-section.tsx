"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { Palette, Code, Search, Cpu, Film } from "lucide-react"

function NeonGrid() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.2} />

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
    </Canvas>
  )
}

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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glassmorphism neon-border rounded-lg p-6 transition-all duration-300 group"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? "perspective(1000px) rotateY(5deg) rotateX(5deg)"
          : "perspective(1000px) rotateY(0) rotateX(0)",
        boxShadow: isHovered ? `0 0 20px ${color}30` : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-black/50 border transition-colors duration-300`}
        style={{
          borderColor: color,
          color: color,
          transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
          transition: "transform 0.3s ease-out, border-color 0.3s ease-out, color 0.3s ease-out",
        }}
      >
        {icon}
      </div>

      <h3
        className="text-xl font-bold mb-2 transition-all duration-300"
        style={{
          color: isHovered ? color : "white",
          transform: isHovered ? "translateZ(15px)" : "translateZ(0)",
          transition: "transform 0.3s ease-out, color 0.3s ease-out",
        }}
      >
        {title}
      </h3>

      <p
        className="text-gray-400"
        style={{
          transform: isHovered ? "translateZ(10px)" : "translateZ(0)",
          transition: "transform 0.3s ease-out",
        }}
      >
        {description}
      </p>

      {/* Hover effect overlay */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export default function EnhancedServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  const services = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Branding & Design",
      description: "Logo, UI/UX, and visual identity that captures your brand's essence.",
      delay: 0,
      color: "hsl(195, 100%, 50%)",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description: "Modern websites, web apps, and e-commerce solutions built for performance.",
      delay: 1,
      color: "hsl(325, 100%, 50%)",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "SEO & Digital Marketing",
      description: "Search engine optimization, PPC, and social media marketing strategies.",
      delay: 2,
      color: "hsl(180, 100%, 50%)",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI-Powered Solutions",
      description: "AI-driven content generation and analytics to stay ahead of the curve.",
      delay: 3,
      color: "hsl(195, 100%, 50%)",
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "Motion Graphics",
      description: "High-quality motion design for ads and websites that captivate audiences.",
      delay: 4,
      color: "hsl(325, 100%, 50%)",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <NeonGrid />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-cyan text-neon-cyan mb-4"
          >
            OUR SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Elevate Your <span className="neon-text-magenta">Digital Presence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We offer a comprehensive suite of digital marketing services to help your brand stand out in the digital
            landscape.
          </motion.p>
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

      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-64 h-64 border-l-2 border-t-2 border-neon-blue/20 z-0"
      />

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-64 h-64 border-r-2 border-b-2 border-neon-magenta/20 z-0"
      />
    </section>
  )
}

