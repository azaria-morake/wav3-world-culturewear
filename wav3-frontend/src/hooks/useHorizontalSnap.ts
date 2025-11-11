import { useEffect, useRef } from 'react';

export const useHorizontalSnap = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      // Snap to the closest card
      const scrollLeft = element.scrollLeft;
      const cardWidth = element.children[0]?.getBoundingClientRect().width || 0;
      const gap = 16; // --gap
      const snapPoint = Math.round(scrollLeft / (cardWidth + gap));
      
      element.scrollTo({
        left: snapPoint * (cardWidth + gap),
        behavior: 'smooth'
      });
    };

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollRef;
};