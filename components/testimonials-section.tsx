"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  image: string
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechNova",
      content:
        "EpicPixels transformed our digital presence completely. Their team's creativity and technical expertise helped us achieve a 200% increase in user engagement and a significant boost in conversions.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "Quantum Startups",
      content:
        "Working with EpicPixels was a game-changer for our startup. Their strategic approach to branding and web development helped us establish a strong market presence and attract key investors.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Product Manager",
      company: "InnovateCorp",
      content:
        "The AI-powered solutions developed by EpicPixels revolutionized our customer service operations. We've seen a 40% reduction in response time and significantly improved customer satisfaction scores.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  // Fix for buttons - ensure they're clickable
  useEffect(() => {
    const prevButton = document.querySelector('[aria-label="Previous testimonial"]')
    const nextButton = document.querySelector('[aria-label="Next testimonial"]')
    const dotButtons = document.querySelectorAll('[aria-label^="Go to testimonial"]')

    const makeClickable = (el: Element) => {
      el.classList.add("clickable")
      ;(el as HTMLElement).style.pointerEvents = "auto"
      ;(el as HTMLElement).style.zIndex = "50"
    }

    if (prevButton) makeClickable(prevButton)
    if (nextButton) makeClickable(nextButton)
    dotButtons.forEach(makeClickable)

    return () => {
      if (prevButton) prevButton.classList.remove("clickable")
      if (nextButton) nextButton.classList.remove("clickable")
      dotButtons.forEach((el) => el.classList.remove("clickable"))
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium border border-neon-magenta text-neon-magenta mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="neon-text-cyan">Clients</span> Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with EpicPixels.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="glassmorphism rounded-lg p-8 neon-border min-h-[300px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, type: "tween" }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-neon-cyan">
                    <Image
                      src={testimonials[activeIndex].image || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 h-12 w-12 text-neon-cyan/20" />
                  <p className="text-lg text-gray-300 mb-6 relative z-10">"{testimonials[activeIndex].content}"</p>
                </div>

                <h4 className="text-xl font-bold neon-text-magenta">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-400">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={isAnimating}
              className="rounded-full border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 transition-all duration-300 hover:scale-110 clickable"
              aria-label="Previous testimonial"
              style={{ pointerEvents: "auto", zIndex: 50 }}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return
                    setIsAnimating(true)
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                    setTimeout(() => setIsAnimating(false), 500)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 clickable ${
                    index === activeIndex ? "bg-neon-cyan w-6" : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  style={{ pointerEvents: "auto", zIndex: 50 }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={isAnimating}
              className="rounded-full border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 hover:scale-110 clickable"
              aria-label="Next testimonial"
              style={{ pointerEvents: "auto", zIndex: 50 }}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-10 z-0"></div>
    </section>
  )
}


