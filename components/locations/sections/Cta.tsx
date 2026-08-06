'use client';

// components/sections/CTASection.tsx
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Mail, Phone, User, MessageSquare, Send } from 'lucide-react';
import { FloatingObjects } from '@/components/locations/sections/FloatingObjects';
import { Shimmer } from '@/components/locations/sections/Shimmer';

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  eyebrow = "Let's build it",
  title,
  description,
  ctaText,
  ctaLink,
  secondaryText,
  secondaryLink = '#contact',
}) => {
  const [secondaryHovered, setSecondaryHovered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // === FIXED TYPESCRIPT STRICT TYPING ===
  const formContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] // This is now strictly typed and accepted
      } 
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call)
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden min-h-[800px] flex items-center">
      <FloatingObjects variant="cta" />

      {/* === BACKGROUND EFFECTS === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />
      
      {/* Right-side blur glow for the form */}
      <motion.div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: Text & Content */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            {/* Eyebrow with Line */}
            <motion.div 
              className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
              whileHover={{ scale: 1.02 }}
            >
              <span className="w-8 h-px bg-violet-400/70" />
              {eyebrow}
            </motion.div>

            {/* Gradient Heading */}
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed"
              >
                {description}
              </motion.p>
            )}

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Primary: solid pill, shimmer on hover */}
              <motion.a
                href={ctaLink}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.99 }}
                className="group relative overflow-hidden inline-flex items-center gap-3 pl-6 pr-3 py-3 rounded-full bg-white text-black font-medium transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <Shimmer />
                <Mail className="relative z-10 w-4 h-4 text-black/60" />
                <span className="relative z-10">{ctaText}</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>

              {/* Secondary: outline pill */}
              {secondaryText && (
                <a
                  href={secondaryLink}
                  onMouseEnter={() => setSecondaryHovered(true)}
                  onMouseLeave={() => setSecondaryHovered(false)}
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:text-white transition-colors duration-300"
                >
                 
                  <Phone className="w-4 h-4 text-white/60" />
                  {secondaryText}
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: Transparent Contact Form */}
          {/* ========================================= */}
          <motion.div
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Form Glass Card */}
            <div className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl overflow-hidden">
              
              {/* Decorative inner gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

              {/* Form Header */}
              <motion.div variants={formItemVariants} className="mb-6">
                <h3 className="text-xl font-semibold text-white">Send a Message</h3>
                <p className="text-sm text-white/50 mt-1">We'll get back to you within 24 hours.</p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <motion.div variants={formItemVariants} className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors duration-300">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div variants={formItemVariants} className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div variants={formItemVariants} className="relative group">
                  <div className="absolute left-4 top-4 text-white/30 group-focus-within:text-violet-400 transition-colors duration-300">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 resize-none"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={formItemVariants}
                  type="submit"
                  whileHover={{ y: -2, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Floating decorative dots inside the glass */}
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-violet-500/10 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};