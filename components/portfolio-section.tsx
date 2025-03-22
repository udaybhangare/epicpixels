"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

interface PortfolioItem {
  title: string
  category: string
  image: string
  link: string
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const portfolioItems: PortfolioItem[] = [
    {
      title: "Neon Brand Identity",
      category: "Branding & Design",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
    },
    {
      title: "Cyber E-commerce Platform",
      category: "Web Development",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
    },
    {
      title: "Digital Marketing Campaign",
      category: "SEO & Marketing",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
    },
    {
      title: "AI Content Generator",
      category: "AI Solutions",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
    },
    {
      title: "Motion Graphics Showreel",
      category: "Motion Graphics",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
    },
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-20 overflow-hidden bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-blue text-neon-blue mb-4"
          >
            OUR WORK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our <span className="neon-text-blue">Portfolio</span> Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Check out some of our recent projects that showcase our expertise and creativity.
          </motion.p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg neon-border">
            <div className="relative aspect-video">
              <Image
                src={portfolioItems[activeIndex].image || "/placeholder.svg"}
                alt={portfolioItems[activeIndex].title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="text-neon-cyan text-sm mb-2">{portfolioItems[activeIndex].category}</span>
                <h3 className="text-2xl font-bold mb-4">{portfolioItems[activeIndex].title}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit border-neon-blue text-neon-blue hover:bg-neon-blue/10"
                >
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                index === activeIndex ? "ring-2 ring-neon-magenta" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="aspect-square relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
    </section>
  )
}

