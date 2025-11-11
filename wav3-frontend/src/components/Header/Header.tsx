import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Icon } from '../UI/Icon';
import { Button } from '../UI/Button';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const prefersReducedMotion = usePrefersReducedMotion();

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <h1 className={styles.logoText}>Wav3</h1>
          <span className={styles.logoSubtitle}>World</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li><a href="/collections" className={styles.navLink}>Collections</a></li>
            <li><a href="/about" className={styles.navLink}>About</a></li>
            <li><a href="/contact" className={styles.navLink}>Contact</a></li>
          </ul>
        </nav>

        {/* Action Icons */}
        <div className={styles.actions}>
          {/* Search */}
          <button 
            className={styles.actionButton}
            aria-label="Search"
          >
            <Icon name="search" size={20} />
          </button>

          {/* Cart with badge */}
          <button 
            className={styles.actionButton}
            aria-label={`Shopping cart, ${totalItems} items`}
          >
            <Icon name="cart" size={20} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>

          {/* User account or login */}
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <button 
                className={styles.actionButton}
                aria-label="User account"
              >
                <Icon name="heart" size={20} />
              </button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="small"
              aria-label="Sign in"
            >
              Sign In
            </Button>
          )}

          {/* Mobile menu button */}
          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className={styles.mobileMenuBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: "easeOut"
              }}
              aria-label="Mobile navigation"
            >
              <div className={styles.mobileMenuHeader}>
                <h2>Menu</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <Icon name="close" size={24} />
                </button>
              </div>

              <ul className={styles.mobileNavList}>
                <li>
                  <a 
                    href="/" 
                    className={styles.mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/collections" 
                    className={styles.mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    className={styles.mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className={styles.mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                </li>
                
                {/* User section */}
                <li className={styles.mobileNavDivider}></li>
                
                {isAuthenticated ? (
                  <>
                    <li>
                      <span className={styles.userWelcome}>
                        Hello, {user?.name}
                      </span>
                    </li>
                    <li>
                      <a 
                        href="/profile" 
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/wishlist" 
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Wishlist
                      </a>
                    </li>
                    <li>
                      <button 
                        className={styles.mobileNavButton}
                        onClick={handleLogout}
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <a 
                      href="/login" 
                      className={styles.mobileNavLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </a>
                  </li>
                )}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};