"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, Environment } from "@react-three/drei"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Footer from "@/components/footer"
import CursorEffects from "@/components/cursor-effects"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"

function ChatbotAnimation() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="night" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12}>
          {"AI"}
          <meshStandardMaterial color="hsl(180, 100%, 50%)" emissive="hsl(180, 100%, 50%)" emissiveIntensity={0.5} />
        </Text3D>
      </Float>
    </Canvas>
  )
}

function CyberpunkMap() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="night" />

      {/* City grid */}
      <group>
        {/* Horizontal streets */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`h-${i}`} position={[0, i - 5, 0]}>
            <boxGeometry args={[10, 0.05, 0.05]} />
            <meshStandardMaterial color="hsl(195, 100%, 50%)" emissive="hsl(195, 100%, 50%)" emissiveIntensity={0.5} />
          </mesh>
        ))}

        {/* Vertical streets */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`v-${i}`} position={[i - 5, 0, 0]}>
            <boxGeometry args={[0.05, 10, 0.05]} />
            <meshStandardMaterial color="hsl(325, 100%, 50%)" emissive="hsl(325, 100%, 50%)" emissiveIntensity={0.5} />
          </mesh>
        ))}

        {/* Buildings */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = Math.sin(i * 0.5) * 4
          const y = Math.cos(i * 0.5) * 4
          const height = Math.sin(i * 0.3) * 0.5 + 0.7

          return (
            <Float key={`b-${i}`} speed={0.2} rotationIntensity={0} floatIntensity={0.2}>
              <mesh position={[x, y, -height / 2]}>
                <boxGeometry args={[0.2, 0.2, height]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? "hsl(195, 100%, 50%)" : "hsl(325, 100%, 50%)"}
                  emissive={i % 2 === 0 ? "hsl(195, 100%, 50%)" : "hsl(325, 100%, 50%)"}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </Float>
          )
        })}

        {/* Location marker */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[0, 0, 0.5]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="hsl(0, 100%, 50%)" emissive="hsl(0, 100%, 50%)" emissiveIntensity={0.8} />
          </mesh>
        </Float>
      </group>
    </Canvas>
  )
}

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted", formState)

    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
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
    hidden: { y: 30, opacity: 0 },
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
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-magenta text-neon-magenta mb-4">
                GET IN TOUCH
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Let's <span className="neon-text-cyan">Connect</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Ready to elevate your digital presence? Reach out to us and let's create something epic together.
              </p>
            </motion.div>
          </div>

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div>
        </section>

        <section id="contact" ref={sectionRef} className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-neon-cyan text-neon-cyan animate-pulse-glow">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <p className="text-gray-400">hello@epicpixels.com</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-neon-magenta text-neon-magenta animate-pulse-glow">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Call Us</h3>
                    <p className="text-gray-400">+91 XXXXXXXXXX</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-neon-blue text-neon-blue animate-pulse-glow">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Location</h3>
                    <p className="text-gray-400">India</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8">
                  <div className="aspect-video rounded-lg overflow-hidden neon-border relative">
                    {/* Interactive 3D Map */}
                    <div className="w-full h-full">
                      <CyberpunkMap />
                    </div>

                    {/* Map overlay */}
                    <div className="absolute top-4 left-4 z-10 bg-black/70 rounded-lg p-3">
                      <span className="text-neon-cyan text-sm font-bold block">EpicPixels HQ</span>
                      <span className="text-gray-400 text-xs">Cyberpunk District, Digital City</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8">
                  <div className="glassmorphism rounded-lg p-4 neon-border">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-neon-cyan text-neon-cyan">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">AI Assistant</h3>
                      </div>
                    </div>

                    <div className="h-32 relative">
                      <ChatbotAnimation />
                    </div>

                    <div className="flex mt-2">
                      <Input
                        placeholder="Ask me anything..."
                        className="bg-black/30 border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20"
                      />
                      <Button className="ml-2 bg-neon-cyan hover:bg-neon-cyan/80 text-black">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
                className="glassmorphism rounded-lg p-6 neon-border relative z-10"
              >
                <h3 className="text-xl font-bold mb-6 neon-text-cyan">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <Input
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className={`bg-black/30 border-white/10 transition-all duration-300 ${
                          isFocused === "name" ? "border-neon-cyan ring-2 ring-neon-cyan/20" : ""
                        }`}
                        onFocus={() => setIsFocused("name")}
                        onBlur={() => setIsFocused(null)}
                        style={{ pointerEvents: "auto" }}
                      />
                      {isFocused === "name" && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-cyan animate-pulse-glow"
                            style={{ width: `${Math.min(100, formState.name.length * 5)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Your Email"
                        className={`bg-black/30 border-white/10 transition-all duration-300 ${
                          isFocused === "email" ? "border-neon-magenta ring-2 ring-neon-magenta/20" : ""
                        }`}
                        onFocus={() => setIsFocused("email")}
                        onBlur={() => setIsFocused(null)}
                        style={{ pointerEvents: "auto" }}
                      />
                      {isFocused === "email" && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-magenta animate-pulse-glow"
                            style={{ width: `${Math.min(100, formState.email.length * 3)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        className={`bg-black/30 border-white/10 transition-all duration-300 ${
                          isFocused === "subject" ? "border-neon-blue ring-2 ring-neon-blue/20" : ""
                        }`}
                        onFocus={() => setIsFocused("subject")}
                        onBlur={() => setIsFocused(null)}
                        style={{ pointerEvents: "auto" }}
                      />
                      {isFocused === "subject" && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-blue animate-pulse-glow"
                            style={{ width: `${Math.min(100, formState.subject.length * 2)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Textarea
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={5}
                        className={`bg-black/30 border-white/10 transition-all duration-300 ${
                          isFocused === "message" ? "border-neon-cyan ring-2 ring-neon-cyan/20" : ""
                        }`}
                        onFocus={() => setIsFocused("message")}
                        onBlur={() => setIsFocused(null)}
                        style={{ pointerEvents: "auto" }}
                      />
                      {isFocused === "message" && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-cyan animate-pulse-glow"
                            style={{ width: `${Math.min(100, formState.message.length / 2)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-blue via-neon-magenta to-neon-cyan opacity-0 group-hover:opacity-70 transition-opacity duration-500"></span>
                    <span className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </form>
              </motion.div>
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

        <Footer />
      </main>
    </PageTransition>
  )
}

