import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Animated3DButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Animated3DButton({ 
  children, 
  className, 
  onClick,
  variant = 'primary',
  size = 'md'
}: Animated3DButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    if (!button || !glow) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(glow, {
        x: x - 50,
        y: y - 50,
        opacity: 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  
  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative rounded-lg font-medium transition-all overflow-hidden',
        'shadow-lg hover:shadow-xl',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        ref={glowRef}
        className="absolute w-24 h-24 bg-white rounded-full blur-2xl opacity-0 pointer-events-none"
        style={{ transform: 'translateZ(-10px)' }}
      />
      <span className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </span>
    </motion.button>
  );
}
