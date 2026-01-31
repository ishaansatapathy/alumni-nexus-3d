import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

export function GradientCard({ children, className = '' }: GradientCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/20 via-gray-400/20 to-white/20 blur-sm" />
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={false}
          whileHover={{
            background: [
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 50%, transparent 100%)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function GradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span 
      className={`bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient ${className}`}
      style={{
        backgroundSize: '200% auto',
      }}
    >
      {children}
    </span>
  );
}
