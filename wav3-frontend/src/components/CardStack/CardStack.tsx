import React from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Icon } from '../UI/Icon';
import styles from './CardStack.module.css';

interface CardStackProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const CardStack: React.FC<CardStackProps> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <div className={styles.modalContainer} role="dialog" aria-modal="true" aria-label={title}>
            <motion.div
              className={styles.cardStack}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: "easeOut"
              }}
            >
              {/* Header */}
              <div className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close dialog"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              {/* Content */}
              <div className={styles.content}>
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};