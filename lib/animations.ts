// lib/animations.ts
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] // cubic-bezier for smooth easeOut
    } 
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    } 
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1]
    } 
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1]
    } 
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1]
    } 
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1]
    } 
  },
};

export const pulseGlow = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};