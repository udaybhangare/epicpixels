"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold neon-text-cyan">
                Epic<span className="neon-text-magenta">Pixels</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Cutting-edge digital marketing agency that helps brands stand out with stunning visuals and innovative
              strategies.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-neon-blue hover:bg-neon-blue/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-neon-cyan hover:bg-neon-cyan/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:text-neon-magenta hover:bg-neon-magenta/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-neon-blue hover:bg-neon-blue/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-neon-cyan hover:bg-neon-cyan/10">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Branding & Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  SEO & Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  AI-Powered Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  Motion Graphics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Subscribe</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
            <div className="flex space-x-2">
              <Input
                placeholder="Your Email"
                className="bg-black/30 border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20"
              />
              <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} EpicPixels. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid opacity-5 z-0"></div>
    </footer>
  )
}

