"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Palette, Code, Search, Cpu, Film, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Footer from "@/components/footer"
import CursorEffects from "@/components/cursor-effects"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"
import NeonGridBackground from "@/components/neon-grid-background"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  delay: number
  color: string
}

function ServiceCard({ icon, title, description, features, delay, color }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glassmorphism rounded-lg p-6 transition-all duration-300 group relative overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? "perspective(1000px) rotateY(5deg) rotateX(5deg)"
          : "perspective(1000px) rotateY(0) rotateX(0)",
        boxShadow: isHovered ? `0 0 20px ${color}30` : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Border effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, ${color}00, ${color}40, ${color}00)`,
          backgroundSize: "200% 200%",
          animation: "gradient-shift 3s ease infinite",
        }}
      />

      <div className="relative z-10">
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
          className="text-gray-400 mb-4"
          style={{
            transform: isHovered ? "translateZ(10px)" : "translateZ(0)",
            transition: "transform 0.3s ease-out",
          }}
        >
          {description}
        </p>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-sm" style={{ color }}>
                  ✓
                </span>
                <span className="text-gray-400 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 relative overflow-hidden group/btn"
          style={{
            borderColor: color,
            color: color,
          }}
        >
          <span className="relative z-10">{isExpanded ? "Show Less" : "Learn More"}</span>
          <motion.span
            className="absolute inset-0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: `${color}20` }}
          />
        </Button>
      </div>

      {/* Ripple effect on click */}
      <motion.div
        initial={{ scale: 0, x: "-50%", y: "-50%", opacity: 0.5 }}
        animate={isExpanded ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.5 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 w-full h-full rounded-full pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
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
      features: [
        "Logo Design & Brand Identity",
        "UI/UX Design for Web & Mobile",
        "Visual Style Guides",
        "Brand Strategy & Positioning",
        "Print & Digital Collateral",
      ],
      delay: 0,
      color: "hsl(195, 100%, 50%)",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description: "Modern websites, web apps, and e-commerce solutions built for performance.",
      features: [
        "Responsive Website Development",
        "Progressive Web Applications",
        "E-commerce Solutions",
        "Custom Web Applications",
        "API Development & Integration",
      ],
      delay: 1,
      color: "hsl(325, 100%, 50%)",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "SEO & Digital Marketing",
      description: "Search engine optimization, PPC, and social media marketing strategies.",
      features: [
        "Search Engine Optimization",
        "Pay-Per-Click Advertising",
        "Social Media Marketing",
        "Content Marketing Strategy",
        "Analytics & Performance Tracking",
      ],
      delay: 2,
      color: "hsl(180, 100%, 50%)",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI-Powered Solutions",
      description: "AI-driven content generation and analytics to stay ahead of the curve.",
      features: [
        "AI Content Generation",
        "Predictive Analytics",
        "Chatbot Development",
        "Machine Learning Integration",
        "Automated Marketing Solutions",
      ],
      delay: 3,
      color: "hsl(195, 100%, 50%)",
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "Motion Graphics",
      description: "High-quality motion design for ads and websites that captivate audiences.",
      features: [
        "Animated Explainer Videos",
        "UI Motion Design",
        "Social Media Animations",
        "3D Animation & Visualization",
        "Video Editing & Post-Production",
      ],
      delay: 4,
      color: "hsl(325, 100%, 50%)",
    },
  ]

  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <CustomCursor />
        <CursorEffects />
        <EnhancedNavbar />

        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-cyan text-neon-cyan mb-4">
                OUR EXPERTISE
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="neon-text-magenta">Services</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive digital solutions to elevate your brand and drive growth.
              </p>
            </motion.div>
          </div>

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div>
        </section>

        <section id="services" ref={sectionRef} className="relative py-20 overflow-hidden">
          <NeonGridBackground />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  delay={service.delay}
                  color={service.color}
                />
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-20 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to <span className="neon-text-cyan">Transform</span> Your Digital Presence?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Let's collaborate to create something extraordinary that sets your brand apart.
              </p>
              <Button className="bg-neon-magenta hover:bg-neon-magenta/80 text-black font-medium px-8 py-6 rounded-md relative overflow-hidden group animate-pulse-glow">
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0.3 }}
                  whileHover={{ scale: 1.5, opacity: 0.2 }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
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

        <Footer />
      </main>
    </PageTransition>
  )
}

