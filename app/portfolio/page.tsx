"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, PresentationControls } from "@react-three/drei"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Footer from "@/components/footer"
import CursorEffects from "@/components/cursor-effects"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"

// Simple cube model instead of loading external GLB
function CubeModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hsl(195, 100%, 50%)" emissive="hsl(195, 100%, 50%)" emissiveIntensity={0.5} />
    </mesh>
  )
}

interface PortfolioItem {
  title: string
  category: string
  image: string
  link: string
  description: string
  technologies: string[]
}

function PortfolioModal({
  item,
  isOpen,
  onClose,
}: {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 20 }}
            className="relative z-10 w-full max-w-4xl glassmorphism rounded-lg overflow-hidden neon-border"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20 text-white hover:text-neon-cyan bg-black/50 rounded-full"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-[300px] md:h-auto relative">
                <div className="absolute inset-0">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <Environment preset="night" />
                    <PresentationControls
                      global
                      rotation={[0, 0, 0]}
                      polar={[-Math.PI / 4, Math.PI / 4]}
                      azimuth={[-Math.PI / 4, Math.PI / 4]}
                      config={{ mass: 2, tension: 400 }}
                      snap={{ mass: 4, tension: 400 }}
                    >
                      <Float rotationIntensity={0.4}>
                        <CubeModel />
                      </Float>
                    </PresentationControls>
                  </Canvas>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <span className="text-neon-cyan text-sm mb-2 block">{item.category}</span>
                <h3 className="text-2xl font-bold mb-4 neon-text-blue">{item.title}</h3>
                <p className="text-gray-400 mb-6">{item.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 text-white/80">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs py-1 px-2 rounded-full bg-black/50 border border-neon-magenta/50 text-neon-magenta"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-fit border-neon-blue text-neon-blue hover:bg-neon-blue/10 group">
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function PortfolioPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  const portfolioItems: PortfolioItem[] = [
    {
      title: "Neon Brand Identity",
      category: "Branding & Design",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      description:
        "A complete brand identity redesign with a cyberpunk aesthetic for a tech startup, including logo, color palette, typography, and brand guidelines.",
      technologies: ["Adobe Illustrator", "Photoshop", "Figma", "After Effects"],
    },
    {
      title: "Cyber E-commerce Platform",
      category: "Web Development",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      description:
        "A high-performance e-commerce platform with advanced filtering, search capabilities, and a seamless checkout process optimized for conversions.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Stripe", "Vercel"],
    },
    {
      title: "Digital Marketing Campaign",
      category: "SEO & Marketing",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      description:
        "A comprehensive digital marketing campaign that increased conversions by 200% through targeted ads, content marketing, and social media strategies.",
      technologies: ["Google Ads", "Facebook Ads", "SEO", "Content Marketing", "Analytics"],
    },
    {
      title: "AI Content Generator",
      category: "AI Solutions",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      description:
        "An AI-powered content generator that creates engaging and SEO-optimized content for blogs, social media, and marketing materials.",
      technologies: ["Python", "TensorFlow", "GPT-4", "React", "Node.js"],
    },
    {
      title: "Motion Graphics Showreel",
      category: "Motion Graphics",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      description:
        "A collection of high-quality motion graphics for advertising campaigns, including animated logos, explainer videos, and social media content.",
      technologies: ["After Effects", "Cinema 4D", "Premiere Pro", "Illustrator"],
    },
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
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
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-blue text-neon-blue mb-4">
                OUR WORK
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="neon-text-magenta">Portfolio</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our latest projects showcasing our creativity, technical expertise, and innovative solutions.
              </p>
            </motion.div>
          </div>

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div>
        </section>

        <section id="portfolio" ref={sectionRef} className="relative py-20 overflow-hidden bg-black/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Project Details */}
              <motion.div style={{ y: y1 }} className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <span className="text-neon-cyan text-sm">{portfolioItems[activeIndex].category}</span>
                    <h3 className="text-3xl font-bold neon-text-blue">{portfolioItems[activeIndex].title}</h3>
                    <p className="text-gray-400">{portfolioItems[activeIndex].description}</p>

                    <div className="flex flex-wrap gap-2 my-4">
                      {portfolioItems[activeIndex].technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs py-1 px-2 rounded-full bg-black/50 border border-neon-magenta/50 text-neon-magenta"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-fit border-neon-blue text-neon-blue hover:bg-neon-blue/10 mt-4 group"
                      onClick={() => openModal(portfolioItems[activeIndex])}
                    >
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                    </Button>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-start mt-8 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="rounded-full border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="rounded-full border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              {/* 3D Model Display */}
              <motion.div style={{ y: y2 }} className="h-[400px] rounded-lg overflow-hidden neon-border">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <Environment preset="night" />
                      <PresentationControls
                        global
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        config={{ mass: 2, tension: 400 }}
                        snap={{ mass: 4, tension: 400 }}
                      >
                        <Float rotationIntensity={0.4}>
                          <CubeModel />
                        </Float>
                      </PresentationControls>
                    </Canvas>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12"
            >
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    index === activeIndex ? "ring-2 ring-neon-magenta" : ""
                  }`}
                  onClick={() => {
                    if (!isTransitioning && index !== activeIndex) {
                      setIsTransitioning(true)
                      setActiveIndex(index)
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px ${index === activeIndex ? "hsl(325, 100%, 50%, 0.5)" : "transparent"}`,
                  }}
                >
                  <div className="aspect-square relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div
                      className={`absolute inset-0 transition-colors duration-300 ${
                        index === activeIndex ? "bg-black/30" : "bg-black/50 hover:bg-black/30"
                      }`}
                    ></div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-medium truncate">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>

          {/* Project Modal */}
          <PortfolioModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}

