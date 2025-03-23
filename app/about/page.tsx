"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Footer from "@/components/footer"
import CursorEffects from "@/components/cursor-effects"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"


function FloatingIcons() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="night" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12} position={[-1.5, 0, 0]}>
          {"{CODE}"}
          <meshStandardMaterial color="hsl(195, 100%, 50%)" emissive="hsl(195, 100%, 50%)" emissiveIntensity={0.5} />
        </Text3D>
      </Float>

      <Float speed={1} rotationIntensity={0.4} floatIntensity={1}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12} position={[1.5, 0.5, 0]}>
          {"</>"}
          <meshStandardMaterial color="hsl(325, 100%, 50%)" emissive="hsl(325, 100%, 50%)" emissiveIntensity={0.5} />
        </Text3D>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12} position={[0, -1, 0]}>
          {"AI"}
          <meshStandardMaterial color="hsl(180, 100%, 50%)" emissive="hsl(180, 100%, 50%)" emissiveIntensity={0.5} />
        </Text3D>
      </Float> 
    </Canvas>
  )
}

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLeft?: boolean
  delay: number
}

function TimelineItem({ year, title, description, isLeft = false, delay }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.3 })

  return (
    <div ref={itemRef} className={`flex w-full ${isLeft ? "justify-start" : "justify-end"}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        className={`w-full md:w-5/12 glassmorphism rounded-lg p-6 neon-border ${isLeft ? "mr-auto" : "ml-auto"}`}
        whileHover={{
          scale: 1.02,
          boxShadow: isLeft ? "0 0 20px rgba(0, 204, 255, 0.3)" : "0 0 20px rgba(255, 0, 128, 0.3)",
        }}
      >
        <div className="flex flex-col">
          <span className={`text-sm font-medium mb-2 ${isLeft ? "text-neon-cyan" : "text-neon-magenta"}`}>{year}</span>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])

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
                OUR STORY
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="neon-text-magenta">EpicPixels</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover our journey from a small design studio to a cutting-edge digital marketing agency.
              </p>
            </motion.div>
          </div> 

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div> 
        </section>

        <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col justify-center"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Pioneering <span className="neon-text-magenta">Digital Excellence</span>
                </h2>
                <p className="text-gray-400 mb-6">
                  At EpicPixels, we've been pushing the boundaries of digital marketing since our inception. Our journey
                  has been defined by innovation, creativity, and a relentless pursuit of excellence.
                </p>
                <p className="text-gray-400 mb-6">
                  We combine cutting-edge technology with artistic vision to create digital experiences that captivate,
                  engage, and convert. Our team of experts is passionate about helping brands stand out in the digital
                  landscape.
                </p>
                <Button className="w-fit bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 group relative overflow-hidden">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Learn More
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                  <motion.span
                    className="absolute inset-0 bg-neon-cyan"
                    initial={{ x: "-100%", opacity: 0.2 }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative h-[400px] rounded-lg overflow-hidden neon-border"
              >
                <div className="absolute inset-0 z-10">
                  <FloatingIcons /> 
                </div>
                <div className="absolute inset-0 bg-black/50 z-0"></div>
              </motion.div> 
            </div>  

            {/* Timeline */}
            <div className="relative">
              {/* Center line */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-neon-blue via-neon-magenta to-neon-cyan"
              />

              <div className="relative flex flex-col gap-10">
                <TimelineItem
                  year="2018"
                  title="EpicPixels Founded"
                  description="Started as a small design studio with a vision to transform digital experiences."
                  isLeft={true}
                  delay={0}
                />

                <TimelineItem
                  year="2019"
                  title="Expanded to Web Development"
                  description="Added web development services to create comprehensive digital solutions."
                  isLeft={false}
                  delay={1}
                />

                <TimelineItem
                  year="2020"
                  title="Digital Marketing Integration"
                  description="Incorporated SEO and digital marketing to provide end-to-end services."
                  isLeft={true}
                  delay={2}
                />

                <TimelineItem
                  year="2021"
                  title="AI Innovation Begins"
                  description="Started exploring AI-powered solutions to enhance our service offerings."
                  isLeft={false}
                  delay={3}
                />

                <TimelineItem
                  year="2022"
                  title="Global Expansion"
                  description="Expanded our client base internationally, working with brands across continents."
                  isLeft={true}
                  delay={4}
                />

                <TimelineItem
                  year="2023"
                  title="Award-Winning Agency"
                  description="Recognized as a leading digital marketing agency with multiple industry awards."
                  isLeft={false}
                  delay={5}
                />
              </div> 
            </div>

            {/* Our Values Section */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-magenta text-neon-magenta mb-4">
                  OUR VALUES
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What <span className="neon-text-cyan">Drives</span> Us
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our core values shape everything we do and guide our approach to digital excellence.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glassmorphism rounded-lg p-6 neon-border"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(0, 204, 255, 0.3)",
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-black/50 border border-neon-cyan text-neon-cyan">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-gray-400">
                    We constantly push the boundaries of what's possible in digital marketing, embracing new
                    technologies and creative approaches.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glassmorphism rounded-lg p-6 neon-border"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(255, 0, 128, 0.3)",
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-black/50 border border-neon-magenta text-neon-magenta">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-gray-400">
                    We strive for excellence in everything we do, from design and development to strategy and execution.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glassmorphism rounded-lg p-6 neon-border"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-black/50 border border-neon-blue text-neon-blue">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                  <p className="text-gray-400">
                    We believe in the power of collaboration, working closely with our clients to achieve their goals
                    and exceed their expectations.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Parallax background elements */}
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

        <Footer />
      </main>
    </PageTransition>
  )
}

