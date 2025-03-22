"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [showNoPositionsDialog, setShowNoPositionsDialog] = useState(false)

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Alex has over 15 years of experience in digital marketing and web development. He founded EpicPixels with a vision to create digital experiences that truly stand out.",
    },
    {
      name: "Samantha Lee",
      role: "Creative Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "With a background in fine arts and digital design, Samantha leads our creative team to develop stunning visual identities and user experiences for our clients.",
    },
    {
      name: "David Chen",
      role: "Technical Lead",
      image: "/placeholder.svg?height=400&width=400",
      bio: "David is a full-stack developer with expertise in the latest web technologies. He ensures that our projects are not just beautiful, but also technically sound and performant.",
    },
    {
      name: "Priya Sharma",
      role: "AI Specialist",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Priya specializes in artificial intelligence and machine learning. She helps integrate cutting-edge AI solutions into our clients' digital products.",
    },
  ]

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
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-blue text-neon-blue mb-4">
            OUR TEAM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet The <span className="neon-text-magenta">Talent</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our team of experts is passionate about creating exceptional digital experiences that drive results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glassmorphism rounded-lg overflow-hidden neon-border group"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue hover:bg-neon-blue hover:text-black transition-colors duration-300"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-neon-magenta/20 flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-black transition-colors duration-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors duration-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-neon-cyan text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm line-clamp-3">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button
            onClick={() => setShowNoPositionsDialog(true)}
            className="bg-transparent border border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              View Open Positions
            </span>
            <motion.span
              className="absolute inset-0 bg-neon-magenta"
              initial={{ x: "-100%", opacity: 0.2 }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>

      {/* No Positions Dialog */}
      <Dialog open={showNoPositionsDialog} onOpenChange={setShowNoPositionsDialog}>
        <DialogContent className="glassmorphism border-neon-magenta">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">No Open Positions</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              There are no open positions right now. Please check back later or send your resume to
              careers@epicpixels.com for future opportunities.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setShowNoPositionsDialog(false)}
              className="bg-neon-magenta hover:bg-neon-magenta/80 text-black"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
    </section>
  )
}

