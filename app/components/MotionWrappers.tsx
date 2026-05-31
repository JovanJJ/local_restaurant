"use client";

import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

/**
 * A slow zoom animation wrapper for background images.
 */
export function SlowZoom({ children, className, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1.15 }}
      transition={{
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A gentle floating animation wrapper for featured items.
 */
export function GentleFloat({ children, className, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      animate={{ y: [-4, 4], x: [-2, 2] }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A fade-in and slide-up animation for content sections.
 */
export function FadeInUp({ children, className, delay = 0, ...props }: MotionWrapperProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A wrapper for list items with staggered entrance.
 */
export function StaggeredFadeIn({ children, className, index = 0, ...props }: MotionWrapperProps & { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Orchestrates page/section transitions with AnimatePresence.
 */
export function PageTransition({ children, keyStr }: { children: ReactNode; keyStr: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyStr}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Header/Navbar entrance animation.
 */
export function HeaderEntrance({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.header>
  );
}
