"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
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
    <section id="contact" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-magenta text-neon-magenta mb-4"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Let's <span className="neon-text-magenta">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Ready to elevate your digital presence? Reach out to us and let's create something epic together.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-neon-cyan text-neon-cyan">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email Us</h3>
                <p className="text-gray-400">hello@epicpixels.com</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-neon-magenta text-neon-magenta">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Call Us</h3>
                <p className="text-gray-400">+91 XXXXXXXXXX</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-neon-blue text-neon-blue">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Location</h3>
                <p className="text-gray-400">India</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <div className="aspect-video rounded-lg overflow-hidden neon-border">
                {/* Placeholder for map */}
                <div className="w-full h-full bg-black/30 flex items-center justify-center">
                  <span className="text-gray-400">Interactive Map Coming Soon</span>
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
                <Input
                  placeholder="Your Name"
                  className="bg-black/30 border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-black/30 border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  className="bg-black/30 border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="bg-black/30 border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <Button type="submit" className="w-full bg-neon-magenta hover:bg-neon-magenta/80 text-black" asChild>
                <Link href="/contact">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
    </section>
  )
}

