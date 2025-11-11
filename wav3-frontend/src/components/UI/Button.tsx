import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  ariaLabel,
  className = ''
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseProps = {
    className: `${styles.button} ${styles[variant]} ${styles[size]} ${className}`,
    onClick,
    disabled,
    type,
    'aria-label': ariaLabel,
    tabIndex: disabled ? -1 : 0
  };

  if (prefersReducedMotion) {
    return <button {...baseProps}>{children}</button>;
  }

  return (
    <motion.button
      {...baseProps}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
};