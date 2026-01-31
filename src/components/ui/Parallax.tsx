import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxSection({ children, offset = 50, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

interface Parallax3DLayerProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export function Parallax3DLayer({ children, depth = 1, className = '' }: Parallax3DLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * depth, -100 * depth]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{
        y: smoothY,
        scale: smoothScale,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
