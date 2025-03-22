"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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

      <Float speed={1} rotationIntensity={0.4} floatIntensity={1} position={[1.5, 0.5, 0]}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12}>
          {"</>"}
          <meshStandardMaterial color="hsl(325, 100%, 50%)" emissive="hsl(325, 100%, 50%)" emissiveIntensity={0.5} />
        </Text3D>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2} position={[0, -1, 0]}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12}>
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
      >
        <div className="flex flex-col">
          <span className="text-neon-cyan text-sm font-medium mb-2">{year}</span>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-blue text-neon-blue mb-4"
          >
            ABOUT US
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our <span className="neon-text-blue">Digital</span> Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            From humble beginnings to digital excellence, discover the story behind EpicPixels.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Pioneering <span className="neon-text-magenta">Digital Excellence</span>
            </h3>
            <p className="text-gray-400 mb-6">
              At EpicPixels, we've been pushing the boundaries of digital marketing since our inception. Our journey has
              been defined by innovation, creativity, and a relentless pursuit of excellence.
            </p>
            <p className="text-gray-400 mb-6">
              We combine cutting-edge technology with artistic vision to create digital experiences that captivate,
              engage, and convert. Our team of experts is passionate about helping brands stand out in the digital
              landscape.
            </p>
            <Button className="w-fit bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-neon-blue via-neon-magenta to-neon-cyan"></div>

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
  )
}

