"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, X } from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Footer from "@/components/footer"
import CursorEffects from "@/components/cursor-effects"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"
import TeamPagePopup from "@/components/team-page-popup"

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  fullBio: string
  skills: string[]
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

function TeamMemberModal({
  member,
  isOpen,
  onClose,
}: {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!member) return null

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
            className="relative z-10 w-full max-w-3xl glassmorphism rounded-lg overflow-hidden neon-border"
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
              <div className="relative h-[300px] md:h-auto">
                <div className="absolute inset-0">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-1 neon-text-cyan">{member.name}</h3>
                  <p className="text-neon-magenta text-sm mb-4">{member.role}</p>

                  <div className="flex space-x-2">
                    {member.social.twitter && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.github && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h4 className="text-lg font-medium mb-4">About {member.name.split(" ")[0]}</h4>
                <p className="text-gray-400 mb-6">{member.fullBio}</p>

                <div>
                  <h4 className="text-sm font-medium mb-2 text-white/80">Skills & Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs py-1 px-2 rounded-full bg-black/50 border border-neon-cyan/50 text-neon-cyan"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Determine color based on index
  const colors = ["hsl(195, 100%, 50%)", "hsl(325, 100%, 50%)", "hsl(180, 100%, 50%)", "hsl(195, 100%, 50%)"]
  const color = colors[index % colors.length]

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glassmorphism rounded-lg overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "perspective(1000px) translateZ(10px)" : "perspective(1000px) translateZ(0px)",
          transition: "transform 0.3s ease-out",
          boxShadow: isHovered ? `0 0 20px ${color}30` : "none",
        }}
      >
        <div className="relative">
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

            {/* Glowing border on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 20px ${color}`,
              }}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 group-hover:translate-y-[-10px] transition-transform duration-300">
            <h3
              className="text-xl font-bold mb-1 group-hover:text-white transition-colors duration-300"
              style={{
                textShadow: isHovered ? `0 0 10px ${color}` : "none",
              }}
            >
              {member.name}
            </h3>
            <p className="text-sm text-gray-300 mb-3" style={{ color: isHovered ? color : "" }}>
              {member.role}
            </p>

            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {member.social.twitter && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70">
                  <Twitter className="h-4 w-4" />
                </Button>
              )}
              {member.social.linkedin && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70">
                  <Linkedin className="h-4 w-4" />
                </Button>
              )}
              {member.social.github && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70">
                  <Github className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-black/70">
          <p className="text-sm text-gray-400 line-clamp-3">{member.bio}</p>
        </div>
      </motion.div>

      <TeamMemberModal member={member} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default function TeamPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  const teamMembers: TeamMember[] = [
      {
        name: "Parth Dhamapurkar",
        role: "CEO | Frontend Developer",
        image: "/parth.jpg",
        bio: "Frontend wizard crafting sleek and interactive web experiences.",
        fullBio:
          "Parth is our go-to guy for all things frontend. As the CEO, he manages the team while crafting engaging and modern UI/UX. Specializing in animations and performance optimization, he ensures our apps look and feel smooth. When not designing interfaces, he’s exploring new UI trends or binge-watching tech YouTube.",
        skills: ["UI/UX Design", "Frontend Development", "Animations", "Performance Optimization"],
        social: {
          // twitter: "#",
          // linkedin: "#",
          // github: "#",
        },
      },
      {
        name: "Uday Bhangare",
        role: "CTO | Full-Stack Developer",
        image: "/uday.jpg",
        bio: "Tech geek who loves building full-stack applications with modern frameworks.",
        fullBio:
          "Uday is the brain behind our tech. As the CTO, he ensures everything runs smoothly, from backend logic to frontend animations. Passionate about scalable web apps, clean code, and optimized performance, he's always exploring new frameworks. When he’s not coding, he’s learning new tech, watching heist movies, or playing chess.",
        skills: ["Full-Stack Development", "API Design", "Database Management", "UI/UX Optimization", "Animations"],
        social: {
          // twitter: "#",
          // linkedin: "#",
          // github: "#",
        },
      },
      {
        name: "Amogh Shirke",
        role: "Finance & Business Strategy",
        image: "/amogh.jpg",
        bio: "Handles all things finance and ensures we spend wisely.",
        fullBio:
          "Amogh takes care of financial planning and business growth strategies. He keeps track of expenses, optimizes budgets, and makes key investment decisions. With an analytical mindset, he ensures our projects stay financially sound. When not crunching numbers, he’s reading finance books or analyzing market trends.",
        skills: ["Financial Planning", "Budget Management", "Business Strategy", "Market Analysis"],
        social: {
          // linkedin: "#",
        },
      },
      {
        name: "Gaurang Mestry",
        role: "Graphic Designer & Video Editor",
        image: "/gaurang.jpg",
        bio: "Creative mind behind our branding, logos, and video content.",
        fullBio:
          "Gaurang is our creative powerhouse. He designs sleek logos, eye-catching visuals, and engaging video edits that bring our brand to life. Passionate about storytelling and aesthetics, he makes sure our projects stand out. In his free time, he’s exploring new design trends or experimenting with motion graphics.",
        skills: ["Adobe Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Branding", "Motion Design"],
        social: {
          // instagram: "#",
          // linkedin: "#",
        },
      },
    ];

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
                OUR TEAM
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Meet Our <span className="neon-text-cyan">Talented</span> Team
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The creative minds and technical experts behind our exceptional digital experiences.
              </p>
            </motion.div>
          </div>

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-20 z-0"></div>
        </section>

        <section id="team" ref={sectionRef} className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {teamMembers.map((member, index) => (
                <TeamCard key={index} member={member} index={index} />
              ))}
            </div>

            {/* Join Our Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glassmorphism rounded-lg p-8 neon-border text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Want to <span className="neon-text-magenta">Join</span> Our Team?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                We're always looking for talented individuals who are passionate about digital innovation and
                creativity.
              </p>
              <Button
                className="bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 px-8 py-6 rounded-md relative overflow-hidden group"
                onClick={() => setIsPopupOpen(true)}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  View Open Positions
                </span>

                <motion.span
                  className="absolute inset-0 bg-neon-cyan"
                  initial={{ x: "-100%", opacity: 0.2 }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
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

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
        </section>

        <TeamPagePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

        <Footer />
      </main>
    </PageTransition>
  )
}

