"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function TeamPagePopup({ isOpen, onClose }: PopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 20 }}
            className="relative z-10 w-full max-w-md glassmorphism rounded-lg p-6 neon-border"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:text-neon-cyan"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="text-center pt-4">
              <h3 className="text-xl font-bold mb-4 neon-text-magenta">No Open Positions</h3>
              <p className="text-gray-400 mb-6">
                We currently don't have any open positions available. Please check back later or send us your resume for
                future opportunities.
              </p>
              <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

