import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const getInitialState = () => {
      switch (direction) {
        case 'up':
          return { y: 60, opacity: 0 };
        case 'down':
          return { y: -60, opacity: 0 };
        case 'left':
          return { x: 60, opacity: 0 };
        case 'right':
          return { x: -60, opacity: 0 };
        case 'scale':
          return { scale: 0.8, opacity: 0 };
        default:
          return { y: 60, opacity: 0 };
      }
    };
    
    gsap.fromTo(
      element,
      getInitialState(),
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [delay, direction]);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
