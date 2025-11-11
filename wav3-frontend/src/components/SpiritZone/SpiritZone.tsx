import React from 'react';
import { motion } from 'framer-motion';
import styles from './SpiritZone.module.css';

interface SpiritZoneProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
  logoSvg?: string;
}

export const SpiritZone: React.FC<SpiritZoneProps> = ({
  title = "Wav3 World",
  subtitle = "The Wave = trial. The Spirit = response.",
  ctaLabel = "Enter the World",
  onCta,
  logoSvg
}) => {
  return (
    <div className={styles.spiritWrap} role="main" aria-label="Brand spirit zone">
      <motion.div 
        className={styles.spiritZone}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {logoSvg ? (
          <div 
            className={styles.logo}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
            aria-label="Wav3 World Logo"
          />
        ) : (
          <h1 className={styles.logo}>Wav3 World</h1>
        )}
        
        <p className={styles.subtitle}>{subtitle}</p>
        
        <button 
          className={styles.cta}
          onClick={onCta}
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </button>
      </motion.div>
    </div>
  );
};