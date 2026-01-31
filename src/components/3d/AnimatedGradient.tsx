import { motion } from 'framer-motion';

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(200,200,200,0.08) 30%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['-20%', '120%'],
          y: ['10%', '80%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(220,220,220,0.12) 0%, rgba(180,180,180,0.06) 30%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: ['100%', '-20%'],
          y: ['70%', '20%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(240,240,240,0.1) 0%, rgba(190,190,190,0.05) 30%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['50%', '30%'],
          y: ['30%', '60%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />
      
      {/* Top spotlight effect */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
