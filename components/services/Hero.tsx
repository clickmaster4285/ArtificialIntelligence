// src/components/services/ServiceHero.tsx

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NetworkBackground } from './NetworkBackground';
import { useEffect, useRef, useState } from 'react';

interface ServiceHeroProps {
  data: {
    tagline: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    startingPrice?: string;
    badge?: string;
  };
  h1: string;
  className?: string;
  videoSrc?: string;
  videoPoster?: string;
}

export function ServiceHero({ 
  data, 
  h1, 
  className,
  videoSrc = '/video/aidevelopment.mp4',
  videoPoster
}: ServiceHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    video.play().catch(error => {
      console.log('Initial play prevented:', error);
    });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  // Split h1 into words for animated display
  const words = h1.split(' ');

  const videoPaths = [
    videoSrc,
    '/video/aidevelopment.mp4',
    '/video/ai-development.mp4',
    '/video/ai_development.mp4',
    '/videos/ai-development.mp4',
    '/videos/ai%20development.mp4',
  ];

  const currentVideoSrc = videoError ? videoPaths[1] || videoSrc : videoSrc;

  return (
    <section className={cn(
      "relative overflow-hidden py-24 min-h-[600px] flex items-center",
      className
    )}>
      {/* Background Video */}
      <video
        ref={videoRef}
        src={currentVideoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={() => setVideoError(true)}
      />

      {/* Overlays - Matching landing page hero */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-black/55" />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[2] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Network Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-40">
        <NetworkBackground density="medium" />
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-left"
        >
          {/* Badge */}
          {data.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-eyebrow mb-6 normal-case tracking-normal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              {data.badge}
            </motion.div>
          )}

          {/* Enhanced H1 with word-by-word animation like landing page - INCREASED TEXT SIZE */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight max-w-4xl">
            {words.map((w, i) => {
              // Check if word should have gradient (you can customize which words get gradient)
              const isGradient = i === 0 || i === 2 || i === words.length - 1;
              return (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom mr-[0.08em] pb-[0.05em]"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%", rotateX: -40 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      background: isGradient
                        ? "linear-gradient(135deg, #a78bfa, #e879f9, #fb923c)"
                        : undefined,
                      WebkitBackgroundClip: isGradient ? "text" : undefined,
                      WebkitTextFillColor: isGradient ? "transparent" : undefined,
                      backgroundClip: isGradient ? "text" : undefined,
                      color: isGradient ? undefined : "white",
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl font-medium mt-4 mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent"
          >
            {data.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl"
          >
            {data.description}
          </motion.p>

          {/* CTA and Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4"
          >
            <Button
              size="lg"
              href={data.ctaLink}
              className="group relative bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-0.5 rounded-full px-8 py-6 text-base overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {data.ctaText}
                <motion.span 
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-fuchsia-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <div className="flex items-center gap-3">
              {data.startingPrice && (
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-white/90 text-sm border border-white/20">
                  From {data.startingPrice}
                </span>
              )}
              <span className="text-white/60 text-sm">Fixed-price</span>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-start gap-6 text-sm text-white/70"
          >
            {['Full IP Transfer', 'USA-Based Engineers', 'Fixed-Price Milestones', '24-Hour Response'].map((item) => (
              <motion.span 
                key={item} 
                className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}