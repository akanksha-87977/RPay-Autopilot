"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return <AnimatePresence>{open && <>
    <motion.button aria-label="Close modal" onClick={onClose} className="fixed inset-0 z-50 bg-[#0E1020]/45 backdrop-blur-[2px]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
    <motion.div role="dialog" aria-modal="true" className="fixed left-1/2 top-1/2 z-50 max-h-[86vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl border border-white/20 bg-white p-6 shadow-lift" initial={{opacity:0, y:18, x:"-50%", scale:.97}} animate={{opacity:1, y:0, x:"-50%", scale:1}} exit={{opacity:0, y:12, x:"-50%", scale:.98}}>
      <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold tracking-[-.02em]">{title}</h2><button onClick={onClose} className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink"><X size={18}/></button></div>
      {children}
    </motion.div>
  </>}</AnimatePresence>;
}
