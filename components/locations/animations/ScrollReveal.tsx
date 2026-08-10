// components/animations/ScrollReveal.tsx
import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// components/animations/StaggerReveal.tsx
interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className,
  staggerDelay = 0.08,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
          } as const}
        >
          {child}
        </motion.div>
      ))}
      
    </motion.div>
  );
};